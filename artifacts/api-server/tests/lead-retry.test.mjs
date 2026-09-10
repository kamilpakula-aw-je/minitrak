// Test integracyjny pętli ponowień e-maili (src/lib/lead-retry.ts).
//
// Gwarancja biznesowa: lead ze statusem "failed" po awarii poczty zostaje
// faktycznie wysłany ponownie — z kompletem zdjęć — a status zmienia się
// na "sent". Gdy ponowienie znów pada, lead zostaje "failed" z zapisanym
// błędem i czeka na następny cykl.
//
// Mechanika: seeduje leady "failed" (marker w nazwie) bezpośrednio w bazie,
// potem uruchamia zbundlowany harness (tests/lead-retry-harness.ts), który
// wywołuje retryFailedLeads() z atrapowym mailerem (bez prawdziwego SMTP)
// i z zapytaniem zawężonym do markera — prawdziwe leady "failed" w bazie
// deweloperskiej nie są dotykane.
//
// Scenariusze:
//  1. success: kontakt + wymiana (2 zdjęcia w metadanych) → oba maile
//     "wysłane" (temat [PONOWNA WYSYŁKA], załączniki kompletne),
//     status w bazie = "sent", email_error wyczyszczony.
//  2. legacy: lead wymiany z photos_count > 0, ale bez zapisanych zdjęć →
//     wysłany z notką o niemożliwych do załączenia zdjęciach.
//  3. fail: mailer rzuca → status zostaje "failed" z komunikatem błędu.
//
// Uruchamianie: pnpm --filter @workspace/api-server run test:retry
// (wymaga DATABASE_URL; dane testowe są sprzątane po teście)

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { execSync, execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HARNESS = path.join(root, "dist", "lead-retry-harness.test.mjs");
const MARKER = `RETRYTEST${Date.now()}`;

/** @type {pg.Pool} */
let pool;

async function seedFailedLead(fields) {
  const { rows } = await pool.query(
    `INSERT INTO leads (type, name, phone, email, message, machine_brand,
       photos_count, photos, source, email_status, email_error)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'failed',$10) RETURNING id`,
    [
      fields.type,
      fields.name,
      fields.phone ?? "600 000 000",
      fields.email ?? null,
      fields.message ?? null,
      fields.machineBrand ?? null,
      fields.photosCount ?? 0,
      JSON.stringify(fields.photos ?? []),
      "test-retry",
      fields.emailError ?? "poprzednia awaria SMTP",
    ],
  );
  return rows[0].id;
}

async function getLead(id) {
  const { rows } = await pool.query("SELECT * FROM leads WHERE id = $1", [id]);
  return rows[0];
}

/** Uruchamia harness i zwraca listę "wysłanych" maili. */
function runHarness(mode) {
  const out = execFileSync("node", [HARNESS], {
    cwd: root,
    env: {
      ...process.env,
      NODE_ENV: "production",
      RETRY_TEST_MARKER: MARKER,
      RETRY_TEST_MODE: mode,
    },
    encoding: "utf8",
  });
  const line = out.split("\n").find((l) => l.startsWith("RESULT:"));
  assert.ok(line, `harness nie wypisał RESULT — stdout:\n${out}`);
  return JSON.parse(line.slice("RESULT:".length));
}

before(async () => {
  assert.ok(process.env.DATABASE_URL, "DATABASE_URL musi być ustawione");
  pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

  // Zbuduj harness: bundlujemy TS (łącznie z @workspace/db, które eksportuje
  // źródła .ts), zewnętrzne zostają pakiety npm dostępne w node_modules.
  execSync(
    "pnpm exec esbuild tests/lead-retry-harness.ts --bundle --platform=node" +
      " --format=esm --outfile=" +
      JSON.stringify(HARNESS) +
      // drizzle-zod/zod bundlujemy — to zależności lib/db, nie api-server,
      // więc nie da się ich rozwiązać z dist/ tego pakietu.
      " --external:pg --external:drizzle-orm" +
      " --external:pino --external:nodemailer" +
      " --external:@google-cloud/storage --log-level=warning",
    { cwd: root, stdio: "inherit" },
  );
}, { timeout: 120000 });

after(async () => {
  try {
    await pool?.query("DELETE FROM leads WHERE name LIKE $1", [`${MARKER}%`]);
  } finally {
    await pool?.end();
  }
});

// ---- Udane ponowienie: failed → sent, komplet załączników ----

test("udane ponowienie: kontakt i wymiana ze zdjęciami przechodzą na sent", async () => {
  const contactId = await seedFailedLead({
    type: "contact",
    name: `${MARKER} Kontakt`,
    email: "retry@example.com",
    message: "Proszę o kontakt.",
  });
  const tradeId = await seedFailedLead({
    type: "trade_in",
    name: `${MARKER} Wymiana`,
    machineBrand: "Kubota",
    photosCount: 2,
    photos: [
      { path: "/bucket/.private/lead-photos/a", filename: "przod.png", contentType: "image/png" },
      { path: "/bucket/.private/lead-photos/b", filename: "tyl.png", contentType: "image/png" },
    ],
  });

  const sent = runHarness("success");
  assert.equal(sent.length, 2, "powinny wyjść dokładnie 2 maile");

  const contactMail = sent.find((m) => m.subject.includes("Kontakt"));
  assert.ok(contactMail, "brak maila dla leada kontaktowego");
  assert.match(contactMail.subject, /^\[PONOWNA WYSYŁKA\]/);
  assert.equal(contactMail.replyTo, "retry@example.com");
  assert.deepEqual(contactMail.attachments, []);

  const tradeMail = sent.find((m) => m.subject.includes("Wymiana"));
  assert.ok(tradeMail, "brak maila dla leada wymiany");
  assert.match(tradeMail.subject, /^\[PONOWNA WYSYŁKA\]/);
  assert.deepEqual(
    tradeMail.attachments,
    ["przod.png", "tyl.png"],
    "wszystkie zapisane zdjęcia muszą być załączone",
  );
  assert.equal(tradeMail.textHasPhotoNote, false, "przy kompletnych załącznikach nie może być notki o braku zdjęć");

  const contact = await getLead(contactId);
  assert.equal(contact.email_status, "sent", "kontakt: status powinien przejść na sent");
  assert.equal(contact.email_error, null, "kontakt: błąd powinien być wyczyszczony");

  const trade = await getLead(tradeId);
  assert.equal(trade.email_status, "sent", "wymiana: status powinien przejść na sent");
  assert.equal(trade.email_error, null, "wymiana: błąd powinien być wyczyszczony");
});

// ---- Lead legacy: zdjęcia były, ale nie ma ich w storage ----

test("lead legacy (photos_count>0, brak zapisanych zdjęć): wysłany z notką", async () => {
  const legacyId = await seedFailedLead({
    type: "trade_in",
    name: `${MARKER} Legacy`,
    photosCount: 3,
    photos: [],
  });

  const sent = runHarness("success");
  assert.equal(sent.length, 1);
  assert.deepEqual(sent[0].attachments, []);
  assert.equal(sent[0].textHasPhotoNote, true, "mail legacy musi mieć notkę o niedołączonych zdjęciach");

  const legacy = await getLead(legacyId);
  assert.equal(legacy.email_status, "sent");
});

// ---- Nieudane ponowienie: zostaje failed z błędem ----

test("nieudane ponowienie: status zostaje failed z komunikatem błędu", async () => {
  const failId = await seedFailedLead({
    type: "contact",
    name: `${MARKER} DalejFailed`,
    emailError: "stary błąd",
  });

  const sent = runHarness("fail");
  assert.equal(sent.length, 0, "przy awarii nic nie może zostać 'wysłane'");

  const lead = await getLead(failId);
  assert.equal(lead.email_status, "failed", "status musi zostać failed");
  assert.equal(lead.email_error, "SMTP down (test)", "błąd musi być zaktualizowany na najnowszy");
});

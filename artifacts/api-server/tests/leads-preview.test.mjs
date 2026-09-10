// Test integracyjny podglądu leadów (/api/leads): filtry + stronicowanie.
//
// Buduje serwer API, seeduje 230 leadów testowych z unikalnym markerem,
// startuje `node dist/index.mjs` (z WYŁĄCZONYM mailerem, żeby pętla ponowień
// nie wysłała żadnych e-maili) i sprawdza:
//  - wymóg logowania (401 bez Basic auth),
//  - licznik "Pasujących leadów" i "wyświetlono" (100 na stronę),
//  - zawartość strony 2 (właściwy wycinek posortowany po dacie malejąco),
//  - że linki stronicowania i chipy filtrów zachowują q/type/status/from/to,
//  - filtry łączone (q + type + status + zakres dat).
//
// Uruchamianie: pnpm --filter @workspace/api-server run test:leads
// (wymaga DATABASE_URL w środowisku; seed jest sprzątany po teście)

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn, execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const PORT = process.env.LEADS_TEST_PORT || "23787";
const BASE = `http://127.0.0.1:${PORT}`;
const ADMIN_PASSWORD = "leads-preview-test-password";
const AUTH = `Basic ${Buffer.from(`admin:${ADMIN_PASSWORD}`).toString("base64")}`;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Unikalny marker w nazwie leada — filtr q=MARKER izoluje dane testowe
// od prawdziwych leadów w bazie deweloperskiej.
const MARKER = `LEADTEST${Date.now()}`;
const TOTAL = 230; // > 100, żeby wymusić 3 strony (100 + 100 + 30)

/** @type {import("node:child_process").ChildProcess} */
let server;
/** @type {pg.Pool} */
let pool;

async function get(pathname, { auth = true, ...opts } = {}) {
  return fetch(`${BASE}/api${pathname}`, {
    redirect: "manual",
    headers: auth ? { authorization: AUTH } : {},
    ...opts,
  });
}

function leadName(i) {
  return `${MARKER} Lead ${String(i).padStart(3, "0")}`;
}

// Rozkład seeda (deterministyczny):
//  - type:   i parzyste → contact (115), nieparzyste → trade_in (115)
//  - status: i % 3 === 0 → pending (77), inaczej sent (153)
//    (celowo bez "failed" — pętla ponowień nie może mieć nic do roboty)
//  - data:   i < 60 → 10.02.2026, reszta → 10.01.2026; każda unikalna
//    (malejąco względem i, więc kolejność listy = rosnące i)
function leadRow(i) {
  const type = i % 2 === 0 ? "contact" : "trade_in";
  const status = i % 3 === 0 ? "pending" : "sent";
  const base =
    i < 60
      ? Date.parse("2026-02-10T12:00:00+01:00")
      : Date.parse("2026-01-10T12:00:00+01:00");
  const createdAt = new Date(base - i * 1000);
  return { type, status, createdAt, name: leadName(i) };
}

before(async () => {
  assert.ok(process.env.DATABASE_URL, "DATABASE_URL musi być ustawione");

  // 1. Seed 230 leadów testowych.
  pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const values = [];
  const params = [];
  for (let i = 0; i < TOTAL; i++) {
    const r = leadRow(i);
    const o = params.length;
    values.push(`($${o + 1}, $${o + 2}, '600100200', $${o + 3}, $${o + 4})`);
    params.push(r.type, r.name, r.status, r.createdAt.toISOString());
  }
  await pool.query(
    `INSERT INTO leads (type, name, phone, email_status, created_at) VALUES ${values.join(",")}`,
    params,
  );

  // 2. Build + start serwera z wyłączonym mailerem.
  execSync("pnpm run build", { cwd: root, stdio: "inherit" });
  const env = { ...process.env, PORT, ADMIN_PASSWORD, NODE_ENV: "production" };
  delete env.GMAIL_USER;
  delete env.GMAIL_APP_PASSWORD;
  server = spawn("node", ["dist/index.mjs"], {
    cwd: root,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stderr.on("data", (d) => process.stderr.write(`[server] ${d}`));

  const deadline = Date.now() + 15000;
  for (;;) {
    try {
      const res = await get("/leads", { auth: false });
      if (res.status > 0) break;
    } catch {
      if (Date.now() > deadline) throw new Error("Serwer nie wystartował w 15 s");
      await new Promise((r) => setTimeout(r, 250));
    }
  }
}, { timeout: 180000 });

after(async () => {
  server?.kill("SIGTERM");
  try {
    await pool?.query("DELETE FROM leads WHERE name LIKE $1", [`${MARKER}%`]);
  } finally {
    await pool?.end();
  }
});

async function getHtml(qs) {
  const res = await get(`/leads${qs}`);
  assert.equal(res.status, 200, `GET /leads${qs} → ${res.status}`);
  assert.match(res.headers.get("content-type") ?? "", /text\/html/);
  return res.text();
}

function countRows(html) {
  return html.split(`${MARKER} Lead `).length - 1;
}

function pagerLinks(html) {
  const pager = html.match(/<div class="chips pager">([\s\S]*?)<\/div>/);
  if (!pager) return [];
  return [...pager[1].matchAll(/href="leads(\?[^"]*)"/g)].map((m) => m[1]);
}

// ---- Autoryzacja ----

test("GET /leads bez logowania → 401", async () => {
  const res = await get("/leads", { auth: false });
  assert.equal(res.status, 401);
  assert.match(res.headers.get("www-authenticate") ?? "", /Basic/);
});

// ---- Licznik + strona 1 ----

test("q=MARKER: licznik 230, wyświetlono 100, strona 1 z 3", async () => {
  const html = await getHtml(`?q=${MARKER}`);
  assert.ok(html.includes(`Pasujących leadów: ${TOTAL}`), "zły licznik pasujących");
  assert.ok(html.includes("wyświetlono: 100"), "brak 'wyświetlono: 100'");
  assert.ok(html.includes("(strona 1 z 3)"), "brak '(strona 1 z 3)'");
  assert.equal(countRows(html), 100);
  // Strona 1 = najnowsze, czyli Lead 000..099.
  assert.ok(html.includes(leadName(0)));
  assert.ok(html.includes(leadName(99)));
  assert.ok(!html.includes(leadName(100)));
});

// ---- Strona 2: właściwy wycinek + linki zachowują filtr ----

test("q=MARKER&page=2: zawartość i linki stronicowania", async () => {
  const html = await getHtml(`?q=${MARKER}&page=2`);
  assert.ok(html.includes("(strona 2 z 3)"), "brak '(strona 2 z 3)'");
  assert.equal(countRows(html), 100);
  assert.ok(html.includes(leadName(100)), "brak pierwszego leada strony 2");
  assert.ok(html.includes(leadName(199)), "brak ostatniego leada strony 2");
  assert.ok(!html.includes(leadName(99)), "lead ze strony 1 na stronie 2");
  assert.ok(!html.includes(leadName(200)), "lead ze strony 3 na stronie 2");

  const links = pagerLinks(html);
  assert.equal(links.length, 2, "pager powinien mieć linki Nowsze i Starsze");
  const [prev, next] = links;
  // "Nowsze" → strona 1 (bez page), "Starsze" → page=3; oba zachowują q.
  assert.ok(prev.includes(`q=${MARKER}`), "link 'Nowsze' gubi q");
  assert.ok(!prev.includes("page="), "strona 1 nie powinna mieć page=");
  assert.ok(next.includes(`q=${MARKER}`), "link 'Starsze' gubi q");
  assert.ok(next.includes("page=3"), "link 'Starsze' nie wskazuje page=3");
});

test("q=MARKER&page=3: ostatnia strona, 30 wierszy, tylko link Nowsze", async () => {
  const html = await getHtml(`?q=${MARKER}&page=3`);
  assert.ok(html.includes("(strona 3 z 3)"));
  assert.equal(countRows(html), 30);
  assert.ok(html.includes(leadName(229)));
  const links = pagerLinks(html);
  assert.equal(links.length, 1);
  assert.ok(links[0].includes(`q=${MARKER}`) && links[0].includes("page=2"));
});

// ---- Pager zachowuje wszystkie filtry naraz ----

test("pager zachowuje q + type + status + from + to", async () => {
  // q + status=sent → 153 pasujące → 2 strony.
  const qs = `?q=${MARKER}&status=sent&from=2026-01-01&to=2026-12-31`;
  const html = await getHtml(qs);
  assert.ok(html.includes("Pasujących leadów: 153"), "zły licznik dla status=sent");
  const links = pagerLinks(html);
  assert.equal(links.length, 1, "powinien być link do strony 2");
  const next = links[0];
  for (const part of [`q=${MARKER}`, "status=sent", "from=2026-01-01", "to=2026-12-31", "page=2"]) {
    assert.ok(next.includes(part), `link stronicowania gubi ${part}`);
  }

  // type=contact → 115 pasujących → 2 strony; pager zachowuje type i q.
  const html2 = await getHtml(`?q=${MARKER}&type=contact`);
  assert.ok(html2.includes("Pasujących leadów: 115"), "zły licznik dla type=contact");
  const links2 = pagerLinks(html2);
  assert.equal(links2.length, 1);
  assert.ok(links2[0].includes("type=contact") && links2[0].includes(`q=${MARKER}`));
});

// ---- Filtry łączone: q + type + status + zakres dat ----

test("filtry łączone zawężają licznik poprawnie", async () => {
  // contact (parzyste) ∧ sent (i%3≠0) → 115 - 39 = 76
  const a = await getHtml(`?q=${MARKER}&type=contact&status=sent`);
  assert.ok(a.includes("Pasujących leadów: 76"), "zły licznik contact+sent");

  // ...∧ luty 2026 (i<60): parzyste 30 - (i%6==0 →10) = 20
  const b = await getHtml(
    `?q=${MARKER}&type=contact&status=sent&from=2026-02-01&to=2026-02-28`,
  );
  assert.ok(b.includes("Pasujących leadów: 20"), "zły licznik z zakresem dat");
  assert.equal(countRows(b), 20);

  // Zakres dat bez wyników.
  const c = await getHtml(`?q=${MARKER}&from=2026-03-01&to=2026-03-31`);
  assert.ok(c.includes("Pasujących leadów: 0"));
  assert.ok(c.includes("Brak leadów dla wybranych filtrów."));
});

// ---- Chipy typu/statusu zachowują q i zakres dat ----

test("chipy filtrów zachowują q/from/to", async () => {
  const html = await getHtml(`?q=${MARKER}&from=2026-01-01&to=2026-12-31`);
  const chips = [...html.matchAll(/href="leads(\?[^"]*)"[^>]*class="chip/g)].map(
    (m) => m[1],
  );
  const typeChip = chips.find((c) => c.includes("type=trade_in"));
  assert.ok(typeChip, "brak chipa type=trade_in");
  for (const part of [`q=${MARKER}`, "from=2026-01-01", "to=2026-12-31"]) {
    assert.ok(typeChip.includes(part), `chip typu gubi ${part}`);
  }
  const statusChip = chips.find((c) => c.includes("status=failed"));
  assert.ok(statusChip, "brak chipa status=failed");
  assert.ok(statusChip.includes(`q=${MARKER}`), "chip statusu gubi q");
});

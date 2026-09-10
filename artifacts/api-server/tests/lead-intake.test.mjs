// Test integracyjny przyjmowania zgłoszeń (POST /api/contact, POST /api/trade-in,
// POST /api/order).
//
// Najważniejsza gwarancja biznesowa: lead ZAWSZE ląduje w bazie, nawet gdy
// wysyłka e-maila zawiedzie. Test buduje serwer API i sprawdza dwa scenariusze
// (oba bez PRIVATE_OBJECT_DIR, żeby nie zostawiać plików w object storage):
//
// Serwer A — mailer nieskonfigurowany (bez GMAIL_*):
//  - zgłoszenie kontaktowe: 200, lead w bazie z poprawnymi polami,
//    email_status = "not_configured" (do oddzwonienia),
//  - zgłoszenie wymiany z załącznikami (multipart, 2 zdjęcia): 200, lead
//    w bazie z polami maszyny i photos_count = 2, email_status jw.,
//  - zamówienie produktu fizycznego: 200, pełne dane kupującego i dostawy
//    zapisane w message, email_status jw.,
//  - honeypot (pole website wypełnione): 200 ok, ale NIC nie trafia do bazy,
//  - walidacja (brak zgody RODO / za krótkie dane): 400 i brak leada w bazie.
//
// Serwer B — mailer skonfigurowany, ale SMTP PADA (SMTP_HOST=127.0.0.1 na
// zamkniętym porcie → połączenie odrzucone):
//  - kontakt, wymiana i zamówienie: 200 ok dla klienta, lead w bazie ze statusem
//    email_status = "failed" i zapisanym błędem — czeka na pętlę ponowień.
//
// Uruchamianie: pnpm --filter @workspace/api-server run test:intake
// (wymaga DATABASE_URL w środowisku; dane testowe są sprzątane po teście)

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn, execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const PORT = process.env.LEAD_INTAKE_TEST_PORT || "23789";
const BASE = `http://127.0.0.1:${PORT}`;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Unikalny marker w nazwie leada — izoluje i sprząta dane testowe.
const MARKER = `INTAKETEST${Date.now()}`;

/** @type {import("node:child_process").ChildProcess} */
let server;
/** @type {pg.Pool} */
let pool;

async function findLeads(name) {
  const { rows } = await pool.query(
    "SELECT * FROM leads WHERE name = $1 ORDER BY id",
    [name],
  );
  return rows;
}

// Minimalny poprawny PNG (1x1 px) — wystarcza, bo endpoint filtruje po MIME.
const PNG_1PX = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

const newIdempotencyKey = () => crypto.randomUUID();

async function spawnServer(port, envOverrides) {
  const env = { ...process.env, PORT: String(port), NODE_ENV: "production" };
  delete env.GMAIL_USER;
  delete env.GMAIL_APP_PASSWORD;
  delete env.PRIVATE_OBJECT_DIR; // brak object storage → zero plików po teście
  Object.assign(env, envOverrides);
  const child = spawn("node", ["dist/index.mjs"], {
    cwd: root,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stderr.on("data", (d) => process.stderr.write(`[server:${port}] ${d}`));

  const deadline = Date.now() + 15000;
  for (;;) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/health`);
      if (res.status > 0) break;
    } catch {
      if (Date.now() > deadline) throw new Error("Serwer nie wystartował w 15 s");
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  return child;
}

before(async () => {
  assert.ok(process.env.DATABASE_URL, "DATABASE_URL musi być ustawione");
  pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

  // Build + start serwera A: mailer NIESKONFIGUROWANY (bez GMAIL_*).
  execSync("pnpm run build", { cwd: root, stdio: "inherit" });
  server = await spawnServer(PORT, {});
}, { timeout: 180000 });

after(async () => {
  server?.kill("SIGTERM");
  try {
    await pool?.query("DELETE FROM leads WHERE name LIKE $1", [`${MARKER}%`]);
  } finally {
    await pool?.end();
  }
});

// ---- Zgłoszenie kontaktowe: lead w bazie mimo awarii mailera ----

test("contact (mailer nieskonfigurowany): lead w bazie, status not_configured", async () => {
  const name = `${MARKER} Kontakt`;
  const res = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      idempotencyKey: newIdempotencyKey(),
      name,
      phone: "600 100 200",
      email: "test@example.com",
      message: "Proszę o kontakt w sprawie minitraka.",
      rodo: true,
      marketing: true,
      source: "test-intake",
    }),
  });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });

  const rows = await findLeads(name);
  assert.equal(rows.length, 1, "lead kontaktowy nie trafił do bazy");
  const lead = rows[0];
  assert.equal(lead.type, "contact");
  assert.equal(lead.phone, "600 100 200");
  assert.equal(lead.email, "test@example.com");
  assert.equal(lead.message, "Proszę o kontakt w sprawie minitraka.");
  assert.equal(lead.marketing, true);
  assert.equal(lead.source, "test-intake");
  // Mailer nieskonfigurowany (brak GMAIL_*) — lead zostaje do oddzwonienia.
  assert.equal(lead.email_status, "not_configured");
});

// ---- Zamówienie produktu fizycznego ----

test("order (mailer nieskonfigurowany): zapisuje produkt oraz dane kupującego i dostawy", async () => {
  const firstName = `${MARKER} Jan`;
  const lastName = "Kowalski";
  const name = `${firstName} ${lastName}`;
  const res = await fetch(`${BASE}/api/order`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      idempotencyKey: newIdempotencyKey(),
      productSlug: "lisicki-kb",
      productName: "Kosiarka bijakowa LISICKI KB",
      selectedModel: "KB 160",
      selectedAddOn: "WOM 75",
      configuredPrice: 7170,
      email: "zamowienie@example.com",
      phone: "600 111 222",
      firstName,
      lastName,
      country: "Polska",
      city: "Warszawa",
      postalCode: "00-001",
      street: "ul. Testowa 12/3",
      companyName: "Testowa Firma Sp. z o.o.",
      nip: "5250000000",
      rodo: true,
    }),
  });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });

  const rows = await findLeads(name);
  assert.equal(rows.length, 1, "zamówienie nie trafiło do bazy");
  const lead = rows[0];
  assert.equal(lead.type, "order");
  assert.equal(lead.phone, "600 111 222");
  assert.equal(lead.email, "zamowienie@example.com");
  assert.equal(lead.source, "zamówienie: Kosiarka bijakowa LISICKI KB (lisicki-kb)");
  assert.match(lead.message, /Produkt: Kosiarka bijakowa LISICKI KB \(lisicki-kb\)/);
  assert.match(lead.message, /Model: KB 160/);
  assert.match(lead.message, /Opcja WOM: WOM 75/);
  assert.match(lead.message, /Cena konfiguracji: 7170\.00 zł/);
  assert.match(lead.message, new RegExp(`Imię i nazwisko: ${name}`));
  assert.match(lead.message, /Firma: Testowa Firma Sp\. z o\.o\./);
  assert.match(lead.message, /NIP: 5250000000/);
  assert.match(lead.message, /Kraj: Polska/);
  assert.match(lead.message, /Miasto: Warszawa/);
  assert.match(lead.message, /Kod pocztowy: 00-001/);
  assert.match(lead.message, /Ulica i numer: ul\. Testowa 12\/3/);
  assert.equal(lead.email_status, "not_configured");
});

// ---- Zgłoszenie wymiany z załącznikami ----

test("trade-in (multipart, 2 zdjęcia, mailer nieskonfigurowany): lead z polami maszyny", async () => {
  const name = `${MARKER} Wymiana`;
  const form = new FormData();
  form.set("name", name);
  form.set("idempotencyKey", newIdempotencyKey());
  form.set("phone", "601 202 303");
  form.set("email", "wymiana@example.com");
  form.set("machineBrand", "Kubota");
  form.set("machineModel", "KX019-4");
  form.set("machineYear", "2019");
  form.set("message", "Chcę wymienić koparkę na nową.");
  form.set("rodo", "true");
  form.set("source", "test-intake-wymiana");
  form.append("photos", new File([PNG_1PX], "przod.png", { type: "image/png" }));
  form.append("photos", new File([PNG_1PX], "tyl.png", { type: "image/png" }));

  const res = await fetch(`${BASE}/api/trade-in`, { method: "POST", body: form });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });

  const rows = await findLeads(name);
  assert.equal(rows.length, 1, "lead wymiany nie trafił do bazy");
  const lead = rows[0];
  assert.equal(lead.type, "trade_in");
  assert.equal(lead.phone, "601 202 303");
  assert.equal(lead.email, "wymiana@example.com");
  assert.equal(lead.machine_brand, "Kubota");
  assert.equal(lead.machine_model, "KX019-4");
  assert.equal(lead.machine_year, "2019");
  assert.equal(lead.message, "Chcę wymienić koparkę na nową.");
  assert.equal(lead.photos_count, 2, "photos_count powinno odnotować 2 zdjęcia");
  assert.equal(lead.source, "test-intake-wymiana");
  assert.equal(lead.email_status, "not_configured");
});

// ---- Honeypot: bot dostaje ok, ale nic nie trafia do bazy ----

test("honeypot (website wypełnione) → 200 ok, ale bez leada w bazie", async () => {
  const name = `${MARKER} Bot`;
  const res = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      idempotencyKey: newIdempotencyKey(),
      name,
      phone: "600 999 999",
      rodo: true,
      website: "", // puste jest OK…
    }),
  });
  assert.equal(res.status, 200);

  const bot = `${MARKER} Bot2`;
  const res2 = await fetch(`${BASE}/api/trade-in`, {
    method: "POST",
    body: (() => {
      const f = new FormData();
      f.set("idempotencyKey", newIdempotencyKey());
      f.set("name", bot);
      f.set("phone", "600 999 998");
      f.set("rodo", "true");
      f.set("website", "http://spam.example"); // …wypełnione = bot
      return f;
    })(),
  });
  assert.equal(res2.status, 200);
  assert.deepEqual(await res2.json(), { ok: true });

  assert.equal((await findLeads(name)).length, 1, "puste website nie może blokować");
  assert.equal((await findLeads(bot)).length, 0, "lead bota nie może trafić do bazy");
});

// ---- Walidacja: złe dane → 400 i brak leada ----

test("walidacja: brak zgody RODO / za krótki telefon → 400, bez leada", async () => {
  const name = `${MARKER} Invalid`;
  const noRodo = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idempotencyKey: newIdempotencyKey(), name, phone: "600 100 200" }),
  });
  assert.equal(noRodo.status, 400);
  assert.deepEqual(await noRodo.json(), { ok: false, error: "invalid_input" });

  const shortPhone = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idempotencyKey: newIdempotencyKey(), name, phone: "123", rodo: true }),
  });
  assert.equal(shortPhone.status, 400);

  assert.equal((await findLeads(name)).length, 0, "niepoprawny lead trafił do bazy");
});

test("order: walidacja produktu i honeypot nie zapisują zamówienia", async () => {
  const firstName = `${MARKER} OrderInvalid`;
  const lastName = "Test";
  const name = `${firstName} ${lastName}`;
  const payload = {
    idempotencyKey: newIdempotencyKey(),
    productSlug: "stark-rs-profi",
    productName: "Glebogryzarka STARK RS PROFI",
    selectedModel: "RS 115 Profi",
    email: "order-invalid@example.com",
    phone: "600 100 201",
    firstName,
    lastName,
    country: "Polska",
    city: "Łódź",
    postalCode: "90-001",
    street: "ul. Testowa 1",
    rodo: true,
  };
  const invalidProduct = await fetch(`${BASE}/api/order`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...payload, productName: "Inny produkt" }),
  });
  assert.equal(invalidProduct.status, 400);
  assert.deepEqual(await invalidProduct.json(), { ok: false, error: "invalid_input" });

  const bot = await fetch(`${BASE}/api/order`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...payload,
      idempotencyKey: newIdempotencyKey(),
      website: "https://spam.example",
    }),
  });
  assert.equal(bot.status, 200);
  assert.deepEqual(await bot.json(), { ok: true });
  assert.equal((await findLeads(name)).length, 0, "błędne lub spamowe zamówienie trafiło do bazy");
});

// ---- Awaria SMTP: mailer skonfigurowany, ale wysyłka pada ----
// Serwer B ma ustawione GMAIL_* (mailer "skonfigurowany"), ale SMTP_HOST
// wskazuje zamknięty lokalny port → sendMail rzuca (ECONNREFUSED) w sposób
// deterministyczny, bez żadnego ruchu sieciowego na zewnątrz.

test("awaria SMTP: kontakt, wymiana i zamówienie lądują w bazie ze statusem failed", { timeout: 60000 }, async () => {
  const failPort = Number(PORT) + 1;
  const failBase = `http://127.0.0.1:${failPort}`;
  const serverB = await spawnServer(failPort, {
    GMAIL_USER: "test@example.com",
    GMAIL_APP_PASSWORD: "not-a-real-password",
    SMTP_HOST: "127.0.0.1",
    SMTP_PORT: "9", // discard port — nic nie nasłuchuje, połączenie odrzucone
  });
  try {
    const contactName = `${MARKER} SmtpFail Kontakt`;
    const resC = await fetch(`${failBase}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        idempotencyKey: newIdempotencyKey(),
        name: contactName,
        phone: "600 500 400",
        message: "Test awarii SMTP",
        rodo: true,
      }),
    });
    // Klient dostaje sukces — lead jest bezpieczny w bazie mimo awarii poczty.
    assert.equal(resC.status, 200);
    assert.deepEqual(await resC.json(), { ok: true });

    const tradeName = `${MARKER} SmtpFail Wymiana`;
    const form = new FormData();
    form.set("idempotencyKey", newIdempotencyKey());
    form.set("name", tradeName);
    form.set("phone", "600 500 401");
    form.set("machineBrand", "JCB");
    form.set("rodo", "true");
    form.append("photos", new File([PNG_1PX], "maszyna.png", { type: "image/png" }));
    const resT = await fetch(`${failBase}/api/trade-in`, { method: "POST", body: form });
    assert.equal(resT.status, 200);
    assert.deepEqual(await resT.json(), { ok: true });

    const orderFirstName = `${MARKER} SmtpFail Order`;
    const orderLastName = "Test";
    const orderName = `${orderFirstName} ${orderLastName}`;
    const resO = await fetch(`${failBase}/api/order`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        idempotencyKey: newIdempotencyKey(),
        productSlug: "stark-kdl-profi",
        productName: "Kosiarka bijakowa STARK KDL PROFI",
        selectedModel: "KDL 180 Profi",
        email: "smtp-order@example.com",
        phone: "600 500 402",
        firstName: orderFirstName,
        lastName: orderLastName,
        country: "Polska",
        city: "Kraków",
        postalCode: "30-001",
        street: "ul. Awaryjna 2",
        rodo: true,
      }),
    });
    assert.equal(resO.status, 200);
    assert.deepEqual(await resO.json(), { ok: true });

    const [contact] = await findLeads(contactName);
    assert.ok(contact, "lead kontaktowy nie trafił do bazy mimo awarii SMTP");
    assert.equal(contact.email_status, "failed", "kontakt: status powinien być failed");
    assert.ok(contact.email_error, "kontakt: brak zapisanego błędu e-maila");

    const [trade] = await findLeads(tradeName);
    assert.ok(trade, "lead wymiany nie trafił do bazy mimo awarii SMTP");
    assert.equal(trade.type, "trade_in");
    assert.equal(trade.photos_count, 1);
    assert.equal(trade.email_status, "failed", "wymiana: status powinien być failed");
    assert.ok(trade.email_error, "wymiana: brak zapisanego błędu e-maila");

    const [order] = await findLeads(orderName);
    assert.ok(order, "zamówienie nie trafiło do bazy mimo awarii SMTP");
    assert.equal(order.type, "order");
    assert.equal(order.email_status, "failed", "zamówienie: status powinien być failed");
    assert.ok(order.email_error, "zamówienie: brak zapisanego błędu e-maila");
  } finally {
    // Zabij serwer B od razu — zanim jego pętla ponowień (start + 5 s)
    // zdąży dotknąć prawdziwych leadów "failed" w bazie deweloperskiej.
    serverB.kill("SIGKILL");
  }
});

test("idempotencja: retry nie duplikuje, a nowy klucz tworzy nowy lead", async () => {
  const contactName = `${MARKER} Idempotent Kontakt`;
  const key = newIdempotencyKey();
  const payload = {
    idempotencyKey: key,
    name: contactName,
    phone: "600 700 800",
    rodo: true,
  };
  const responses = await Promise.all(
    Array.from({ length: 4 }, () =>
      fetch(`${BASE}/api/contact`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }),
    ),
  );
  assert.ok(responses.every((response) => response.status === 200));
  assert.equal((await findLeads(contactName)).length, 1, "równoległy retry utworzył duplikat kontaktu");

  const newSubmission = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...payload, idempotencyKey: newIdempotencyKey() }),
  });
  assert.equal(newSubmission.status, 200);
  assert.equal((await findLeads(contactName)).length, 2, "nowe świadome wysłanie nie utworzyło leada");

  const tradeName = `${MARKER} Idempotent Wymiana`;
  const tradeKey = newIdempotencyKey();
  const makeTradeForm = (idempotencyKey) => {
    const form = new FormData();
    form.set("idempotencyKey", idempotencyKey);
    form.set("name", tradeName);
    form.set("phone", "600 700 801");
    form.set("rodo", "true");
    form.append("photos", new File([PNG_1PX], "retry.png", { type: "image/png" }));
    return form;
  };
  const tradeResponses = await Promise.all(
    Array.from({ length: 3 }, () =>
      fetch(`${BASE}/api/trade-in`, { method: "POST", body: makeTradeForm(tradeKey) }),
    ),
  );
  assert.ok(tradeResponses.every((response) => response.status === 200));
  assert.equal((await findLeads(tradeName)).length, 1, "równoległy retry utworzył duplikat wymiany");

  const secondTrade = await fetch(`${BASE}/api/trade-in`, {
    method: "POST",
    body: makeTradeForm(newIdempotencyKey()),
  });
  assert.equal(secondTrade.status, 200);
  assert.equal((await findLeads(tradeName)).length, 2, "nowy klucz wymiany nie utworzył leada");

  const orderFirstName = `${MARKER} Idempotent Order`;
  const orderLastName = "Test";
  const orderName = `${orderFirstName} ${orderLastName}`;
  const orderKey = newIdempotencyKey();
  const orderPayload = {
    idempotencyKey: orderKey,
    productSlug: "stark-kdl-profi",
    productName: "Kosiarka bijakowa STARK KDL PROFI",
    selectedModel: "KDL 200 Profi",
    email: "idempotent-order@example.com",
    phone: "600 700 802",
    firstName: orderFirstName,
    lastName: orderLastName,
    country: "Polska",
    city: "Gdańsk",
    postalCode: "80-001",
    street: "ul. Powtórna 3",
    rodo: true,
  };
  const orderResponses = await Promise.all(
    Array.from({ length: 3 }, () =>
      fetch(`${BASE}/api/order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(orderPayload),
      }),
    ),
  );
  assert.ok(orderResponses.every((response) => response.status === 200));
  assert.equal((await findLeads(orderName)).length, 1, "równoległy retry utworzył duplikat zamówienia");

  const secondOrder = await fetch(`${BASE}/api/order`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...orderPayload, idempotencyKey: newIdempotencyKey() }),
  });
  assert.equal(secondOrder.status, 200);
  assert.equal((await findLeads(orderName)).length, 2, "nowy klucz nie utworzył zamówienia");
});

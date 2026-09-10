// Test integracyjny SSR dla strony Stekro (minitrak.pl).
//
// Buduje artefakt produkcyjny, startuje `node server.mjs` w NODE_ENV=production
// i sprawdza:
//  - 200 + pełny HTML + poprawny <title>/canonical dla tras kanonicznych,
//  - poprawny canonical (wskazujący na trasę kanoniczną) dla aliasów,
//  - 301 dla adresów z końcowym "/",
//  - prawdziwe 404 dla nieznanych ścieżek,
//  - nagłówki cache dla /assets (immutable) i HTML (no-cache).
//
// Uruchamianie: pnpm --filter @workspace/stekro run test:ssr
// (albo: node --test tests/ssr.test.mjs z katalogu artifacts/stekro)

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = process.env.SSR_TEST_PORT || "23785";
const BASE = `http://127.0.0.1:${PORT}`;
const SITE_URL = "https://minitrak.pl";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** @type {import("node:child_process").ChildProcess} */
let server;

async function get(pathname, opts = {}) {
  return fetch(`${BASE}${pathname}`, { redirect: "manual", ...opts });
}

function extract(html, regex, label) {
  const m = html.match(regex);
  assert.ok(m, `Brak ${label} w HTML`);
  return m[1];
}

before(async () => {
  // 1. Build produkcyjny (klient + bundle SSR).
  execSync("pnpm run build", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, PORT, BASE_PATH: "/" },
  });
  assert.ok(fs.existsSync(path.join(root, "dist/public/index.html")), "Brak dist/public/index.html po buildzie");
  assert.ok(fs.existsSync(path.join(root, "dist/server/entry-server.js")), "Brak dist/server/entry-server.js po buildzie");

  // 2. Start serwera produkcyjnego.
  server = spawn("node", ["server.mjs"], {
    cwd: root,
    env: { ...process.env, NODE_ENV: "production", PORT, BASE_PATH: "/" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stderr.on("data", (d) => process.stderr.write(`[server] ${d}`));

  // Czekaj aż serwer zacznie odpowiadać (max ~15 s).
  const deadline = Date.now() + 15000;
  for (;;) {
    try {
      const res = await get("/");
      if (res.status > 0) break;
    } catch {
      if (Date.now() > deadline) throw new Error("Serwer nie wystartował w 15 s");
      await new Promise((r) => setTimeout(r, 250));
    }
  }
}, { timeout: 180000 });

after(() => {
  server?.kill("SIGTERM");
});

// ---- Trasy kanoniczne: 200 + treść + <title> + canonical ----

const CANONICAL_CASES = [
  { path: "/", titlePart: "Stekro MiniTrak", content: "Stekro" },
  { path: "/modele/solis-s26", titlePart: "Solis S26", content: "Solis" },
  { path: "/modele/ls-mt350", titlePart: "LS MT3.50", content: "LS" },
  { path: "/modele/aupax-m404", titlePart: "Aupax M404", content: "Aupax" },
  { path: "/marka/krone", titlePart: "Krone", content: "Krone" },
  { path: "/kariera", titlePart: "Kariera", content: "Handlowiec" },
  { path: "/wymiana", titlePart: "Wymień ciągnik", content: "rozliczeniu" },
  { path: "/polityka-prywatnosci", titlePart: "", content: "prywatno" },
  { path: "/regulamin", titlePart: "", content: "Regulamin" },
  { path: "/maszyny/kosiarki-bijakowe", titlePart: "Kosiarki bijakowe", content: "mulczowania" },
  { path: "/maszyny/glebogryzarki", titlePart: "Glebogryzarki", content: "uprawy gleby" },
  { path: "/maszyny/kosiarki-bijakowe/lisicki-kb", titlePart: "LISICKI KB", content: "LISICKI KB" },
  { path: "/maszyny/kosiarki-bijakowe/stark-kdl-profi", titlePart: "STARK KDL Profi", content: "STARK KDL Profi" },
  { path: "/maszyny/glebogryzarki/stark-rs-profi", titlePart: "STARK RS Profi", content: "STARK RS Profi" },
  { path: "/zamowienie/lisicki-kb", titlePart: "Zamówienie", content: "LISICKI KB" },
  { path: "/zamowienie/stark-kdl-profi", titlePart: "Zamówienie", content: "STARK" },
  { path: "/zamowienie/stark-rs-profi", titlePart: "Zamówienie", content: "STARK RS" },
];

for (const c of CANONICAL_CASES) {
  test(`GET ${c.path} → 200, tytuł i canonical`, async () => {
    const res = await get(c.path);
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /text\/html/);
    assert.equal(res.headers.get("cache-control"), "no-cache");
    const html = await res.text();

    const title = extract(html, /<title>([^<]*)<\/title>/, "<title>");
    if (c.titlePart) assert.ok(title.includes(c.titlePart), `Tytuł "${title}" nie zawiera "${c.titlePart}"`);

    const canonical = extract(html, /<link rel="canonical" href="([^"]+)"/, "canonical");
    assert.equal(canonical, `${SITE_URL}${c.path === "/" ? "/" : c.path}`);

    assert.ok(html.includes(c.content), `Brak treści "${c.content}" w SSR HTML dla ${c.path}`);
    // SSR musi wyrenderować aplikację, nie pusty root.
    assert.doesNotMatch(html, /<div id="root"><\/div>/);
  });
}

// ---- Aliasy: 200, ale canonical wskazuje trasę kanoniczną ----

const ALIAS_CASES = [
  { alias: "/modele/solis-s26-cab", canonical: "/modele/solis-s26" },
  { alias: "/modele/ls-mt1", canonical: "/modele/ls-mt125" },
  { alias: "/modele/ls-xj25", canonical: "/modele/ls-xj25-hst" },
  { alias: "/modele/ls-mt3-35", canonical: "/modele/ls-mt335" },
  { alias: "/modele/ls-mt340hc", canonical: "/modele/ls-mt340" },
  { alias: "/modele/ls-mt3-40", canonical: "/modele/ls-mt340" },
  { alias: "/modele/ls-mt3-50", canonical: "/modele/ls-mt350" },
  { alias: "/modele/ls-mt3-60", canonical: "/modele/ls-mt360" },
  { alias: "/krone", canonical: "/marka/krone" },
];

for (const a of ALIAS_CASES) {
  test(`GET ${a.alias} → 200, canonical ${a.canonical}`, async () => {
    const res = await get(a.alias);
    assert.equal(res.status, 200);
    const html = await res.text();
    const canonical = extract(html, /<link rel="canonical" href="([^"]+)"/, "canonical");
    assert.equal(canonical, `${SITE_URL}${a.canonical}`);
  });
}

// ---- Dane strukturalne JSON-LD (BreadcrumbList + ItemPage) ----

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script type="application\/ld\+json" data-route-jsonld>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) blocks.push(JSON.parse(m[1]));
  return blocks;
}

test("JSON-LD: strona modelu ma BreadcrumbList + ItemPage", async () => {
  const html = await (await get("/modele/solis-s26")).text();
  const blocks = extractJsonLd(html);
  assert.equal(blocks.length, 2);
  const types = blocks.map((b) => b["@type"]);
  assert.deepEqual(types.sort(), ["BreadcrumbList", "ItemPage"]);
  const item = blocks.find((b) => b["@type"] === "ItemPage");
  assert.equal(item.url, `${SITE_URL}/modele/solis-s26`);
  assert.ok(!("offers" in item) && !("aggregateRating" in item));
  assert.equal(item.mainEntity["@type"], "Thing");
  assert.ok(!("offers" in item.mainEntity));
});

test("JSON-LD: alias wskazuje kanoniczne URL-e", async () => {
  const html = await (await get("/modele/solis-s26-cab")).text();
  const blocks = extractJsonLd(html);
  assert.equal(blocks.length, 2);
  for (const b of blocks) {
    const urls = b["@type"] === "BreadcrumbList"
      ? b.itemListElement.map((i) => i.item)
      : [b.url];
    assert.ok(urls.includes(`${SITE_URL}/modele/solis-s26`), `Brak kanonicznego URL w ${b["@type"]}`);
  }
});

test("JSON-LD: podstrona nie-modelowa ma tylko BreadcrumbList, home ma FAQPage", async () => {
  const krone = extractJsonLd(await (await get("/marka/krone")).text());
  assert.equal(krone.length, 1);
  assert.equal(krone[0]["@type"], "BreadcrumbList");
  assert.equal(krone[0].itemListElement.length, 2);
  const home = extractJsonLd(await (await get("/")).text());
  assert.equal(home.length, 1);
  assert.equal(home[0]["@type"], "FAQPage");
  assert.ok(Array.isArray(home[0].mainEntity) && home[0].mainEntity.length === 9);
});

test("JSON-LD: CollectionPage dla kategorii kosiarki-bijakowe z ItemList", async () => {
  const html = await (await get("/maszyny/kosiarki-bijakowe")).text();
  const blocks = extractJsonLd(html);
  const collection = blocks.find(b => b["@type"] === "CollectionPage");
  assert.ok(collection, "Brak CollectionPage w kategorii");
  assert.equal(collection.mainEntity["@type"], "ItemList");
  assert.equal(collection.mainEntity.itemListElement.length, 2);
  assert.deepEqual(
    collection.mainEntity.itemListElement.map((item) => item.item),
    [
      `${SITE_URL}/maszyny/kosiarki-bijakowe/lisicki-kb`,
      `${SITE_URL}/maszyny/kosiarki-bijakowe/stark-kdl-profi`,
    ],
  );
});

test("JSON-LD: CollectionPage dla glebogryzarek zawiera STARK RS Profi", async () => {
  const html = await (await get("/maszyny/glebogryzarki")).text();
  const blocks = extractJsonLd(html);
  const collection = blocks.find(b => b["@type"] === "CollectionPage");
  assert.equal(collection.mainEntity["@type"], "ItemList");
  assert.equal(collection.mainEntity.itemListElement[0].item, `${SITE_URL}/maszyny/glebogryzarki/stark-rs-profi`);
});

test("JSON-LD: WebPage dla formularzy zamówień z pełnym breadcrumb", async () => {
  for (const path of ["/zamowienie/lisicki-kb", "/zamowienie/stark-kdl-profi", "/zamowienie/stark-rs-profi"]) {
    const html = await (await get(path)).text();
    const blocks = extractJsonLd(html);
    const webpage = blocks.find(b => b["@type"] === "WebPage");
    assert.ok(webpage, `Brak WebPage na ${path}`);
    assert.equal(webpage.url, `${SITE_URL}${path}`);
    const breadcrumb = blocks.find(b => b["@type"] === "BreadcrumbList");
    assert.ok(breadcrumb, `Brak BreadcrumbList na ${path}`);
    assert.equal(breadcrumb.itemListElement.length, 4);
    assert.ok(html.includes("Finalizuj zamówienie"));
  }
});

test("Dokładne, charakterystyczne fragmenty dokumentów są w SSR", async () => {
  const htmlStark = await (await get("/maszyny/kosiarki-bijakowe/stark-kdl-profi")).text();
  assert.ok(htmlStark.includes("KDL Profi to dobry wybór dla użytkowników, którzy potrzebują czegoś więcej"), "Brak tekstu DOCX w STARK");
  assert.ok(htmlStark.includes("Możliwość wychylenia zespołu roboczego od 60° w dół do 90° w górę"), "Brak tekstu DOCX w STARK");
  assert.ok(htmlStark.includes("mechaniczne zabezpieczenie najazdowe, dzięki czemu dobrze sprawdza się podczas wymagającej, regularnej eksploatacji"));
  assert.ok(htmlStark.includes("Solidna konstrukcja przeznaczona do profesjonalnego użytkowania"));
  assert.ok(htmlStark.includes("Przy wyborze odpowiedniego modelu warto uwzględnić przede wszystkim moc i masę ciągnika"));
  assert.ok(htmlStark.includes("W razie wątpliwości dotyczących doboru maszyny do ciągnika skontaktuj się z nami – pomożemy dobrać właściwy model"));

  const htmlLisicki = await (await get("/maszyny/kosiarki-bijakowe/lisicki-kb")).text();
  assert.ok(htmlLisicki.includes("Przy wyborze kosiarki warto zwrócić uwagę przede wszystkim na moc ciągnika, jego szerokość oraz rodzaj wykonywanych prac."));
  assert.ok(htmlLisicki.includes("Do mniejszych ciągników i pracy w sadach dobrym wyborem będą modele KB 100–KB 140."), "Brak tekstu DOCX w LISICKI");
  assert.ok(htmlLisicki.includes("W razie wątpliwości dotyczących dopasowania maszyny do ciągnika skontaktuj się z nami – pomożemy dobrać właściwy model"));
  assert.ok(htmlLisicki.includes("Przekładnia pasowa zabezpieczająca układ napędowy przed przeciążeniem"));
});

test("Oficjalne dane producenta STARK RS Profi są kompletne w SSR", async () => {
  const html = await (await get("/maszyny/glebogryzarki/stark-rs-profi")).text();
  for (const value of ["RS 95 Profi", "RS 105 Profi", "RS 115 Profi", "RS 125 Profi", "RS 135 Profi", "E 60 / F 410", "Wartość przy symbolu katalogowym producenta", "190", "14 lewych / 14 prawych", "167 kg"]) {
    assert.ok(html.includes(value), `Brak wartości RS Profi: ${value}`);
  }
  assert.ok(html.includes("boczny napęd łańcuchowy pracujący w kąpieli olejowej"));
  assert.ok(html.includes("regulowanym przesunięciem na prawą stronę"));
  assert.ok(html.includes('data-testid="select-product-model"'));
  assert.ok(html.includes("RS 95 Profi"));
  assert.ok(html.includes("RS 135 Profi"));
  assert.match(html, /<button[^>]*disabled[^>]*>[\s\S]*?Kup produkt/);
});

test("Kosiarki bijakowe wymagają wyboru modelu ze specyfikacji przed zakupem", async () => {
  const cases = [
    ["/maszyny/kosiarki-bijakowe/lisicki-kb", ["KB 100", "KB 240"]],
    ["/maszyny/kosiarki-bijakowe/stark-kdl-profi", ["KDL 160 Profi", "KDL 220 Profi"]],
  ];
  for (const [path, models] of cases) {
    const html = await (await get(path)).text();
    assert.ok(html.includes('data-testid="select-product-model"'));
    for (const model of models) assert.ok(html.includes(model), `Brak modelu ${model} na ${path}`);
    assert.match(html, /<button[^>]*disabled[^>]*>[\s\S]*?Kup produkt/);
  }
});

test("Kategorie, produkty i formularze mają pełne menu strony głównej", async () => {
  const paths = [
    "/maszyny/kosiarki-bijakowe",
    "/maszyny/glebogryzarki",
    "/maszyny/kosiarki-bijakowe/lisicki-kb",
    "/maszyny/kosiarki-bijakowe/stark-kdl-profi",
    "/maszyny/glebogryzarki/stark-rs-profi",
    "/zamowienie/lisicki-kb",
    "/zamowienie/stark-kdl-profi",
    "/zamowienie/stark-rs-profi",
  ];
  const expectedLinks = ["/#firma", "/#katalog", "/#osprzet", "/#czesci", "/#finansowanie", "/kariera", "/#kontakt", "/wymiana"];
  for (const path of paths) {
    const html = await (await get(path)).text();
    for (const href of expectedLinks) {
      assert.ok(html.includes(`href="${href}"`), `Brak linku ${href} w menu na ${path}`);
    }
    assert.ok(html.includes('aria-label="Otwórz menu"'), `Brak menu mobilnego na ${path}`);
  }
});

function imageTag(html, src) {
  const escaped = src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(new RegExp(`<img\\b[^>]*src="${escaped}"[^>]*>`));
  assert.ok(match, `Brak obrazu ${src}`);
  return match[0];
}

test("Wszystkie zdjęcia produktów mają warianty i rzeczywiste wymiary", async () => {
  const htmlLisicki = await (await get("/maszyny/kosiarki-bijakowe/lisicki-kb")).text();
  for (let index = 1; index <= 6; index += 1) {
    const tag = imageTag(htmlLisicki, `/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-${index}-1200.webp`);
    assert.ok(tag.includes('width="1200"'));
    assert.ok(tag.includes('height="676"'));
    assert.ok(tag.includes("srcSet="));
    assert.ok(tag.includes("-600.webp 600w"));
    assert.ok(tag.includes('title="'));
  }

  const htmlStark = await (await get("/maszyny/kosiarki-bijakowe/stark-kdl-profi")).text();
  const starkDimensions = [[900, 675], [1200, 900], [1200, 900], [1200, 675], [1200, 675], [1200, 675]];
  starkDimensions.forEach(([width, height], offset) => {
    const index = offset + 1;
    const suffix = index === 1 ? 900 : 1200;
    const tag = imageTag(htmlStark, `/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-${index}-${suffix}.webp`);
    assert.ok(tag.includes(`width="${width}"`));
    assert.ok(tag.includes(`height="${height}"`));
    assert.ok(tag.includes("srcSet="));
    assert.ok(tag.includes('title="'));
    if (index === 1) {
      assert.ok(tag.includes("-900.webp 900w"));
      assert.ok(!tag.includes("1200w"));
    }
  });

  const htmlRs = await (await get("/maszyny/glebogryzarki/stark-rs-profi")).text();
  const rsImages = [
    ["/products/stark-rs-profi/glebogryzarka-stark-rs-profi-1-599.webp", 599, 325],
    ["/products/stark-rs-profi/glebogryzarka-stark-rs-profi-2-599.webp", 599, 436],
    ["/products/stark-rs-profi/glebogryzarka-stark-rs-profi-3-1200.webp", 1200, 675],
    ["/products/stark-rs-profi/glebogryzarka-stark-rs-profi-4-1000.webp", 1000, 562],
  ];
  for (const [src, width, height] of rsImages) {
    const tag = imageTag(htmlRs, src);
    assert.ok(tag.includes(`width="${width}"`));
    assert.ok(tag.includes(`height="${height}"`));
    assert.ok(tag.includes("srcSet="));
    assert.ok(tag.includes('title="'));
  }
});

test("Breadcrumbs UI: widoczna nawigacja okruszkowa na podstronie", async () => {
  const html = await (await get("/modele/solis-s26")).text();
  assert.ok(html.includes('aria-label="breadcrumb"'));
  assert.ok(html.includes("Strona główna"));
});

// ---- Trailing slash → 301 na wersję bez "/" ----

for (const p of ["/kariera/", "/modele/solis-s26/", "/marka/krone/"]) {
  test(`GET ${p} → 301 bez trailing slash`, async () => {
    const res = await get(p);
    assert.equal(res.status, 301);
    assert.equal(res.headers.get("location"), p.replace(/\/+$/, ""));
  });
}

test("301 zachowuje query string", async () => {
  const res = await get("/kariera/?utm_source=test");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "/kariera?utm_source=test");
});

// ---- Nieznane ścieżki → prawdziwe 404 ----

for (const p of ["/nie-ma-takiej-strony", "/modele/nie-istnieje", "/modele/solis-s26/podstrona"]) {
  test(`GET ${p} → 404`, async () => {
    const res = await get(p);
    assert.equal(res.status, 404);
    assert.match(res.headers.get("content-type") ?? "", /text\/html/);
  });
}

// ---- Nagłówki cache dla assetów ----

test("Fingerprintowane /assets → cache immutable", async () => {
  const home = await (await get("/")).text();
  const m = home.match(/\/assets\/[^"']+\.(?:js|css)/);
  assert.ok(m, "Nie znaleziono odnośnika do /assets w HTML strony głównej");
  const res = await get(m[0]);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("cache-control"), "public, max-age=31536000, immutable");
});

// ---- Metody inne niż GET/HEAD → 405 ----

test("POST /kariera → 405", async () => {
  const res = await get("/kariera", { method: "POST" });
  assert.equal(res.status, 405);
});

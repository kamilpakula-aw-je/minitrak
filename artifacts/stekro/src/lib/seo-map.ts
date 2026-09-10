import type { SEOData } from "@/hooks/use-seo";

const BRAND_BADGE = "Stekro MiniTrak";

function modelSEO(modelName: string, brand: string, power: string, summary: string, image?: string): SEOData {
  return {
    title: `${modelName} — ${brand} | ${BRAND_BADGE}`,
    description: `${modelName} (${power}) — ${summary} Dealer ${brand}: sprzedaż i serwis.`,
    ogImage: image,
  };
}

export const SEO_MAP: Record<string, SEOData> = {
  "/": {
    title: "Stekro MiniTrak | Dealer Solis, LS Tractor, Aupax i Krone",
    description: "Stekro MiniTrak — dealer ciągników rolniczych i komunalnych oraz maszyn Krone. Własny serwis, 7 000+ części, leasing i transport. Nowy Targ i Brzezna.",
  },

  "/marka/krone": {
    title: "Krone — kosiarki, prasy, przetrząsacze i zgrabiarki | Stekro MiniTrak",
    description: "Maszyny zielonkowe Krone u dealera Stekro MiniTrak: kosiarki dyskowe, przetrząsacze, zgrabiarki, przyczepy samozbierające oraz prasy. Sprzedaż i serwis.",
  },

  "/wymiana": {
    title: "Wymień ciągnik na nowy — maszyna w rozliczeniu | Stekro Mini Trak",
    description: "Zostaw starą maszynę w rozliczeniu i odbierz nowy ciągnik kompaktowy Solis lub Aupax. Bezpłatna, niezobowiązująca wycena na podstawie zdjęć.",
  },

  "/kariera": {
    title: "Kariera — praca w Stekro MiniTrak | Handlowiec, Mechanik, Serwis",
    description: "Dołącz do zespołu Stekro MiniTrak. Oferty pracy: Handlowiec, Mechanik, Pracownik serwisu — przy maszynach rolniczych i komunalnych w Nowym Targu i Brzeznej.",
  },

  "/maszyny/kosiarki-bijakowe": {
    title: "Kosiarki bijakowe — mulczery do trawy | Stekro MiniTrak",
    description: "Kosiarki bijakowe do trawy, chwastów, sadów, nieużytków i terenów komunalnych. Zapytaj Stekro MiniTrak o dobór maszyny.",
  },

  "/maszyny/glebogryzarki": {
    title: "Glebogryzarki do ciągników — oferta | Stekro MiniTrak",
    description: "Glebogryzarki do przygotowania gleby pod siew i sadzenie. Dobierz szerokość i zapotrzebowanie mocy ze Stekro MiniTrak.",
  },

  "/modele/solis-s16": modelSEO("Solis S16", "Solis", "16 KM", "kompaktowy minitraktor sadowniczo-komunalny z silnikiem Mitsubishi i napędem 4WD."),
  "/modele/solis-s20": modelSEO("Solis S20", "Solis", "20 KM", "uniwersalny minitraktor 4WD do prac w gospodarstwie, ogrodzie i komunie."),
  "/modele/solis-s20-plus": modelSEO("Solis S20 Plus", "Solis", "20 KM", "wersja Plus z bogatszym wyposażeniem standardowym i wzmocnioną hydrauliką."),
  "/modele/solis-s22": modelSEO("Solis S22", "Solis", "22 KM", "minitraktor 22 KM 4WD z TUZ, WOM i opcją ładowacza czołowego."),
  "/modele/solis-s26": modelSEO("Solis S26 9+9", "Solis", "26 KM", "minitraktor z przekładnią mechaniczną 9+9 i mokrymi hamulcami, w wersji z kabiną lub bez."),
  "/modele/solis-s26-hst": modelSEO("Solis S26 HST", "Solis", "26 KM", "wersja z przekładnią hydrostatyczną HST i kabiną — idealna do prac komunalnych i ładowacza."),
  "/modele/solis-s40": modelSEO("Solis S40", "Solis", "38 KM", "uniwersalny kompakt Stage V z ładowaczem czołowym 3400 do gospodarstw, sadów i prac komunalnych."),
  "/modele/solis-s50": modelSEO("Solis S50", "Solis", "50 KM", "uniwersalny ciągnik 50 KM dostępny w wersji Cabrio i z pełną kabiną."),
  "/modele/solis-s60": modelSEO("Solis S60", "Solis", "60 KM", "ciągnik 60 KM z silnikiem Mitsubishi i pełnym osprzętem rolniczym."),
  "/modele/solis-s75": modelSEO("Solis S75", "Solis", "75 KM", "ciągnik 75 KM z mocną hydrauliką i pełną kabiną z klimatyzacją."),
  "/modele/solis-s90": modelSEO("Solis S90", "Solis", "90 KM", "flagowy ciągnik Solis 90 KM z silnikiem Mitsubishi S4S, kabiną premium i pełnym pakietem."),
  "/modele/solis-n75": modelSEO("Solis N75 sadowniczy", "Solis", "75 KM", "wąski ciągnik do sadów, winnic i plantacji — Stage V, udźwig 2 500 kg, szerokość od 1 400 mm."),

  "/modele/ls-mt125": modelSEO("LS MT1.25", "LS Tractor", "25 KM", "kompaktowy minitraktor LS z przekładnią HST i 7-letnią gwarancją."),
  "/modele/ls-xj25-hst": modelSEO("LS XJ25 HST", "LS Tractor", "24,4 KM", "minitraktor XJ25 z przekładnią hydrostatyczną i tempomatem, opcja ładowacza."),
  "/modele/ls-xj25-mec": modelSEO("LS XJ25 MEC", "LS Tractor", "24,4 KM", "minitraktor XJ25 z klasyczną skrzynią mechaniczną 6+2, opcja ładowacza."),
  "/modele/ls-mt335": modelSEO("LS MT3.35", "LS Tractor", "34,9 KM", "ciągnik 35 KM z osią Iseki, HST i przyjazną kabiną panoramiczną."),
  "/modele/ls-mt340": modelSEO("LS MT3.40 HC", "LS Tractor", "40 KM", "wersja High Clearance — zwiększony prześwit do prac w uprawach wysokich."),
  "/modele/ls-mt350": modelSEO("LS MT3.50", "LS Tractor", "47 KM", "ciągnik LS 47 KM z TUZ 1 200 kg i wydajną hydrauliką."),
  "/modele/ls-mt360": modelSEO("LS MT3.60", "LS Tractor", "57 KM", "ciągnik LS 57 KM z pełną kabiną i opcjonalnym ładowaczem LL3104."),
  "/modele/ls-xu6168": modelSEO("LS XU6168", "LS Tractor", "61 KM", "uniwersalny ciągnik 61 KM z pakietem premium i 7-letnią gwarancją."),
  "/modele/ls-mt573": modelSEO("LS MT5.73", "LS Tractor", "73 KM", "ciągnik z silnikiem 4-cylindrowym i synchronizowaną przekładnią 32F+32R."),
  "/modele/ls-mt7101": modelSEO("LS MT7.101", "LS Tractor", "101 KM", "flagowiec serii MT7 z PowerShift, kabiną premium i hydrauliką 80 l/min."),

  "/modele/aupax-2025": modelSEO("Aupax 2025", "Aupax", "25 KM", "ciągnik z mechanicznym wtryskiem paliwa, 8F+8R Synchro Shuttle i 7 lat gwarancji."),
  "/modele/aupax-2040": modelSEO("Aupax 2040", "Aupax", "40 KM", "uniwersalna 40 KM maszyna o szerokości 1 650 mm do sadów, prac komunalnych i odśnieżania."),
  "/modele/aupax-3055": modelSEO("Aupax 3055", "Aupax", "55 KM", "ciągnik 55 KM z silnikiem Doosan DM02 Stage V i mokrymi hamulcami tarczowymi."),
  "/modele/aupax-3075": modelSEO("Aupax 3075", "Aupax", "75 KM", "najmocniejszy w serii 3000 — 75 KM bez DEF, 10\" sprzęgło dwuczynnościowe."),
  "/modele/aupax-m404": modelSEO("Aupax M404", "Aupax", "40 KM", "fabrycznie nowy rocznik 2025 z kabiną 4-słupkową i klimatyzacją."),

  "/maszyny/kosiarki-bijakowe/lisicki-kb": {
    title: "Kosiarka bijakowa LISICKI KB | Stekro MiniTrak",
    description: "Kosiarka bijakowa LISICKI KB to solidny mulczer do koszenia i rozdrabniania trawy, chwastów i gałęzi. Szerokości 1,0-2,4 m.",
    ogImage: "/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-1-1200.webp",
  },
  "/maszyny/kosiarki-bijakowe/stark-kdl-profi": {
    title: "Kosiarka bijakowa STARK KDL Profi | Stekro MiniTrak",
    description: "STARK KDL Profi to profesjonalny mulczer boczny z wysięgnikiem do skarp i poboczy drogowych. Szerokość 1,6-2,2 m.",
    ogImage: "/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-1-900.webp",
  },
  "/maszyny/glebogryzarki/stark-rs-profi": {
    title: "Glebogryzarka STARK RS Profi | Stekro MiniTrak",
    description: "STARK RS Profi to seria profesjonalnych glebogryzarek o szerokości 0,95-1,35 m, z mechanicznym przesuwem bocznym i napędem łańcuchowym.",
    ogImage: "/products/stark-rs-profi/glebogryzarka-stark-rs-profi-3-1200.webp",
  },
  "/zamowienie/lisicki-kb": {
    title: "Zamówienie — Kosiarka bijakowa LISICKI KB | Stekro MiniTrak",
    description: "Złóż zamówienie lub zapytanie o kosiarkę bijakową LISICKI KB.",
  },
  "/zamowienie/stark-kdl-profi": {
    title: "Zamówienie — Kosiarka bijakowa STARK KDL Profi | Stekro MiniTrak",
    description: "Złóż zamówienie lub zapytanie o kosiarkę bijakową STARK KDL Profi.",
  },
  "/zamowienie/stark-rs-profi": {
    title: "Zamówienie — Glebogryzarka STARK RS Profi | Stekro MiniTrak",
    description: "Złóż zamówienie lub zapytanie o glebogryzarkę STARK RS Profi.",
  },

};

const ALIAS_GROUPS: [string, string[]][] = [
  ["/modele/solis-s26", ["/modele/solis-s26-cab"]],
  ["/modele/ls-mt125", ["/modele/ls-mt1"]],
  ["/modele/ls-xj25-hst", ["/modele/ls-xj25"]],
  ["/modele/ls-xj25-mec", []],
  ["/modele/ls-mt335", ["/modele/ls-mt3-35"]],
  ["/modele/ls-mt340", ["/modele/ls-mt340hc", "/modele/ls-mt3-40"]],
  ["/modele/ls-mt350", ["/modele/ls-mt3-50"]],
  ["/modele/ls-mt360", ["/modele/ls-mt3-60"]],
  ["/marka/krone", ["/krone"]],
];

/** Zestaw ścieżek-aliasów (nie-kanonicznych) — wykluczane z sitemap.xml. */
export const ALIAS_PATHS: Set<string> = new Set(
  ALIAS_GROUPS.flatMap(([, aliases]) => aliases),
);

for (const [canonical, aliases] of ALIAS_GROUPS) {
  const base = SEO_MAP[canonical];
  if (!base) continue;
  for (const alias of aliases) {
    SEO_MAP[alias] = { ...base, canonical };
  }
}

export function getSEO(pathname: string): SEOData {
  return SEO_MAP[pathname] ?? SEO_MAP["/"];
}

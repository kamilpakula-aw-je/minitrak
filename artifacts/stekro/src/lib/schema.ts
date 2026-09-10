import { SEO_MAP } from "./seo-map";

const SITE_URL = "https://minitrak.pl";

/**
 * Etykiety okruszków (breadcrumbs) dla podstron.
 * Struktura płaska: Strona główna > Bieżąca podstrona
 * (nie ma pośrednich stron /modele ani /marka — zgodnie z zasadą,
 * by nie generować sztucznych poziomów).
 */
export function getBreadcrumbLabel(pathname: string): string | null {
  if (pathname === "/" || !SEO_MAP[pathname]) return null;
  const title = SEO_MAP[pathname].title;
  // Tytuły mają format "Nazwa — reszta | Marka" — bierzemy pierwszą część.
  return title.split(/\s*[—|]\s*/)[0].trim();
}

interface JsonLdBlock {
  [key: string]: unknown;
}

/**
 * Treść FAQ ze strony głównej (sekcja 08 w src/pages/home-sections.tsx),
 * skopiowana 1:1. Używana wyłącznie do wygenerowania FAQPage JSON-LD —
 * widoczny UI FAQ pozostaje źródłem prawdy w home-sections.tsx.
 */
const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: "Czy Stekro Mini Trak to nowa firma?",
    a: "Nie. Stekro Mini Trak to nowa marka rozwijana przez firmę STEKRO. Powstała po to, aby jeszcze lepiej odpowiadać na potrzeby klientów poszukujących kompaktowych traktorów i maszyn niskiej mocy.",
  },
  {
    q: "Dlaczego powstała marka Mini Trak?",
    a: "Zauważyliśmy rosnące zainteresowanie małymi i zwrotnymi ciągnikami, szczególnie wśród gospodarstw z Małopolski, sadowników oraz firm komunalnych. Marka Mini Trak została stworzona specjalnie dla tego segmentu klientów.",
  },
  {
    q: "Czy wcześniejsze gwarancje STEKRO nadal obowiązują?",
    a: "Tak. Wszystkie gwarancje, serwis oraz wcześniejsze ustalenia realizowane przez Stekro pozostają ważne i są nadal obsługiwane bez zmian.",
  },
  {
    q: "Czy oferujecie leasing na traktory?",
    a: "Tak. Oferujemy leasing dla firm, gospodarstw rolnych oraz klientów indywidualnych prowadzących działalność gospodarczą. Pomagamy przejść przez cały proces finansowania.",
  },
  {
    q: "Jak wygląda procedura leasingowa?",
    a: "Proces jest prosty: 1) wybór modelu traktora i wyposażenia, 2) przygotowanie najkorzystniejszej oferty finansowania, 3) złożenie podstawowych dokumentów, 4) decyzja leasingowa, 5) odbiór maszyny. Nasi doradcy pomagają na każdym etapie formalności.",
  },
  {
    q: "Czy można kupić ciągnik na raty?",
    a: "Tak, oferujemy również finansowanie ratalne oraz indywidualne rozwiązania dopasowane do możliwości klienta.",
  },
  {
    q: "Czy pomagacie dobrać odpowiedni model traktora?",
    a: "Oczywiście. Doradzamy w wyborze ciągnika na podstawie rodzaju prac, wielkości gospodarstwa oraz planowanego budżetu.",
  },
  {
    q: "Czy traktory Mini Trak nadają się do pracy komunalnej?",
    a: "Tak. W naszej ofercie znajdują się modele idealne do odśnieżania, koszenia terenów zielonych, utrzymania dróg lokalnych i innych prac komunalnych.",
  },
  {
    q: "Gdzie można obejrzeć maszyny?",
    a: "Zapraszamy do kontaktu i odwiedzenia naszej siedziby w Nowym Targu (otwarcie wkrótce) lub punktu sprzedaży w Brzeznej. Chętnie prezentujemy maszyny oraz organizujemy pokazy wybranych modeli.",
  },
];

function faqPage(): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

function breadcrumbList(pathname: string, label: string): JsonLdBlock {
  const canonical = SEO_MAP[pathname]?.canonical ?? pathname;
  const elements = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Strona główna",
      item: `${SITE_URL}/`,
    },
  ];

  let position = 2;

  if (pathname.startsWith("/maszyny/kosiarki-bijakowe/")) {
    elements.push({
      "@type": "ListItem",
      position,
      name: "Kosiarki bijakowe",
      item: `${SITE_URL}/maszyny/kosiarki-bijakowe`,
    });
    position++;
  } else if (pathname.startsWith("/maszyny/glebogryzarki/")) {
    elements.push({
      "@type": "ListItem",
      position,
      name: "Glebogryzarki",
      item: `${SITE_URL}/maszyny/glebogryzarki`,
    });
    position++;
  } else if (pathname.startsWith("/zamowienie/lisicki-kb")) {
    elements.push({
      "@type": "ListItem",
      position,
      name: "Kosiarki bijakowe",
      item: `${SITE_URL}/maszyny/kosiarki-bijakowe`,
    });
    position++;
    elements.push({
      "@type": "ListItem",
      position,
      name: "Kosiarka bijakowa LISICKI KB",
      item: `${SITE_URL}/maszyny/kosiarki-bijakowe/lisicki-kb`,
    });
    position++;
  } else if (pathname.startsWith("/zamowienie/stark-kdl-profi")) {
    elements.push({
      "@type": "ListItem",
      position,
      name: "Kosiarki bijakowe",
      item: `${SITE_URL}/maszyny/kosiarki-bijakowe`,
    });
    position++;
    elements.push({
      "@type": "ListItem",
      position,
      name: "Kosiarka bijakowa STARK KDL Profi",
      item: `${SITE_URL}/maszyny/kosiarki-bijakowe/stark-kdl-profi`,
    });
    position++;
  } else if (pathname.startsWith("/zamowienie/stark-rs-profi")) {
    elements.push({
      "@type": "ListItem",
      position,
      name: "Glebogryzarki",
      item: `${SITE_URL}/maszyny/glebogryzarki`,
    });
    position++;
    elements.push({
      "@type": "ListItem",
      position,
      name: "Glebogryzarka STARK RS Profi",
      item: `${SITE_URL}/maszyny/glebogryzarki/stark-rs-profi`,
    });
    position++;
  }

  elements.push({
    "@type": "ListItem",
    position,
    name: label,
    item: `${SITE_URL}${canonical}`,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements,
  };
}

/**
 * Strony maszyn nie podają cen ani ocen, więc zgodnie z wytycznymi
 * Google używamy ItemPage (nie Product — brak offers/aggregateRating
 * skutkowałby błędem w Search Console).
 */
function itemPage(pathname: string): JsonLdBlock | null {
  const seo = SEO_MAP[pathname];
  if (!seo) return null;
  const canonical = seo.canonical ?? pathname;
  const name = getBreadcrumbLabel(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name,
    description: seo.description,
    url: `${SITE_URL}${canonical}`,
    ...(seo.ogImage
      ? { image: seo.ogImage.startsWith("http") ? seo.ogImage : `${SITE_URL}${seo.ogImage}` }
      : {}),
    mainEntity: {
      "@type": "Thing",
      name,
      description: seo.description,
      url: `${SITE_URL}${canonical}`,
      ...(seo.ogImage ? { image: seo.ogImage.startsWith("http") ? seo.ogImage : `${SITE_URL}${seo.ogImage}` } : {}),
      ...(pathname.includes("lisicki") ? { brand: { "@type": "Brand", name: "LISICKI" } } : {}),
      ...(pathname.includes("stark") ? { brand: { "@type": "Brand", name: "STARK" } } : {})
    }
  };
}

function machineCollectionPage(pathname: string): JsonLdBlock | null {
  const seo = SEO_MAP[pathname];
  const name = getBreadcrumbLabel(pathname);
  if (!seo || !name) return null;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${pathname}/#webpage`,
    name,
    description: seo.description,
    url: `${SITE_URL}${pathname}`,
    inLanguage: "pl-PL",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: pathname === "/maszyny/kosiarki-bijakowe" ? {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Kosiarka bijakowa LISICKI KB",
          item: `${SITE_URL}/maszyny/kosiarki-bijakowe/lisicki-kb`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Kosiarka bijakowa STARK KDL Profi",
          item: `${SITE_URL}/maszyny/kosiarki-bijakowe/stark-kdl-profi`,
        }
      ]
    } : pathname === "/maszyny/glebogryzarki" ? {
      "@type": "ItemList",
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: "Glebogryzarka STARK RS Profi",
        item: `${SITE_URL}/maszyny/glebogryzarki/stark-rs-profi`,
      }],
    } : {
      "@type": "Thing",
      "@id": `${SITE_URL}${pathname}/#main-entity`,
      name,
      description: seo.description,
    },
  };
}

/**
 * Buduje listę bloków JSON-LD dla danej ścieżki.
 * Strona główna: Organization/LocalBusiness jest już statycznie w index.html —
 * tu nie duplikujemy.
 */
export function buildJsonLd(pathname: string): JsonLdBlock[] {
  const blocks: JsonLdBlock[] = [];
  if (pathname === "/") {
    // WebSite/Organization/LocalBusiness są statycznie w index.html —
    // tu dokładamy tylko FAQPage odpowiadający sekcji FAQ na stronie głównej.
    blocks.push(faqPage());
    return blocks;
  }
  const label = getBreadcrumbLabel(pathname);
  if (!label) return blocks;
  blocks.push(breadcrumbList(pathname, label));
  if (pathname === "/wymiana") {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        ["Czy wycena jest płatna?", "Nie. Wycena jest bezpłatna i niezobowiązująca. Wystarczy wysłać formularz z kilkoma zdjęciami maszyny."],
        ["Jakie maszyny przyjmujecie w rozliczeniu?", "Przyjmujemy używane ciągniki i maszyny różnych marek. Stan i wartość ustalamy indywidualnie przy wycenie."],
        ["Czy muszę sam sprzedawać starą maszynę?", "Nie. Rozliczamy ją przy zakupie nowego ciągnika — jej wartość zaliczamy jako wkład własny, więc oszczędzasz czas i formalności."],
        ["Co się dzieje po wysłaniu zgłoszenia?", "Skontaktujemy się telefonicznie lub mailowo, przedstawimy wycenę i umówimy oględziny maszyny na miejscu."],
        ["Czy muszę dopłacać całość od razu?", "Wartość starej maszyny obniża kwotę zakupu nowego ciągnika. Możliwe jest również finansowanie — szczegóły ustalamy indywidualnie."],
      ].map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    });
    blocks.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Stekro Mini Trak",
      url: `${SITE_URL}/wymiana`,
      email: "minitrak@stekro.pl",
      telephone: "+48786656715",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ul. Królowej Jadwigi 80A",
        addressLocality: "Nowy Targ",
        postalCode: "34-400",
        addressCountry: "PL",
      },
      openingHours: ["Mo-Fr 08:00-16:00", "Sa 08:00-13:00"],
    });
  }
  if (pathname.startsWith("/modele/") || (pathname.startsWith("/maszyny/") && pathname.split("/").length === 4)) {
    const item = itemPage(pathname);
    if (item) blocks.push(item);
  }
  if (pathname.startsWith("/maszyny/") && pathname.split("/").length === 3) {
    const collection = machineCollectionPage(pathname);
    if (collection) blocks.push(collection);
  }
  if (pathname.startsWith("/zamowienie/")) {
    const canonical = SEO_MAP[pathname]?.canonical ?? pathname;
    blocks.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}${canonical}/#webpage`,
      name: SEO_MAP[pathname]?.title || label,
      description: SEO_MAP[pathname]?.description,
      url: `${SITE_URL}${canonical}`,
      inLanguage: "pl-PL",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    });
  }
  return blocks;
}

export function renderJsonLdScripts(pathname: string): string {
  return buildJsonLd(pathname)
    .map(
      (block) =>
        `<script type="application/ld+json" data-route-jsonld>${JSON.stringify(block).replace(/</g, "\\u003c")}</script>`,
    )
    .join("\n    ");
}

import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-aupax-3055-1.webp";
const img2 = "/model-aupax-3055-2.webp";
const img3 = "/model-aupax-3055-3.webp";
const img4 = "/model-aupax-3055-4.webp";
const img5 = "/model-aupax-3055-5.webp";

const data: ModelPageData = {
  brand: { name: "Aupax", catalogHref: "/#katalog-aupax" },
  model: {
    short: "3055",
    full: "Aupax 3055",
    headline: "Aupax 3055",
    accent: "Duża pojemność, ogromna rezerwa momentu i 12+12 Synchro Shuttle.",
  },
  hero: {
    image: heroImg,
    alt: "Aupax 3055 — kompaktowy ciągnik 55 KM z pełną kabiną",
    eyebrow: "Aupax / seria 3000 — 55 KM Doosan Stage V",
    description: (
      <>
        Aupax 3055 to <strong>uniwersalny kompakt 55 KM</strong> z&nbsp;koreańskim silnikiem Doosan DM02 o&nbsp;pojemności 2 393 cm³ — duża pojemność oznacza <strong>spokojny, niski obrót przy dużym momencie</strong>, co przekłada się na&nbsp;trwałość i&nbsp;oszczędność paliwa. Skrzynia <strong>Synchro Shuttle 12 + 12</strong>, 10-calowe sprzęgło dwuczynnościowe i&nbsp;mokre hamulce tarczowe to konstrukcja przygotowana do&nbsp;<strong>orki, transportu, prac w&nbsp;sadach i&nbsp;na ryżowiskach</strong>. <strong>7 lat gwarancji bez limitu motogodzin.</strong>
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc maksymalna", value: "55 KM (36,9 kW)" },
    { icon: Fuel, label: "Silnik", value: "Doosan DM02, 2 393 cm³, 4-cyl Stage V" },
    { icon: Wrench, label: "Skrzynia", value: "Synchro Shuttle 12F + 12R" },
    { icon: Tractor, label: "WOM", value: "540 / 1000 obr/min" },
    { icon: ShieldCheck, label: `Sprzęgło`, value: `10" dwuczynnościowe` },
    { icon: ArrowRight, label: "Rozstaw osi", value: "1 990 mm" },
  ],
  why: {
    eyebrow: "Dlaczego Aupax 3055",
    title: "Mocny silnik, mocne sprzęgło, mocne hamulce.",
    paragraphs: [
      <>Aupax 3055 to <strong>uniwersalny ciągnik klasy średniej</strong>, który łączy moc 55 KM z&nbsp;bardzo dużą pojemnością skokową silnika. <strong>Koreański Doosan DM02 o&nbsp;pojemności 2,4 L</strong> generuje swój moment przy niskich obrotach — to kluczowa cecha do&nbsp;orki, kultywatorowania i&nbsp;ciężkiego transportu, gdzie potrzebna jest siła, a&nbsp;nie szybkie kręcenie silnikiem.</>,
      <>Skrzynia <strong>Synchro Shuttle 12 + 12 (4 × 3 zakresy)</strong> daje wystarczająco gęstą siatkę przełożeń, żeby precyzyjnie dobrać prędkość pod każdy osprzęt — od&nbsp;wolnych prac glebogryzarki, przez średnie prędkości polowe, po&nbsp;szybki transport po&nbsp;drogach. Rewers zsynchronizowany pozwala płynnie zmieniać kierunek jazdy bez zatrzymywania ciągnika.</>,
      <>Aupax 3055 wyposażono w&nbsp;<strong>10-calowe (250 mm) sprzęgło dwuczynnościowe</strong> — to bardzo solidna konstrukcja, która bez problemu przenosi moment 55 KM nawet w&nbsp;warunkach intensywnej pracy z&nbsp;ciężkim osprzętem. Mokre hamulce tarczowe pracują w&nbsp;kąpieli olejowej — większa trwałość, brak konieczności regulacji i&nbsp;odporność na&nbsp;pył oraz&nbsp;wilgoć.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Doosan DM02",
      items: [
        "Koreański Doosan DM02 — 4-cylindrowy Stage V",
        "Pojemność 2 393 cm³ (2,4 L) — ogromna rezerwa momentu",
        "Mocne 36,9 kW (55 KM) przy 2 400 obr/min",
        "Norma emisji Stage V (Euro V) bez DEF/AdBlue",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia i sprzęgło",
      items: [
        "Synchro Shuttle 12 + 12 z rewersem zsynchronizowanym",
        "Konfiguracja 4 biegi główne × 3 zakresy",
        `10" sprzęgło dwuczynnościowe — wysoka wytrzymałość momentu`,
        "Mokre, tarczowe hamulce w kąpieli olejowej",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, hydraulika i TUZ",
      items: [
        "WOM dwustopniowy 540 / 1 000 obr/min",
        "TUZ tylny kategorii II",
        "Współpraca z pługami, prasami, opryskiwaczami i kosiarkami",
        "Współpraca z ładowaczem przy balaście tylnym do 516 kg",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Konstrukcja",
      items: [
        "Rozstaw osi 1 990 mm — stabilność z ciężkim osprzętem",
        "Maks. balast przedni 150 kg, tylny 516 kg",
        "Opony 280/70 R20 (przód) i 380/70 R28 (tył)",
        "Płaska podłoga w kabinie — komfort długiej pracy",
      ],
    },
    {
      icon: Lightbulb,
      title: "Stanowisko operatora",
      items: [
        "Pełna kabina z klimatyzacją (zależnie od konfiguracji)",
        "Płaska podłoga — łatwe wsiadanie i czystość",
        "Komfortowe siedzisko z amortyzacją",
        "Regulowana kolumna kierownicy, czytelne wskaźniki",
        "Niski poziom hałasu i wibracji",
        "7 lat gwarancji bez limitu motogodzin",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie Aupax 3055 daje radę.",
    items: [
      { title: "Pole orne i suche grunty", description: "Duża rezerwa momentu Doosana radzi sobie z orką lekkich gleb, kultywatorowaniem, broną talerzową i siewem zbóż. 12 + 12 biegów daje precyzję dobrania prędkości pod każdą operację." },
      { title: "Sady i większe winnice", description: "55 KM to wystarczająca moc do pracy z opryskiwaczem sadowniczym, kosiarką międzyrzędową, glebogryzarką i transportem skrzynek. Płaska podłoga = komfort przy długich dniach zbiorów." },
      { title: "Ryżowiska i pola podmokłe", description: "Producent jednoznacznie pozycjonuje 3055 do pracy w trudnych warunkach gleb mokrych i podmokłych. Mokre hamulce tarczowe i napęd 4WD = pewność trakcji." },
      { title: "Transport i prace komunalne", description: "Przyczepy rolnicze, beczki asenizacyjne, posypywarki zimowe, roztrząsacze obornika — 10-calowe sprzęgło i 12 biegów do transportu z dużymi ładunkami na dystansach." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Zobacz Aupax 3055 z każdej strony.",
    images: [
      { src: heroImg, alt: "Aupax 3055 — ujęcie 3/4 z przodu z kabiną", emphasis: true },
      { src: img2, alt: "Aupax 3055 — front: maska, reflektory LED i logo" },
      { src: img3, alt: "Aupax 3055 — widok boczny lewej strony" },
      { src: img4, alt: "Aupax 3055 — zbliżenie na maskę z oznakowaniem 3055" },
      { src: img5, alt: "Aupax 3055 — tył: TUZ, hydraulika, kabina Stage V" },
      { src: "/aupax_3055/aupax_3055_1.webp", alt: "Aupax 3055 — zdjęcie 1" },
      { src: "/aupax_3055/aupax_3055_2.webp", alt: "Aupax 3055 — zdjęcie 2" },
      { src: "/aupax_3055/aupax_3055_3.webp", alt: "Aupax 3055 — zdjęcie 3" },
      { src: "/aupax_3055/aupax_3055_4.webp", alt: "Aupax 3055 — zdjęcie 4" },
      { src: "/aupax_3055/aupax_3055_5.webp", alt: "Aupax 3055 — zdjęcie 5" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Marka silnika", "Doosan (Korea Płd.)"],
        ["Model silnika", "DM02"],
        ["Pojemność", "2 393 cm³ (2,4 L)"],
        ["Liczba cylindrów", "4"],
        ["Norma emisji", "Stage V (Euro V) — bez DEF"],
        ["Moc maksymalna", "36,9 kW (55 KM)"],
        ["Prędkość znamionowa", "2 400 obr/min"],
        ["Charakterystyka", "Duża pojemność = ogromna rezerwa momentu"],
      ],
    },
    {
      title: "Przekładnia i sprzęgło",
      rows: [
        ["Typ skrzyni", "Synchronizowana z rewersem (Synchro Shuttle)"],
        ["Liczba biegów", "12 do przodu / 12 do tyłu"],
        ["Konfiguracja", "4 biegi główne × 3 zakresy"],
        ["Rewers", "Zsynchronizowany — płynna zmiana kierunku"],
        ["Sprzęgło", `10" (250 mm) dwuczynnościowe (double-acting)`],
        ["Wytrzymałość sprzęgła", "Duża zdolność przeniesienia momentu"],
        ["Hamulce", "Mokre, tarczowe w kąpieli olejowej"],
      ],
    },
    {
      title: "WOM, hydraulika i TUZ",
      rows: [
        ["Wałek odbioru mocy (WOM)", "540 / 1 000 obr/min"],
        ["TUZ tylny", "Kategoria II"],
        ["Możliwości", "Pługi, opryskiwacze, prasy, kosiarki, glebogryzarki, rozsiewacze"],
        ["Współpraca z ładowaczem", "Tak — z balastami tylnymi do 516 kg"],
      ],
    },
    {
      title: "Wymiary, ogumienie i obciążenia",
      rows: [
        ["Rozstaw osi", "1 990 mm"],
        ["Maks. obciążniki przednie", "150 kg"],
        ["Maks. obciążniki tylne", "516 kg"],
        ["Opony przednie (standard)", "280/70 R20"],
        ["Opony tylne (standard)", "380/70 R28"],
        ["Stanowisko", "Kabina z płaską podłogą"],
        ["Gwarancja", "7 lat bez limitu motogodzin"],
      ],
    },
  ],
  salesArguments: [
    "Doosan DM02 2,4 L — duża pojemność = ogromna rezerwa momentu",
    "Stage V bez DEF/AdBlue — mniej formalności, niższe koszty",
    "Synchro Shuttle 12+12 — pełna gama prędkości i płynny rewers",
    `10" sprzęgło dwuczynnościowe — bezawaryjność pod obciążeniem`,
    "Mokre hamulce tarczowe — trwałość i odporność na pył oraz wilgoć",
    "7 lat gwarancji bez limitu motogodzin",
  ],
};

export default function ModelAupax3055() {
  return <ModelPageLayout data={data} />;
}

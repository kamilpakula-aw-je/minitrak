import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-aupax-2040-1.webp";
const img2 = "/model-aupax-2040-2.webp";
const img3 = "/model-aupax-2040-3.webp";
const img4 = "/model-aupax-2040-4.webp";
const img5 = "/model-aupax-2040-5.webp";

const data: ModelPageData = {
  brand: { name: "Aupax", catalogHref: "/#katalog-aupax" },
  model: {
    short: "2040",
    full: "Aupax 2040",
    headline: "Aupax 2040",
    accent: "Uniwersalny ciągnik dla rolnictwa i prac komunalnych — szerokość zaledwie 1 650 mm.",
  },
  hero: {
    image: heroImg,
    alt: "Aupax 2040 — kompaktowy ciągnik 40 KM z pełną kabiną",
    eyebrow: "Aupax / seria 2000 — 40 KM Doosan Stage V z kabiną",
    description: (
      <>
        Aupax 2040 to <strong>kompakt 40 KM z&nbsp;pełną kabiną</strong>, zaprojektowany do&nbsp;równoczesnej pracy w&nbsp;gospodarstwie i&nbsp;sektorze komunalnym. Pod maską <strong>koreański Doosan D18 Stage V</strong> bez DEF, dający <strong>155 Nm momentu już przy 1 680 obr/min</strong>. Synchro Shuttle 8 + 8, napęd 4WD, TUZ <strong>810 kg z&nbsp;kategorii I lub&nbsp;II</strong> i&nbsp;klimatyzacja w&nbsp;standardzie. Szerokość 1 650 mm pozwala wjechać do&nbsp;każdego sadu, winnicy lub&nbsp;na osiedle. <strong>7 lat gwarancji bez limitu motogodzin.</strong>
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "40 KM" },
    { icon: Fuel, label: "Silnik", value: "Doosan D18, 1 800 cm³ Stage V, 155 Nm" },
    { icon: Wrench, label: "Skrzynia", value: "Synchro Shuttle 8F + 8R, napęd 4WD" },
    { icon: Tractor, label: "TUZ tylny", value: "810 kg, kat. I lub II" },
    { icon: Settings, label: "Hydraulika", value: "15 + 32 l/min, sterowanie elektrohydrauliczne" },
    { icon: ArrowRight, label: "Wymiary", value: "3 550 × 1 650 mm, prześwit 380 mm" },
  ],
  why: {
    eyebrow: "Dlaczego Aupax 2040",
    title: "Jeden ciągnik — dwa światy: rolnictwo i miasto.",
    paragraphs: [
      <>Aupax 2040 to <strong>najbardziej uniwersalna maszyna serii 2000</strong>. Z szerokością zaledwie <strong>1 650 mm</strong> wjedzie tam, gdzie pełnowymiarowy traktor po&nbsp;prostu się nie zmieści — między rzędy w&nbsp;sadach, w&nbsp;wąskie alejki winnic, między ławki w&nbsp;parkach miejskich i&nbsp;na chodniki. Jednocześnie ma <strong>40 KM mocy</strong> i&nbsp;pełną hydraulikę elektrohydrauliczną.</>,
      <>Sercem 2040 jest <strong>koreański Doosan D18 Stage V</strong> — czterocylindrowy Diesel o&nbsp;pojemności 1,8 L. <strong>Maksymalny moment 155 Nm dostępny już przy 1 680 obr/min</strong> oznacza, że&nbsp;ciągnik nie traci mocy przy obciążeniu i&nbsp;pracuje cicho. Stage V <strong>bez wtrysku AdBlue</strong> upraszcza eksploatację: jedno paliwo, mniej formalności, niższe koszty.</>,
      <>Dla prac komunalnych kluczowe jest <strong>sterowanie TUZ-em elektrohydraulicznie z&nbsp;kabiny</strong> — operator nie musi wstawać, żeby precyzyjnie ustawić wysokość kosiarki, pługa śnieżnego czy przedniego ładowacza. Klimatyzacja w&nbsp;standardzie i&nbsp;prędkość maksymalna 29,4 km/h dopełniają obrazu maszyny do&nbsp;całorocznej pracy w&nbsp;mieście i&nbsp;na wsi.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Doosan D18",
      items: [
        "Koreański Doosan D18, 1,8 L, Stage V — bez DEF/AdBlue",
        "Moc 40 KM, moment 155 Nm przy 1 680 obr/min",
        "Pojemność zbiornika paliwa 42 L",
        "Niski poziom hałasu i wibracji",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia i napęd 4WD",
      items: [
        "Synchro Shuttle 8 + 8 ze zsynchronizowanym rewersem",
        "Napęd na 4 koła (4WD) sterowany mechanicznie",
        "Suche sprzęgło — proste i niezawodne",
        "Prędkość maksymalna 29,4 km/h",
      ],
    },
    {
      icon: Wrench,
      title: "TUZ, hydraulika i WOM",
      items: [
        "TUZ kategoria I lub II z udźwigiem 810 kg",
        "Sterowanie podnośnikiem elektrohydrauliczne z kabiny",
        "Hydraulika tylna 15 + 32 l/min — wystarczająca dla ładowacza",
        "WOM niezależny 540 / 1 000 obr/min, 6-wypustowy",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Wymiary i mobilność",
      items: [
        "Długość 3 550 mm, szerokość tylko 1 650 mm",
        "Prześwit 380 mm",
        "Masa bez obciążników 1 835 kg",
        "Maks. balast przedni 80 kg, tylny 124 kg",
        "Opony 260/70 R16 (przód) i 320/85 R24 (tył)",
      ],
    },
    {
      icon: Lightbulb,
      title: "Kabina z klimatyzacją",
      items: [
        "Pełna kabina z klimatyzacją w standardzie",
        "Mechaniczny fotel z amortyzacją",
        "Dobra widoczność panoramiczna",
        "Sterowanie elektrohydrauliczne TUZ z kabiny",
        "Drzwi otwierane z obu stron",
        "Dźwignia rewersu pod kierownicą",
        "7 lat gwarancji bez limitu motogodzin",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Latem kosi, zimą odśnieża.",
    items: [
      { title: "Sady, winnice i szklarnie", description: "Szerokość zaledwie 1 650 mm pozwala wjechać między rzędy w sadach i winnicach. Idealny do oprysku, koszenia międzyrzędzi, transportu skrzynek i wszystkich prac pielęgnacyjnych w wąskich uprawach." },
      { title: "Małe gospodarstwa rolne", description: "Optymalny rozmiar dla gospodarstw do 30 ha — ma moc do orki na małym pługu, agregowaniu z glebogryzarką, prasowaniu i transportowi z przyczepą do ok. 4 ton." },
      { title: "Prace komunalne i miejskie", description: "Koszenie terenów zielonych, czyszczenie chodników i parkingów pługiem śnieżnym, posypywanie piaskiem lub solą, zamiatanie ulic, prace porządkowe z ładowaczem czołowym lub przyczepą." },
      { title: "Wspólnoty mieszkaniowe i deweloperzy", description: "Zarządcy nieruchomości, wspólnoty i deweloperzy doceniają uniwersalność — ten sam ciągnik latem kosi i wozi, zimą odśnieża, a przez cały rok pracuje przy ogólnym utrzymaniu terenu." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Zobacz Aupax 2040 z każdej strony.",
    images: [
      { src: heroImg, alt: "Aupax 2040 — widok 3/4 z przodu z kabiną", emphasis: true },
      { src: img2, alt: "Aupax 2040 — front z logo, panoramiczna szyba i reflektory LED" },
      { src: img3, alt: "Aupax 2040 — widok boczny lewej strony z kabiną Stage V" },
      { src: img4, alt: "Aupax 2040 — zbliżenie na maskę i oznakowanie 2040" },
      { src: img5, alt: "Aupax 2040 — tył: TUZ kat. I/II, hydraulika i światła tylne" },
      { src: "/aupax_2040/aupax_2040_1.webp", alt: "Aupax 2040 — zdjęcie 1" },
      { src: "/aupax_2040/aupax_2040_2.webp", alt: "Aupax 2040 — zdjęcie 2" },
      { src: "/aupax_2040/aupax_2040_3.webp", alt: "Aupax 2040 — zdjęcie 3" },
      { src: "/aupax_2040/aupax_2040_4.webp", alt: "Aupax 2040 — zdjęcie 4" },
      { src: "/aupax_2040/aupax_2040_5.webp", alt: "Aupax 2040 — zdjęcie 5" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Producent", "Doosan (Korea Płd.)"],
        ["Model", "D18"],
        ["Pojemność", "1 800 cm³ (1,8 L)"],
        ["Norma emisji", "Stage V — bez DEF/AdBlue"],
        ["Moc znamionowa", "40 KM"],
        ["Moment obrotowy", "155 Nm przy 1 680 obr/min"],
        ["Pojemność zbiornika paliwa", "42 L"],
      ],
    },
    {
      title: "Przekładnia i napęd",
      rows: [
        ["Typ skrzyni", "Synchro Shuttle — synchronizowana z rewersem"],
        ["Liczba biegów", "8 do przodu / 8 do tyłu"],
        ["Rewers", "Mechaniczny, zsynchronizowany"],
        ["Napęd", "4WD sterowany mechanicznie"],
        ["Sprzęgło", "Suche, sterowane mechanicznie"],
        ["Prędkość maksymalna", "29,4 km/h"],
      ],
    },
    {
      title: "TUZ, hydraulika i WOM",
      rows: [
        ["TUZ tylny", "Kategoria I lub II — do wyboru"],
        ["Udźwig TUZ", "810 kg"],
        ["Sterowanie TUZ", "Elektrohydrauliczne z kabiny"],
        ["Hydraulika zewnętrzna", "15 + 32 l/min"],
        ["WOM tylny", "Niezależny, 540 / 1 000 obr/min"],
        ["Wałek WOM", "6-wypustowy"],
      ],
    },
    {
      title: "Wymiary, masa i wyposażenie",
      rows: [
        ["Długość", "3 550 mm"],
        ["Szerokość", "1 650 mm"],
        ["Wysokość", "2 410 mm"],
        ["Prześwit", "380 mm"],
        ["Masa bez obciążników", "1 835 kg"],
        ["Maks. balast przedni", "80 kg"],
        ["Maks. balast tylny", "124 kg"],
        ["Opony przednie", "260/70 R16"],
        ["Opony tylne", "320/85 R24"],
        ["Klimatyzacja", "Tak — w standardzie"],
        ["Fotel operatora", "Mechaniczny z amortyzacją"],
        ["Gwarancja", "7 lat bez limitu motogodzin"],
      ],
    },
  ],
  salesArguments: [
    "Szerokość 1 650 mm — wjedzie do każdego sadu i alejki parkowej",
    "Doosan D18 Stage V bez DEF — proste paliwo, niższe koszty",
    "155 Nm momentu już od 1 680 obr/min — moc zawsze pod ręką",
    "TUZ 810 kg z elektrohydraulicznym sterowaniem z kabiny",
    "Pełna kabina z klimatyzacją w standardzie",
    "7 lat gwarancji bez limitu motogodzin",
  ],
};

export default function ModelAupax2040() {
  return <ModelPageLayout data={data} />;
}

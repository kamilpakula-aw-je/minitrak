import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const loaderDown = "/model-solis-s40.webp";
const loaderUp = "/model-solis-s40-loader-up.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S40",
    full: "Solis S40 4WD",
    headline: "Solis S40 4WD Mechanical XL",
    accent: "38 KM, Stage V i skrzynia 8+8 Synchromesh — uniwersalny kompakt z ładowaczem czołowym.",
  },
  hero: {
    image: loaderDown,
    alt: "Solis S40 4WD z ładowaczem czołowym",
    eyebrow: "Solis / seria S — kompakt uniwersalny",
    description: (
      <>
        Trzycylindrowy silnik <strong>wolnossący 1 642 cm³</strong> w&nbsp;normie Stage V — bez turbo i&nbsp;bez kłopotliwego DPF. Skrzynia synchromesh <strong>8F+8R</strong>, hydraulika z&nbsp;udźwigiem TUZ <strong>1 000 kg</strong> i&nbsp;opcjonalny ładowacz czołowy 3400. Lekka (1 270 kg) i&nbsp;zwrotna maszyna do&nbsp;gospodarstw rodzinnych, sadów, hodowli i&nbsp;prac komunalnych.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "38 KM" },
    { icon: Fuel, label: "Pojemność silnika", value: "1 642 cm³" },
    { icon: ArrowRight, label: "Moment maks.", value: "109,4 Nm" },
    { icon: Wrench, label: "Skrzynia", value: "8F + 8R Synchro" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "1 000 kg" },
    { icon: Tractor, label: "Norma emisji", value: "Stage V" },
  ],
  why: {
    eyebrow: "Dlaczego S40",
    title: "Wolnossący silnik Stage V — moc i prostota bez DPF.",
    paragraphs: [
      <>Solis S40 to uniwersalny kompakt na&nbsp;styku klasy ogrodniczej i&nbsp;pełnego rolnika — <strong>38 KM</strong>, trzy cylindry i&nbsp;pojemność <strong>1 642 cm³</strong> dają <strong>109,4 Nm momentu</strong> oraz&nbsp;komfortową rezerwę do&nbsp;koszenia, prac z ładowaczem, transportu i&nbsp;lekkiej uprawy.</>,
      <>W standardzie znajduje się skrzynia <strong>synchromesh 8F+8R</strong>, wspomaganie kierownicy i&nbsp;hydraulika z&nbsp;udźwigiem TUZ <strong>1 000 kg</strong>. Na zdjęciach ciągnik pokazano z&nbsp;opcjonalnym <strong>ładowaczem czołowym 3400</strong>.</>,
      <>Jednostka jest <strong>wolnossąca</strong> i&nbsp;spełnia normę emisji Stage V bez filtra cząstek stałych. To realna przewaga przy długiej pracy pod małym obciążeniem — koszeniu, odśnieżaniu czy obsłudze sadu — gdzie brak wymuszanej regeneracji DPF oznacza mniej przestojów i&nbsp;niższe koszty eksploatacji.</>,
      <>Przy masie własnej zaledwie <strong>1 270 kg</strong> ciągnik jest lekki dla podłoża, a&nbsp;jednocześnie wytrzymały dzięki konstrukcji „Made of Real Steel". Zbiornik paliwa o&nbsp;pojemności <strong>38 l</strong> zapewnia komfortowy zasięg pracy między tankowaniami.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Stage V",
      items: [
        "Trzycylindrowy wolnossący — bez turbo, bez DPF do regeneracji",
        "Pojemność 1 642 cm³, moc 38 KM, moment 109,4 Nm",
        "Obroty znamionowe 2 600 obr./min",
        "Suchy filtr powietrza",
        "Zbiornik paliwa 38 l",
      ],
    },
    {
      icon: Settings,
      title: "Przeniesienie napędu",
      items: [
        "Skrzynia synchromesh 8F + 8R",
        "Napęd 4×4 (4WD)",
        "Zakres prędkości 1,59–18,02 km/h",
        "Mechaniczna blokada mechanizmu różnicowego",
      ],
    },
    {
      icon: Wrench,
      title: "Hydraulika i WOM",
      items: [
        "Hydraulika z udźwigiem TUZ 1 000 kg",
        "TUZ kategorii I",
        "WOM tylny 540 obr./min",
        "Przygotowanie pod ładowacz czołowy 3400 (opcja)",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Ergonomia i komfort",
      items: [
        "Wspomaganie kierownicy",
        "Pałąk bezpieczeństwa ROPS (składany)",
        "Lekka konstrukcja 1 270 kg — niski nacisk na podłoże",
        "Stylizowana maska z dobrym dostępem serwisowym",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie opcjonalne",
      items: [
        "Ładowacz czołowy z joystickiem i łyżką roboczą",
        "Ogumienie przemysłowe lub trawnikowe (TURF)",
        "Obciążniki przednie i tylne",
        "Hak holowniczy i belka pociągowa",
        "Pakiet oświetlenia roboczego",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Dla kogo Solis S40 sprawdza się najlepiej.",
    items: [
      { title: "Gospodarstwa rodzinne", description: "Jedna maszyna do orki, koszenia, transportu i prac z ładowaczem — odpowiednio dobrana moc i niższe koszty eksploatacji niż w większych ciągnikach." },
      { title: "Sady i plantacje", description: "Kompaktowe wymiary, dobry prześwit i optymalne prędkości WOM ułatwiają obsługę kosiarek sadowniczych, opryskiwaczy i międzyrzędzi." },
      { title: "Hodowla i ferma", description: "Udźwig 1 000 kg i ładowacz czołowy 3400 radzą sobie z paszą, ściółką i pracami porządkowymi w obejściu." },
      { title: "Sektor komunalny", description: "Zestawy do odśnieżania, szczotki drogowe i kosiarki bijakowe — lekki i zwrotny ciągnik do utrzymania terenów i dróg przez cały rok." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Solis S40 4WD z ładowaczem czołowym 3400.",
    images: [
      { src: loaderDown, alt: "Solis S40 4WD — ładowacz czołowy opuszczony", emphasis: true },
      { src: loaderUp, alt: "Solis S40 4WD — ładowacz czołowy podniesiony" },
      { src: "/solis_s40/s40.webp", alt: "Solis S40 4WD — widok ogólny" },
      { src: "/solis_s40/s-40-2.webp", alt: "Solis S40 4WD — ujęcie z boku" },
      { src: "/solis_s40/DSC07511.webp", alt: "Solis S40 4WD — zdjęcie 1" },
      { src: "/solis_s40/DSC07518.webp", alt: "Solis S40 4WD — zdjęcie 2" },
      { src: "/solis_s40/DSC07529.webp", alt: "Solis S40 4WD — zdjęcie 3" },
      { src: "/solis_s40/DSC07531.webp", alt: "Solis S40 4WD — zdjęcie 4" },
      { src: "/solis_s40/DSC07549.webp", alt: "Solis S40 4WD — zdjęcie 5" },
      { src: "/solis_s40/DSC07593.webp", alt: "Solis S40 4WD — zdjęcie 6" },
      { src: "/solis_s40/DSC07600.webp", alt: "Solis S40 4WD — zdjęcie 7" },
      { src: "/solis_s40/DSC07601.webp", alt: "Solis S40 4WD — zdjęcie 8" },
      { src: "/solis_s40/DSC07602.webp", alt: "Solis S40 4WD — zdjęcie 9" },
      { src: "/solis_s40/DSC07608.webp", alt: "Solis S40 4WD — zdjęcie 10" },
      { src: "/solis_s40/DSC07610.webp", alt: "Solis S40 4WD — zdjęcie 11" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Typ silnika", "3-cylindrowy, wolnossący"],
        ["Norma emisji", "Stage V"],
        ["Moc znamionowa", "38 KM (28,3 kW)"],
        ["Pojemność skokowa", "1 642 cm³"],
        ["Liczba cylindrów", "3"],
        ["Obroty znamionowe", "2 600 obr./min"],
        ["Maksymalny moment", "109,4 Nm @ 1 690 obr./min"],
        ["Filtr powietrza", "Suchy"],
        ["Zbiornik paliwa", "38 l"],
      ],
    },
    {
      title: "Przeniesienie napędu",
      rows: [
        ["Skrzynia biegów", "Synchromesh 8F + 8R"],
        ["Napęd", "4×4 (4WD)"],
        ["Prędkość min. / maks.", "1,59 / 18,02 km/h"],
      ],
    },
    {
      title: "Hydraulika i WOM",
      rows: [
        ["Udźwig TUZ", "1 000 kg"],
        ["Kategoria TUZ", "I"],
        ["WOM tylny", "540 obr./min"],
        ["Ładowacz czołowy", "3400 (opcja)"],
      ],
    },
    {
      title: "Masa i wymiary",
      rows: [
        ["Masa", "1 270 kg"],
        ["Rozstaw osi", "1 650 mm"],
        ["Długość całkowita", "3 100 mm"],
        ["Szerokość całkowita", "1 360 mm"],
        ["Wysokość do ROPS", "2 020 mm"],
        ["Opony przód", "7.00-16"],
        ["Opony tył", "11.2-24"],
      ],
    },
  ],
  salesArguments: [
    "Stage V bez DPF — koniec z wymuszonymi regeneracjami",
    "38 KM i 109 Nm momentu w lekkim, zwrotnym nadwoziu",
    "Opcjonalny ładowacz czołowy 3400 z łyżką",
    "Niska masa 1 270 kg — łagodny dla darni i podłoża",
    "Magazyn części Stekro MiniTrak i serwis mobilny w Małopolsce",
  ],
};

export default function ModelSolisS40() {
  return <ModelPageLayout data={data} />;
}

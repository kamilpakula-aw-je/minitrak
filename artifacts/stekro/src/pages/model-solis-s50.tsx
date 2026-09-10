import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const cabrioFront = "/model-solis-s50-cabrio-front.webp";
const cabrioThreeQuarter = "/model-solis-s50-cabrio-threequarter.webp";
const cabrioSide = "/model-solis-s50-cabrio-side.webp";
const cabrioRear = "/model-solis-s50-cabrio-rear.webp";
const cabrioCockpit = "/model-solis-s50-cabrio-cockpit.webp";
const cabrioDashboard = "/model-solis-s50-cabrio-dashboard.webp";
const cabShowroomFront = "/model-solis-s50-cab-showroom-front.webp";
const cabShowroomSide = "/model-solis-s50-cab-showroom-side.webp";
const cabFront = "/model-solis-s50-cab-front.webp";
const cabRear = "/model-solis-s50-cab-rear.webp";
const cabHydraulics = "/model-solis-s50-cab-hydraulics.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S50",
    full: "Solis S50 4WD",
    headline: "Solis S50 4WD",
    accent: "50 KM, Stage V i skrzynia 12+12 Shuttle XL — ciągnik dla średnich gospodarstw.",
  },
  hero: {
    image: cabShowroomFront,
    alt: "Solis S50 4WD",
    eyebrow: "Solis / seria S — kompakt średniej mocy",
    description: (
      <>
        Trzycylindrowy silnik <strong>wolnossący 3 067 cm³</strong> w&nbsp;normie Stage V — bez turbo i&nbsp;bez kłopotliwego DPF. Skrzynia synchromesh <strong>12F+12R</strong> z&nbsp;rewersem, hydraulika <strong>S Boost</strong> z&nbsp;udźwigiem TUZ <strong>1 600 kg</strong> (opcjonalnie 2 500 kg) i&nbsp;ergonomiczne S Command Centre. Optymalny wybór do&nbsp;prac uprawowych, hodowli, sadów i&nbsp;usług.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "50 KM" },
    { icon: Fuel, label: "Pojemność silnika", value: "3 067 cm³" },
    { icon: ArrowRight, label: "Moment maks.", value: "205 Nm" },
    { icon: Wrench, label: "Skrzynia", value: "12F + 12R Synchro" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "1 600 kg" },
    { icon: Tractor, label: "Norma emisji", value: "Stage V" },
  ],
  why: {
    eyebrow: "Dlaczego S50",
    title: "Wolnossący silnik Stage V — trwałość i prostota bez DPF.",
    paragraphs: [
      <>Solis S50 jest pierwszym ciągnikiem w&nbsp;gamie Solisa, który wchodzi w&nbsp;klasę „pełnego" rolnika — 50 KM, trzy cylindry i&nbsp;pojemność <strong>3 067 cm³</strong> dają <strong>205 Nm momentu</strong> i&nbsp;komfortową rezerwę do&nbsp;orki, talerzowania, siewu i&nbsp;prac z&nbsp;opryskiwaczem.</>,
      <>Co istotne, jednostka jest <strong>wolnossąca</strong> i&nbsp;spełnia normę emisji Stage V bez stosowania filtra cząstek stałych. To kluczowa przewaga w&nbsp;sezonie żniwnym i&nbsp;siewnym, gdy ciągnik pracuje pod małym obciążeniem przez wiele godzin — brak konieczności wymuszanej regeneracji DPF.</>,
      <>W standardzie znajduje się skrzynia <strong>synchromesh 12F+12R z&nbsp;rewersem Shuttle XL</strong>, hydraulika z&nbsp;udźwigiem TUZ <strong>1 600 kg</strong> (opcjonalnie pakiet S Boost zwiększający udźwig do&nbsp;<strong>2 500 kg</strong>) oraz&nbsp;pulpit <strong>S Command Centre</strong>. Maskę otwiera się jednym ruchem, a&nbsp;wydech poprowadzono pod podłogą.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik S Tech Stage V",
      items: [
        "Trzycylindrowy wolnossący — bez turbo, bez DPF do regeneracji",
        "Pojemność 3 067 cm³, moc 50 KM, moment 205 Nm",
        "Obroty znamionowe 2 100 obr/min",
        "Sucha obudowa filtra powietrza z czujnikiem zatkania",
        "Wydech podpodłogowy (under-hood) — lepsza widoczność",
      ],
    },
    {
      icon: Settings,
      title: "Przeniesienie napędu",
      items: [
        "Skrzynia synchromesh 12F + 12R",
        "Rewers Shuttle XL — szybka zmiana kierunku przy ładowaczu",
        "Napęd 4×4",
      ],
    },
    {
      icon: Wrench,
      title: "Hydraulika i WOM",
      items: [
        "Hydraulika S Boost z udźwigiem TUZ 1 600 kg",
        "Opcjonalny pakiet do 2 500 kg",
        "WOM tylny 540 / 540E",
        "Szybki montaż ładowacza czołowego w standardzie",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Ergonomia i komfort",
      items: [
        "S Command Centre — ergonomicznie ułożone manetki i przyciski",
        "Stylizowana, aerodynamiczna maska z pełnym dostępem serwisowym",
        "Opcjonalna klimatyzowana kabina z ogrzewaniem",
        "Opcjonalny pakiet drogowy: lampa ostrzegawcza, oświetlenie LED",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie opcjonalne",
      items: [
        "Klimatyzowana, ogrzewana kabina z radiem",
        "Pakiet S Boost — udźwig TUZ do 2 500 kg",
        "Ładowacz czołowy z joystickiem i łyżką roboczą",
        "Drugi i trzeci rozdzielacz hydrauliczny",
        "Obciążniki przednie i tylne",
        "Ogumienie radialne lub przemysłowe",
        "Pakiet oświetlenia LED roboczego",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Dla kogo Solis S50 sprawdza się najlepiej.",
    items: [
      { title: "Średnie gospodarstwa rolne (10–40 ha)", description: "Uniwersalny ciągnik do orki, talerzowania, siewu, koszenia i transportu — 50 KM w wolnossącym Stage V to złoty środek między mocą a uniwersalnością." },
      { title: "Hodowla i ferma", description: "205 Nm momentu i udźwig 1 600 kg radzą sobie z wozami paszowymi, ładowaczem i ścielarką — codzienna praca w oborze i przy paszarni." },
      { title: "Sady wielkohektarowe i plantacje", description: "Synchromesh 12F+12R i rewers Shuttle XL ułatwiają częste zmiany kierunku przy obsłudze opryskiwacza, kosiarki sadowniczej czy ścinacza gałęzi." },
      { title: "Usługi i sektor komunalny", description: "Stage V, dobra widoczność i ergonomia czynią z S50 maszynę nadającą się do wynajmu, prac drogowych i utrzymania terenów zielonych." },
    ],
  },
  gallery: {
    eyebrow: "Galeria — dwie wersje",
    title: "S50 Cabrio (ROPS) oraz S50 z fabryczną kabiną.",
    images: [
      { src: cabrioFront, alt: "Solis S50 Cabrio — widok 3/4 z przodu", emphasis: true },
      { src: cabrioThreeQuarter, alt: "Solis S50 Cabrio — widok przedni" },
      { src: cabrioRear, alt: "Solis S50 Cabrio — widok z tyłu z pałąkiem ROPS" },
      { src: cabrioSide, alt: "Solis S50 Cabrio — widok z boku" },
      { src: cabrioCockpit, alt: "Solis S50 Cabrio — stanowisko operatora" },
      { src: cabrioDashboard, alt: "Solis S50 Cabrio — deska rozdzielcza i kierownica" },
      { src: cabFront, alt: "Solis S50 z kabiną — widok 3/4 z przodu" },
      { src: cabShowroomFront, alt: "Solis S50 z kabiną — salon, widok z przodu" },
      { src: cabShowroomSide, alt: "Solis S50 z kabiną — salon, widok z boku" },
      { src: cabRear, alt: "Solis S50 z kabiną — widok z tyłu" },
      { src: cabHydraulics, alt: "Solis S50 — układ TUZ i hydrauliki z tyłu" },
      { src: "/solis_s50/solis_s50_1.webp", alt: "Solis S50 — zdjęcie 1" },
      { src: "/solis_s50/solis_s50_2.webp", alt: "Solis S50 — zdjęcie 2" },
      { src: "/solis_s50/solis_s50_3.webp", alt: "Solis S50 — zdjęcie 3" },
      { src: "/solis_s50/solis_s50_4.webp", alt: "Solis S50 — zdjęcie 4" },
      { src: "/solis_s50/solis_s50_5.webp", alt: "Solis S50 — zdjęcie 5" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Typ silnika", "S Tech, 3-cylindrowy, wolnossący"],
        ["Norma emisji", "Stage V"],
        ["Moc znamionowa", "50 KM"],
        ["Pojemność skokowa", "3 067 cm³"],
        ["Liczba cylindrów", "3"],
        ["Obroty znamionowe", "2 100 obr./min"],
        ["Maksymalny moment", "205 Nm"],
        ["Filtr powietrza", "Suchy z czujnikiem zatkania"],
        ["Wydech", "Podpodłogowy (under-hood)"],
      ],
    },
    {
      title: "Przeniesienie napędu",
      rows: [
        ["Skrzynia biegów", "Synchromesh 12F + 12R"],
        ["Rewers", "Shuttle XL"],
        ["Napęd", "4×4 (4WD)"],
      ],
    },
    {
      title: "Hydraulika i WOM",
      rows: [
        ["Udźwig TUZ (standard)", "1 600 kg"],
        ["Udźwig TUZ (S Boost, opcja)", "2 500 kg"],
        ["WOM tylny", "540 / 540E (zgodnie z konfiguracją)"],
        ["Mocowanie ładowacza czołowego", "Szybki montaż w standardzie"],
      ],
    },
    {
      title: "Ergonomia i komfort",
      rows: [
        ["Stanowisko operatora", "S Command Centre"],
        ["Maska", "Stylizowana, otwierana z dobrym dostępem serwisowym"],
        ["Kabina", "Klimatyzowana z ogrzewaniem (opcja)"],
        ["Pakiet drogowy", "Lampa ostrzegawcza, oświetlenie LED (opcja)"],
      ],
    },
  ],
  salesArguments: [
    "Stage V bez DPF — koniec z wymuszonymi regeneracjami",
    "205 Nm momentu i 1 600 kg udźwigu — pełnoprawny rolnik",
    "Skrzynia 12+12 Shuttle XL — szybki rewers przy ładowaczu",
    "Opcja S Boost zwiększa udźwig do 2 500 kg",
    "Magazyn części Stekro MiniTrak i serwis mobilny w Małopolsce",
  ],
};

export default function ModelSolisS50() {
  return <ModelPageLayout data={data} />;
}

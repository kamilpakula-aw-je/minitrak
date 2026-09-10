import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import s75Hero from "@assets/S-75-Poster-1_1776839143928.webp";
import s75Field from "@assets/S75_1776839143928.webp";
import s75Cab from "@assets/2_1776839143928.webp";
import s75Rops from "@assets/S75-3_1776839143930.webp";
import s75Canopy from "@assets/s75-non-eu-ti_1776839143929.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S75",
    full: "Solis S75 Shuttle XL",
    headline: "Solis S75 Shuttle XL",
    accent: "75 KM, 4 cylindry i 289 Nm — pełnoprawny rolnik na codzienną pracę.",
  },
  hero: {
    image: s75Hero,
    alt: "Solis S75 — widok studyjny 3/4",
    eyebrow: "Solis / seria S — utility 75 KM",
    description: (
      <>
        Pierwszy w&nbsp;gamie Solis czterocylindrowy ciągnik utility. Silnik <strong>S Tech 3 707 cm³</strong> z&nbsp;turbodoładowaniem (Stage V), skrzynia <strong>synchro 12F+12R Shuttle XL</strong>, hydraulika <strong>S Boost</strong> z&nbsp;udźwigiem TUZ 2 500 kg (opcjonalnie 3 000 kg) i&nbsp;nowoczesna konsola S Command Centre. Dostępny w&nbsp;wersji ROPS, Cabin oraz&nbsp;Canopy.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "75 KM" },
    { icon: Fuel, label: "Pojemność silnika", value: "3 707 cm³" },
    { icon: Tractor, label: "Cylindry", value: "4 (turbo)" },
    { icon: ArrowRight, label: "Moment maks.", value: "289 Nm @ 1 300 obr" },
    { icon: Wrench, label: "Skrzynia", value: "12F+12R Shuttle XL" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "2 500 / 3 000 kg" },
  ],
  why: {
    eyebrow: "Dlaczego S75",
    title: "Czterocylindrowy silnik 3,7 L o szerokim plateau momentu.",
    paragraphs: [
      <>Solis S75 wyznacza w&nbsp;gamie producenta granicę między klasą utility a&nbsp;kompaktem polowym. Pod maską pracuje <strong>czterocylindrowa jednostka 3 707 cm³</strong> z&nbsp;turbodoładowaniem (Stage V), generująca 75 KM mocy znamionowej i — co najistotniejsze — <strong>289 Nm momentu obrotowego już przy 1 300 obr./min</strong>.</>,
      <>Producent definiuje dwa punkty pracy: <strong>278 Nm @ 1 200 obr.</strong> oraz&nbsp;<strong>289 Nm @ 1 300 obr.</strong> — to oznacza szerokie plateau momentu, w&nbsp;którym silnik nie traci ciągu przy zmianach obciążenia.</>,
      <>Stekro MiniTrak oferuje S75 w&nbsp;trzech wariantach stanowiska: <strong>ROPS</strong> (pałąk składany), <strong>Cabin</strong> (klimatyzowana kabina) oraz&nbsp;<strong>Canopy</strong> (daszek przeciwsłoneczny — rynki poza UE).</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik S Tech Stage V",
      items: [
        "Czterocylindrowy turbo, pojemność 3 707 cm³",
        "Moc 75 KM, moment 278 Nm @ 1 200 obr → 289 Nm @ 1 300 obr",
        "Obroty znamionowe 2 200 / 2 000 obr/min",
        "Suchy filtr powietrza",
        "Cold start w standardzie — pewny rozruch zimą",
        "Wydech updraft, tłumik podpodłogowy",
      ],
    },
    {
      icon: Settings,
      title: "Przeniesienie napędu",
      items: [
        "Skrzynia synchromesh 12F + 12R",
        "Rewers Shuttle XL",
        "Napęd 4×4",
        "Hamulce tarczowe w kąpieli olejowej",
        "Mechaniczna blokada mechanizmu różnicowego",
      ],
    },
    {
      icon: Wrench,
      title: "Hydraulika i WOM",
      items: [
        "Hydraulika S Boost — udźwig TUZ 2 500 kg",
        "Opcja zwiększenia do 3 000 kg",
        "2 pary rozdzielaczy w standardzie (opcjonalnie 3)",
        "WOM tylny 540 / 540E",
        "Szybki montaż ładowacza czołowego",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Trzy warianty stanowiska",
      items: [
        "ROPS — pałąk ochronny na rynki UE",
        "Cabin — klimatyzowana kabina S Command Centre",
        "Canopy — daszek przeciwsłoneczny (poza UE)",
        "Twin projector LED — bliźniacze reflektory soczewkowe",
        "Kogut w standardzie",
        "Logiczny układ manetek po prawej",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie opcjonalne",
      items: [
        "Klimatyzowana kabina S Command Centre z ogrzewaniem i radiem",
        "Pakiet S Boost — udźwig TUZ do 3 000 kg",
        "Ładowacz czołowy z joystickiem i łyżką roboczą",
        "Trzecia para rozdzielacza hydraulicznego",
        "Obciążniki przednie i tylne",
        "Ogumienie radialne, przemysłowe lub trawiaste",
        "Pakiet oświetlenia LED roboczego",
        "Przedni TUZ + przedni WOM",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie S75 robi największą różnicę.",
    items: [
      { title: "Średnie i większe gospodarstwa (40–100 ha)", description: "75 KM, czterocylindrowa jednostka 3,7 L i moment 289 Nm pozwalają pracować z agregatami uprawowymi 2,5–3 m, pługami 3-skibowymi i dużymi opryskiwaczami." },
      { title: "Hodowla bydła i trzody", description: "Udźwig TUZ 2 500 kg (opcja 3 000 kg) i komfortowa kabina to ergonomiczne stanowisko do codziennej pracy z wozem paszowym, bel i ścielarką." },
      { title: "Transport i prace komunalne", description: "Skrzynia synchro 12+12 z rewersem Shuttle XL i komfortowy fotel obniżają zmęczenie kierowcy podczas wielogodzinnych zleceń." },
      { title: "Usługi rolnicze", description: "Niski koszt eksploatacji, dostęp do części Stekro MiniTrak i serwis mobilny w Małopolsce — maszyna do pracy zarobkowej bez przerw przed sezonem." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "S75 — trzy stanowiska, jedna maszyna.",
    images: [
      { src: s75Field, alt: "Solis S75 w polu o zachodzie", emphasis: true },
      { src: s75Cab, alt: "S75 z klimatyzowaną kabiną" },
      { src: s75Rops, alt: "S75 z pałąkiem ROPS" },
      { src: s75Canopy, alt: "S75 z daszkiem (canopy)" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Typ", "S Tech, 4-cylindrowy, turbodoładowany"],
        ["Norma emisji", "Stage V"],
        ["Pojemność skokowa", "3 707 cm³"],
        ["Moc znamionowa", "75 KM"],
        ["Obroty znamionowe", "2 200 / 2 000 obr./min"],
        ["Moment maksymalny", "278 Nm @ 1 200 obr. / 289 Nm @ 1 300 obr."],
        ["Filtr powietrza", "Suchy"],
        ["Cold start", "W standardzie"],
        ["Wydech", "Updraft (przez maskę)"],
        ["Tłumik", "Podpodłogowy (under-hood)"],
      ],
    },
    {
      title: "Przeniesienie napędu",
      rows: [
        ["Skrzynia biegów", "Synchromesh 12F + 12R"],
        ["Rewers", "Shuttle XL"],
        ["Napęd", "4×4 (4WD)"],
        ["Hamulce", "Tarczowe w kąpieli olejowej"],
        ["Blokada mechanizmu różnicowego", "Mechaniczna"],
      ],
    },
    {
      title: "Hydraulika i WOM",
      rows: [
        ["Udźwig TUZ (standard)", "2 500 kg (S Boost)"],
        ["Udźwig TUZ (opcja)", "3 000 kg"],
        ["Rozdzielacz hydrauliczny", "2 pary w standardzie, opcjonalnie 3"],
        ["WOM tylny", "540 / 540E"],
        ["Mocowanie ładowacza", "Szybki montaż w standardzie"],
      ],
    },
    {
      title: "Stanowisko operatora i wyposażenie",
      rows: [
        ["Wersja kabiny (ROPS)", "Pałąk ochronny — wersja na rynki UE i otwarta"],
        ["Wersja Cabin", "Klimatyzowana kabina S Command Centre"],
        ["Wersja Canopy", "Daszek przeciwsłoneczny (poza UE)"],
        ["Reflektory", "Twin projector LED"],
        ["Lampa ostrzegawcza", "Kogut w standardzie"],
        ["Ergonomia", "Logiczny układ manetek po prawej"],
      ],
    },
  ],
  salesArguments: [
    "Czterocylindrowy silnik 3,7 L — pełna klasa utility 75 KM",
    "289 Nm momentu @ 1 300 obr — szerokie plateau ciągu",
    "Skrzynia 12+12 Shuttle XL — szybki rewers przy ładowaczu",
    "Udźwig TUZ 2 500 kg, opcjonalnie 3 000 kg",
    "Trzy warianty kabiny — ROPS / Cabin / Canopy",
  ],
};

export default function ModelSolisS75() {
  return <ModelPageLayout data={data} />;
}

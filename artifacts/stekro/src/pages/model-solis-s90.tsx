import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import s90Hero from "@assets/S90_shuttle-xl_1_1776839251057.webp";
import s90Field from "@assets/S90-GLOBAL_1776839251057.webp";
import s90Side from "@assets/S90_1776839251056.webp";
import s90RopsFel from "@assets/90HP-ROPs-Tractor-with-FEL-4in1-Solis-S90_60370838_l_1776839251057.webp";
import s90Canopy from "@assets/s90_1_1776839251057.webp";

const s90DealerSide = "/model-solis-s90-side.webp";
const s90DealerFront = "/model-solis-s90-front.webp";
const s90Action = "/model-solis-s90-action.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S90",
    full: "Solis S90 Shuttle XL",
    headline: "Solis S90 Shuttle XL",
    accent: "90 KM, 4 087 cm³ i 360 Nm — flagowy ciągnik serii S.",
  },
  hero: {
    image: s90DealerSide,
    alt: "Solis S90 Shuttle XL — widok 3/4 z boku",
    eyebrow: "Solis / seria S — flagowy 90 KM",
    description: (
      <>
        Czterocylindrowy silnik <strong>4 087 cm³</strong> z&nbsp;turbodoładowaniem (Stage V high-end torque), skrzynia <strong>synchro 12F+12R Shuttle XL</strong>, hydraulika <strong>S Boost</strong> z&nbsp;udźwigiem TUZ 3 000 kg (opcjonalnie 3 500 kg) i&nbsp;konsola S Command Centre. Dostępny w&nbsp;wersji Cabin, ROPS oraz&nbsp;Canopy — gotowy do&nbsp;orki, pras i ładowacza TUR.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "90 KM" },
    { icon: Fuel, label: "Pojemność silnika", value: "4 087 cm³" },
    { icon: Tractor, label: "Cylindry", value: "4 (turbo)" },
    { icon: ArrowRight, label: "Moment maks.", value: "360 Nm @ 1 300 obr" },
    { icon: Wrench, label: "Skrzynia", value: "12F+12R Shuttle XL" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "3 000 / 3 500 kg" },
  ],
  why: {
    eyebrow: "Dlaczego S90",
    title: "Flagowiec serii S — 360 Nm momentu i udźwig 3 500 kg.",
    paragraphs: [
      <>Solis S90 Shuttle XL to <strong>najmocniejszy ciągnik serii S</strong> w&nbsp;ofercie producenta. Pod maską pracuje czterocylindrowa jednostka <strong>4 087 cm³</strong> z&nbsp;turbodoładowaniem (Stage V high-end torque), generująca 90 KM mocy znamionowej oraz&nbsp;<strong>aż 360 Nm momentu przy 1 300 obr./min</strong>.</>,
      <>Producent definiuje dwa punkty pracy: <strong>339 Nm @ 1 300 obr.</strong> oraz&nbsp;<strong>360 Nm @ 1 300 obr.</strong> — pełen ciąg dostępny od&nbsp;niskich obrotów, idealny do&nbsp;pracy z&nbsp;agregatami uprawowymi 3,0–3,5 m i&nbsp;pługami 4-skibowymi.</>,
      <>Skrzynia <strong>synchromesh 12F+12R z&nbsp;rewersem Shuttle XL</strong>, hydraulika <strong>S Boost</strong>, blokada mechanizmu różnicowego i&nbsp;bliźniacze reflektory soczewkowe w&nbsp;standardzie. Dostępny w&nbsp;wariantach <strong>Cabin</strong>, <strong>ROPS</strong> oraz&nbsp;<strong>Canopy</strong>.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Stage V high-end torque",
      items: [
        "Czterocylindrowy turbo, pojemność 4 087 cm³",
        "Moc 90 KM, moment 339 Nm @ 1 300 → 360 Nm @ 1 300 obr",
        "Obroty znamionowe 2 200 / 2 000 obr/min",
        "Suchy filtr powietrza",
        "Cold start w standardzie",
        "Wydech updraft (downdraft opcjonalnie), tłumik podpodłogowy",
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
        "Hydraulika S Boost — udźwig TUZ 3 000 kg",
        "Opcja zwiększenia do 3 500 kg",
        "2 pary rozdzielaczy w standardzie (opcjonalnie 3)",
        "WOM tylny 540 / 540E",
        "Szybki montaż ładowacza czołowego",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Stanowisko operatora",
      items: [
        "Cabin — klimatyzowana kabina S Command Centre",
        "ROPS — pałąk ochronny składany",
        "Canopy — daszek przeciwsłoneczny (poza UE)",
        "Twin projector LED — bliźniacze reflektory soczewkowe",
        "Kogut ostrzegawczy w standardzie",
        "Logiczny układ manetek po prawej",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie opcjonalne",
      items: [
        "Klimatyzowana kabina S Command Centre z ogrzewaniem i radiem",
        "Pakiet S Boost — udźwig TUZ do 3 500 kg",
        "Wydech downdraft (poprowadzony pod podwoziem)",
        "Ładowacz czołowy TUR z joystickiem (np. łyżka 4w1)",
        "Trzecia para rozdzielacza hydraulicznego",
        "Obciążniki, ogumienie radialne / przemysłowe / trawiaste",
        "Pakiet oświetlenia LED roboczego",
        "Przedni TUZ + przedni WOM, hak transportowy",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie S90 robi największą różnicę.",
    items: [
      { title: "Duże gospodarstwa polowe (80–200 ha)", description: "90 KM, 4-cylindrowa jednostka 4,1 L i moment 360 Nm pozwalają pracować z agregatami uprawowymi 3,0–3,5 m, pługami 4-skibowymi i prasami zwijającymi." },
      { title: "Hodowla bydła i fermy mleczne", description: "Udźwig TUZ 3 000 kg (opcja 3 500 kg) i komfortowa kabina to wydajne stanowisko do pracy z wozem paszowym, ładowaczem czołowym TUR i ścielarką." },
      { title: "Transport międzypolowy", description: "Skrzynia synchro 12+12 z rewersem Shuttle XL, mocny silnik turbo i zbiornik paliwa wystarczający na całą zmianę — sprawdza się przy ciężkich przyczepach." },
      { title: "Usługi rolnicze i kontraktowe", description: "Niski koszt eksploatacji, blokada mechanizmu różnicowego i radialne ogumienie pozwalają obsługiwać ciężkie zlecenia bez przerw przed sezonem." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "S90 — od salonu do pracy w polu.",
    images: [
      { src: s90Hero, alt: "Solis S90 Shuttle XL — widok studyjny", emphasis: true },
      { src: s90DealerFront, alt: "S90 Cabin — widok z przodu" },
      { src: s90Action, alt: "S90 Shuttle XL — zdjęcie producenta" },
      { src: s90Side, alt: "S90 — widok z boku" },
      { src: s90Field, alt: "S90 GLOBAL — wersja globalna" },
      { src: s90RopsFel, alt: "S90 ROPS z ładowaczem TUR" },
      { src: s90Canopy, alt: "S90 Canopy — wersja z daszkiem" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Typ", "4-cylindrowy turbodoładowany (Stage V high-end torque)"],
        ["Pojemność skokowa", "4 087 cm³"],
        ["Moc znamionowa", "90 KM"],
        ["Obroty znamionowe", "2 200 / 2 000 obr./min"],
        ["Moment maksymalny", "339 Nm @ 1 300 obr. / 360 Nm @ 1 300 obr."],
        ["Filtr powietrza", "Suchy"],
        ["Cold start", "W standardzie"],
        ["Wydech", "Updraft (downdraft opcjonalnie)"],
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
        ["Udźwig TUZ (standard)", "3 000 kg (S Boost)"],
        ["Udźwig TUZ (opcja)", "3 500 kg"],
        ["Rozdzielacz hydrauliczny", "2 pary w standardzie, opcjonalnie 3"],
        ["WOM tylny", "540 / 540E"],
        ["Mocowanie ładowacza", "Szybki montaż w standardzie"],
      ],
    },
    {
      title: "Stanowisko operatora i wyposażenie",
      rows: [
        ["Wersja kabiny (Cabin)", "Klimatyzowana kabina S Command Centre"],
        ["Wersja ROPS", "Pałąk ochronny składany"],
        ["Wersja Canopy", "Daszek przeciwsłoneczny (rynki poza UE)"],
        ["Reflektory", "Twin projector LED"],
        ["Lampa ostrzegawcza", "Kogut w standardzie"],
        ["Ergonomia", "Logiczny układ manetek po prawej"],
      ],
    },
  ],
  salesArguments: [
    "Najmocniejszy w serii S — 90 KM, 4 087 cm³",
    "360 Nm momentu @ 1 300 obr — pełen ciąg na agregatach",
    "Skrzynia 12+12 Shuttle XL z blokadą mech. różnicowego",
    "Udźwig TUZ 3 000 kg (opcja 3 500 kg)",
    "Trzy warianty stanowiska — Cabin / ROPS / Canopy",
  ],
};

export default function ModelSolisS90() {
  return <ModelPageLayout data={data} />;
}

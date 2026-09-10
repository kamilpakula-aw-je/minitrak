import { ArrowRight, Fuel, Gauge, Lightbulb, Package, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import s20Studio from "@assets/192A4206_1776837421362.webp";
import s20Outdoor from "@assets/SOLIS-20-Agi_1776837421363.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S20",
    full: "Solis S20 4WD",
    headline: "Solis S20 4WD",
    accent: "moc Mitsubishi w kompaktowym wydaniu.",
  },
  hero: {
    image: s20Studio,
    alt: "Solis S20 4WD",
    eyebrow: "Solis / seria S",
    description: (
      <>
        Trzycylindrowy silnik <strong>Mitsubishi 20 KM</strong>, hamulce w&nbsp;kąpieli olejowej, hydrauliczne wspomaganie kierownicy i&nbsp;TUZ kat. I o&nbsp;udźwigu <strong>500 kg</strong>. Wszechstronny kompakt do&nbsp;gospodarstw, sadów i&nbsp;służb komunalnych — z&nbsp;japońską kulturą pracy w&nbsp;przystępnej cenie.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc silnika", value: "20 KM" },
    { icon: Tractor, label: "Silnik", value: "Mitsubishi 3-cyl." },
    { icon: Wrench, label: "Napęd", value: "4WD" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "500 kg" },
    { icon: ArrowRight, label: "Moment obrotowy", value: "52 Nm" },
    { icon: Fuel, label: "Pojemność silnika", value: "953 cm³" },
  ],
  why: {
    eyebrow: "Mitsubishi pod maską",
    title: "Trzy cylindry, 953 cm³ i 52 Nm — japońska niezawodność na lata.",
    paragraphs: [
      "Sercem Solisa S20 jest trzycylindrowy silnik Mitsubishi chłodzony cieczą — wolnossący, dopracowany i sprawdzony w tysiącach maszyn na całym świecie. Maksymalny moment 52 Nm gwarantuje pewną pracę z osprzętem nawet w trudnym terenie i pod obciążeniem.",
      "Standardowy preheater pozwala na rozruch zimą bez dodatkowych zabiegów, a suchy filtr powietrza z czujnikiem zatkania sygnalizuje konieczność serwisu, zanim spadnie wydajność. Tłumik wydechu został schowany w komorze silnika z wylotem skierowanym w dół — niższy poziom hałasu i większe bezpieczeństwo termiczne.",
      "Cała konstrukcja Solisa S20 została pomyślana pod kątem niskich kosztów eksploatacji. Mokre hamulce w kąpieli olejowej, oświetlenie projektorowe i wzmocnione elementy bezpieczeństwa znoszą codzienną pracę bez kompromisów.",
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Mitsubishi",
      items: [
        "3-cylindrowy diesel, chłodzony cieczą, wolnossący",
        "Pojemność 953 cm³, moc 20 KM, moment 52 Nm",
        "Suchy filtr powietrza z czujnikiem zatkania",
        "Standardowy preheater do rozruchu w niskich temperaturach",
        "Tłumik wydechu w komorze silnika, wylot w dół — niższy hałas",
      ],
    },
    {
      icon: Settings,
      title: "Napęd, skrzynia i hamulce",
      items: [
        "Skrzynia mechaniczna z bocznym mocowaniem dźwigni",
        "Napęd 4×4 — przełączalny",
        "Hydrauliczne wspomaganie kierownicy",
        "Hamulce mokre w kąpieli olejowej — większe bezpieczeństwo i trwałość",
        "Blokada mechanizmu różnicowego",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny 540 / 1000 obr./min",
        "Hydrauliczny TUZ kat. I o udźwigu 500 kg",
        "2 wyjścia hydrauliczne / 1 sekcja — rozszerzalne",
        "Zaczep dolny do przyczepy",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Bezpieczeństwo i widoczność",
      items: [
        "Bliźniacze reflektory projektorowe (twin projector)",
        "Pałąk bezpieczeństwa ROPS w standardzie",
        "Pas bezpieczeństwa w standardzie",
        "Cztery opcje ogumienia: rolnicze, przemysłowe, trawnikowe, Galaxy Pro",
        "Akumulator 12 V",
      ],
    },
    {
      icon: Package,
      title: "Osprzęt fabryczny",
      items: [
        "Ładowacz czołowy Solis — do ziemi, piasku, żwiru i palet",
        "Koparka tylna (Back Hoe) — wykopy, drenaż, fundamenty, melioracja",
      ],
    },
    {
      icon: Lightbulb,
      title: "Dodatkowe wyposażenie u dealera",
      items: [
        "Kabina ogrzewana",
        "Przedni TUZ",
        "Szersze koła rolnicze, przemysłowe lub trawiaste",
        "Glebogryzarka i kosiarka bijakowa",
        "Pług do śniegu, posypywarka, zamiatarka",
        "Przyczepa o ładowności do 1 000 kg",
      ],
    },
  ],
  useCases: {
    eyebrow: "Dla kogo jest Solis S20",
    title: "Cztery profile użytkowników, dla których to strzał w dziesiątkę.",
    items: [
      { title: "Małe gospodarstwa rolne", description: "Idealny do uprawek pielęgnacyjnych, transportu paszy, drobnych prac polowych i obsługi inwentarza." },
      { title: "Sady i plantacje", description: "Kompaktowa szerokość pozwala na pracę między rzędami z opryskiwaczem, kosiarką lub glebogryzarką." },
      { title: "Służby komunalne", description: "Sprawdzony przy odśnieżaniu chodników, koszeniu poboczy i utrzymaniu terenów zielonych w niewielkich gminach." },
      { title: "Działki i agroturystyka", description: "Prosta obsługa, niska awaryjność i tania eksploatacja sprawiają, że ciągnik szybko się zwraca w użytku hobbystycznym." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Solis S20 — widok studyjny i praca w terenie.",
    images: [
      { src: s20Studio, alt: "Solis S20 4WD — widok studyjny", emphasis: true },
      { src: s20Outdoor, alt: "Solis S20 4WD — praca w terenie" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Marka", "Mitsubishi"],
        ["Typ", "3-cylindrowy diesel, chłodzony cieczą, wolnossący"],
        ["Moc znamionowa", "20 KM"],
        ["Pojemność skokowa", "953 cm³"],
        ["Prędkość znamionowa", "2 700 obr./min"],
        ["Maksymalny moment obrotowy", "52 Nm"],
        ["Filtr powietrza", "Suchy, z czujnikiem zatkania"],
        ["Rozruch w niskich temperaturach", "Standard (preheater)"],
        ["Tłumik wydechu", "W komorze silnika, wylot w dół"],
      ],
    },
    {
      title: "Przekładnia, napęd i hamulce",
      rows: [
        ["Typ skrzyni", "Mechaniczna"],
        ["Boczne mocowanie dźwigni", "Tak"],
        ["Napęd", "4×4 (4WD)"],
        ["Wspomaganie kierownicy", "Hydrauliczne"],
        ["Hamulce", "Mokre, w kąpieli olejowej"],
        ["Blokada mechanizmu różnicowego", "Tak"],
      ],
    },
    {
      title: "WOM, TUZ i hydraulika",
      rows: [
        ["WOM tylny", "540 / 1000 obr./min"],
        ["TUZ", "Kategoria I, 3-punktowy"],
        ["Udźwig TUZ", "500 kg"],
        ["Wyjścia hydrauliczne", "2 sztuki / 1 sekcja (rozszerzalne)"],
        ["Zaczep do przyczepy", "Dolny"],
      ],
    },
    {
      title: "Bezpieczeństwo i ogumienie",
      rows: [
        ["Promień skrętu", "Kompaktowy — praca w ciasnych przestrzeniach"],
        ["Opcje ogumienia", "Rolnicze / przemysłowe / trawnikowe / Galaxy Pro"],
        ["Reflektory", "Bliźniacze projektorowe (twin projector)"],
        ["Pałąk ochronny", "ROPS w standardzie"],
        ["Pas bezpieczeństwa", "Standard"],
        ["Akumulator", "12 V"],
      ],
    },
  ],
  salesArguments: [
    "Silnik Mitsubishi — japońska jakość i niskie zużycie paliwa",
    "Hamulce mokre w oleju — większa trwałość i bezpieczeństwo",
    "Cztery opcje ogumienia — uniwersalność do każdej pracy",
    "Reflektory projektorowe i wzmocniony ROPS",
    "Magazyn części Stekro MiniTrak i serwis na miejscu",
  ],
};

export default function ModelSolisS20() {
  return <ModelPageLayout data={data} />;
}

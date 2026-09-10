import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import mt125Hero from "@assets/mini-ciagnik-ls-tractor-mt1-8_1776839344430.webp";
import mt125Forest from "@assets/LS_Tractor_MT1_25_w_lesie_1776839344429.webp";
import mt125Cab from "@assets/LS-Tractor-MT1_25-4x4-24_7-KM-IND-CAB-9-scaled_1776839344430.webp";
import mt1253in1 from "@assets/LS-Tractor-MT1_25-4x4-247KM-koparka-LB1107-ladowacz-TUR-LL110_1776839344431.webp";
import mt125Tires from "@assets/LS-MT1_25-opony1-zmniejszone_1776839344432.webp";
import mt125Backhoe from "@assets/LS-Tractor-MT1_25-4x4-247KM-koparka-LB1107-ladowacz-TUR-LL1100_1776839344430.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "MT1.25",
    full: "LS Tractor MT1.25",
    headline: "LS Tractor MT1.25",
    accent: "24,7 KM, 120 cm szerokości i pełna funkcjonalność dużego ciągnika.",
  },
  hero: {
    image: mt125Hero,
    alt: "LS Tractor MT1.25 z kabiną",
    eyebrow: "LS Tractor / seria MT1 — premium subkompakt",
    description: (
      <>
        Jeden z&nbsp;najmniejszych ciągników na&nbsp;rynku — zaledwie <strong>120 cm szerokości</strong>, a&nbsp;pod maską pełnoprawny silnik <strong>Yanmar 3TNV80F</strong> 24,7 KM. Hydrostatyczna skrzynia biegów, napęd 4×4, składany pałąk ROPS i&nbsp;niespotykana w&nbsp;klasie konfiguracja <strong>3w1</strong> (koparka, ładowacz, kosiarka międzyosiowa). Premium klasa LS Tractor i&nbsp;5-letnia gwarancja producenta.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "24,7 KM (18,4 kW)" },
    { icon: Fuel, label: "Silnik", value: "Yanmar 3TNV80F, 1 267 cm³" },
    { icon: Wrench, label: "Skrzynia", value: "Hydrostatyczna (HST)" },
    { icon: Tractor, label: "Napęd", value: "4×4 ze wspomaganiem" },
    { icon: ArrowRight, label: "Szerokość całkowita", value: "120 cm" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "450 kg (kat. I)" },
  ],
  why: {
    eyebrow: "Dlaczego MT1.25",
    title: "120 cm szerokości i japońska niezawodność Yanmara.",
    paragraphs: [
      <>LS Tractor MT1.25 wjedzie wszędzie tam, gdzie tradycyjne ciągniki nie mają szans. Przy <strong>120 cm szerokości całkowitej</strong> i&nbsp;<strong>masie 655 kg</strong> swobodnie pracuje między rzędami w&nbsp;sadzie, w&nbsp;tunelach foliowych, na ścieżce ogrodowej czy między grządkami w&nbsp;gospodarstwie hobbystycznym.</>,
      <>Pod maską pracuje <strong>3-cylindrowy silnik Yanmar 3TNV80F</strong> o&nbsp;pojemności 1 267 cm³ i&nbsp;mocy 24,7 KM — japońska szkoła niezawodności wykorzystywana także w&nbsp;mini-koparkach Komatsu i&nbsp;Hitachi. Skrzynia <strong>hydrostatyczna HST</strong> z&nbsp;dwoma zakresami i&nbsp;tempomatem oznacza jazdę bez sprzęgła i&nbsp;biegów.</>,
      <>Konfiguracja <strong>3w1 (koparka LB1107 + ładowacz TUR LL1100 + kosiarka międzyosiowa)</strong> to absolutna unikatowa cecha tego modelu. <strong>5-letnia gwarancja producenta</strong> potwierdza, że&nbsp;LS Tractor stoi za&nbsp;jakością tej maszyny.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Yanmar 3TNV80F",
      items: [
        "3-cylindrowy diesel chłodzony cieczą",
        "Pojemność 1 267 cm³, moc 24,7 KM (18,4 kW)",
        "Prędkość znamionowa 3 000 obr/min",
        "Zbiornik paliwa 25 L",
        "Suchy filtr powietrza",
      ],
    },
    {
      icon: Settings,
      title: "Hydrostatyka HST",
      items: [
        "2 zakresy do przodu i 2 do tyłu",
        "Prędkość maksymalna 14,6 km/h",
        "Tempomat — stała prędkość bez nogi na pedale",
        "Napęd 4×4 z hydraulicznym wspomaganiem kierownicy",
        "Mokre hamulce dzielone",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny niezależny 540 obr/min, mokre sprzęgło, wyłącznik elektrohydrauliczny",
        "WOM międzyosiowy 2 500 obr/min w standardzie",
        "Pompa hydrauliczna 25,4 l/min",
        "TUZ kat. I, udźwig 450 kg",
        "4 wyjścia hydrauliczne w 2 sekcjach (z przodu)",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Wymiary i mobilność",
      items: [
        "Długość/szerokość/wysokość 2 470 / 1 200 / 2 218 mm",
        "Prześwit 160 mm, promień skrętu 2 400 mm",
        "Maks. kąt obrotu koła przedniego 54,5°",
        "Masa 655 kg (ROPS) / 750 kg (CAB)",
        "Składany pałąk ROPS",
        "Opony industrialne lub trawiaste",
      ],
    },
    {
      icon: Lightbulb,
      title: "Konfiguracja 3w1 i kabina CAB",
      items: [
        "Koparka LB1107 + ładowacz TUR LL1100 + kosiarka międzyosiowa",
        "Fotel obrotowy (w wersji z koparką)",
        "Kabina CAB z ogrzewaniem, zamkami, osłoną przeciwsłoneczną",
        "Oświetlenie LED zewnętrzne (2 przód + 2 tył) i wewnętrzne",
        "Wycieraczki przednie i tylne, dwa lusterka boczne",
        "System audio, nagrzewnica w komplecie",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie MT1.25 robi największą różnicę.",
    items: [
      { title: "Sady, plantacje i tunele foliowe", description: "Szerokość zaledwie 120 cm i składany pałąk ROPS pozwalają wjechać między rzędy drzew oraz pracować pod foliowymi tunelami bez ryzyka uszkodzenia konstrukcji." },
      { title: "Małe gospodarstwa i uprawy hobbystyczne", description: "TUZ kat. I (450 kg), tylny WOM 540 i międzyosiowy 2 500 — wystarczająca moc do glebogryzarki, wału, kosiarki rotacyjnej czy lekkiego pługa." },
      { title: "Posesje, rezydencje i obiekty komercyjne", description: "Z kosiarką międzyosiową, pługiem śnieżnym i posypywarką MT1.25 zastępuje 2-3 osobne maszyny w obsłudze parku, parkingu czy alei dojazdowej." },
      { title: "Prace komunalne i ziemne", description: "W konfiguracji 3w1 (koparka LB1107 + ładowacz TUR LL1100 + kosiarka międzyosiowa) MT1.25 pełni rolę miniciągnika ziemno-porządkowego dla brygad gminnych." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "MT1.25 — od sadu po prace ziemne.",
    images: [
      { src: mt125Backhoe, alt: "LS Tractor MT1.25 — koparka i ładowacz", emphasis: true },
      { src: mt125Forest, alt: "MT1.25 w lesie" },
      { src: mt125Cab, alt: "MT1.25 z kabiną" },
      { src: mt1253in1, alt: "MT1.25 — wersja 3w1" },
      { src: mt125Tires, alt: "MT1.25 — opony industrialne i trawiaste" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Model silnika", "Yanmar 3TNV80F"],
        ["Typ", "3-cylindrowy diesel, chłodzony cieczą"],
        ["Pojemność skokowa", "1 267 cm³"],
        ["Moc znamionowa", "18,4 kW / 24,7 KM"],
        ["Prędkość znamionowa", "3 000 obr./min"],
        ["Pojemność zbiornika paliwa", "25 L"],
        ["Filtr powietrza", "Suchy"],
      ],
    },
    {
      title: "Przekładnia i jazda",
      rows: [
        ["Typ", "Hydrostatyczna (HST), 2 zakresy / 2 zakresy wsteczne"],
        ["Prędkość maksymalna", "14,6 km/h"],
        ["Prędkość minimalna", "1 460 m/h"],
        ["Wspomaganie kierownicy", "Tak (hydrauliczne)"],
        ["Hamulce", "Dzielone, mokre"],
        ["Tempomat", "Tak"],
        ["Napęd", "4×4"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny", "Niezależny 540 obr./min, mokre sprzęgło, wyłącznik elektrohydrauliczny"],
        ["WOM międzyosiowy", "W standardzie — 2 500 obr./min"],
        ["Wydajność pompy hydraulicznej", "25,4 l/min"],
        ["TUZ", "Kategoria I"],
        ["Udźwig TUZ", "450 kg (na końcówkach kulowych)"],
        ["Wyjścia hydrauliczne", "4 sztuki w 2 sekcjach (z przodu)"],
      ],
    },
    {
      title: "Wymiary i opony",
      rows: [
        ["Długość / Szerokość / Wysokość", "2 470 / 1 200 / 2 218 mm"],
        ["Rozstaw osi", "1 425 mm"],
        ["Prześwit", "160 mm"],
        ["Promień skrętu", "2 400 mm"],
        ["Maks. kąt obrotu koła przedniego", "54,5°"],
        ["Masa (bez balastu)", "655 kg (ROPS) / 750 kg (z kabiną)"],
        ["Opony industrialne (IND)", "18×8.5-10 / 26×12.00-12"],
        ["Opony trawiaste (TURF)", "18×8.5-10 / 26×12.00-12"],
      ],
    },
  ],
  salesArguments: [
    "120 cm szerokości — wjedzie do tunelu i sadu",
    "Silnik Yanmar — japońska niezawodność",
    "Skrzynia HST z tempomatem — jazda na dwóch pedałach",
    "3w1 — koparka, ładowacz, kosiarka międzyosiowa",
    "5 lat gwarancji producenta — premium klasa",
  ],
};

export default function ModelLsMt125() {
  return <ModelPageLayout data={data} />;
}

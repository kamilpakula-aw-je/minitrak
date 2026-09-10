import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-ls-mt350-rops-meadow.webp";
const fieldImg = "/model-ls-mt350-rops-side.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "MT3.60",
    full: "LS Tractor MT3.60",
    headline: "LS Tractor MT3.60",
    accent: "57 KM, udźwig 1 250 kg i WOM trzybiegowy 540 / 540E / 1000.",
  },
  hero: {
    image: heroImg,
    alt: "LS Tractor MT3.60",
    eyebrow: "LS Tractor / seria MT3 — utility 60 KM",
    description: (
      <>
        Środkowy ciągnik utility w&nbsp;ofercie LS Tractor. Pod maską <strong>3-cylindrowy turbodiesel L3CRV-T7</strong> 1 879 cm³ o&nbsp;mocy 57 KM, do&nbsp;wyboru skrzynia <strong>MEC 32+16 z&nbsp;Synchro Shuttle</strong> i&nbsp;biegami pełzającymi lub&nbsp;<strong>HST 3+3 z&nbsp;tempomatem</strong>. Hydraulika do&nbsp;60 l/min, 8 wyjść hydraulicznych, TUZ 1 250 kg i&nbsp;trzybiegowy WOM tylny — gotowy do&nbsp;pełnej palety osprzętu rolniczego i&nbsp;komunalnego.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "57 KM (42,5 kW)" },
    { icon: Fuel, label: "Silnik", value: "LS Mtron L3CRV-T7, 1 879 cm³" },
    { icon: Wrench, label: "Skrzynia", value: "MEC 32+16 lub HST 3+3" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "1 250 kg (kat. I)" },
    { icon: ArrowRight, label: "Hydraulika", value: "30,9 l/min (60 l/min opcja)" },
    { icon: Tractor, label: "WOM tylny", value: "540 / 540E / 1000" },
  ],
  why: {
    eyebrow: "Dlaczego MT3.60",
    title: "Środkowa klasa utility z trzybiegowym WOM-em.",
    paragraphs: [
      <>MT3.60 jest <strong>środkowym ciągnikiem utility</strong> w&nbsp;ofercie LS Tractor — większym od&nbsp;subkompaktowego MT1.25 i&nbsp;XJ25, ale mniejszym od&nbsp;MT5/MT7. To kompaktowa maszyna 57 KM przeznaczona do&nbsp;gospodarstw 15–50 ha, sadów, hodowli i&nbsp;obsługi terenów zielonych.</>,
      <>Pod maską pracuje turbodoładowany <strong>silnik LS Mtron L3CRV-T7</strong> o&nbsp;pojemności 1 879 cm³. Klient wybiera między dwiema przekładniami: <strong>MEC 32×16 z&nbsp;Synchro Shuttle i&nbsp;biegami pełzającymi</strong> lub&nbsp;<strong>HST 3+3 z&nbsp;tempomatem</strong>.</>,
      <>Wyróżnikiem MT3.60 jest <strong>trzybiegowy WOM tylny</strong> (540 / 540E / 1000 obr.) — rzadko spotykany w&nbsp;klasie 60 KM. Hydraulika do&nbsp;<strong>60 l/min</strong> w&nbsp;opcji, <strong>8 wyjść w&nbsp;4 sekcjach</strong> i&nbsp;udźwig TUZ <strong>1 250 kg</strong>.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik LS Mtron L3CRV-T7",
      items: [
        "3-cylindrowy turbodiesel, chłodzony cieczą",
        "Pojemność 1 879 cm³, moc 57 KM (42,5 kW)",
        "Prędkość znamionowa 2 600 obr/min",
        "Zbiornik paliwa 47 L (CAB) / 40 L (ROPS)",
        "Suchy filtr powietrza",
      ],
    },
    {
      icon: Settings,
      title: "Dwie skrzynie do wyboru",
      items: [
        "Wersja MEC 32×16 z biegami pełzającymi i Synchro Shuttle",
        "Wersja HST 3+3 z tempomatem",
        "Prędkość maksymalna 27,12 km/h (MEC) / 25,42 km/h (HST)",
        "Hydrauliczne wspomaganie kierownicy (15,6 / 20,8 l/min)",
        "Mokre, dzielone hamulce",
        "Napęd 4×4",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny niezależny, mokre sprzęgło, wyłącznik elektrohydrauliczny",
        "Trzy prędkości: 540 / 540E / 1000 obr",
        "WOM międzyosiowy 2 000 obr/min — opcja",
        "Pompa hydrauliczna 30,9 l/min (60 l/min — opcja)",
        "TUZ kat. I, udźwig 1 250 kg",
        "8 wyjść hydraulicznych w 4 sekcjach (4 przód + 4 tył)",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Wymiary i mobilność",
      items: [
        "Długość 3 250 mm, szerokość od 1 530 mm",
        "Prześwit 388 mm, promień skrętu 2 890 mm",
        "Maks. kąt obrotu koła przedniego 57°",
        "Masa 1 720 kg (ROPS) / 1 950 kg (CAB)",
        "Wybór miejsca montażu ROPS — R.ROPS lub F.ROPS",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie kabiny CAB",
      items: [
        "Klimatyzacja i ogrzewanie z nagrzewnicą",
        "Radio i system audio",
        "Wycieraczki przednie i tylne",
        "Zewnętrzne oświetlenie LED",
        "Zamykana na klucz, wyciszona kabina",
        "Komfortowy fotel z amortyzacją, pasy bezpieczeństwa",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie MT3.60 robi największą różnicę.",
    items: [
      { title: "Średnie gospodarstwa rolne (15–50 ha)", description: "57 KM, udźwig TUZ 1 250 kg i WOM 1000 — wystarcza do prac z prasą zwijającą małej kostki, agregatem 1,8–2,2 m, beczkowozem 3 000 L i lekkim pługiem 2-skibowym." },
      { title: "Sady, plantacje i szkółki", description: "Szerokość od 153 cm i prześwit 388 mm pozwalają wjechać między rzędami drzew. Wersja HST z tempomatem to komfort przy oprysku, kosiarce sadowniczej i transporterze owoców." },
      { title: "Hodowla bydła i fermy", description: "Z ładowaczem TUR i hydrauliką 60 l/min MT3.60 sprawnie obsługuje stół paszowy, ścielenie boksów, transport beli słomy oraz wywóz obornika." },
      { title: "Usługi komunalne i parki", description: "Pakiet z kosiarką międzyosiową (WOM 2 000), pługiem śnieżnym i posypywarką to wszechstronny sprzęt dla brygad gminnych, deweloperów i zarządców terenów zielonych." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "MT3.60 — wersja kabinowa i ROPS.",
    images: [
      { src: heroImg, alt: "MT3.60 — wizualizacja modelu", emphasis: true },
      { src: fieldImg, alt: "MT3.60 — widok z boku" },
      { src: "/ls_mt360/ls_mt360_1.webp", alt: "LS MT 3.60 — zdjęcie 1" },
      { src: "/ls_mt360/ls_mt360_2.webp", alt: "LS MT 3.60 — zdjęcie 2" },
      { src: "/ls_mt360/ls_mt360_3.webp", alt: "LS MT 3.60 — zdjęcie 3" },
      { src: "/ls_mt360/ls_mt360_4.webp", alt: "LS MT 3.60 — zdjęcie 4" },
      { src: "/ls_mt360/ls_mt360_5.webp", alt: "LS MT 3.60 — zdjęcie 5" },
      { src: "/ls_mt360/ls_mt360_6.webp", alt: "LS MT 3.60 — zdjęcie 6" },
      { src: "/ls_mt360/ls_mt360_7.webp", alt: "LS MT 3.60 — zdjęcie 7" },
      { src: "/ls_mt360/ls_mt360_8.webp", alt: "LS MT 3.60 — zdjęcie 8" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Model silnika", "LS Mtron L3CRV-T7"],
        ["Typ", "3-cylindrowy turbodiesel, chłodzony cieczą"],
        ["Pojemność skokowa", "1 879 cm³"],
        ["Moc znamionowa", "42,5 kW / 57 KM"],
        ["Prędkość znamionowa", "2 600 obr./min"],
        ["Pojemność zbiornika paliwa", "47 L (CAB) / 40 L (ROPS)"],
        ["Filtr powietrza", "Suchy"],
      ],
    },
    {
      title: "Przekładnia i jazda",
      rows: [
        ["Wersja MEC", "Mechaniczna 32×16 z biegami pełzającymi"],
        ["Rewers (MEC)", "Synchro Shuttle"],
        ["Wersja HST", "Hydrostatyczna 3 zakresy / 3 zakresy wsteczne"],
        ["Tempomat (HST)", "Tak"],
        ["Prędkość maksymalna", "27,12 km/h (MEC) / 25,42 km/h (HST)"],
        ["Wspomaganie kierownicy", "Tak (15,6 l/min MEC / 20,8 l/min HST)"],
        ["Hamulce", "Dzielone, mokre"],
        ["Napęd", "4×4"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny", "Niezależny, mokre sprzęgło, wyłącznik elektrohydrauliczny"],
        ["Prędkości WOM tylnego", "540 (2 409 obr.) / 540E (1 710 obr.) / 1000 (2 381 obr.)"],
        ["WOM międzyosiowy", "Opcja — 2 000 obr./min"],
        ["Wydajność pompy hydraulicznej", "30,9 l/min (standard) / 60 l/min (opcja)"],
        ["TUZ", "Kategoria I"],
        ["Udźwig TUZ", "1 250 kg (na końcówkach kulowych)"],
        ["Wyjścia hydrauliczne", "8 sztuk w 4 sekcjach (4 z przodu, 4 z tyłu)"],
      ],
    },
    {
      title: "Wymiary i opony",
      rows: [
        ["Długość", "3 250 mm"],
        ["Szerokość", "od 1 530 mm (zależnie od opon)"],
        ["Wysokość (CAB / ROPS)", "2 330 mm / 2 645 mm"],
        ["Rozstaw osi", "1 858 mm"],
        ["Prześwit", "388 mm"],
        ["Promień skrętu", "2 890 mm"],
        ["Maks. kąt obrotu koła przedniego", "57°"],
        ["Masa (CAB)", "1 950 kg"],
        ["Masa (ROPS)", "1 720 kg"],
        ["Opony rolnicze", "9.5-16 / 13.6-24"],
        ["Opony trawiaste", "12-16.5 / 17.5L-24"],
      ],
    },
  ],
  salesArguments: [
    "Trzybiegowy WOM tylny — 540 / 540E / 1000",
    "Hydraulika do 60 l/min — szybka praca z TUR-em",
    "Wybór skrzyni: MEC 32+16 z biegami pełzającymi lub HST z tempomatem",
    "Udźwig TUZ 1 250 kg i 8 wyjść hydraulicznych",
    "Trzy warianty stanowiska — CAB, R.ROPS, F.ROPS",
  ],
};

export default function ModelLsMt360() {
  return <ModelPageLayout data={data} />;
}

import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-ls-mt350-cab-field.webp";
const cabFrontImg = "/model-ls-mt350-cab-front.webp";
const cabSideImg = "/model-ls-mt350-cab-side.webp";
const cabRearImg = "/model-ls-mt350-cab-rear.webp";
const cabPlowImg = "/model-ls-mt350-cab-plow.webp";
const cockpitImg = "/model-ls-mt350-cockpit.webp";
const ropsForestImg = "/model-ls-mt350-rops-forest.webp";
const ropsMeadowImg = "/model-ls-mt350-rops-meadow.webp";
const tireImg = "/model-ls-mt350-tire.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "MT3.50",
    full: "LS Tractor MT3.50",
    headline: "LS Tractor MT3.50",
    accent: "47 KM, udźwig 1 250 kg, trzy skrzynie i kabina premium.",
  },
  hero: {
    image: heroImg,
    alt: "LS Tractor MT3.50 — wersja z kabiną w polu",
    eyebrow: "LS Tractor / seria MT3 — kompakt 47 KM",
    description: (
      <>
        Wszechstronny kompakt LS Tractor o&nbsp;mocy <strong>47 KM</strong> z&nbsp;najbogatszym wyborem konfiguracji w&nbsp;segmencie: <strong>trzy warianty skrzyni</strong> (MEC F16/R16, MEC F32/R16 z&nbsp;pełzaczem lub&nbsp;HST), dwa nadwozia (ROPS lub&nbsp;kabina premium), TUZ <strong>1 250 kg</strong> i&nbsp;8 wyjść hydraulicznych. Od 102 500 PLN netto.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "47 KM" },
    { icon: Fuel, label: "Silnik", value: "LS Mtron L3CRV-T9A" },
    { icon: Wrench, label: "Skrzynia", value: "MEC F16/R16, MEC F32/R16 lub HST" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "1 250 kg (kat. I)" },
    { icon: ArrowRight, label: "Masa", value: "1 720 / 1 950 kg" },
    { icon: Tractor, label: "WOM tylny", value: "540 / 540E / 1000" },
  ],
  why: {
    eyebrow: "Dlaczego MT3.50",
    title: "Najwszechstronniejszy kompakt LS Tractor.",
    paragraphs: [
      <>MT3.50 to <strong>środkowy ciągnik serii MT3</strong> i&nbsp;jeden z&nbsp;najbardziej elastycznie konfigurowalnych modeli LS Tractor. Pod maską pracuje turbodoładowany <strong>silnik LS Mtron L3CRV-T9A o&nbsp;mocy 47 KM</strong>, a&nbsp;klient wybiera między trzema skrzyniami biegów.</>,
      <>Wersja <strong>MEC F16/R16</strong> z&nbsp;Synchro Shuttle to klasyczny wybór do&nbsp;gospodarstwa i&nbsp;pola. <strong>MEC F32/R16 z&nbsp;pełzaczami</strong> dodaje precyzję przy ciężkim osprzęcie i&nbsp;pracach hodowlanych. <strong>HST z&nbsp;tempomatem</strong> to komfort przy ładowaczu, kosiarce i&nbsp;odśnieżaniu.</>,
      <>Wyróżnikiem MT3.50 jest <strong>udźwig TUZ 1 250 kg</strong> — najwięcej w&nbsp;klasie 47 KM — oraz&nbsp;<strong>trzybiegowy WOM tylny</strong> (540 / 540E / 1000) i&nbsp;<strong>8 wyjść hydraulicznych</strong> w&nbsp;4 sekcjach.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik LS Mtron L3CRV-T9A",
      items: [
        "3-cylindrowy turbodiesel chłodzony cieczą",
        "Moc znamionowa 47 KM",
        "Suchy filtr powietrza z wstępnym separatorem",
      ],
    },
    {
      icon: Settings,
      title: "Trzy skrzynie do wyboru",
      items: [
        "MEC F16/R16 z Synchro Shuttle",
        "MEC F32/R16 z biegami pełzającymi",
        "HST z tempomatem",
        "Hydrostatyczne wspomaganie kierownicy",
        "Mokre, dzielone hamulce",
        "Napęd 4×4 dołączany",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny niezależny, mokre sprzęgło",
        "3 prędkości: 540 / 540E / 1000 obr/min",
        "WOM międzyosiowy 2 000 obr/min — opcja",
        "TUZ kat. I, udźwig 1 250 kg — najwięcej w klasie",
        "8 wyjść hydraulicznych w 4 sekcjach",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Dwa nadwozia",
      items: [
        "ROPS — masa 1 720 kg, składany",
        "Kabina premium — masa 1 950 kg",
        "Klimatyzacja, ogrzewanie, audio w kabinie",
        "Wyciszenie i komfortowy fotel z amortyzacją",
        "Pasy bezpieczeństwa, zewnętrzne LED",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie kabiny premium",
      items: [
        "Klimatyzacja w kabinie",
        "Ogrzewanie + nagrzewnica",
        "Radio i system audio",
        "Wycieraczki przednie i tylne",
        "Zewnętrzne oświetlenie LED",
        "Zamykana na klucz, wyciszona kabina",
        "Komfortowy fotel z amortyzacją",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie MT3.50 robi największą różnicę.",
    items: [
      { title: "Średnie gospodarstwa (15–40 ha)", description: "47 KM, udźwig TUZ 1 250 kg i pełzacze w skrzyni F32/R16 — pełna kontrola przy prasie zwijającej, agregacie 2,0 m, beczkowozie i pługu 2-skibowym." },
      { title: "Sady i plantacje premium", description: "Niska masa 1 720 kg w ROPS i wersja HST z tempomatem to komfort przy oprysku, kosiarce sadowniczej i transporcie owoców. Opony trawiaste w opcji." },
      { title: "Hodowla bydła i fermy", description: "Z ładowaczem TUR i hydrauliką 8-wyjściową MT3.50 sprawnie obsługuje stół paszowy, ścielenie boksów, transport beli słomy i wywóz obornika." },
      { title: "Usługi komunalne i parki", description: "Pakiet z kosiarką międzyosiową (WOM 2 000), pługiem śnieżnym i posypywarką — kabina z klimatyzacją i ogrzewaniem przez cały rok." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "MT3.50 w obu wersjach — kabina premium i ROPS.",
    images: [
      { src: cabFrontImg, alt: "MT3.50 — kabina, widok z przodu", emphasis: true },
      { src: heroImg, alt: "MT3.50 z kabiną w polu" },
      { src: cabSideImg, alt: "MT3.50 — kabina, widok z boku" },
      { src: cabRearImg, alt: "MT3.50 — kabina, widok z tyłu" },
      { src: cockpitImg, alt: "MT3.50 — kokpit operatora" },
      { src: ropsForestImg, alt: "MT3.50 — wersja ROPS w lesie" },
      { src: ropsMeadowImg, alt: "MT3.50 — wersja ROPS na łące" },
      { src: cabPlowImg, alt: "MT3.50 z pługiem komunalnym" },
      { src: tireImg, alt: "MT3.50 — opony AGRI / IND / TURF" },
      { src: "/ls_mt350/ls_mt350_1.webp", alt: "LS MT 3.50 — zdjęcie 1" },
      { src: "/ls_mt350/ls_mt350_2.webp", alt: "LS MT 3.50 — zdjęcie 2" },
      { src: "/ls_mt350/ls_mt350_3.webp", alt: "LS MT 3.50 — zdjęcie 3" },
      { src: "/ls_mt350/ls_mt350_4.webp", alt: "LS MT 3.50 — zdjęcie 4" },
      { src: "/ls_mt350/ls_mt350_5.webp", alt: "LS MT 3.50 — zdjęcie 5" },
      { src: "/ls_mt350/ls_mt350_6.webp", alt: "LS MT 3.50 — zdjęcie 6" },
      { src: "/ls_mt350/ls_mt350_7.webp", alt: "LS MT 3.50 — zdjęcie 7" },
      { src: "/ls_mt350/ls_mt350_8.webp", alt: "LS MT 3.50 — zdjęcie 8" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Model silnika", "LS Mtron L3CRV-T9A"],
        ["Typ", "3-cylindrowy turbodiesel, chłodzony cieczą"],
        ["Moc znamionowa", "47 KM"],
        ["Filtr powietrza", "Suchy z wstępnym separatorem"],
      ],
    },
    {
      title: "Przekładnia i jazda",
      rows: [
        ["Wersja MEC standard", "Mechaniczna F16/R16 z Synchro Shuttle"],
        ["Wersja MEC z pełzaczem", "F32/R16 z biegami pełzającymi"],
        ["Wersja HST", "Hydrostatyczna z tempomatem"],
        ["Wspomaganie kierownicy", "Hydrostatyczne"],
        ["Hamulce", "Mokre, dzielone"],
        ["Napęd", "4×4 dołączany"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny", "Niezależny, mokre sprzęgło"],
        ["Prędkości WOM tylnego", "540 / 540E / 1000 obr."],
        ["WOM międzyosiowy", "Opcja — 2 000 obr./min"],
        ["TUZ", "Kategoria I"],
        ["Udźwig TUZ", "1 250 kg"],
        ["Wyjścia hydrauliczne", "8 sztuk w 4 sekcjach"],
      ],
    },
    {
      title: "Wymiary, kabina, opony",
      rows: [
        ["Masa (ROPS)", "1 720 kg"],
        ["Masa (CAB)", "1 950 kg"],
        ["Kabina", "Fabryczna premium — klimatyzacja, ogrzewanie, audio"],
        ["Opony", "AGRI / IND / TURF — do wyboru"],
        ["Pałąk ROPS", "Składany, montaż przed lub za operatorem"],
      ],
    },
  ],
  salesArguments: [
    "Trzy skrzynie do wyboru: MEC, MEC z pełzaczem lub HST",
    "Udźwig TUZ 1 250 kg — najwięcej w klasie 47 KM",
    "Trzybiegowy WOM tylny — 540 / 540E / 1000",
    "8 wyjść hydraulicznych w 4 sekcjach",
    "Cena startowa: od 102 500 PLN netto",
  ],
};

export default function ModelLsMt350() {
  return <ModelPageLayout data={data} />;
}

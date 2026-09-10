import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import xj25Hero from "@assets/LS-Tractor-XJ25-HST-4-x-4-244-KM-24-1_1776839447149.webp";
import xj25Front from "@assets/LS-Tractor-XJ25-HST-4-x-4-244-KM-8_1776839447149.webp";
import xj25Field from "@assets/Traktor-dziewczyna-Tractor-girl-Ls-Tractor-1_1776839447150.webp";
import xj25Tires from "@assets/XJ25-opony_1776839447149.webp";
import xj25Studio from "@assets/XJ25_1776839447150.webp";
import xj25Mec from "@assets/LS-Tractor-XJ25-MEC-4-x-4-244-KM-6_1776839447149.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "XJ25 HST",
    full: "LS Tractor XJ25 HST",
    headline: "LS Tractor XJ25 HST",
    accent: "24,4 KM, hydrostatyczna skrzynia z tempomatem i ergonomia premium.",
  },
  hero: {
    image: xj25Hero,
    alt: "LS Tractor XJ25 HST — ujęcie z niskiego kąta",
    eyebrow: "LS Tractor / seria XJ — premium subkompakt HST",
    description: (
      <>
        Wersja hydrostatyczna popularnego XJ25 z&nbsp;silnikiem <strong>Mitsubishi S3L2-Z561GT</strong> 24,4 KM. Skrzynia <strong>HST 2+2 z&nbsp;tempomatem</strong>, prędkość 0–15,7 km/h, udźwig TUZ <strong>650 kg</strong>, WOM tylny + międzyosiowy w&nbsp;standardzie i&nbsp;japońska niezawodność. Szerokość zaledwie <strong>122 cm</strong> i&nbsp;5 lat gwarancji producenta.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "24,4 KM (18,2 kW)" },
    { icon: Fuel, label: "Silnik", value: "Mitsubishi S3L2-Z561GT, 1 318 cm³" },
    { icon: Wrench, label: "Skrzynia", value: "Hydrostatyczna 2/2 (HST)" },
    { icon: ArrowRight, label: "Prędkość maks.", value: "0–15,7 km/h" },
    { icon: Tractor, label: "Szerokość całkowita", value: "122 cm" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "650 kg (kat. I)" },
  ],
  why: {
    eyebrow: "Dlaczego XJ25 HST",
    title: "Hydrostatyka, Mitsubishi i 122 cm szerokości.",
    paragraphs: [
      <>XJ25 HST to wersja hydrostatyczna popularnego subkompaktowego ciągnika LS Tractor. Pod maską pracuje <strong>3-cylindrowy silnik Mitsubishi S3L2-Z561GT</strong> o&nbsp;pojemności 1 318 cm³ i&nbsp;mocy 24,4 KM — japońska szkoła niezawodności wykorzystywana m.in. w&nbsp;wózkach widłowych Cat i ładowarkach Bobcat.</>,
      <>Skrzynia <strong>hydrostatyczna HST z&nbsp;dwoma zakresami</strong> (low 0–6,8 km/h, high 0–15,7 km/h) i&nbsp;<strong>tempomatem</strong> oznacza jazdę bez sprzęgła i&nbsp;biegów. Operator steruje prędkością jednym pedałem — ogromnie ułatwia pracę z&nbsp;kosiarką, ładowaczem czy w&nbsp;manewrach na&nbsp;ciasnym podwórzu.</>,
      <>W stosunku do&nbsp;mniejszego MT1.25, XJ25 oferuje wyższy udźwig TUZ <strong>(650 kg vs 450 kg)</strong>, większy prześwit (285 mm), mocniejszą hydraulikę (21,4–22,9 l/min) i&nbsp;klasyczny układ wyjść hydraulicznych z&nbsp;tyłu. <strong>5-letnia gwarancja</strong> producenta potwierdza klasę maszyny.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Mitsubishi S3L2-Z561GT",
      items: [
        "3-cylindrowy diesel chłodzony cieczą",
        "Pojemność 1 318 cm³, moc 24,4 KM",
        "Prędkość znamionowa 2 700 obr/min",
        "Zbiornik 25 L, japońska niezawodność",
        "Suchy filtr powietrza",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia HST z tempomatem",
      items: [
        "Hydrostatyczna, 2 zakresy do przodu i 2 do tyłu",
        "Prędkość 0–6,8 km/h (low) / 0–15,7 km/h (high)",
        "Tempomat — jazda bez sprzęgła i biegów",
        "Hydrauliczne wspomaganie kierownicy",
        "Mokre, dzielone hamulce",
        "Napęd 4×4",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny niezależny — 540 obr/min, elektrohydrauliczny wyłącznik",
        "WOM międzyosiowy w standardzie — 2 000 obr/min",
        "Pompa hydrauliczna 21,4–22,9 l/min",
        "TUZ kat. I, udźwig 650 kg — najwięcej w klasie 25 KM",
        "2 wyjścia hydrauliczne w 1 sekcji (tył)",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Konstrukcja i mobilność",
      items: [
        "Szerokość zaledwie 122 cm — sad, tunel, posesja",
        "Prześwit 285 mm, promień skrętu 2 600 mm",
        "Składany pałąk ROPS",
        "Mokre dzielone hamulce",
        "Masa 830 kg (HST, bez balastu)",
        "Opony: rolnicze / IND / TURF",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie kabiny CAB (opcja)",
      items: [
        "Funkcja ogrzewania — istotna zimą",
        "Nagrzewnica z wężami",
        "System audio, oświetlenie wewnętrzne",
        "Wycieraczki przednie i tylne",
        "Zewnętrzne LED — 2 z przodu, 2 z tyłu",
        "Dwa lusterka boczne, osłona przeciwsłoneczna",
        "Zamki w drzwiach",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie XJ25 HST robi największą różnicę.",
    items: [
      { title: "Sady, plantacje i winnice", description: "Szerokość 122 cm i prześwit 285 mm pozwalają wjechać między rzędami drzew i krzewów. HST bez sprzęgła to idealne rozwiązanie do koszenia trawy w międzyrzędziach." },
      { title: "Małe gospodarstwa rolne", description: "Udźwig TUZ 650 kg, hydraulika 21,4–22,9 l/min i WOM 540 — wystarczająca moc do glebogryzarki, kosiarki rotacyjnej, beczkowozu czy lekkiego pługa." },
      { title: "Tereny zielone, parki i posesje", description: "Z kosiarką międzyosiową, ładowaczem TUR LL2101 i pługiem śnieżnym XJ25 HST obsłuży hotele, ośrodki agroturystyczne i duże posesje przez cały rok." },
      { title: "Stadniny i hodowla zwierząt", description: "Niska, kompaktowa konstrukcja sprawdza się w obejściu stajni, podczas ścielenia boksów i przy pracy z lekką przyczepą paszową lub obornikową." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "XJ25 HST — sad, pole, studio.",
    images: [
      { src: xj25Hero, alt: "XJ25 HST — ujęcie z niskiego kąta", emphasis: true },
      { src: xj25Field, alt: "XJ25 HST w polu" },
      { src: xj25Front, alt: "XJ25 HST od przodu w lesie brzozowym" },
      { src: xj25Mec, alt: "XJ25 — wersja R.ROPS z boku" },
      { src: xj25Studio, alt: "XJ25 — ujęcie studyjne 3/4" },
      { src: xj25Tires, alt: "XJ25 — trzy rodzaje opon" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Model silnika", "Mitsubishi S3L2-Z561GT"],
        ["Typ", "3-cylindrowy diesel, chłodzony cieczą"],
        ["Pojemność skokowa", "1 318 cm³"],
        ["Moc znamionowa", "18,2 kW / 24,4 KM"],
        ["Prędkość znamionowa", "2 700 obr./min"],
        ["Pojemność zbiornika paliwa", "25 L"],
        ["Filtr powietrza", "Suchy"],
      ],
    },
    {
      title: "Przekładnia HST i jazda",
      rows: [
        ["Typ", "Hydrostatyczna (HST)"],
        ["Liczba zakresów", "2 do przodu / 2 do tyłu"],
        ["Prędkość jazdy", "0–6,8 km/h (low) / 0–15,7 km/h (high)"],
        ["Tempomat", "Tak (w wersji HST)"],
        ["Wspomaganie kierownicy", "Tak (hydrauliczne)"],
        ["Hamulce", "Dzielone, mokre"],
        ["Napęd", "4×4"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny", "Niezależny, mokre sprzęgło, wyłącznik elektrohydrauliczny — 540 obr./min"],
        ["WOM międzyosiowy", "W standardzie — 2 000 obr./min"],
        ["Wydajność pompy hydraulicznej (HST)", "21,4–22,9 l/min"],
        ["TUZ", "Kategoria I"],
        ["Udźwig TUZ", "650 kg (na końcówkach kulowych)"],
        ["Wyjścia hydrauliczne", "2 sztuki w 1 sekcji (z tyłu)"],
      ],
    },
    {
      title: "Wymiary i opony",
      rows: [
        ["Długość", "2 742 mm"],
        ["Szerokość", "1 200–1 270 mm (zależnie od opon)"],
        ["Wysokość (CAB / ROPS)", "2 458 mm"],
        ["Rozstaw osi", "1 500 mm"],
        ["Prześwit", "285 mm"],
        ["Promień skrętu (4WD)", "2 600 mm"],
        ["Maks. kąt obrotu koła przedniego", "47°"],
        ["Masa (HST, bez balastu)", "830 kg"],
        ["Opony rolnicze", "6-12 / 9.5-16"],
        ["Opony industrialne (IND)", "23×8.50-12 / 305/70-16.5"],
        ["Opony trawiaste (TURF)", "23×8.50-12NHS / 320/65-16.5"],
      ],
    },
  ],
  salesArguments: [
    "Hydrostatyka HST z tempomatem — jazda bez sprzęgła",
    "Silnik Mitsubishi 1 318 cm³ — japońska niezawodność",
    "Szerokość 122 cm — sad, tunel, posesja",
    "Udźwig TUZ 650 kg — najwięcej w klasie 25 KM",
    "WOM międzyosiowy 2 000 obr w standardzie",
    "5 lat gwarancji producenta",
  ],
};

export default function ModelLsXj25Hst() {
  return <ModelPageLayout data={data} />;
}

import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import xj25Mec from "@assets/LS-Tractor-XJ25-MEC-4-x-4-244-KM-6_1776839447149.webp";
import xj25Hero from "@assets/LS-Tractor-XJ25-HST-4-x-4-244-KM-24-1_1776839447149.webp";
import xj25Front from "@assets/LS-Tractor-XJ25-HST-4-x-4-244-KM-8_1776839447149.webp";
import xj25Field from "@assets/Traktor-dziewczyna-Tractor-girl-Ls-Tractor-1_1776839447150.webp";
import xj25Tires from "@assets/XJ25-opony_1776839447149.webp";
import xj25Studio from "@assets/XJ25_1776839447150.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "XJ25 MEC",
    full: "LS Tractor XJ25 MEC",
    headline: "LS Tractor XJ25 MEC",
    accent: "24,4 KM, klasyczna skrzynia mechaniczna 6+2 i japońska niezawodność Mitsubishi.",
  },
  hero: {
    image: xj25Mec,
    alt: "LS Tractor XJ25 MEC — wersja z mechaniczną skrzynią biegów",
    eyebrow: "LS Tractor / seria XJ — premium subkompakt MEC",
    description: (
      <>
        Wersja mechaniczna popularnego XJ25 z&nbsp;silnikiem <strong>Mitsubishi S3L2-Z561GT</strong> 24,4 KM. Klasyczna skrzynia <strong>6F+2R</strong>, prędkość 1,30–18,66 km/h, udźwig TUZ <strong>650 kg</strong>, WOM tylny + międzyosiowy w&nbsp;standardzie i&nbsp;japońska niezawodność. Szerokość zaledwie <strong>122 cm</strong> i&nbsp;5 lat gwarancji producenta.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "24,4 KM (18,2 kW)" },
    { icon: Fuel, label: "Silnik", value: "Mitsubishi S3L2-Z561GT, 1 318 cm³" },
    { icon: Wrench, label: "Skrzynia", value: "Mechaniczna 6F+2R" },
    { icon: ArrowRight, label: "Prędkość maks.", value: "1,30–18,66 km/h" },
    { icon: Tractor, label: "Szerokość całkowita", value: "122 cm" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "650 kg (kat. I)" },
  ],
  why: {
    eyebrow: "Dlaczego XJ25 MEC",
    title: "Klasyczna mechanika, Mitsubishi i 122 cm szerokości.",
    paragraphs: [
      <>XJ25 MEC to wersja z&nbsp;mechaniczną skrzynią biegów popularnego subkompaktowego ciągnika LS Tractor. Pod maską pracuje <strong>3-cylindrowy silnik Mitsubishi S3L2-Z561GT</strong> o&nbsp;pojemności 1 318 cm³ i&nbsp;mocy 24,4 KM — japońska szkoła niezawodności wykorzystywana m.in. w&nbsp;wózkach widłowych Cat i ładowarkach Bobcat.</>,
      <>Klasyczna skrzynia <strong>mechaniczna 6 biegów do&nbsp;przodu i&nbsp;2 do&nbsp;tyłu</strong> ze&nbsp;sprzęgłem suchym jednotarczowym to rozwiązanie sprawdzone, ekonomiczne i&nbsp;bardzo wygodne w&nbsp;użyciu. Pozwala precyzyjnie dopasować prędkość do&nbsp;wykonywanej pracy — od&nbsp;wolnej orki (1,30 km/h) po&nbsp;szybki transport (18,66 km/h).</>,
      <>W stosunku do&nbsp;mniejszego MT1.25, XJ25 oferuje wyższy udźwig TUZ <strong>(650 kg)</strong>, większy prześwit (285 mm), mocną hydraulikę i&nbsp;klasyczny układ wyjść hydraulicznych z&nbsp;tyłu. Maszyna jest gotowa pod ładowacz czołowy <strong>LS LL2101</strong>, a&nbsp;<strong>5-letnia gwarancja</strong> producenta potwierdza jej klasę.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Mitsubishi S3L2-Z561GT",
      items: [
        "3-cylindrowy diesel chłodzony cieczą",
        "Pojemność 1 318 cm³, moc 24,4 KM",
        "Moment obrotowy 70,8 Nm @ 2 200 obr/min",
        "Prędkość znamionowa 2 700 obr/min",
        "Zbiornik 25 L, japońska niezawodność",
      ],
    },
    {
      icon: Settings,
      title: "Mechaniczna skrzynia 6+2",
      items: [
        "Klasyczna skrzynia mechaniczna 6F + 2R",
        "Prędkość 1,30–18,66 km/h (do przodu)",
        "Sprzęgło suche, jednotarczowe",
        "Hydrauliczne wspomaganie kierownicy (3/3 obrotu)",
        "Mokre hamulce z blokadą mechanizmu różnicowego",
        "Napęd 4×4",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny — 540 obr/min (1 prędkość)",
        "WOM międzyosiowy w standardzie — 2 000 obr/min",
        "TUZ kat. I, udźwig 650 kg — najwięcej w klasie 25 KM",
        "2 wyjścia hydrauliczne w 1 sekcji (tył)",
        "Gotowy pod ładowacz czołowy LS LL2101",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Konstrukcja i mobilność",
      items: [
        "Szerokość zaledwie 122 cm — sad, tunel, posesja",
        "Prześwit 285 mm, promień skrętu 2 200 mm",
        "Maks. kąt obrotu koła przedniego ±47°",
        "Składany pałąk ROPS",
        "Masa 890 kg",
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
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie XJ25 MEC robi największą różnicę.",
    items: [
      { title: "Sady, plantacje i winnice", description: "Szerokość 122 cm i prześwit 285 mm pozwalają wjechać między rzędami drzew i krzewów. Klasyczna skrzynia daje pełną kontrolę nad prędkością przy oprysku czy koszeniu." },
      { title: "Małe gospodarstwa rolne", description: "Udźwig TUZ 650 kg, mocna hydraulika i WOM 540 — wystarczająca moc do glebogryzarki, kosiarki rotacyjnej, beczkowozu czy lekkiego pługa." },
      { title: "Tereny zielone, parki i posesje", description: "Z kosiarką międzyosiową, ładowaczem TUR LL2101 i pługiem śnieżnym XJ25 MEC obsłuży hotele, ośrodki agroturystyczne i duże posesje przez cały rok." },
      { title: "Stadniny i hodowla zwierząt", description: "Niska, kompaktowa konstrukcja sprawdza się w obejściu stajni, podczas ścielenia boksów i przy pracy z lekką przyczepą paszową lub obornikową." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "XJ25 MEC — pole, sad, studio.",
    images: [
      { src: xj25Mec, alt: "XJ25 MEC — wersja z mechaniczną skrzynią biegów", emphasis: true },
      { src: xj25Field, alt: "XJ25 w polu" },
      { src: xj25Front, alt: "XJ25 od przodu w lesie brzozowym" },
      { src: xj25Hero, alt: "XJ25 — ujęcie z niskiego kąta" },
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
        ["Moment obrotowy", "70,8 Nm przy 2 200 obr./min"],
        ["Prędkość znamionowa", "2 700 obr./min"],
        ["Pojemność zbiornika paliwa", "25 L"],
      ],
    },
    {
      title: "Przekładnia mechaniczna i jazda",
      rows: [
        ["Typ", "Mechaniczna"],
        ["Liczba biegów", "6 do przodu / 2 do tyłu"],
        ["Rewers", "Nie"],
        ["Prędkość jazdy", "1,30–18,66 km/h (do przodu)"],
        ["Sprzęgło", "Suche, jednotarczowe"],
        ["Tempomat", "Nie"],
        ["Wspomaganie kierownicy", "Tak (hydrauliczne), 3/3 obrotu"],
        ["Hamulce", "Mokre"],
        ["Blokada mechanizmu różnicowego", "Tak"],
        ["Napęd", "4×4"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny", "540 obr./min (1 prędkość)"],
        ["WOM międzyosiowy", "W standardzie — 2 000 obr./min"],
        ["TUZ", "3-punktowy, kategoria I"],
        ["Udźwig TUZ", "650 kg (na końcówkach kulowych)"],
        ["Wyjścia hydrauliczne", "2 sztuki w 1 sekcji (z tyłu)"],
      ],
    },
    {
      title: "Wymiary i opony",
      rows: [
        ["Długość całkowita", "2 742 mm"],
        ["Szerokość całkowita z oponami", "1 220 mm"],
        ["Wysokość do pałąka ROPS", "2 458 mm"],
        ["Rozstaw osi", "1 500 mm"],
        ["Prześwit", "285 mm"],
        ["Promień skrętu", "2 200 mm"],
        ["Maks. kąt obrotu koła przedniego", "±47°"],
        ["Rozstaw kół przód / tył", "909 / 856 mm (stały)"],
        ["Masa", "890 kg"],
        ["Opony rolnicze", "6-12 / 9.5-16"],
      ],
    },
  ],
  salesArguments: [
    "Klasyczna skrzynia mechaniczna 6+2 — sprawdzona i ekonomiczna",
    "Silnik Mitsubishi 1 318 cm³ — japońska niezawodność",
    "Szerokość 122 cm — sad, tunel, posesja",
    "Udźwig TUZ 650 kg — najwięcej w klasie 25 KM",
    "WOM międzyosiowy 2 000 obr w standardzie",
    "5 lat gwarancji producenta",
  ],
};

export default function ModelLsXj25Mec() {
  return <ModelPageLayout data={data} />;
}

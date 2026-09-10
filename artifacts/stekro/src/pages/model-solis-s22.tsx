import { ArrowRight, Fuel, Gauge, Lightbulb, Package, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import s22Studio from "@assets/solis-22-agri-tyre-1_1776837766482.webp";
import s22Forest from "@assets/S22_1_1776837766479.webp";
import s22Side from "@assets/S22_3_1776837766481.webp";
import s22Hitch from "@assets/S22_2_1776837766480.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S22",
    full: "Solis S22 4WD",
    headline: "Solis S22 4WD",
    accent: "22 konie i 1,13 litra — kompakt z charakterem rolnika.",
  },
  hero: {
    image: s22Studio,
    alt: "Solis S22 4WD",
    eyebrow: "Solis / seria S",
    description: (
      <>
        Trzycylindrowy silnik <strong>ITL GTV BB</strong> o&nbsp;pojemności 1,13 litra, moment <strong>55 Nm</strong>, hydrauliczny TUZ <strong>600 kg</strong> i&nbsp;klasyczne centralne mocowanie dźwigni biegów. Najmocniejszy z&nbsp;subkompaktów Solisa — z&nbsp;systemem <strong>Operator Presence Control</strong> i&nbsp;pełnym pakietem zabezpieczeń.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc silnika", value: "22 KM" },
    { icon: Tractor, label: "Silnik", value: "ITL GTV BB 3-cyl." },
    { icon: Wrench, label: "Napęd", value: "4WD" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "600 kg" },
    { icon: ArrowRight, label: "Moment obrotowy", value: "55 Nm" },
    { icon: Fuel, label: "Pojemność silnika", value: "1 130 cm³" },
  ],
  why: {
    eyebrow: "Pojemność robi różnicę",
    title: "1,13 litra pojemności i 55 Nm momentu — najmocniejszy z subkompaktów Solisa.",
    paragraphs: [
      <>Solis S22 wyposażono w&nbsp;trzycylindrowy silnik ITL Make-GTV BB o&nbsp;pojemności <strong>1 130 cm³</strong>. To znacznie więcej niż w&nbsp;S16 i&nbsp;S20, dzięki czemu maszyna utrzymuje obroty robocze nawet pod większym obciążeniem — przy ciężkim ładowaczu, glebogryzarce czy bronie talerzowej.</>,
      "W przeciwieństwie do S20 producent zastosował tu klasyczną dźwignię biegów w mocowaniu centralnym. To rozwiązanie znane z większych ciągników rolniczych — stabilne, intuicyjne i preferowane przez kierowców z doświadczeniem na tradycyjnych traktorach.",
      <>Sercem bezpieczeństwa jest system <strong>Operator Presence Control</strong>: jeśli operator opuści fotel z&nbsp;włączoną przekładnią, ciągnik automatycznie zatrzymuje napęd i&nbsp;WOM. Rozwiązanie z&nbsp;wyższych klas dostępne już w&nbsp;segmencie subkompaktów.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik ITL GTV BB",
      items: [
        "3-cylindrowy diesel, chłodzony cieczą, wolnossący",
        "Pojemność 1 130 cm³, moc 22 KM, moment 55 Nm",
        "Suchy filtr powietrza z czujnikiem zatkania",
        "Standardowy preheater do rozruchu w niskich temperaturach",
        "Tłumik wydechu w komorze silnika, wylot w dół",
      ],
    },
    {
      icon: Settings,
      title: "Napęd, skrzynia i hamulce",
      items: [
        "Skrzynia mechaniczna z centralnym mocowaniem dźwigni (center shift)",
        "Napęd 4×4 — przełączalny",
        "Hydrauliczne wspomaganie kierownicy",
        "Hamulce mokre w kąpieli olejowej",
        "Blokada mechanizmu różnicowego",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny 540 / 1000 obr./min",
        "Hydrauliczny TUZ kat. I o udźwigu 600 kg",
        "2 wyjścia hydrauliczne / 1 sekcja — rozszerzalne",
        "Zaczep dolny do przyczepy",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Bezpieczeństwo i widoczność",
      items: [
        "Operator Presence Control — automatyczne zatrzymanie po opuszczeniu fotela",
        "Bliźniacze reflektory projektorowe (twin projector)",
        "Pałąk ROPS i pas bezpieczeństwa w standardzie",
        "Cztery opcje ogumienia: rolnicze, przemysłowe, trawnikowe, Galaxy Pro",
        "Mały promień skrętu — praca w ciasnych przestrzeniach",
      ],
    },
    {
      icon: Package,
      title: "Osprzęt fabryczny",
      items: [
        "Ładowacz czołowy Solis — palety, ziemia, piasek, żwir",
        "Koparka tylna (Back Hoe) — drenaż, fundamenty, melioracja, prace krajobrazowe",
      ],
    },
    {
      icon: Lightbulb,
      title: "Dodatkowe wyposażenie u dealera",
      items: [
        "Glebogryzarka i kosiarka bijakowa",
        "Pług do śniegu, posypywarka, zamiatarka",
        "Przyczepa o ładowności do 1 200 kg",
        "Opryskiwacz sadowniczy",
        "Brona talerzowa lub wirnikowa",
        "Przedni TUZ i WOM przedni",
      ],
    },
  ],
  useCases: {
    eyebrow: "Dla kogo jest Solis S22",
    title: "Cztery profile użytkowników, którym 22 KM wystarczy do wszystkiego.",
    items: [
      { title: "Małe gospodarstwa rolne", description: "Większy moment obrotowy 55 Nm i 22 KM mocy radzą sobie z cięższym osprzętem rolniczym przy zachowaniu kompaktowych gabarytów." },
      { title: "Hobby i agroturystyka", description: "Cichobieżny, ekonomiczny i bezpieczny — model rekomendowany przez Solis właśnie do gospodarstw hobbystycznych." },
      { title: "Sady, winnice i szkółki", description: "Wąska sylwetka pozwala manewrować między rzędami z opryskiwaczem, kosiarką sadowniczą lub glebogryzarką." },
      { title: "Tereny zielone i sektor komunalny", description: "Z oponami trawnikowymi do utrzymania boisk, parków i pasów zieleni; z agresywnym bieżnikiem do prac terenowych." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Solis S22 — studio, las, codzienna praca.",
    images: [
      { src: s22Studio, alt: "Solis S22 — widok studyjny", emphasis: true },
      { src: s22Forest, alt: "Solis S22 na leśnej drodze" },
      { src: s22Side, alt: "Solis S22 — widok boczny" },
      { src: s22Hitch, alt: "Solis S22 — TUZ z tyłu" },
      { src: "/solis_s22/20231114_142729.webp", alt: "Solis S22 — zdjęcie 1" },
      { src: "/solis_s22/20231114_142732.webp", alt: "Solis S22 — zdjęcie 2" },
      { src: "/solis_s22/20231114_142744.webp", alt: "Solis S22 — zdjęcie 3" },
      { src: "/solis_s22/20231114_142751.webp", alt: "Solis S22 — zdjęcie 4" },
      { src: "/solis_s22/20231114_142810.webp", alt: "Solis S22 — zdjęcie 5" },
      { src: "/solis_s22/20231215_141648.webp", alt: "Solis S22 — zdjęcie 6" },
      { src: "/solis_s22/20240911_124908.webp", alt: "Solis S22 — zdjęcie 7" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Producent", "ITL Make-GTV BB"],
        ["Typ", "3-cylindrowy diesel, chłodzony cieczą, wolnossący"],
        ["Moc znamionowa", "22 KM"],
        ["Pojemność skokowa", "1 130 cm³ (1,13 L)"],
        ["Prędkość znamionowa", "2 700 obr./min (±25)"],
        ["Maksymalny moment obrotowy", "55 Nm"],
        ["Filtr powietrza", "Suchy, z czujnikiem zatkania"],
        ["Rozruch w niskich temperaturach", "Standard (preheater)"],
        ["Tłumik wydechu", "W komorze silnika, wylot w dół"],
      ],
    },
    {
      title: "Przekładnia, napęd i hamulce",
      rows: [
        ["Typ skrzyni", "Mechaniczna"],
        ["Mocowanie głównej dźwigni biegów", "Centralne (center shift)"],
        ["Napęd", "4×4 (4WD) — przełączalny"],
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
        ["Udźwig TUZ", "600 kg"],
        ["Wyjścia hydrauliczne", "2 sztuki / 1 sekcja (rozszerzalne)"],
        ["Zaczep do przyczepy", "Dolny"],
      ],
    },
    {
      title: "Bezpieczeństwo i ogumienie",
      rows: [
        ["Operator Presence Control", "Tak — automatyczne zatrzymanie"],
        ["Reflektory", "Bliźniacze projektorowe (twin projector)"],
        ["Opcje ogumienia", "Rolnicze / przemysłowe / trawnikowe / Galaxy Pro"],
        ["Pałąk ochronny", "ROPS w standardzie"],
        ["Pas bezpieczeństwa", "Standard"],
        ["Promień skrętu", "Mały — praca w ciasnych przestrzeniach"],
      ],
    },
  ],
  salesArguments: [
    "Największa pojemność w klasie — 1,13 L i 55 Nm momentu",
    "Klasyczne centralne mocowanie dźwigni biegów",
    "Operator Presence Control — bezpieczeństwo z wyższych klas",
    "Mokre hamulce, ROPS, twin projector — pełen pakiet",
    "Magazyn części Stekro MiniTrak i serwis na miejscu w Brzeznej",
  ],
};

export default function ModelSolisS22() {
  return <ModelPageLayout data={data} />;
}

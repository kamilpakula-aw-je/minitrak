import { ArrowRight, Fuel, Gauge, Lightbulb, Package, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import s16Side from "@assets/Zmieniono_rozmiar_20220928_105248_1776837252966.webp";
import s16Cockpit from "@assets/SOLSI_16_4WD_1776837252965.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S16",
    full: "Solis S16 4WD",
    headline: "Solis S16 4WD",
    accent: "mały gigant do każdego ogrodu.",
  },
  hero: {
    image: s16Side,
    alt: "Solis S16 4WD",
    eyebrow: "Solis / seria S",
    description: (
      <>
        Trzycylindrowy diesel <strong>18 KM</strong>, napęd <strong>4×4</strong>, hydrauliczne wspomaganie i&nbsp;TUZ kat. I o&nbsp;udźwigu <strong>500 kg</strong> — wszystko w&nbsp;obrysie 2,7 × 0,95 m. Solis S16 to kompakt, który mieści się tam, gdzie większe ciągniki muszą zawrócić.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc silnika", value: "18 KM" },
    { icon: Tractor, label: "Silnik", value: "ITL 3-cyl. Diesel" },
    { icon: Wrench, label: "Napęd", value: "4WD" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "500 kg" },
    { icon: ArrowRight, label: "Skrzynia", value: "Mechaniczna 6+2" },
    { icon: Fuel, label: "Zbiornik paliwa", value: "26 L" },
  ],
  why: {
    eyebrow: "Indyjski producent z reputacją",
    title: "Marka Solis to 300 000 ciągników rocznie i 1 800 dealerów na świecie.",
    paragraphs: [
      "Solis ITL to jeden z największych producentów ciągników w Indiach — z udziałem rynkowym około 14% i ponad 5 000 pracowników. Marka zdobyła silną pozycję eksportową dzięki niskiej awaryjności, ekonomicznym silnikom i zaawansowanej technologii produkcyjnej.",
      "Seria S to kompaktowe ciągniki 4×4 zaprojektowane dla mniejszych gospodarstw, sadowników, działkowiczów i służb komunalnych — prostota obsługi, wysoka kultura pracy i kompatybilność z szeroką gamą osprzętu fabrycznego oraz partnerskiego.",
      "Solis S16 to model wejściowy serii: 18 KM, mechaniczna skrzynia 6+2, hydrauliczne wspomaganie i TUZ kategorii I. Maszyna spełnia normy emisji i bezpieczeństwa, a zapas części jest dostępny w naszym magazynie centralnym.",
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik",
      items: [
        "Trzycylindrowy diesel z chłodzeniem cieczowym i pojemnością 979 cm³",
        "Moc 18 KM przy 2 700 obr/min, moment 48 Nm",
        "Suchy filtr powietrza z czujnikiem zatkania — sygnalizacja serwisu",
        "Zbiornik paliwa 26 L",
      ],
    },
    {
      icon: Settings,
      title: "Napęd i skrzynia",
      items: [
        "Skrzynia mechaniczna 6 biegów do przodu / 2 wsteczne",
        "Napęd 4×4 sprzęgany w trakcie jazdy",
        "Hydrauliczne wspomaganie kierownicy — lekka, precyzyjna jazda",
        "Blokada mechanizmu różnicowego do pracy w trudnych warunkach",
        "Hamulce mechaniczne, suche, z hamulcem ręcznym",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny z dwiema prędkościami: 540 i 1000 obr/min",
        "TUZ kategorii I o udźwigu 500 kg",
        "Dwa wyjścia hydrauliczne w jednej sekcji do rozdzielacza",
        "Zaczep dolny do przyczepy",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Bezpieczeństwo i komfort",
      items: [
        "Pałąk bezpieczeństwa ROPS i pas zapinany w standardzie",
        "Komfortowy fotel z regulacją położenia i wagi operatora",
        "Promień skrętu 3,3 m — manewrowanie w ciasnych przestrzeniach",
        "Szerokość z oponami 945 mm — przejazd przez bramki sadownicze",
      ],
    },
    {
      icon: Package,
      title: "Osprzęt fabryczny Solis",
      items: [
        "Ładowacz czołowy z łyżką",
        "Przedni TUZ",
        "Pług do śniegu",
        "Kabina ogrzewana",
        "Przyczepa o ładowności 1 000 kg",
        "Glebogryzarka, kosiarka bijakowa, rozdrabniacz",
      ],
    },
    {
      icon: Lightbulb,
      title: "Osprzęt partnerski",
      items: [
        "Zamiatarka mechaniczna",
        "Mini-koparka zaczepiana",
        "Łuparka do drewna",
        "Rozsiewacz / posypywarka soli i piasku",
        "Szersze koła: rolnicze, przemysłowe lub trawiaste",
      ],
    },
  ],
  useCases: {
    eyebrow: "Dla kogo jest Solis S16",
    title: "Cztery scenariusze, w których ten kompakt nie ma sobie równych.",
    items: [
      { title: "Sady i winnice", description: "Szerokość 945 mm pozwala wjechać między rzędy drzew i krzewów bez ryzyka uszkodzenia roślin." },
      { title: "Szklarnie i tunele foliowe", description: "Niewielki promień skrętu 3,3 m i kompaktowe gabaryty dają swobodę manewru w ciasnych przestrzeniach." },
      { title: "Posesje i zieleń miejska", description: "Współpraca z kosiarką bijakową, glebogryzarką, zamiatarką i pługiem do śniegu — narzędzie sezonowe i całoroczne." },
      { title: "Hobby i agroturystyka", description: "Prosta obsługa zachęca także użytkowników bez doświadczenia rolniczego, a niska awaryjność ogranicza przestoje." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Solis S16 — widok studyjny i stanowisko operatora.",
    images: [
      { src: s16Side, alt: "Solis S16 4WD — widok boczny", emphasis: true },
      { src: s16Cockpit, alt: "Stanowisko operatora Solis S16" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Marka", "Solis (ITL)"],
        ["Typ", "3-cylindrowy diesel, chłodzony cieczą"],
        ["Moc znamionowa", "18 KM"],
        ["Pojemność skokowa", "979 cm³"],
        ["Prędkość znamionowa", "2 700 obr./min"],
        ["Moment obrotowy", "48 Nm"],
        ["Filtr powietrza", "Suchy, z czujnikiem zatkania"],
        ["Zbiornik paliwa", "26 L"],
      ],
    },
    {
      title: "Przekładnia i napęd",
      rows: [
        ["Typ skrzyni", "Mechaniczna"],
        ["Liczba biegów", "6 do przodu / 2 do tyłu"],
        ["Prędkość jazdy", "1,36 – 15,1 km/h"],
        ["Sprzęgło", "Jednostopniowe"],
        ["Napęd", "4×4 (4WD)"],
        ["Wspomaganie kierownicy", "Hydrauliczne"],
        ["Blokada mechanizmu różnicowego", "Tak"],
        ["Hamulce", "Mechaniczne, suche"],
        ["Hamulec ręczny", "Tak"],
      ],
    },
    {
      title: "WOM, TUZ i hydraulika",
      rows: [
        ["WOM tylny", "540 / 1000 obr./min"],
        ["TUZ", "Kategoria I, 3-punktowy"],
        ["Udźwig TUZ", "500 kg"],
        ["Wyjścia hydrauliczne", "2 sztuki / 1 sekcja"],
        ["Zaczep do przyczepy", "Dolny"],
      ],
    },
    {
      title: "Wymiary i ogumienie",
      rows: [
        ["Długość", "2 735 mm"],
        ["Szerokość z oponami", "945 mm"],
        ["Wysokość", "1 945 mm"],
        ["Rozstaw osi", "1 420 mm"],
        ["Promień skrętu", "3 300 mm"],
        ["Prześwit", "200 mm"],
        ["Rozstaw kół (przód / tył)", "805 mm / 715 mm"],
        ["Opony (przód / tył)", "5-12 / 8-18 (rolnicze)"],
        ["Masa własna", "970 kg"],
        ["Akumulator", "12 V"],
        ["ROPS i pas", "Tak"],
      ],
    },
  ],
  salesArguments: [
    "Prosta budowa i niskie koszty eksploatacji",
    "Mechaniczna prostota — łatwy serwis i naprawy",
    "Mieści się tam, gdzie inne ciągniki nie wjadą",
    "WOM 540 i 1000 obr/min — pełna kompatybilność z osprzętem",
    "Magazyn części Stekro MiniTrak i serwis na miejscu",
  ],
};

export default function ModelSolisS16() {
  return <ModelPageLayout data={data} />;
}

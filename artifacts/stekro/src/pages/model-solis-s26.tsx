import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import s26Hero from "@assets/Ciągnik_Solis_26_4WD_9+9_1776838306215.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S26",
    full: "Solis S26 9+9 4WD",
    headline: "Solis S26 9+9 4WD",
    accent: "75 Nm momentu, 1,3 litra Mitsubishi i kabina na cały rok.",
  },
  hero: {
    image: s26Hero,
    alt: "Solis S26 4WD",
    eyebrow: "Solis / seria S — bestseller",
    description: (
      <>
        Bestseller subkompaktów Solis: silnik <strong>Mitsubishi MVS3L2 1,3 L</strong> z&nbsp;bezpośrednim wtryskiem, hamulce tarczowe w&nbsp;kąpieli olejowej, hydrauliczny TUZ <strong>600 kg</strong> i&nbsp;skrzynia <strong>9F+9R</strong>. Z opcjonalną kabiną ogrzewaną pracuje od&nbsp;pierwszej orki w&nbsp;marcu po&nbsp;ostatnie odśnieżanie w&nbsp;lutym.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "24,5 KM" },
    { icon: Tractor, label: "Silnik", value: "Mitsubishi MVS3L2" },
    { icon: Wrench, label: "Napęd", value: "4WD" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "600 kg" },
    { icon: ArrowRight, label: "Moment obrotowy", value: "75,2 Nm" },
    { icon: Fuel, label: "Pojemność silnika", value: "1 318 cm³" },
  ],
  why: {
    eyebrow: "Dlaczego S26 to bestseller",
    title: "Skok mocy i komfortu, na który czekają klienci kupujący swój pierwszy ciągnik.",
    paragraphs: [
      <>Solis S26 4WD to model, w&nbsp;który najczęściej celują klienci Stekro MiniTrak, gdy pierwszy raz wymieniają stary jednoosiowy traktorek na&nbsp;pełnoprawny ciągnik. Pojemność <strong>1 318 cm³</strong> i&nbsp;moment <strong>75,2 Nm</strong> ustawiają go o&nbsp;klasę wyżej od&nbsp;subkompaktów S20 i&nbsp;S22, a&nbsp;jednocześnie maszyna nadal mieści się w&nbsp;typowej bramie gospodarczej (szerokość zaledwie 1 058 mm).</>,
      <>Producent zastosował tu hamulce <strong>tarczowe w&nbsp;kąpieli olejowej</strong> — niemal bezobsługowe, bezpieczne i&nbsp;odporne na&nbsp;zużycie. Promień skrętu z&nbsp;hamulcami wynosi tylko 2,1 m, co czyni S26 zaskakująco zwrotnym w&nbsp;sadach i&nbsp;przy pracach komunalnych.</>,
      "W standardzie jest WOM 540/1000 obr./min ze sprzęgłem suchym, jeden rozdzielacz hydrauliczny i mechaniczne sterowanie podnośnikiem. Opcjonalna ogrzewana kabina, radio i wybór trzech wariantów ogumienia pozwalają dopasować maszynę do konkretnego zastosowania.",
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Mitsubishi MVS3L2",
      items: [
        "3-cylindrowy diesel z bezpośrednim wtryskiem",
        "Pojemność 1 318 cm³, moc 24,5 KM, moment 75,2 Nm @ 2 200 obr/min",
        "Stopień sprężania 22:1 — niskie zużycie paliwa (~323 g/kWh)",
        "Mokry filtr powietrza i preheater do zimnego startu",
        "Zbiornik paliwa 32 L, miska oleju 4,2 L",
      ],
    },
    {
      icon: Settings,
      title: "Napęd, skrzynia i hamulce",
      items: [
        "Skrzynia mechaniczna 9F + 9R (3 zakresy × 3 biegi)",
        "Dostępna w wersji z ramą ROPS lub z ogrzewaną kabiną",
        "Napęd 4×4 z blokadą mechanizmu różnicowego",
        "Hamulce tarczowe w kąpieli olejowej — bezobsługowe",
        "Hydrauliczne wspomaganie kierownicy",
        "Promień skrętu z hamulcami 2,1 m / bez 3,0 m",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny 540/1000 obr/min, sprzęgło suche",
        "TUZ z mechanicznym sterowaniem podnośnika, udźwig 600 kg",
        "Pompa hydrauliczna 13,36 l/min",
        "1 para wyjść rozdzielacza w standardzie",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Wymiary i ogumienie",
      items: [
        "Długość 2 705 mm, szerokość 1 058 mm, prześwit 320 mm",
        "Rozstaw osi 1 560 mm",
        "Masa z ramą ROPS 1 050 kg — wyważona dynamika",
        "Ogumienie 6,00–12 (przód) / 8,30–20 (tył) BKT",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie opcjonalne",
      items: [
        "Kabina ogrzewana i wentylowana",
        "Radio z głośnikami",
        "Ogumienie trawiaste lub przemysłowe",
        "Ładowacz czołowy (TUR)",
        "Opryskiwacz, kosiarka bijakowa, mulczer",
        "Pług do śniegu, posypywarka, glebogryzarka, brona wirnikowa",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Dla kogo Solis S26 sprawdza się najlepiej.",
    items: [
      { title: "Bestseller dla małych gospodarstw", description: "Mocniejszy silnik 1,3 L i moment 75 Nm radzą sobie z pełnym zakresem prac polowych: orką, talerzowaniem, koszeniem i transportem." },
      { title: "Sady, winnice i szkółki", description: "Wąska sylwetka 1 058 mm i wspomaganie kierownicy pozwalają precyzyjnie manewrować między rzędami z opryskiwaczem lub kosiarką sadowniczą." },
      { title: "Działki, agroturystyki i hodowle", description: "Cicha praca, ekonomiczne spalanie i prosty interfejs — ciągnik dla osób, które używają go kilka razy w tygodniu i potrzebują niezawodności." },
      { title: "Sektor komunalny i utrzymanie zieleni", description: "Z opcjonalnym ogumieniem trawiastym lub przemysłowym oraz ogrzewaną kabiną pracuje przez cały rok — od koszenia do odśnieżania." },
    ],
  },
  gallery: {
    eyebrow: "Galeria — wersja z kabiną",
    title: "Solis S26 9+9 Shuttle XL z fabryczną, ogrzewaną kabiną.",
    images: [
      { src: "/model-solis-s26-cab-front.webp", alt: "Solis S26 z kabiną — widok 3/4 z przodu", emphasis: true },
      { src: "/model-solis-s26-cab-threequarter.webp", alt: "Solis S26 z kabiną — widok przedni 3/4" },
      { src: "/model-solis-s26-cab-side.webp", alt: "Solis S26 z kabiną — widok z boku" },
      { src: "/solis_s26/20260521_120332.webp", alt: "Solis S26 — zdjęcie 1" },
      { src: "/solis_s26/20260521_120333.webp", alt: "Solis S26 — zdjęcie 2" },
      { src: "/solis_s26/20260521_120345.webp", alt: "Solis S26 — zdjęcie 3" },
      { src: "/solis_s26/20260521_120406.webp", alt: "Solis S26 — zdjęcie 4" },
      { src: "/solis_s26/20260521_120414.webp", alt: "Solis S26 — zdjęcie 5" },
      { src: "/solis_s26/20260521_120424.webp", alt: "Solis S26 — zdjęcie 6" },
      { src: "/solis_s26/20260521_120438.webp", alt: "Solis S26 — zdjęcie 7" },
      { src: "/solis_s26/20260521_120500.webp", alt: "Solis S26 — zdjęcie 8" },
      { src: "/solis_s26/20260521_120501.webp", alt: "Solis S26 — zdjęcie 9" },
      { src: "/solis_s26/20260521_120507.webp", alt: "Solis S26 — zdjęcie 10" },
      { src: "/solis_s26/20260521_120514.webp", alt: "Solis S26 — zdjęcie 11" },
      { src: "/solis_s26/20260521_120548.webp", alt: "Solis S26 — zdjęcie 12" },
      { src: "/solis_s26/20260521_120604.webp", alt: "Solis S26 — zdjęcie 13" },
      { src: "/solis_s26/20260521_120612.webp", alt: "Solis S26 — zdjęcie 14" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Producent", "Mitsubishi MVS3L2 — JCSA"],
        ["Typ", "3-cylindrowy diesel, chłodzony cieczą, bezpośredni wtrysk"],
        ["Moc znamionowa", "18,0 kW / 24,5 KM przy 2 700 obr./min"],
        ["Pojemność skokowa", "1 318 cm³"],
        ["Maksymalny moment", "75,2 Nm przy 2 200 obr./min"],
        ["Zasysanie powietrza", "Naturalne (wolnossący)"],
        ["Stopień sprężania", "22 : 1"],
        ["Filtr powietrza", "Mokry"],
        ["Pojemność oleju", "4,2 L"],
        ["Pojemność zbiornika paliwa", "32 L"],
        ["Jednostkowe zużycie paliwa", "≈ 323 g / kWh"],
        ["Zimny start", "W standardzie"],
      ],
    },
    {
      title: "Układ napędowy",
      rows: [
        ["Sprzęgło", "Jednostopniowe, sterowane mechanicznie"],
        ["Skrzynia biegów", "Mechaniczna 9F + 9R (3 zakresy × 3 biegi)"],
        ["Kabina", "Wersja z ramą ROPS lub z ogrzewaną kabiną"],
        ["Napęd", "4×4 (przednia i tylna oś)"],
        ["Blokada mechanizmu różnicowego", "Sterowana mechanicznie"],
      ],
    },
    {
      title: "Hamulce, kierowanie i hydraulika",
      rows: [
        ["Układ hamulcowy", "Tarczowy w kąpieli olejowej"],
        ["Hamulec postojowy", "Mechaniczny"],
        ["Układ kierowniczy", "Hydraulicznie wspomagany"],
        ["Promień skrętu", "2,1 m (z hamulcami) / 3,0 m (bez)"],
        ["Podnośnik tylny", "Sterowany mechanicznie"],
        ["Maksymalny udźwig TUZ", "600 kg"],
        ["Wydajność pompy", "13,36 l/min"],
        ["Rozdzielacz hydrauliczny", "1 para wyjść"],
        ["WOM tylny", "540 / 1000 obr./min, sprzęgło suche"],
      ],
    },
    {
      title: "Wymiary, ogumienie i waga",
      rows: [
        ["Ogumienie przednie", "6,00 – 12 BKT"],
        ["Ogumienie tylne", "8,30 – 20 BKT"],
        ["Długość", "2 705 mm"],
        ["Szerokość", "1 058 mm"],
        ["Wysokość", "1 300 – 2 153 mm"],
        ["Prześwit", "320 mm"],
        ["Rozstaw osi", "1 560 mm"],
        ["Rozstaw kół przednich", "894 mm"],
        ["Rozstaw kół tylnych", "825 mm"],
        ["Masa własna z ramą ROPS", "1 050 kg"],
      ],
    },
  ],
  salesArguments: [
    "Najwyższy moment w klasie subkompaktów Solisa — 75,2 Nm",
    "Hamulce tarczowe w kąpieli olejowej — bezobsługowe",
    "Promień skrętu 2,1 m — wyjątkowa zwrotność",
    "Opcjonalna ogrzewana kabina i 3 typy ogumienia",
    "Magazyn części Stekro MiniTrak i 30 lat doświadczenia w serwisie",
  ],
};

export default function ModelSolisS26() {
  return <ModelPageLayout data={data} />;
}

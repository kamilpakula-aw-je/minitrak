import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const orchard = "/model-solis-n75.webp";
const showroom = "/model-solis-n75-showroom.webp";
const field = "/model-solis-n75-field.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "N75",
    full: "Solis N75 Cabin",
    headline: "Solis N75 — sadowniczy specjalista",
    accent: "75 KM, wąska budowa i skrzynia 12+12 Shuttle — ciągnik do sadów, winnic i plantacji.",
  },
  hero: {
    image: orchard,
    alt: "Solis N75 sadowniczy w sadzie jabłoniowym",
    eyebrow: "Solis / seria N — Orchard & Vineyard Specialist",
    description: (
      <>
        Czterocylindrowy silnik <strong>turbo z&nbsp;intercoolerem 4 088 cm³</strong> w&nbsp;normie Stage V (DOC+DPF) o&nbsp;mocy <strong>73,5 KM</strong> i&nbsp;momencie <strong>340 Nm</strong> już od&nbsp;1 400 obr. Wąska konstrukcja (szerokość od&nbsp;<strong>1 400 mm</strong>), skrzynia synchromesh <strong>12F+12R Shuttle</strong>, hydraulika z&nbsp;udźwigiem TUZ <strong>2 500 kg</strong> i&nbsp;kabina z&nbsp;opcjonalną klimatyzacją — maszyna stworzona do&nbsp;pracy w&nbsp;międzyrzędziach sadów, winnic i&nbsp;plantacji.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "73,5 KM" },
    { icon: Fuel, label: "Pojemność silnika", value: "4 088 cm³" },
    { icon: ArrowRight, label: "Moment maks.", value: "340 Nm" },
    { icon: Wrench, label: "Skrzynia", value: "12F + 12R Synchro" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "2 500 kg" },
    { icon: Tractor, label: "Szerokość od", value: "1 400 mm" },
  ],
  why: {
    eyebrow: "Dlaczego N75",
    title: "Wąski ciągnik 75 KM stworzony do sadów i winnic.",
    paragraphs: [
      <>Solis N75 to wyspecjalizowany ciągnik sadowniczy z&nbsp;serii N. Przy szerokości całkowitej od&nbsp;zaledwie <strong>1 400 mm</strong> swobodnie przejeżdża między rzędami drzew owocowych i&nbsp;krzewów winorośli, a&nbsp;mimo to dysponuje pełną mocą <strong>73,5 KM</strong> z&nbsp;czterocylindrowego, turbodoładowanego silnika <strong>4 088 cm³</strong>.</>,
      <>Silnik z&nbsp;intercoolerem rozwija <strong>340 Nm momentu już przy 1 400 obr./min</strong> i&nbsp;spełnia normę emisji Stage V z&nbsp;układem oczyszczania DOC+DPF. To rezerwa siły do&nbsp;opryskiwaczy, kosiarek sadowniczych, rozdrabniaczy gałęzi i&nbsp;przyczep, nawet w&nbsp;trudnych warunkach plantacji.</>,
      <>Standardowo otrzymujesz skrzynię <strong>synchromesh 12F+12R Shuttle</strong> z&nbsp;mechaniczną blokadą mechanizmu różnicowego, hydraulikę o&nbsp;wydatku <strong>45 l/min</strong> z&nbsp;udźwigiem TUZ <strong>2 500 kg</strong> oraz&nbsp;komfortową kabinę z&nbsp;opcjonalną klimatyzacją (HVAC). Kierownica jest regulowana w&nbsp;pochyleniu i&nbsp;na wysokość.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik turbo Stage V",
      items: [
        "Czterocylindrowy turbo z intercoolerem",
        "Pojemność 4 088 cm³, moc 73,5 KM, moment 340 Nm @ 1 400 obr.",
        "Norma emisji Stage V z układem DOC + DPF",
        "Dwustopniowy suchy filtr powietrza",
        "Zbiornik paliwa 80 l",
      ],
    },
    {
      icon: Settings,
      title: "Przeniesienie napędu",
      items: [
        "Skrzynia synchromesh 12F + 12R Shuttle",
        "Napęd 4×4 (4WD) z mechanicznym załączaniem",
        "Mechaniczna blokada mechanizmu różnicowego",
        "Zakres prędkości 0,45–30 km/h",
        "Hamulce wspomagane hydraulicznie",
      ],
    },
    {
      icon: Wrench,
      title: "Hydraulika i WOM",
      items: [
        "Wydatek pompy hydraulicznej 45 l/min",
        "Udźwig TUZ 2 500 kg, kategoria II",
        "System Liftomatic i regulacja siłowa (draft control)",
        "WOM tylny 540 / 540E (mechaniczny)",
        "2/3 pary wyjść hydrauliki zewnętrznej (opcja)",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Wąska budowa i komfort",
      items: [
        "Szerokość całkowita od 1 400 mm — do międzyrzędzi",
        "Prześwit 260 mm",
        "Kierownica regulowana (pochylenie + wysokość)",
        "Kabina z opcjonalną klimatyzacją (HVAC)",
        "Platforma na amortyzatorach (wersja ROPS)",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie opcjonalne",
      items: [
        "Klimatyzacja kabiny (HVAC)",
        "Zintegrowany joystick ładowacza",
        "Obciążniki przednie (31×6 kg) i tylne (30×2 kg)",
        "Ogumienie radialne lub przemysłowe",
        "Trzecia para wyjść hydraulicznych",
        "Hydrauliczne hamulce przyczepy",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Dla kogo Solis N75 sprawdza się najlepiej.",
    items: [
      { title: "Sady wielkohektarowe", description: "Wąska budowa od 1 400 mm i 75 KM mocy pozwalają obsługiwać opryskiwacze, kosiarki sadownicze i rozdrabniacze gałęzi w gęsto sadzonych kwaterach jabłoni i grusz." },
      { title: "Winnice", description: "Niski środek ciężkości, zwrotność i 340 Nm momentu sprawdzają się na pochyłościach i w wąskich rzędach winorośli przy pracy z osprzętem pielęgnacyjnym." },
      { title: "Plantacje krzewów owocowych", description: "Borówka, malina, porzeczka — N75 przejeżdża między rzędami i ciągnie opryskiwacze oraz przyczepy zbiorcze bez uszkadzania nasadzeń." },
      { title: "Szkółki i gospodarstwa specjalistyczne", description: "Udźwig 2 500 kg i pełna hydraulika obsługują maszyny do pielęgnacji, transportu i prac ziemnych w intensywnej produkcji ogrodniczej." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Solis N75 w sadzie, w salonie i w pracy.",
    images: [
      { src: orchard, alt: "Solis N75 sadowniczy w sadzie o zachodzie słońca", emphasis: true },
      { src: showroom, alt: "Solis N75 — widok 3/4 z przodu przed salonem" },
      { src: field, alt: "Solis N75 podczas pracy z osprzętem" },
      { src: "/solis_n_75_sadownik/156758423.webp", alt: "Solis N75 — zdjęcie 1" },
      { src: "/solis_n_75_sadownik/192A1451-R.webp", alt: "Solis N75 — zdjęcie 2" },
      { src: "/solis_n_75_sadownik/192A1457-R.webp", alt: "Solis N75 — zdjęcie 3" },
      { src: "/solis_n_75_sadownik/192A1472-R.webp", alt: "Solis N75 — zdjęcie 4" },
      { src: "/solis_n_75_sadownik/192A1479-R.webp", alt: "Solis N75 — zdjęcie 5" },
      { src: "/solis_n_75_sadownik/192A1527-R.webp", alt: "Solis N75 — zdjęcie 6" },
      { src: "/solis_n_75_sadownik/192A1609-R.webp", alt: "Solis N75 — zdjęcie 7" },
      { src: "/solis_n_75_sadownik/192A1641-R.webp", alt: "Solis N75 — zdjęcie 8" },
      { src: "/solis_n_75_sadownik/20251217_145600.webp", alt: "Solis N75 — zdjęcie 9" },
      { src: "/solis_n_75_sadownik/20251217_145714.webp", alt: "Solis N75 — zdjęcie 10" },
      { src: "/solis_n_75_sadownik/20251217_145747.webp", alt: "Solis N75 — zdjęcie 11" },
      { src: "/solis_n_75_sadownik/20251217_145759.webp", alt: "Solis N75 — zdjęcie 12" },
      { src: "/solis_n_75_sadownik/20251217_145805.webp", alt: "Solis N75 — zdjęcie 13" },
      { src: "/solis_n_75_sadownik/Solis75_n.webp", alt: "Solis N75 — zdjęcie 14" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Typ silnika", "4-cylindrowy, turbo z intercoolerem"],
        ["Norma emisji", "Stage V (DOC + DPF)"],
        ["Moc znamionowa", "73,5 KM (54,83 kW)"],
        ["Pojemność skokowa", "4 088 cm³"],
        ["Liczba cylindrów", "4"],
        ["Obroty znamionowe", "2 000 obr./min"],
        ["Maksymalny moment", "340 Nm @ 1 400 obr./min"],
        ["Filtr powietrza", "Dwustopniowy, suchy"],
        ["Zbiornik paliwa", "80 l"],
      ],
    },
    {
      title: "Przeniesienie napędu",
      rows: [
        ["Skrzynia biegów", "Synchromesh 12F + 12R Shuttle"],
        ["Napęd", "4×4 (4WD), mechaniczny"],
        ["Blokada mechanizmu różnicowego", "Mechaniczna"],
        ["Prędkość min. / maks.", "0,45 / 30 km/h"],
        ["Hamulce", "Wspomagane hydraulicznie"],
      ],
    },
    {
      title: "Hydraulika i WOM",
      rows: [
        ["Wydatek pompy", "45 l/min"],
        ["Udźwig TUZ", "2 500 kg"],
        ["Kategoria TUZ", "II"],
        ["Sterowanie", "Liftomatic + regulacja siłowa"],
        ["WOM tylny", "540 / 540E (mechaniczny)"],
        ["Wyjścia hydrauliki zewnętrznej", "2/3 pary (opcja)"],
      ],
    },
    {
      title: "Masa i wymiary",
      rows: [
        ["Masa własna", "3 295 kg"],
        ["Rozstaw osi", "2 310 mm"],
        ["Długość całkowita", "4 040–4 280 mm"],
        ["Szerokość całkowita", "1 400–1 410 mm"],
        ["Wysokość całkowita", "2 330 mm"],
        ["Prześwit", "260 mm"],
        ["Opony (standard, 4WD)", "8.00-18 / 14.9-24"],
      ],
    },
  ],
  salesArguments: [
    "Wąska budowa od 1 400 mm — wjedzie w każdy sad i winnicę",
    "75 KM i 340 Nm momentu już od 1 400 obr.",
    "Udźwig TUZ 2 500 kg i hydraulika 45 l/min",
    "Klimatyzowana kabina z regulowaną kierownicą (opcja HVAC)",
    "Magazyn części Stekro MiniTrak i serwis mobilny w Małopolsce",
  ],
};

export default function ModelSolisN75() {
  return <ModelPageLayout data={data} />;
}

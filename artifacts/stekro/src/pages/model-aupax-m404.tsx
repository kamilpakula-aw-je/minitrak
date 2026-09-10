import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-aupax-m404.webp";

const data: ModelPageData = {
  brand: { name: "Aupax", catalogHref: "/#katalog-aupax" },
  model: {
    short: "M404",
    full: "Aupax M404",
    headline: "Aupax M404",
    accent: "Fabrycznie nowy 40-konny tytan z silnikiem Doosan Stage V — w zieleni lub pomarańczu.",
  },
  hero: {
    image: heroImg,
    alt: "Aupax M404 — fabrycznie nowy ciągnik 40 KM Doosan z kabiną Grammer",
    eyebrow: "Aupax / seria M — 40 KM Doosan rocznik 2025",
    description: (
      <>
        Aupax M404 to <strong>fabrycznie nowy ciągnik rocznik 2025</strong> z&nbsp;koreańskim silnikiem <strong>Doosan D18 Stage V (40 KM)</strong>, fabryczną <strong>4-słupkową kabiną z&nbsp;klimatyzacją i&nbsp;ogrzewaniem</strong> oraz&nbsp;fotelem Grammer w&nbsp;standardzie. Skrzynia 8 + 8 z&nbsp;rewersem mechanicznym, dwie pompy hydrauliczne, TUZ z&nbsp;udźwigiem <strong>850 kg</strong> i&nbsp;WOM włączany elektronicznie czynią z&nbsp;niego wszechstronnego partnera do&nbsp;pracy z ładowaczem, w&nbsp;sadzie, na&nbsp;polu i&nbsp;w mieście.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "40 KM (SAE J1995)" },
    { icon: Fuel, label: "Silnik", value: "Doosan D18 Stage V, 1 794 cm³, 3-cyl" },
    { icon: Wrench, label: "Skrzynia", value: "Synchro 8F + 8R, rewers mechaniczny, 4WD" },
    { icon: Tractor, label: "TUZ tylny", value: "850 kg, kategoria I" },
    { icon: ShieldCheck, label: "WOM", value: "540 / 1 000 obr/min, włącz. elektronicznie" },
    { icon: ArrowRight, label: "Kabina", value: "4-słupkowa, klima + ogrzewanie, Grammer" },
  ],
  why: {
    eyebrow: "Dlaczego Aupax M404",
    title: "Nowoczesny 40-konny partner do codziennej pracy.",
    paragraphs: [
      <>Aupax M404 to <strong>fabrycznie nowy ciągnik rocznik 2025</strong> z&nbsp;silnikiem <strong>Doosan D18 Stage V</strong> spełniającym najnowsze normy emisji spalin. Połączenie koreańskiej jednostki napędowej, włoskiego DNA marki Aupax i&nbsp;komponentów europejskich (Grammer, Trelleborg) daje maszynę, która odpowiada potrzebom polskich gospodarstw — od&nbsp;orki przez prasowanie po&nbsp;prace z ładowaczem.</>,
      <>Sercem M404 jest 3-cylindrowy <strong>Doosan D18 (1 794 cm³)</strong> chłodzony cieczą, dający <strong>40 KM</strong> w&nbsp;pomiarze SAE J1995. Skrzynia <strong>8 + 8 z&nbsp;rewersem mechanicznym zsynchronizowanym</strong> i&nbsp;napęd 4WD z&nbsp;blokadą mechanizmu różnicowego dają dobrą trakcję na&nbsp;każdym podłożu. Suche sprzęgło to świadomy wybór konstruktorów — prosta i&nbsp;niezawodna obsługa, niski koszt eksploatacji.</>,
      <>M404 wyróżnia rozbudowana hydraulika: <strong>dwie pompy hydrauliczne</strong>, dwie pary wyjść z&nbsp;tyłu (jedna z&nbsp;blokadą stałego przepływu) i&nbsp;<strong>udźwig TUZ-a 850 kg</strong> przy kategorii I. To czyni z&nbsp;niego pełnowartościową bazę pod ładowacz czołowy, prasę zwijającą małej klasy, kosiarkę bijakową czy opryskiwacz sadowniczy. WOM włączany elektronicznie z&nbsp;540/1 000 obr/min eliminuje zacieranie się klasycznych dźwigni.</>,
      <>Pełna 4-słupkowa kabina z&nbsp;<strong>klimatyzacją i&nbsp;ogrzewaniem w&nbsp;standardzie</strong> oraz&nbsp;fotelem <strong>Grammer</strong> to komfort, który w&nbsp;klasie 40 KM bywa rzadkością. M404 dostępny jest w&nbsp;dwóch wersjach kolorystycznych — klasycznym Aupax-owym <strong>zielonym</strong> i&nbsp;wyróżniającym się <strong>pomarańczowym</strong>, idealnym dla firm komunalnych i&nbsp;usługowych.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Doosan D18 Stage V",
      items: [
        "Koreański Doosan D18 — Stage V chłodzony cieczą",
        "3 cylindry, pojemność 1 794 cm³",
        "Moc 40 KM (wg SAE J1995)",
        "Fabrycznie nowy ciągnik rocznik 2025",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia i napęd 4WD",
      items: [
        "Skrzynia 8 + 8 z rewersem mechanicznym, zsynchronizowanym",
        "Suche sprzęgło — proste i niezawodne",
        "Napęd 4WD załączany mechanicznie",
        "Blokada mechanizmu różnicowego",
        "Układ kierowniczy hydrostatyczny ze wspomaganiem",
      ],
    },
    {
      icon: Wrench,
      title: "Hydraulika, TUZ i WOM",
      items: [
        "Tylny TUZ kategoria I, udźwig 850 kg (610 mm od końcówek)",
        "Dwie pompy hydrauliczne",
        "2 pary wyjść hydraulicznych z tyłu (1 z blokadą stałego przepływu)",
        "WOM tylny 540 / 1 000 obr/min — włączany elektronicznie",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Wyposażenie",
      items: [
        "Trelleborg: przód 260/70 R16, tył 320/85 R24",
        "Obciążniki przednie 60 kg + tylne 112 kg w standardzie",
        "Przednie błotniki, zaczep dolny",
        "Dwie wersje kolorystyczne: zielony i pomarańczowy",
        "7 lat gwarancji — oferta specjalna",
      ],
    },
    {
      icon: Lightbulb,
      title: "Kabina Grammer",
      items: [
        "Pełna 4-słupkowa fabryczna kabina",
        "Klimatyzacja i ogrzewanie w standardzie",
        "Fotel Grammer z amortyzacją mechaniczną",
        "Dobra widoczność panoramiczna",
        "Niski poziom hałasu i wibracji",
        "Drzwi otwierane z obu stron, czytelny zestaw wskaźników",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Jeden ciągnik — od pola po miasto.",
    items: [
      { title: "Małe i średnie gospodarstwa", description: "40 KM mocy z dużym udźwigiem TUZ-a 850 kg to wystarczająca moc do orki na małym pługu, agregowania z glebogryzarką, prasowania, koszenia trawy i transportu z przyczepą rolniczą do 4-5 ton." },
      { title: "Ładowacz czołowy i prace gospodarskie", description: "Dwie pompy hydrauliczne i 850 kg udźwigu TUZ z blokadą stałego przepływu hydrauliki czynią z M404 doskonałą bazę pod ładowacz czołowy — sprzątanie obornika, ładowanie balotów, paszowanie." },
      { title: "Sady i prace pielęgnacyjne", description: "Kompaktowe gabaryty i precyzyjne sterowanie hydrauliką pozwalają wjechać między rzędy w sadach, winnicach i szkółkach. Idealny do oprysków, koszenia międzyrzędzi, transportu skrzynek." },
      { title: "Prace komunalne i usługowe", description: "Klimatyzacja w kabinie, fotel Grammer i dwa kolory do wyboru (zielony/pomarańczowy) — M404 sprawdzi się w gminach, wspólnotach mieszkaniowych i firmach komunalnych przy koszeniu, odśnieżaniu i transporcie." },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Producent", "Doosan (Korea Płd.)"],
        ["Model", "D18"],
        ["Liczba cylindrów", "3"],
        ["Pojemność", "1 794 cm³"],
        ["Norma emisji", "Stage V"],
        ["Moc znamionowa", "40 KM (wg SAE J1995)"],
        ["Chłodzenie", "Cieczą"],
      ],
    },
    {
      title: "Przekładnia i napęd",
      rows: [
        ["Typ skrzyni", "Synchronizowana 8F + 8R"],
        ["Rewers", "Mechaniczny, zsynchronizowany"],
        ["Sprzęgło", "Suche"],
        ["Napęd", "4WD załączany mechanicznie"],
        ["Blokada dyferencjału", "Tak — mechanizmu różnicowego"],
        ["Układ kierowniczy", "Hydrostatyczny ze wspomaganiem"],
      ],
    },
    {
      title: "Hydraulika, TUZ i WOM",
      rows: [
        ["TUZ tylny", "Kategoria I"],
        ["Udźwig TUZ", "850 kg (610 mm od końcówek)"],
        ["Pompy hydrauliczne", "2 niezależne pompy"],
        ["Wyjścia hydrauliczne tył", "2 pary (1 para z blokadą stałego przepływu)"],
        ["WOM tylny", "540 / 1 000 obr/min"],
        ["Włączanie WOM", "Elektroniczne"],
      ],
    },
    {
      title: "Kabina i wyposażenie",
      rows: [
        ["Kabina", "Fabryczna 4-słupkowa"],
        ["Klimatyzacja", "Tak — w standardzie"],
        ["Ogrzewanie", "Tak — w standardzie"],
        ["Fotel operatora", "Grammer — mechaniczny z amortyzacją"],
        ["Opony przednie", "Trelleborg 260/70 R16"],
        ["Opony tylne", "Trelleborg 320/85 R24"],
        ["Obciążniki przednie", "60 kg w standardzie"],
        ["Obciążniki na tylne koła", "112 kg w standardzie"],
        ["Zaczep dolny", "Tak"],
        ["Błotniki przednie", "Tak"],
        ["Wersje kolorystyczne", "Zielony lub pomarańczowy — do wyboru"],
        ["Gwarancja", "7 lat — oferta specjalna"],
      ],
    },
  ],
  salesArguments: [
    "Fabrycznie nowy rocznik 2025 z silnikiem Doosan Stage V",
    "Udźwig TUZ 850 kg i 2 pompy hydrauliczne — gotowy pod ładowacz",
    "Skrzynia 8+8 z rewersem mechanicznym i blokadą dyferencjału",
    "WOM 540/1000 włączany elektronicznie — żadnych zacinających dźwigni",
    "Klimatyzacja, ogrzewanie i fotel Grammer w standardzie",
    "7 lat gwarancji w ofercie specjalnej, dwa kolory do wyboru",
  ],
};

export default function ModelAupaxM404() {
  return <ModelPageLayout data={data} />;
}

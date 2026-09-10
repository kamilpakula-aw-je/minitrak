import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-ls-xu6168.webp";
const frontImg = "/model-ls-xu6168-front.webp";
const mountainsImg = "/model-ls-xu6168-mountains.webp";
const mowerImg = "/model-ls-xu6168-mower.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "XU6168",
    full: "LS Tractor XU6168",
    headline: "LS Tractor XU6168",
    accent: "68 KM, udźwig TUZ 2 460 kg i Power Shuttle z EHL Auto.",
  },
  hero: {
    image: heroImg,
    alt: "LS Tractor XU6168 — wizualizacja modelu",
    eyebrow: "LS Tractor / seria XU — utility 68 KM",
    description: (
      <>
        Premium utility o&nbsp;mocy <strong>68 KM</strong> z&nbsp;<strong>4-cylindrowym silnikiem LS Mtron</strong> i&nbsp;wyborem rewersu — mechanicznego (<strong>MEC Synchro Shuttle</strong>) lub&nbsp;elektrohydraulicznego (<strong>PST Power Shuttle</strong>). Opcjonalny <strong>asystent TUZ EHL Auto</strong>, regulowany napęd 4×4 dla oszczędności paliwa i&nbsp;wyciszona kabina premium. Od 124 500 PLN netto.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "68 KM" },
    { icon: Fuel, label: "Silnik", value: "LS Mtron 4-cyl. Diesel" },
    { icon: Wrench, label: "Skrzynia", value: "MEC SS lub PST EHL Auto z rewersem" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "2 460 kg" },
    { icon: ArrowRight, label: "Napęd", value: "4×4 regulowany" },
    { icon: Tractor, label: "Kabina", value: "Premium, wyciszona" },
  ],
  why: {
    eyebrow: "Dlaczego XU6168",
    title: "Premium utility 68 KM z asystentem TUZ EHL Auto.",
    paragraphs: [
      <>XU6168 to <strong>klasa utility 68 KM</strong> w&nbsp;ofercie LS Tractor — pomost między kompaktowym MT3.60 a&nbsp;flagowym MT7.101. Pod maską pracuje <strong>4-cylindrowy silnik LS Mtron Diesel</strong> chłodzony cieczą, dostosowany do&nbsp;długich zmian roboczych.</>,
      <>Klient wybiera między dwiema wersjami rewersu: <strong>MEC SS (Synchro Shuttle)</strong> z&nbsp;mechanicznym rewersem dla gospodarstw ceniących prostotę, lub&nbsp;<strong>PST (Power Shuttle)</strong> z&nbsp;rewersem elektrohydraulicznym — komfort jak w&nbsp;premium maszynach Deutz-Fahr czy New Holland.</>,
      <>Wyróżnikiem XU6168 jest opcjonalny <strong>asystent TUZ EHL Auto</strong>, który automatycznie utrzymuje pozycję i&nbsp;głębokość roboczą osprzętu, oraz&nbsp;<strong>regulowany napęd 4×4</strong> pozwalający przy transporcie i&nbsp;lekkich pracach jechać na&nbsp;napędzie 2×4 dla oszczędności paliwa. Udźwig TUZ <strong>2 460 kg</strong> czyni z&nbsp;XU6168 ciągnik gotowy pod ciężki osprzęt klasy 70 KM.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik LS Mtron",
      items: [
        "4-cylindrowy turbodiesel, chłodzony cieczą",
        "Moc znamionowa 68 KM",
        "Suchy filtr powietrza z wstępnym separatorem",
      ],
    },
    {
      icon: Settings,
      title: "Wybór rewersu i napędu",
      items: [
        "MEC SS — Synchro Shuttle, rewers mechaniczny",
        "PST — Power Shuttle, rewers elektrohydrauliczny",
        "PST EHL Auto — Power Shuttle + asystent TUZ (opcja)",
        "Hydrostatyczne wspomaganie kierownicy",
        "Mokre, dzielone hamulce",
        "Napęd 4×4 regulowany — oszczędność paliwa",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny niezależny, elektrohydrauliczne sprzęgło",
        "TUZ hydrauliczny, udźwig 2 460 kg",
        "Asystent EHL Auto — opcja (pozycja + głębokość)",
        "Wsparcie pod ładowacz LS LL6068",
        "Osprzęt rolniczy klasy 70 KM",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Kabina premium",
      items: [
        "Wyciszona, klimatyzacja i ogrzewanie",
        "Fotel z amortyzacją (opcja obrotowy)",
        "Zewnętrzne oświetlenie LED",
        "Panoramiczna szyba, pasy bezpieczeństwa",
        "System audio standard",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie kabiny",
      items: [
        "Klimatyzacja i ogrzewanie",
        "Wyciszona kabina premium",
        "Fotel z amortyzacją (obrotowy w opcji)",
        "Radio i system audio",
        "Wycieraczki przednie i tylne",
        "Zewnętrzne oświetlenie LED",
        "Panoramiczna szyba",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie XU6168 robi największą różnicę.",
    items: [
      { title: "Średnie i większe gospodarstwa (30–80 ha)", description: "68 KM, udźwig TUZ 2 460 kg i Power Shuttle z asystentem EHL — pełna obsługa prasy zwijającej, agregatu uprawowego 2,5–3,0 m, beczkowozu i pługa 2- / 3-skibowego." },
      { title: "Hodowla bydła i fermy", description: "Z ładowaczem LS LL6068 i widłami do bel sprawnie obsługuje stół paszowy, ścielenie boksów, transport beli słomy oraz wywóz obornika. Kabina premium z klimatyzacją to komfort cały rok." },
      { title: "Usługi rolnicze i komunalne", description: "Asystent TUZ EHL Auto i regulowany napęd 4×4 oszczędzają paliwo przy transporcie i pracach z lekkim osprzętem. Kabina premium i fotel z amortyzacją — komfort pełnozmianowy." },
      { title: "Sady i plantacje premium", description: "Wersja PST z rewersem elektrohydraulicznym to płynne manewry między rzędami. Asystent EHL Auto utrzymuje stałą głębokość roboczą bez ingerencji operatora." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "XU6168 — front, kosiarka, krajobraz.",
    images: [
      { src: heroImg, alt: "XU6168 — wizualizacja modelu", emphasis: true },
      { src: frontImg, alt: "XU6168 — widok z przodu" },
      { src: mowerImg, alt: "XU6168 z kosiarką" },
      { src: mountainsImg, alt: "XU6168 w terenie" },
      { src: "/ls_xu6168/ls_xu6168_01.webp", alt: "LS XU6168 — zdjęcie 1" },
      { src: "/ls_xu6168/ls_xu6168_02.webp", alt: "LS XU6168 — zdjęcie 2" },
      { src: "/ls_xu6168/ls_xu6168_03.webp", alt: "LS XU6168 — zdjęcie 3" },
      { src: "/ls_xu6168/ls_xu6168_04.webp", alt: "LS XU6168 — zdjęcie 4" },
      { src: "/ls_xu6168/ls_xu6168_05.webp", alt: "LS XU6168 — zdjęcie 5" },
      { src: "/ls_xu6168/ls_xu6168_06.webp", alt: "LS XU6168 — zdjęcie 6" },
      { src: "/ls_xu6168/ls_xu6168_07.webp", alt: "LS XU6168 — zdjęcie 7" },
      { src: "/ls_xu6168/ls_xu6168_08.webp", alt: "LS XU6168 — zdjęcie 8" },
      { src: "/ls_xu6168/ls_xu6168_09.webp", alt: "LS XU6168 — zdjęcie 9" },
      { src: "/ls_xu6168/ls_xu6168_10.webp", alt: "LS XU6168 — zdjęcie 10" },
      { src: "/ls_xu6168/ls_xu6168_11.webp", alt: "LS XU6168 — zdjęcie 11" },
      { src: "/ls_xu6168/ls_xu6168_12.webp", alt: "LS XU6168 — zdjęcie 12" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Producent", "LS Mtron"],
        ["Typ", "4-cylindrowy turbodiesel, chłodzony cieczą"],
        ["Pojemność", "2 505 cm³"],
        ["Moc znamionowa", "68 KM"],
        ["Filtr powietrza", "Suchy z wstępnym separatorem"],
      ],
    },
    {
      title: "Przekładnia i jazda",
      rows: [
        ["Wersja MEC SS", "Mechaniczna Synchro Shuttle — rewers mechaniczny"],
        ["Wersja PST", "Power Shuttle — rewers elektrohydrauliczny"],
        ["PST EHL Auto", "Power Shuttle + asystent TUZ EHL Auto (opcja)"],
        ["Wspomaganie kierownicy", "Hydrostatyczne"],
        ["Hamulce", "Mokre, dzielone"],
        ["Napęd", "4×4 dołączany — regulowany dla oszczędności paliwa"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny", "Niezależny, elektrohydrauliczne sprzęgło"],
        ["TUZ", "Hydrauliczny"],
        ["Udźwig TUZ", "2 460 kg"],
        ["Asystent TUZ", "EHL Auto — opcja (sterowanie pozycją i głębokością)"],
      ],
    },
    {
      title: "Kabina i komfort",
      rows: [
        ["Kabina", "Premium, wyciszona — klimatyzacja i ogrzewanie"],
        ["Fotel", "Z amortyzacją (opcja obrotowy)"],
        ["Oświetlenie", "LED zewnętrzne"],
        ["Audio", "System audio standard"],
        ["Wycieraczki", "Przednie i tylne"],
      ],
    },
  ],
  salesArguments: [
    "Wybór rewersu: mechaniczny SS lub elektrohydrauliczny PST",
    "Asystent TUZ EHL Auto w opcji — automatyzacja pracy",
    "Regulowany napęd 4×4 — oszczędność paliwa",
    "Udźwig TUZ 2 460 kg — ciężki osprzęt klasy 70 KM",
    "Cena startowa: od 124 500 PLN netto",
  ],
};

export default function ModelLsXu6168() {
  return <ModelPageLayout data={data} />;
}

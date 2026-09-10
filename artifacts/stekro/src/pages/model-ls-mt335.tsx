import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-ls-mt335.webp";
const frontImg = "/model-ls-mt335-front.webp";
const plowFrontImg = "/model-ls-mt335-plug-front.webp";
const plowSideImg = "/model-ls-mt335-plug-side.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "MT3.35",
    full: "LS Tractor MT3.35",
    headline: "LS Tractor MT3.35",
    accent: "35 KM, masa 1 460 kg i pełen wybór opon AGRI / IND / TURF.",
  },
  hero: {
    image: heroImg,
    alt: "LS Tractor MT3.35",
    eyebrow: "LS Tractor / seria MT3 — kompakt 35 KM",
    description: (
      <>
        Wejście do&nbsp;serii MT3 — kompaktowy ciągnik LS Tractor o&nbsp;mocy <strong>35 KM</strong>, z&nbsp;mechaniczną skrzynią <strong>F12/R12 z&nbsp;rewersem</strong> i&nbsp;pałąkiem ROPS do&nbsp;wyboru — przed lub&nbsp;za operatorem. Lekki (1 460 kg), zwinny i&nbsp;konfigurowalny pod gospodarstwo, sad, plantację i&nbsp;tereny zielone.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "35 KM" },
    { icon: Fuel, label: "Silnik", value: "LS Mtron L3CRV-T5" },
    { icon: Wrench, label: "Skrzynia", value: "Mechaniczna F12/R12 z rewersem" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "820 kg (kat. I)" },
    { icon: ArrowRight, label: "Masa", value: "1 460 kg (ROPS)" },
    { icon: Tractor, label: "Napęd", value: "4×4" },
  ],
  why: {
    eyebrow: "Dlaczego MT3.35",
    title: "Wejście do serii MT3 z pełną konfigurowalnością.",
    paragraphs: [
      "MT3.35 to najmniejszy ciągnik z serii MT3 LS Tractor — segmentu kompaktów wokół 35–60 KM, najczęściej wybieranego przez gospodarstwa rolne 5–20 ha, sady, plantacje i firmy utrzymujące zieleń.",
      <>Pod maską pracuje <strong>trzycylindrowy turbodiesel LS Mtron L3CRV-T5</strong>, a&nbsp;moc 35 KM trafia na&nbsp;koła przez mechaniczną <strong>skrzynię F12/R12 z&nbsp;rewersem</strong>. Power Shuttle (rewers hydrauliczny) dostępny w&nbsp;opcji.</>,
      <>Wyróżnikiem MT3.35 jest <strong>elastyczność konfiguracji</strong>: pałąk ROPS można zamontować przed lub&nbsp;za operatorem, do&nbsp;wyboru są opony rolnicze, industrialne i&nbsp;trawiaste, a&nbsp;WOM tylny można zamówić w&nbsp;wersji jednobiegowej lub&nbsp;trzybiegowej (540 / 540E / 1000).</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik LS Mtron L3CRV-T5",
      items: [
        "3-cylindrowy turbodiesel, chłodzony cieczą",
        "Moc znamionowa 35 KM",
        "Suchy filtr powietrza z wstępnym separatorem",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia i jazda",
      items: [
        "Mechaniczna F12/R12 z synchronizatorami",
        "Rewers mechaniczny w standardzie, Power Shuttle w opcji",
        "Hydrostatyczne wspomaganie kierownicy",
        "Mokre, dzielone hamulce",
        "Napęd 4×4 dołączany",
        "ROPS składany — montaż przed lub za operatorem",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny 540 obr/min w standardzie",
        "Opcjonalny WOM trzybiegowy: 540 / 540E / 1000",
        "Opcjonalny WOM międzyosiowy do kosiarek mid-mount",
        "TUZ kat. I, udźwig 820 kg",
        "4 wyjścia hydrauliczne w standardzie (opcja 6)",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Wymiary i ogumienie",
      items: [
        "Masa 1 460 kg (ROPS) — niskie naciski na podłoże",
        "Opony rolnicze AGRI w standardzie",
        "Opcjonalne opony industrialne (IND)",
        "Opcjonalne opony trawiaste (TURF)",
        "Konfiguracja ROPS przed lub za operatorem",
      ],
    },
    {
      icon: Lightbulb,
      title: "Pakiet komunalny i osprzęt",
      items: [
        "Ładowacz czołowy LS LL3015 z joystickiem",
        "Pług śnieżny z hydraulicznym skrętem",
        "Posypywarka materiałów sypkich na TUZ",
        "Kosiarka międzyosiowa (mid-mount) — wymaga WOM 2 000 obr",
        "Magazyn części LS Tractor Stekro MiniTrak i serwis w Brzeznej",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie MT3.35 sprawdza się najlepiej.",
    items: [
      { title: "Małe i średnie gospodarstwa (5–20 ha)", description: "35 KM, rewers i udźwig TUZ 820 kg — wystarczy do agregatu uprawowego 1,8 m, pługa 1-skibowego, rozsiewacza, beczkowozu i lekkiej prasy." },
      { title: "Sady i plantacje", description: "Niska masa 1 460 kg, niski profil i opcjonalne opony trawiaste pozwalają wjechać między rzędy drzew bez ryzyka uszkodzenia darni." },
      { title: "Architektura krajobrazu i zieleń miejska", description: "Wersja IND/TURF z kosiarką międzyosiową, pługiem śnieżnym lub posypywarką — idealna dla zarządców parków, deweloperów i firm utrzymujących tereny zielone." },
      { title: "Hodowla i stajnie", description: "Z ładowaczem LL3015 i widłami do bel sprawnie obsługuje stół paszowy, ścielenie boksów i transport słomy w gospodarstwach hodowlanych." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "MT3.35 — od salonu po pług komunalny.",
    images: [
      { src: heroImg, alt: "MT3.35 — wizualizacja modelu", emphasis: true },
      { src: frontImg, alt: "MT3.35 — widok z przodu" },
      { src: plowFrontImg, alt: "MT3.35 z pługiem komunalnym" },
      { src: plowSideImg, alt: "MT3.35 — widok z boku z pługiem" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Model silnika", "LS Mtron L3CRV-T5"],
        ["Typ", "3-cylindrowy turbodiesel, chłodzony cieczą"],
        ["Moc znamionowa", "35 KM"],
        ["Filtr powietrza", "Suchy z wstępnym separatorem"],
      ],
    },
    {
      title: "Przekładnia i jazda",
      rows: [
        ["Skrzynia", "Mechaniczna F12/R12 z synchronizatorami"],
        ["Rewers", "Mechaniczny lub Power Shuttle w opcji"],
        ["Wspomaganie kierownicy", "Hydrostatyczne"],
        ["Hamulce", "Mokre, dzielone"],
        ["Napęd", "4×4 dołączany"],
        ["Pałąk ROPS", "Składany — montaż przed lub za operatorem"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny — standard", "540 obr./min"],
        ["WOM tylny — opcja", "3 prędkości: 540 / 540E / 1000 obr."],
        ["WOM międzyosiowy", "Opcja"],
        ["TUZ", "Kategoria I"],
        ["Udźwig TUZ", "820 kg"],
        ["Wyjścia hydrauliczne", "Standard 4, opcja 6"],
      ],
    },
    {
      title: "Wymiary i opony",
      rows: [
        ["Masa (ROPS)", "1 460 kg"],
        ["Opony rolnicze", "AGRI — standard"],
        ["Opony industrialne", "IND — opcja"],
        ["Opony trawiaste", "TURF — opcja"],
        ["Konfiguracja ROPS", "Przed lub za operatorem"],
      ],
    },
  ],
  salesArguments: [
    "Najniższa masa w serii MT3 — 1 460 kg",
    "Trzy konfiguracje opon — rolnicze, industrialne, trawiaste",
    "ROPS przed lub za operatorem — wjazd pod niskie konstrukcje",
    "Rewers w standardzie — szybkie manewry z ładowaczem",
    "Opcjonalny WOM trzybiegowy — przygotowanie pod osprzęt premium",
  ],
};

export default function ModelLsMt335() {
  return <ModelPageLayout data={data} />;
}

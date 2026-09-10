import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const s26HstHero = "/model-solis-s26-hst-field-1.webp";
const s26HstMower = "/model-solis-s26-hst-field-2.webp";
const s26HstRear = "/model-solis-s26-hst-field-3.webp";
const s26HstCabin = "/model-solis-s26-hst-cabin.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S26 HST",
    full: "Solis S26 HST 4WD",
    headline: "Solis S26 HST 4WD",
    accent: "hydrostatyka, tempomat i kabina ITL — kompakt jak automatyczny SUV.",
  },
  hero: {
    image: s26HstHero,
    alt: "Solis S26 HST z kabiną i ładowaczem",
    eyebrow: "Solis / seria S — wersja HST",
    description: (
      <>
        Wersja S26 z&nbsp;przekładnią <strong>hydrostatyczną dwuzakresową</strong>, tempomatem i&nbsp;centralnym WOM. <strong>Mitsubishi 1,3 L</strong> pod maską, składany pałąk i&nbsp;prędkość do&nbsp;<strong>20 km/h</strong>. Idealny do&nbsp;kosiarek, sadów i&nbsp;całorocznych prac komunalnych — bez sprzęgła, bez szarpnięć, bez kompromisów.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc maksymalna", value: "24,5 KM" },
    { icon: Tractor, label: "Silnik", value: "Mitsubishi 3-cyl." },
    { icon: Wrench, label: "Napęd", value: "4WD" },
    { icon: ArrowRight, label: "Skrzynia", value: "Hydrostatyczna HST" },
    { icon: ShieldCheck, label: "Prędkość maks.", value: "20 km/h" },
    { icon: Fuel, label: "Pojemność silnika", value: "1 318 cm³" },
  ],
  why: {
    eyebrow: "Co zmienia HST",
    title: "Hydrostatyka oznacza brak sprzęgła i płynne przyspieszenie pedałem.",
    paragraphs: [
      <>Solis S26 HST dzieli z&nbsp;modelem mechanicznym ten sam <strong>silnik Mitsubishi 1,3 L o&nbsp;mocy 24,5 KM</strong>, ale przekładnia mechaniczna 6P+2T została zastąpiona <strong>dwuzakresową skrzynią hydrostatyczną</strong>. Zmiana prędkości odbywa się jednym pedałem — bez sprzęgła, bez szukania biegów, bez szarpnięć przy starcie z&nbsp;osprzętem.</>,
      <>Dodatkowy <strong>tempomat</strong> pozwala ustawić stałą prędkość roboczą i&nbsp;skupić się wyłącznie na&nbsp;kierowaniu. To rozwiązanie znane z&nbsp;premium kompaktów John Deere i&nbsp;Kubota — w&nbsp;S26 HST dostępne za&nbsp;ułamek ceny.</>,
      <>Producent zastosował tu też <strong>centralny WOM ze&nbsp;sprzęgłem mokrym</strong>, czyli rozwiązanie zoptymalizowane pod intensywną pracę z&nbsp;kosiarką podwoziową, mulczerem lub&nbsp;bijakami. Składany pałąk ROPS i&nbsp;kogut w&nbsp;standardzie ułatwiają pracę pod drzewami i&nbsp;przy ruchu drogowym.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Mitsubishi",
      items: [
        "3-cylindrowy diesel chłodzony cieczą",
        "Pojemność 1 318 cm³, moc 24,5 KM",
        "Sprawdzona jednostka z modelu S26",
      ],
    },
    {
      icon: Settings,
      title: "Przekładnia hydrostatyczna",
      items: [
        "Skrzynia hydrostatyczna HST z dwoma zakresami prędkości",
        "Tempomat — stała prędkość bez trzymania pedału",
        "Prędkość maksymalna 20 km/h",
        "Napęd 4×4",
        "Hydrauliczne wspomaganie kierownicy",
      ],
    },
    {
      icon: Wrench,
      title: "WOM i zaczepy",
      items: [
        "Mokre sprzęgło WOM — większa trwałość przy intensywnej pracy",
        "WOM centralny — idealny do kosiarek tylno-bocznych i mulczerów",
        "Dolny zaczep do przyczepy",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Bezpieczeństwo i widoczność",
      items: [
        "Pałąk ROPS składany — łatwy dostęp pod drzewa i wiaty",
        "Kogut ostrzegawczy w standardzie",
        "Koła rolnicze 6.00–12 (przód) / 8.3–20 (tył)",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie opcjonalne",
      items: [
        "Kabina ogrzewana — wersja turecka, możliwa do dołożenia później",
        "Oryginalna kabina ITL z płaską podłogą — tylko fabrycznie",
        "Radio z głośnikami",
        "Przedni TUZ + joystick do TUZ i pługa",
        "Pług do śniegu z hydraulicznym skrętem",
        "Ładowacz czołowy 2- lub 3-sekcyjny z łyżką 120 cm",
        "Opryskiwacz, kosiarka bijakowa, mulczer, posypywarka, zamiatarka",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie HST robi największą różnicę.",
    items: [
      { title: "Koszenie i utrzymanie zieleni", description: "Hydrostatyka i tempomat to wymarzone połączenie do pracy z kosiarką pokosową — operator pilnuje tylko kierowania, prędkość trzyma się sama." },
      { title: "Sady i szkółki drzewek", description: "Składany pałąk pozwala wjechać pod niskie korony, a płynna zmiana prędkości HST chroni młode rośliny przy szarpnięciach przekładni mechanicznej." },
      { title: "Posesje, parki i obiekty hotelowe", description: "Cicha praca, prosta obsługa pedałem i opcjonalna ogrzewana kabina sprawiają, że ciągnik obsłuży nawet operator bez doświadczenia rolniczego." },
      { title: "Komunalne odśnieżanie i prace całoroczne", description: "Przedni TUZ z joystickiem i pługiem do śniegu z hydraulicznym skrętem zamieniają S26 HST w zwinną maszynę miejską." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "S26 HST — w terenie i z kabiną ITL.",
    images: [
      { src: s26HstHero, alt: "Solis S26 HST z kabiną i ładowaczem", emphasis: true },
      { src: s26HstMower, alt: "Solis S26 HST w terenie" },
      { src: s26HstRear, alt: "Solis S26 HST — widok z tyłu" },
      { src: s26HstCabin, alt: "Oryginalna kabina ITL z płaską podłogą" },
      { src: "/solis_s26_hst/20250102_153920.webp", alt: "Solis S26 HST — zdjęcie 1" },
      { src: "/solis_s26_hst/20250102_153945.webp", alt: "Solis S26 HST — zdjęcie 2" },
      { src: "/solis_s26_hst/20250102_154102.webp", alt: "Solis S26 HST — zdjęcie 3" },
      { src: "/solis_s26_hst/solis-26-hst-su-originalia-kabina.webp", alt: "Solis S26 HST — zdjęcie 4" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Producent", "Mitsubishi"],
        ["Typ", "3-cylindrowy diesel, chłodzony cieczą"],
        ["Moc maksymalna", "24,5 KM"],
        ["Pojemność skokowa", "1 318 cm³"],
      ],
    },
    {
      title: "Napęd i przekładnia",
      rows: [
        ["Skrzynia biegów", "Hydrostatyczna z dwoma zakresami"],
        ["Tempomat", "Tak"],
        ["Napęd", "4×4 (4WD)"],
        ["Prędkość maksymalna", "20 km/h"],
        ["Wspomaganie kierownicy", "Hydrauliczne"],
      ],
    },
    {
      title: "WOM, hydraulika i zaczepy",
      rows: [
        ["Sprzęgło WOM", "Mokre"],
        ["WOM", "Centralny"],
        ["Zaczep do przyczepy", "Dolny"],
      ],
    },
    {
      title: "Bezpieczeństwo i ogumienie",
      rows: [
        ["Pałąk ochronny", "ROPS składany"],
        ["Lampa ostrzegawcza", "Kogut w standardzie"],
        ["Koła przednie", "6.00 – 12"],
        ["Koła tylne", "8.3 – 20"],
      ],
    },
  ],
  salesArguments: [
    "Hydrostatyka HST z tempomatem — komfort jak w premium kompaktach",
    "WOM centralny do kosiarek, mulczerów i bijaków",
    "Składany pałąk ROPS i kogut w standardzie",
    "Dwie wersje kabiny + przedni TUZ z joystickiem",
    "Magazyn części Stekro MiniTrak i serwis w Brzeznej",
  ],
};

export default function ModelSolisS26Hst() {
  return <ModelPageLayout data={data} />;
}

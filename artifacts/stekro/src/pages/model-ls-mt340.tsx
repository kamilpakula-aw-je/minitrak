import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-ls-mt340-hero.webp";
const cabinImg = "/model-ls-mt340-cabin.webp";
const sideImg = "/model-ls-mt340-side.webp";
const ropsImg = "/model-ls-mt340-rops.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "MT3.40",
    full: "LS Tractor MT3.40",
    headline: "LS Tractor MT3.40",
    accent: "40 KM, wybór MEC lub HST, ROPS lub kabina z klimatyzacją.",
  },
  hero: {
    image: heroImg,
    alt: "LS Tractor MT3.40",
    eyebrow: "LS Tractor / seria MT3 — kompakt 40 KM",
    description: (
      <>
        Druga maszyna w&nbsp;serii MT3 — kompakt LS Tractor o&nbsp;mocy <strong>40 KM</strong> z&nbsp;możliwością wyboru przekładni (<strong>mechaniczna z&nbsp;rewersem</strong> lub&nbsp;<strong>hydrostatyczna F3/R3</strong>) oraz&nbsp;nadwozia (ROPS lub&nbsp;fabryczna kabina z&nbsp;klimatyzacją). 8 wyjść hydraulicznych, fotel Grammer i&nbsp;pełen pakiet komunalny — od&nbsp;96 000 PLN netto.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "40 KM" },
    { icon: Fuel, label: "Silnik", value: "LS Mtron L3CRV-T4" },
    { icon: Wrench, label: "Skrzynia", value: "MEC z rewersem lub HST F3/R3" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "820 kg (kat. I)" },
    { icon: ArrowRight, label: "Masa", value: "1 460 / 1 660 kg" },
    { icon: Tractor, label: "Hydraulika", value: "8 wyjść hydraulicznych" },
  ],
  why: {
    eyebrow: "Dlaczego MT3.40",
    title: "Pełen wybór przekładni i nadwozia w jednym modelu.",
    paragraphs: [
      <>MT3.40 jest <strong>najbardziej konfigurowalnym kompaktem</strong> w&nbsp;serii MT3 LS Tractor. Ten sam silnik <strong>L3CRV-T4 o&nbsp;mocy 40 KM</strong> dostajesz w&nbsp;wersji ze&nbsp;skrzynią mechaniczną z&nbsp;rewersem (Power Shuttle) <em>lub</em> hydrostatyczną F3/R3 z&nbsp;tempomatem.</>,
      <>Drugi wybór to <strong>nadwozie</strong>: pałąk ROPS (1 460 kg, otwarte stanowisko, lepsza widoczność w&nbsp;sadzie) lub&nbsp;fabryczna <strong>kabina z&nbsp;klimatyzacją i&nbsp;ogrzewaniem</strong> (1 660 kg, pełny komfort sezon zimowy / letni).</>,
      <>Standard <strong>8 wyjść hydraulicznych</strong> i&nbsp;WOM międzyosiowy 2 000 obr. (opcja) przygotowują MT3.40 do&nbsp;każdego osprzętu komunalnego — od ładowacza LS LL3025, przez kosiarki mid-mount, po&nbsp;pług śnieżny z&nbsp;hydraulicznym skrętem.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik LS Mtron L3CRV-T4",
      items: [
        "3-cylindrowy turbodiesel chłodzony cieczą",
        "Moc znamionowa 40 KM",
        "Suchy filtr powietrza z wstępnym separatorem",
      ],
    },
    {
      icon: Settings,
      title: "Dwie skrzynie do wyboru",
      items: [
        "Wersja MEC: mechaniczna z synchronizatorami, rewers Power Shuttle (opcja)",
        "Wersja HST: hydrostatyczna F3/R3 z tempomatem",
        "Hydrostatyczne wspomaganie kierownicy",
        "Mokre, dzielone hamulce",
        "Napęd 4×4 dołączany",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny 540 obr/min w standardzie",
        "Opcjonalnie 540E i 1000 obr/min",
        "WOM międzyosiowy 2 000 obr/min — opcja",
        "TUZ kat. I, udźwig 820 kg",
        "8 wyjść hydraulicznych — pod ładowacz i pług",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Dwa nadwozia",
      items: [
        "ROPS — masa 1 460 kg, otwarte stanowisko",
        "Fabryczna kabina — masa 1 660 kg",
        "Klimatyzacja, ogrzewanie, audio (opcja) w kabinie",
        "Fotel Grammer z amortyzacją (opcja)",
        "Pasy bezpieczeństwa, oświetlenie LED",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie kabiny CAB",
      items: [
        "Klimatyzacja i ogrzewanie z nagrzewnicą",
        "Radio i system audio (opcja)",
        "Wycieraczki przednie i tylne",
        "Zewnętrzne oświetlenie LED",
        "Zamykana na klucz, wyciszona kabina",
        "Fotel Grammer z amortyzacją (opcja)",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie MT3.40 robi największą różnicę.",
    items: [
      { title: "Sady i plantacje", description: "Niski profil, masa 1 460 kg z ROPS i wersja HST z tempomatem to komfort przy oprysku, kosiarce sadowniczej i transporcie skrzyniopalet." },
      { title: "Średnie gospodarstwa (10–30 ha)", description: "40 KM, rewers i 8 wyjść hydraulicznych pozwalają obsłużyć agregat 2,0 m, lekki pług, beczkowóz oraz prasę zwijającą małej kostki." },
      { title: "Hodowla i stajnie", description: "Z ładowaczem LS LL3025 i widłami do bel sprawnie obsługuje stół paszowy, ścielenie boksów i transport słomy. Kabina z klimatyzacją to komfort latem." },
      { title: "Komunalne i tereny zielone", description: "Pakiet z pługiem śnieżnym, posypywarką i kosiarką międzyosiową — sezon zimowy w ciepłej kabinie z ogrzewaniem i radiem." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "MT3.40 — wersja kabinowa i ROPS.",
    images: [
      { src: heroImg, alt: "MT3.40 — wizualizacja modelu", emphasis: true },
      { src: cabinImg, alt: "MT3.40 z fabryczną kabiną" },
      { src: sideImg, alt: "MT3.40 — widok z boku" },
      { src: ropsImg, alt: "MT3.40 z pałąkiem ROPS" },
      { src: "/ls_mt340/ls_mt340_1.webp", alt: "LS MT 3.40 — zdjęcie 1" },
      { src: "/ls_mt340/ls_mt340_2.webp", alt: "LS MT 3.40 — zdjęcie 2" },
      { src: "/ls_mt340/ls_mt340_3.webp", alt: "LS MT 3.40 — zdjęcie 3" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Model silnika", "LS Mtron L3CRV-T4"],
        ["Typ", "3-cylindrowy turbodiesel, chłodzony cieczą"],
        ["Moc znamionowa", "40 KM"],
        ["Filtr powietrza", "Suchy z wstępnym separatorem"],
      ],
    },
    {
      title: "Przekładnia i jazda",
      rows: [
        ["Wersja MEC", "Mechaniczna z synchronizatorami, rewers Power Shuttle (opcja)"],
        ["Wersja HST", "Hydrostatyczna F3/R3 z tempomatem"],
        ["Wspomaganie kierownicy", "Hydrostatyczne"],
        ["Hamulce", "Mokre, dzielone"],
        ["Napęd", "4×4 dołączany"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny — standard", "540 obr./min"],
        ["WOM tylny — opcja", "540E i 1000 obr./min"],
        ["WOM międzyosiowy", "2 000 obr./min — opcja"],
        ["TUZ", "Kategoria I"],
        ["Udźwig TUZ", "820 kg"],
        ["Wyjścia hydrauliczne", "8 sztuk"],
      ],
    },
    {
      title: "Wymiary, kabina, opony",
      rows: [
        ["Masa (ROPS)", "1 460 kg"],
        ["Masa (CAB)", "1 660 kg"],
        ["Kabina", "Fabryczna — klimatyzacja, ogrzewanie, audio (opcja)"],
        ["Fotel", "Grammer z amortyzacją (opcja)"],
        ["Opony", "AGRI / IND / TURF — do wyboru"],
      ],
    },
  ],
  salesArguments: [
    "Wybór skrzyni: MEC z rewersem lub HST F3/R3 z tempomatem",
    "Wybór nadwozia: ROPS (1 460 kg) lub kabina z klimatyzacją (1 660 kg)",
    "8 wyjść hydraulicznych w standardzie",
    "Fotel Grammer i pakiet audio w opcji",
    "Cena startowa: od 96 000 PLN netto",
  ],
};

export default function ModelLsMt340() {
  return <ModelPageLayout data={data} />;
}

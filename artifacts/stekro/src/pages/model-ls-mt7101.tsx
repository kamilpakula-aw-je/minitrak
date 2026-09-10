import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-ls-mt7101-hero.webp";
const actionImg = "/model-ls-mt7101-action.webp";
const rearImg = "/model-ls-mt7101-rear.webp";
const sideImg = "/model-ls-mt7101-side.webp";
const frontImg = "/model-ls-mt7101-front.webp";
const mistImg = "/model-ls-mt7101-mist.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "MT7.101",
    full: "LS Tractor MT7.101",
    headline: "LS Tractor MT7.101",
    accent: "101 KM Fiat Stage V, Power Shuttle 40+40 i TUZ 3 800 kg.",
  },
  hero: {
    image: heroImg,
    alt: "LS Tractor MT7.101 — front w jesiennym polu",
    eyebrow: "LS Tractor / seria MT7 — flagowy utility 101 KM",
    description: (
      <>
        Flagowy ciągnik LS Tractor. <strong>4-cylindrowy Fiat (FPT) F36-75kW Stage V</strong> 3,6 L o&nbsp;mocy 101 KM, do&nbsp;wyboru <strong>Power Shuttle z&nbsp;półbiegami (40+40)</strong> lub&nbsp;Synchro Shuttle. Asystent TUZ <strong>EHL Auto</strong>, hydraulika 59,4 l/min, TUZ kat. II o&nbsp;udźwigu <strong>3,8 tony</strong>, premium fotel Grammer pneumatyczny i&nbsp;<strong>5 lat gwarancji</strong>.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "101 KM (75 kW)" },
    { icon: Fuel, label: "Silnik", value: "Fiat (FPT) F36-75kW Stage V, 3 595 cm³" },
    { icon: Wrench, label: "Skrzynia", value: "MEC 12+12 / PST 40+40 z półbiegami" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "3 800 kg (kat. II)" },
    { icon: ArrowRight, label: "Hydraulika", value: "59,4 l/min, 10 wyjść w 5 sekcjach" },
    { icon: Tractor, label: "WOM tylny", value: "3 prędkości: 540 / 540E / 1000" },
  ],
  why: {
    eyebrow: "Dlaczego MT7.101",
    title: "Flagowiec LS Tractor z silnikiem Fiat i przekładnią 40+40.",
    paragraphs: [
      <>MT7.101 to <strong>najmocniejszy ciągnik utility</strong> w&nbsp;ofercie LS Tractor. Wyróżnia go jednostka napędowa: <strong>4-cylindrowy turbodiesel Fiat (FPT) F36-75kW</strong> Stage V o&nbsp;pojemności 3 595 cm³ i&nbsp;mocy 101 KM przy 2 200 obr./min. Silnik znany z&nbsp;Fiat Powertrain Technologies — sprawdzony milionami godzin pracy w&nbsp;europejskim rolnictwie.</>,
      <>W wersji Power Shuttle (PST) MT7.101 oferuje <strong>40 biegów do&nbsp;przodu i&nbsp;40 wstecz</strong> — dzięki półbiegom obsługiwanym przyciskami na&nbsp;drążku. To rzadkie rozwiązanie w&nbsp;klasie 100 KM, kluczowe przy precyzyjnym wysiewie i&nbsp;pracy z&nbsp;prasą belującą.</>,
      <>TUZ kat. II o&nbsp;udźwigu <strong>3 800 kg</strong> z&nbsp;opcjonalnym asystentem <strong>EHL Auto</strong> obsługuje praktycznie każdy osprzęt rolniczy. <strong>59,4 l/min hydrauliki</strong> i&nbsp;10 wyjść w&nbsp;5 sekcjach to standard nieosiągalny w&nbsp;klasie.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Fiat (FPT) F36-75kW Stage V",
      items: [
        "4-cylindrowy turbodiesel CRDI, chłodzony cieczą",
        "Pojemność 3 595 cm³, moc 101 KM",
        "Prędkość znamionowa 2 200 obr/min",
        "Stage V z płynem AdBlue/DEF",
        "Zbiornik 115 L + osobny zbiornik AdBlue",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia i Power Shuttle",
      items: [
        "MEC 12+12 (20+20 z pełzaczami) z Synchro Shuttle",
        "PST 12+12 (40+40 z półbiegami i pełzaczami)",
        "Półbiegi: przyciski na drążku — kciukiem operatora",
        "Tempomat, mokre dzielone hamulce",
        "Wspomaganie kierownicy (pompa 29,5 l/min)",
        "Napęd 4×4",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny niezależny, mokre sprzęgło, elektrohydrauliczny wyłącznik",
        "3 prędkości: 540 / 540E / 1000 obr",
        "Pompa hydrauliczna 59,4 l/min",
        "TUZ kat. II, udźwig 3 800 kg",
        "Asystent TUZ EHL lub EHL Auto",
        "10 wyjść hydraulicznych (4 przód + 6 tył) w 5 sekcjach",
        "Balast przedni 8 × 40 kg = 320 kg w standardzie",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Kabina premium",
      items: [
        "Premium fotel Grammer pneumatyczny, obrotowy",
        "Wejście do kabiny z obu stron",
        "Panoramiczne przeszklenia, otwierana tylna szyba",
        "Wysokowydajne reflektory LED — przód i tył",
        "Regulowana kierownica, tempomat",
        "Klimatyzacja, ogrzewanie, bardzo dobra izolacja akustyczna",
      ],
    },
    {
      icon: Lightbulb,
      title: "Cztery konfiguracje i 5 lat gwarancji",
      items: [
        "MT7.101 MEC — Synchro Shuttle",
        "MT7.101 PST — Power Shuttle z półbiegami",
        "MT7.101 PST EHL — Power Shuttle z asystentem TUZ EHL",
        "MT7.101 PST Auto EHL — Power Shuttle z trybem Auto i pełnym EHL",
        "5 lat gwarancji producenta",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie MT7.101 robi największą różnicę.",
    items: [
      { title: "Duże gospodarstwa rolne (powyżej 100 ha)", description: "101 KM, TUZ 3 800 kg i hydraulika 59,4 l/min — wystarczy mocy na pług 4-skibowy obrotowy, prasę zwijającą bele 1,5 m, agregat uprawowy 4 m, czy siewnik zbożowy 3 m." },
      { title: "Profesjonalne usługi rolnicze", description: "Asystent TUZ EHL Auto i 10 wyjść hydraulicznych umożliwiają pracę z osprzętem precyzyjnym. PST z półbiegami zapewnia idealną prędkość pod każde zadanie polowe." },
      { title: "Hodowla bydła i firmy mleczne", description: "Power Shuttle z elektrohydraulicznym rewersem to płynna obsługa ładowacza, mieszalnika paszowego i przetrząsarki — bez wciskania sprzęgła setki razy dziennie." },
      { title: "Sady, plantacje i winnice premium", description: "Mimo 101 KM zachowuje rozsądne 197 cm szerokości i prześwit 464 mm. Promień skrętu 3,15 m oraz reflektory LED to gotowość do nocnych zabiegów ochronnych." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "MT7.101 — flagowiec LS Tractor w akcji.",
    images: [
      { src: heroImg, alt: "MT7.101 — front w jesiennym polu", emphasis: true },
      { src: actionImg, alt: "MT7.101 z agregatem talerzowym" },
      { src: mistImg, alt: "MT7.101 we mgle o świcie" },
      { src: frontImg, alt: "MT7.101 — front studio" },
      { src: sideImg, alt: "MT7.101 — widok z boku" },
      { src: rearImg, alt: "MT7.101 z tyłu z agregatem" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Model silnika", "F36-75kW Stage V"],
        ["Marka silnika", "Fiat (FPT)"],
        ["Typ", "4-cylindrowy turbodiesel CRDI, chłodzony cieczą"],
        ["Pojemność skokowa", "3 595 cm³"],
        ["Moc znamionowa", "75 kW / 101 KM"],
        ["Prędkość znamionowa", "2 200 obr./min"],
        ["Pojemność zbiornika paliwa", "115 L"],
        ["Filtr powietrza", "Suchy"],
        ["Norma emisji", "Stage V (z płynem AdBlue/DEF)"],
      ],
    },
    {
      title: "Przekładnia i jazda",
      rows: [
        ["Typ skrzyni", "Mechaniczna zsynchronizowana (MEC) lub Power Shuttle (PST)"],
        ["Liczba biegów (MEC)", "12 / 12 (20 / 20 z biegami pełzającymi)"],
        ["Liczba biegów (PST)", "12 / 12 (40 / 40 z półbiegami i pełzaczami)"],
        ["Rewers Synchro Shuttle (MEC)", "0,18 – 36,66 km/h"],
        ["Rewers Power Shuttle (PST)", "0,15 – 36,53 km/h, elektrohydrauliczny"],
        ["Półbiegi (PST)", "Przyciski na drążku — wciska kciukiem operator"],
        ["Wspomaganie kierownicy", "Tak (pompa 29,5 l/min)"],
        ["Hamulce", "Dzielone, mokre"],
        ["Tempomat", "Tak"],
        ["Napęd", "4×4"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny", "Niezależny, mokre sprzęgło, wyłącznik elektrohydrauliczny"],
        ["Tryby pracy WOM", "Zależny i niezależny + automatyczne wyłączanie"],
        ["Prędkości WOM tylnego", "540 (1 958 obr.) / 540E (1 535 obr.) / 1000 (2 125 obr.)"],
        ["Wydajność pompy hydraulicznej", "59,4 l/min"],
        ["TUZ", "Kategoria II"],
        ["Udźwig TUZ", "3 800 kg (na końcówkach kulowych)"],
        ["Asystent TUZ", "EHL lub EHL Auto — panel + przyciski na błotnikach"],
        ["Hydrauliczne poziomowanie zawieszenia (PST)", "Opcja"],
        ["Wyjścia hydrauliczne (przód)", "4 sztuki w 2 sekcjach (+2 opcjonalnie)"],
        ["Wyjścia hydrauliczne (tył)", "6 sztuk w 3 sekcjach"],
        ["Balast przedni standardowy", "8 × 40 kg = 320 kg"],
      ],
    },
    {
      title: "Wymiary i opony",
      rows: [
        ["Długość", "4 350 mm"],
        ["Szerokość", "1 967 mm"],
        ["Wysokość (CAB)", "2 679 mm"],
        ["Rozstaw osi", "2 287 mm"],
        ["Prześwit", "464 mm"],
        ["Promień skrętu", "3 150 mm"],
        ["Maks. kąt obrotu koła przedniego", "55°"],
        ["Masa bez balastu", "3 509 kg"],
        ["Masa z balastem", "3 860 kg"],
        ["Opony rolnicze", "12.4-24 / 16.9-34"],
      ],
    },
  ],
  salesArguments: [
    "Silnik Fiat (FPT) Stage V — sprawdzony i powszechnie serwisowany",
    "Power Shuttle z półbiegami: 40 + 40 biegów obsługiwanych z drążka",
    "TUZ kat. II o udźwigu 3 800 kg z asystentem EHL Auto",
    "10 wyjść hydraulicznych w 5 sekcjach — standard nieosiągalny w klasie",
    "Premium fotel Grammer + reflektory LED + wejście z obu stron",
    "Zbiornik 115 L + osobny zbiornik AdBlue",
    "5 lat gwarancji producenta",
  ],
};

export default function ModelLsMt7101() {
  return <ModelPageLayout data={data} />;
}

import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-ls-mt573.webp";
const grilleImg = "/model-ls-mt573-grille.webp";
const pstImg = "/model-ls-mt573-pst.webp";
const orchardImg = "/model-ls-mt573-orchard.webp";

const data: ModelPageData = {
  brand: { name: "LS Tractor", catalogHref: "/#katalog-ls-tractor" },
  model: {
    short: "MT5.73",
    full: "LS Tractor MT5.73",
    headline: "LS Tractor MT5.73",
    accent: "73 KM Stage V, Power Shuttle i TUZ kat. II 3 000 kg.",
  },
  hero: {
    image: heroImg,
    alt: "LS Tractor MT5.73 w sadzie",
    eyebrow: "LS Tractor / seria MT5 — utility 73 KM",
    description: (
      <>
        Klasa utility w&nbsp;pełnym tego słowa znaczeniu. <strong>4-cylindrowy LS Mtron L4CRV-T1A Stage V</strong> 2 505 cm³ o&nbsp;mocy 73 KM, do&nbsp;wyboru <strong>rewers Power Shuttle</strong> (elektrohydrauliczny) lub&nbsp;Synchro Shuttle, 12+12 biegów (20+20 z&nbsp;pełzaczami) i&nbsp;<strong>tempomat</strong>. Hydraulika 56 l/min, TUZ kat. II o&nbsp;udźwigu <strong>3 ton</strong>, 4-słupkowa kabina z&nbsp;fotelem Grammer i&nbsp;<strong>5 lat gwarancji</strong>.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "73 KM (54,4 kW)" },
    { icon: Fuel, label: "Silnik", value: "L4CRV-T1A Stage V, 2 505 cm³" },
    { icon: Wrench, label: "Skrzynia", value: "MEC 12+12 (20+20 z pełzaczami)" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "3 000 kg (kat. II)" },
    { icon: ArrowRight, label: "Hydraulika", value: "56 l/min, 10 wyjść w 5 sekcjach" },
    { icon: Tractor, label: "WOM tylny", value: "540 / 540E / 1000" },
  ],
  why: {
    eyebrow: "Dlaczego MT5.73",
    title: "Pełnowymiarowy utility 73 KM z technologią Power Shuttle.",
    paragraphs: [
      <>MT5.73 to <strong>flagowy ciągnik utility</strong> w&nbsp;ofercie LS Tractor — maszyna dla rolników z&nbsp;gospodarstwem 40–120 ha, sadowników z&nbsp;większymi areałami i&nbsp;firm usługowych. Odróżnia się od&nbsp;MT3 nie tylko mocą (73 KM vs 57 KM), ale przede wszystkim <strong>klasą TUZ-a</strong> (kat. II, 3 000 kg) i&nbsp;dostępnością elektrohydraulicznego rewersu Power Shuttle.</>,
      <>Pod maską pracuje <strong>4-cylindrowy LS Mtron L4CRV-T1A Stage V</strong> o&nbsp;pojemności 2 505 cm³ — silnik spełnia normę Stage V <strong>bez konieczności tankowania płynu DEF/AdBlue</strong>. Przekładnia oferuje 12+12 biegów (20+20 z&nbsp;pełzaczami) i&nbsp;<strong>ręczny przycisk sprzęgła na&nbsp;drążku</strong>, dzięki któremu zmiana biegów odbywa się bez wciskania pedału.</>,
      <>Hydraulika jest tym, co najbardziej wyróżnia MT5.73 w&nbsp;klasie 70 KM. <strong>10 wyjść hydraulicznych w&nbsp;5 sekcjach</strong> (4 z&nbsp;przodu + 6 z&nbsp;tyłu), wydajność pompy <strong>56 l/min</strong> i&nbsp;opcjonalny <strong>asystent TUZ EHL</strong> z&nbsp;panelem w&nbsp;kabinie i&nbsp;przyciskami na&nbsp;błotnikach pozwalają precyzyjnie operować ciężkim osprzętem.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik L4CRV-T1A Stage V",
      items: [
        "4-cylindrowy turbodiesel chłodzony cieczą",
        "Pojemność 2 505 cm³, moc 73 KM (54,4 kW)",
        "Prędkość znamionowa 2 500 obr/min",
        "Norma emisji Stage V — bez płynu DEF/AdBlue",
        "Zbiornik paliwa 100 L — cały dzień pracy",
        "Suchy filtr powietrza",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia i rewers",
      items: [
        "Mechaniczna zsynchronizowana 12+12 (20+20 z pełzaczami)",
        "Wersja Synchro Shuttle (MEC): 0,16 – 32 km/h, pełzacze 160 m/h",
        "Wersja Power Shuttle (PST): 0,15 – 33 km/h, elektrohydraulicznie, bez sprzęgła",
        "Przycisk sprzęgła na drążku — zmiana biegów bez pedału",
        "Wspomaganie kierownicy (pompa 25 l/min)",
        "Tempomat, mokre dzielone hamulce, napęd 4×4",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny niezależny, mokre sprzęgło, moc 62 KM",
        "3 prędkości: 540 / 540E / 1000 obr",
        "Pompa hydrauliczna 56 l/min",
        "TUZ kat. II, udźwig 3 000 kg",
        "Opcjonalny asystent EHL — panel w kabinie + przyciski na błotnikach",
        "10 wyjść hydraulicznych w 5 sekcjach (4 przód + 6 tył)",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Kabina 4-słupkowa premium",
      items: [
        "Brak słupka środkowego — panoramiczna widoczność",
        "Fotel Grammer z amortyzacją pneumatyczną i obrotem na boki",
        "Regulowana kierownica (dźwignia nożna)",
        "Klimatyzacja, ogrzewanie, radio",
        "Otwierana tylna szyba, duże lusterka, wycieraczki przód/tył",
        "Płaska platforma z gumową matą antypoślizgową",
      ],
    },
    {
      icon: Lightbulb,
      title: "Pięć konfiguracji i 5 lat gwarancji",
      items: [
        "MT5.73 MEC — podstawowa konfiguracja z Synchro Shuttle",
        "MT5.73 MEC EHL — Synchro Shuttle + asystent TUZ EHL",
        "MT5.73 PST — Power Shuttle, elektrohydraulicznie",
        "MT5.73 PST EHL — Power Shuttle z asystentem TUZ",
        "MT5.73 PST Auto EHL — Power Shuttle Auto z pełnym EHL",
        "5 lat gwarancji producenta",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie MT5.73 jest najsilniejszą propozycją.",
    items: [
      { title: "Średnie i większe gospodarstwa (40–120 ha)", description: "Moc 73 KM i TUZ 3 000 kg pozwalają zaagregować pług 3-skibowy, prasę zwijającą duże bele, kosiarkę dyskową 2,4 m, agregat uprawowy 3 m czy beczkowóz 6 000 L." },
      { title: "Sady, plantacje i winnice", description: "Szerokość 189 cm, 4-słupkowa kabina i prześwit 459 mm sprawdzą się przy oprysku, kosiarce sadowniczej i międzyrzędziu — z minimalnym ryzykiem zaczepienia o gałęzie." },
      { title: "Hodowla i gospodarstwo mleczne", description: "Power Shuttle z elektrohydraulicznym rewersem to płynna obsługa ładowacza i mieszalnika paszowego, a tempomat ułatwia ścielenie boksów i transport kiszonki." },
      { title: "Usługi rolnicze i prace komunalne", description: "Hydraulika 56 l/min, asystent EHL i 10 wyjść hydraulicznych to gotowość do pracy z osprzętem branżowym, rozsiewaczem nawozów i pakietem zimowym dla gmin." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "MT5.73 — od grilla po pracę w sadzie.",
    images: [
      { src: heroImg, alt: "LS Tractor MT5.73 w sadzie wiosną", emphasis: true },
      { src: grilleImg, alt: "MT5.73 — grill i reflektory LED" },
      { src: pstImg, alt: "MT5.73 PST — Power Shuttle" },
      { src: orchardImg, alt: "MT5.73 w sadzie" },
      { src: "/ls_mt573/ls_mt573_01.webp", alt: "LS MT 5.73 — zdjęcie 1" },
      { src: "/ls_mt573/ls_mt573_02.webp", alt: "LS MT 5.73 — zdjęcie 2" },
      { src: "/ls_mt573/ls_mt573_03.webp", alt: "LS MT 5.73 — zdjęcie 3" },
      { src: "/ls_mt573/ls_mt573_04.webp", alt: "LS MT 5.73 — zdjęcie 4" },
      { src: "/ls_mt573/ls_mt573_05.webp", alt: "LS MT 5.73 — zdjęcie 5" },
      { src: "/ls_mt573/ls_mt573_06.webp", alt: "LS MT 5.73 — zdjęcie 6" },
      { src: "/ls_mt573/ls_mt573_07.webp", alt: "LS MT 5.73 — zdjęcie 7" },
      { src: "/ls_mt573/ls_mt573_08.webp", alt: "LS MT 5.73 — zdjęcie 8" },
      { src: "/ls_mt573/ls_mt573_09.webp", alt: "LS MT 5.73 — zdjęcie 9" },
      { src: "/ls_mt573/ls_mt573_10.webp", alt: "LS MT 5.73 — zdjęcie 10" },
      { src: "/ls_mt573/ls_mt573_11.webp", alt: "LS MT 5.73 — zdjęcie 11" },
      { src: "/ls_mt573/ls_mt573_12.webp", alt: "LS MT 5.73 — zdjęcie 12" },
      { src: "/ls_mt573/ls_mt573_13.webp", alt: "LS MT 5.73 — zdjęcie 13" },
      { src: "/ls_mt573/ls_mt573_14.webp", alt: "LS MT 5.73 — zdjęcie 14" },
      { src: "/ls_mt573/ls_mt573_15.webp", alt: "LS MT 5.73 — zdjęcie 15" },
      { src: "/ls_mt573/ls_mt573_16.webp", alt: "LS MT 5.73 — zdjęcie 16" },
      { src: "/ls_mt573/ls_mt573_17.webp", alt: "LS MT 5.73 — zdjęcie 17" },
      { src: "/ls_mt573/ls_mt573_18.webp", alt: "LS MT 5.73 — zdjęcie 18" },
      { src: "/ls_mt573/ls_mt573_19.webp", alt: "LS MT 5.73 — zdjęcie 19" },
      { src: "/ls_mt573/ls_mt573_20.webp", alt: "LS MT 5.73 — zdjęcie 20" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Model silnika", "LS Mtron L4CRV-T1A Stage V"],
        ["Typ", "4-cylindrowy turbodiesel, chłodzony cieczą"],
        ["Pojemność skokowa", "2 505 cm³"],
        ["Moc znamionowa", "54,4 kW / 73 KM"],
        ["Prędkość znamionowa", "2 500 obr./min"],
        ["Pojemność zbiornika paliwa", "100 L"],
        ["Filtr powietrza", "Suchy"],
        ["Norma emisji", "Stage V (bez płynu DEF)"],
      ],
    },
    {
      title: "Przekładnia i jazda",
      rows: [
        ["Typ skrzyni", "Mechaniczna zsynchronizowana (MEC)"],
        ["Liczba biegów", "12 / 12 (20 / 20 z biegami pełzającymi)"],
        ["Rewers Synchro Shuttle", "0,16 – 32 km/h, biegi pełzające 160 m/h"],
        ["Rewers Power Shuttle (PST)", "0,15 – 33 km/h, elektrohydraulicznie, bez sprzęgła"],
        ["Sprzęgło ręczne", "Przycisk na drążku — zmiana biegów bez pedału"],
        ["Wspomaganie kierownicy", "Tak (pompa 25 l/min)"],
        ["Hamulce", "Dzielone, mokre"],
        ["Tempomat", "Tak"],
        ["Napęd", "4×4"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["WOM tylny", "Niezależny, mokre sprzęgło, wyłącznik elektrohydrauliczny"],
        ["Moc na WOM", "62 KM"],
        ["Prędkości WOM tylnego", "540 (2 237 obr.) / 540E (2 471 obr.) / 1000 (2 318 obr.)"],
        ["Wydajność pompy hydraulicznej", "56 l/min"],
        ["TUZ", "Kategoria II"],
        ["Udźwig TUZ", "3 000 kg (na końcówkach kulowych)"],
        ["Asystent TUZ EHL", "Opcja — panel w kabinie + przyciski na błotnikach"],
        ["Hydrauliczne poziomowanie zawieszenia", "Opcja"],
        ["Wyjścia hydrauliczne (przód)", "4 sztuki w 2 sekcjach (możliwość +2)"],
        ["Wyjścia hydrauliczne (tył)", "6 sztuk w 3 sekcjach"],
      ],
    },
    {
      title: "Wymiary i opony",
      rows: [
        ["Długość", "3 977 mm"],
        ["Szerokość", "1 890 mm"],
        ["Wysokość (CAB)", "2 652 mm"],
        ["Rozstaw osi", "2 150 mm"],
        ["Prześwit", "459 mm"],
        ["Promień skrętu", "3 959 mm (3 427 mm z hamulcami)"],
        ["Maks. kąt obrotu koła przedniego", "49,5°"],
        ["Masa bez balastu", "2 997 kg"],
        ["Masa z balastem", "3 300 kg"],
        ["Opony rolnicze", "11.2-24 / 16.9-30"],
      ],
    },
  ],
  salesArguments: [
    "73 KM Stage V — bez płynu DEF/AdBlue",
    "Power Shuttle — elektrohydrauliczny rewers bez sprzęgła",
    "TUZ kat. II o udźwigu 3 000 kg z opcjonalnym asystentem EHL",
    "10 wyjść hydraulicznych w 5 sekcjach (4 z przodu, 6 z tyłu)",
    "Fotel Grammer, kabina 4-słupkowa i klimatyzacja",
    "5 lat gwarancji producenta",
  ],
};

export default function ModelLsMt573() {
  return <ModelPageLayout data={data} />;
}

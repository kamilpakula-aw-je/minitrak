import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-aupax-3075.webp";

const data: ModelPageData = {
  brand: { name: "Aupax", catalogHref: "/#katalog-aupax" },
  model: {
    short: "3075",
    full: "Aupax 3075",
    headline: "Aupax 3075",
    accent: "75 KM, 320 Nm momentu od 1 600 obr/min i 12+12 Synchro Shuttle.",
  },
  hero: {
    image: heroImg,
    alt: "Aupax 3075 — 75 KM Doosan z pełną kabiną i klimatyzacją",
    eyebrow: "Aupax / seria 3000 — 75 KM Doosan z pełną kabiną",
    description: (
      <>
        Aupax 3075 to <strong>uniwersalny ciągnik średniej klasy</strong> oparty na&nbsp;sprawdzonym koreańskim silniku <strong>Doosan DM02 Stage V bez DEF/AdBlue</strong>. <strong>320 Nm momentu obrotowego dostępne już przy 1 600 obr/min</strong> oznacza dużą rezerwę mocy do&nbsp;ciężkich prac — orki, prasowania, ładowacza i&nbsp;transportu z&nbsp;przyczepami. Synchro Shuttle 12+12, 10-calowe sprzęgło dwuczynnościowe i&nbsp;mokre hamulce tarczowe to konstrukcja, która wytrzyma codzienną intensywną pracę. <strong>7 lat gwarancji bez limitu motogodzin.</strong>
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "75 KM" },
    { icon: Fuel, label: "Silnik", value: "Doosan DM02 Stage V, 4-cyl, 320 Nm @ 1 600 obr" },
    { icon: Wrench, label: "Skrzynia", value: "Synchro Shuttle 12F + 12R, 4WD" },
    { icon: Tractor, label: "Masa robocza", value: "ok. 2 600 kg" },
    { icon: ShieldCheck, label: "Hamulce", value: "Mokre, tarczowe w kąpieli olejowej" },
    { icon: ArrowRight, label: `Sprzęgło`, value: `10" dwuczynnościowe` },
  ],
  why: {
    eyebrow: "Dlaczego Aupax 3075",
    title: "75 KM dla wszystkich, którzy potrzebują rezerwy mocy.",
    paragraphs: [
      <>Aupax 3075 to <strong>najmocniejszy ciągnik serii 3000</strong> i&nbsp;jednocześnie maszyna, która sprawdzi się w&nbsp;gospodarstwach do&nbsp;50-70 ha jako jedyny lub&nbsp;główny ciągnik. Pod maską <strong>4-cylindrowy Doosan DM02 Stage V</strong> bez DEF — ten sam silnik znany z&nbsp;wcześniejszego 3055, ale w&nbsp;wyższej kalibracji mocy. Brak AdBlue oznacza prostszą eksploatację i&nbsp;niższe koszty serwisu.</>,
      <>Kluczowy parametr 3075 to <strong>maksymalny moment 320 Nm dostępny już przy 1 600 obr/min</strong>. To oznacza, że&nbsp;ciągnik nie traci mocy przy obciążeniu i&nbsp;pracuje cicho na&nbsp;niskich obrotach — kluczowe przy orce, ciężkim agregowaniu i&nbsp;pracy z&nbsp;prasami zwijającymi. Synchronizowana skrzynia <strong>12 + 12 (4 biegi × 3 zakresy)</strong> daje gęstą siatkę przełożeń pod każdą operację.</>,
      <>Aupax 3075 to także <strong>10-calowe sprzęgło dwuczynnościowe</strong> przygotowane na&nbsp;pracę pod pełnym obciążeniem 75 KM, mokre hamulce tarczowe odporne na&nbsp;pył i&nbsp;wilgoć oraz&nbsp;<strong>pełnowymiarowa kabina z&nbsp;klimatyzacją</strong> w&nbsp;standardzie. Płaska podłoga, fotel z&nbsp;amortyzacją i&nbsp;panoramiczne przeszklenie sprawiają, że&nbsp;nawet 12-godzinny dzień pracy nie jest męczący.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Doosan DM02",
      items: [
        "Koreański 4-cylindrowy Diesel Stage V bez DEF/AdBlue",
        "Moc 75 KM",
        "Maksymalny moment 320 Nm dostępny już przy 1 600 obr/min",
        "Niski obrót przy dużym momencie — trwałość i ekonomia paliwa",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia i sprzęgło",
      items: [
        "Synchronizowana 12 + 12 z rewersem zsynchronizowanym",
        "Konfiguracja 4 biegi główne × 3 zakresy",
        `10" (250 mm) sprzęgło dwuczynnościowe`,
        "Mokre hamulce tarczowe w kąpieli olejowej",
        "Napęd 4WD",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, hydraulika i TUZ",
      items: [
        "Niezależny WOM 540 / 1 000 obr/min",
        "TUZ tylny kategoria II",
        "Elektrohydrauliczne sterowanie podnośnikiem z kabiny",
        "Współpraca z pługami, prasami, kosiarkami bijakowymi, glebogryzarkami",
        "Współpraca z ładowaczem z odpowiednim balastem tylnym",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Konstrukcja",
      items: [
        "Stabilna konstrukcja do orki, prasowania i ciężkiego transportu",
        "Masa robocza ok. 2 600 kg",
        "Reflektory robocze przednie i tylne",
        "7 lat gwarancji bez limitu motogodzin",
      ],
    },
    {
      icon: Lightbulb,
      title: "Kabina",
      items: [
        "Pełnowymiarowa kabina z klimatyzacją w standardzie",
        "Płaska podłoga — łatwe wsiadanie i czystość",
        "Komfortowy fotel z amortyzacją",
        "Regulowana kolumna kierownicy, czytelne wskaźniki",
        "Dobra widoczność panoramiczna",
        "Drzwi otwierane z obu stron",
        "Niski poziom hałasu i wibracji",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Jeden ciągnik do wszystkiego w gospodarstwie 50-70 ha.",
    items: [
      { title: "Pole orne i uprawa zbóż", description: "75 KM i 320 Nm momentu od 1 600 obr to wystarczająca moc do orki średnich gleb pługiem 3-skibowym, agregowania z bronami talerzowymi i siewu zbóż siewnikami zbożowymi do 3 metrów." },
      { title: "Sady, plantacje i hodowla", description: "Stabilna baza pod opryskiwacze sadownicze 1 000-1 500 L, kosiarki bijakowe, prasy zwijające małej i średniej wielkości oraz transport balotów. Idealny też do prac przy hodowli i obsługi obór." },
      { title: "Przyczepy i transport rolniczy", description: "Z 10-calowym sprzęgłem dwuczynnościowym i 12 biegami daje radę z przyczepami rolniczymi do 8-10 ton — od transportu obornika i kiszonki, po dowóz pasz i materiałów na pole." },
      { title: "Prace komunalne i usługowe", description: "Dla firm usługowych — kosiarki bijakowe na poboczach, posypywarki zimowe, pługi śnieżne, beczki asenizacyjne. Stage V bez DEF upraszcza eksploatację i obniża koszty." },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Producent", "Doosan (Korea Płd.)"],
        ["Model", "DM02"],
        ["Liczba cylindrów", "4"],
        ["Norma emisji", "Stage V — bez DEF/AdBlue"],
        ["Moc znamionowa", "75 KM"],
        ["Maksymalny moment obrotowy", "320 Nm przy 1 600 obr/min"],
        ["Charakterystyka", "Niski obrót przy dużym momencie — trwałość i ekonomia paliwa"],
      ],
    },
    {
      title: "Przekładnia i sprzęgło",
      rows: [
        ["Typ skrzyni", "Synchronizowana z rewersem (Synchro Shuttle)"],
        ["Liczba biegów", "12 do przodu / 12 do tyłu"],
        ["Konfiguracja", "4 biegi główne × 3 zakresy prędkości"],
        ["Rewers", "Zsynchronizowany — płynna zmiana kierunku jazdy"],
        ["Sprzęgło", `10" (250 mm) dwuczynnościowe (double-acting)`],
        ["Wytrzymałość sprzęgła", "Bezawaryjna praca przy 75 KM pod obciążeniem"],
        ["Hamulce", "Mokre, tarczowe w kąpieli olejowej"],
        ["Napęd", "4WD"],
      ],
    },
    {
      title: "WOM, hydraulika i TUZ",
      rows: [
        ["WOM tylny", "Niezależny, 540 / 1 000 obr/min"],
        ["TUZ tylny", "Kategoria II"],
        ["Sterowanie podnośnikiem", "Elektrohydrauliczne z kabiny"],
        ["Współpraca z osprzętem", "Pługi, opryskiwacze, prasy, kosiarki bijakowe, glebogryzarki, rozsiewacze"],
        ["Współpraca z ładowaczem", "Tak — z odpowiednim balastem tylnym"],
      ],
    },
    {
      title: "Kabina, masa i wyposażenie",
      rows: [
        ["Kabina", "Pełnowymiarowa z klimatyzacją"],
        ["Podłoga", "Płaska — łatwe wsiadanie i czystość"],
        ["Fotel operatora", "Z amortyzacją"],
        ["Reflektory", "Robocze przednie i tylne"],
        ["Masa robocza", "ok. 2 600 kg"],
        ["Gwarancja", "7 lat bez limitu motogodzin"],
      ],
    },
  ],
  salesArguments: [
    "Doosan DM02 Stage V bez DEF — proste paliwo, niższe koszty",
    "320 Nm momentu od 1 600 obr — moc dostępna od razu, ekonomia paliwa",
    "Synchro Shuttle 12+12 — gęsta siatka prędkości i płynny rewers",
    `10" sprzęgło dwuczynnościowe — bezawaryjność pod pełnym obciążeniem`,
    "Mokre hamulce tarczowe — trwałość i odporność na pył oraz wilgoć",
    "Klimatyzowana kabina i 7 lat gwarancji bez limitu motogodzin",
  ],
};

export default function ModelAupax3075() {
  return <ModelPageLayout data={data} />;
}

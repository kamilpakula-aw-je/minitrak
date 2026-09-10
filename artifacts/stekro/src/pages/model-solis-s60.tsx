import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import s60Hero from "@assets/S60_1_1776838972427.webp";
import s60Side from "@assets/S60_2_1776838972426.webp";
import s60Rear from "@assets/S60_3_1776838972426.webp";
import s60Front from "@assets/solis-s60-profesional-60dostepny-leczyca-565561924_1776838972429.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S60",
    full: "Solis S60 Shuttle XL",
    headline: "Solis S60 Shuttle XL",
    accent: "58 KM, 250 Nm i klimatyzowana kabina S Command Centre.",
  },
  hero: {
    image: s60Hero,
    alt: "Solis S60 Shuttle XL Cabin",
    eyebrow: "Solis / seria S — utility cabin",
    description: (
      <>
        Pełnoprawny ciągnik klasy 60 KM z&nbsp;trzycylindrowym silnikiem <strong>CRDi Stage V</strong> (turbo + intercooler), skrzynią synchromesh <strong>12F+12R Shuttle XL</strong> i&nbsp;hydrauliką <strong>S Boost</strong> z&nbsp;udźwigiem TUZ <strong>2 500 kg</strong>. Klimatyzowana kabina z&nbsp;bliźniaczymi reflektorami soczewkowymi i&nbsp;72-litrowy zbiornik paliwa to maszyna na&nbsp;całą zmianę roboczą.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc znamionowa", value: "58 KM (43,2 kW)" },
    { icon: Fuel, label: "Pojemność silnika", value: "3 065 cm³" },
    { icon: ArrowRight, label: "Moment maks.", value: "250 Nm @ 1 400 obr" },
    { icon: Wrench, label: "Skrzynia", value: "12F+12R Shuttle XL" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "2 500 kg" },
    { icon: Tractor, label: "Norma emisji", value: "Stage V (DOC+DPF)" },
  ],
  why: {
    eyebrow: "Dlaczego S60",
    title: "Skok do prawdziwej klasy roboczej — moment 250 Nm dostępny już od 1 400 obr.",
    paragraphs: [
      <>Solis S60 Shuttle XL to ciągnik, którym <strong>kończy się era kompaktów</strong>. Trzycylindrowa jednostka CRDi 3 065 cm³ z&nbsp;<strong>turbodoładowaniem i&nbsp;intercoolerem</strong> dostarcza 58 KM mocy znamionowej i — co ważniejsze — <strong>aż 250 Nm momentu już przy 1 400 obr/min</strong>. To oznacza, że&nbsp;ciągnik „ciągnie" wcześnie i&nbsp;bez przekręcania silnika.</>,
      <>Skrzynia <strong>synchromesh 12F+12R z&nbsp;rewersem Shuttle XL</strong> daje dwanaście biegów do&nbsp;przodu i&nbsp;dwanaście do&nbsp;tyłu — operator zawsze trafia w&nbsp;optymalny zakres do&nbsp;pługa, agregatu czy ładowacza. Hydraulika <strong>S Boost</strong> podnosi <strong>2 500 kg</strong>, co wystarczy do&nbsp;większości pras, kosiarek dyskowych czy pługów obracalnych w&nbsp;klasie 60 KM.</>,
      <>W standardzie znajduje się <strong>klimatyzowana kabina S Command Centre</strong> z&nbsp;bliźniaczymi reflektorami soczewkowymi (twin projector), 72-litrowym zbiornikiem paliwa i&nbsp;nowoczesnym pulpitem. Wydech poprowadzony jest przez maskę (updraft), co zachowuje czystą sylwetkę i&nbsp;nie ogranicza widoczności.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik S Tech CRDi Stage V",
      items: [
        "3-cylindrowy diesel z turbodoładowaniem i intercoolerem",
        "Pojemność 3 065 cm³, moc 58 KM (43,2 kW)",
        "250 Nm momentu już przy 1 400 obr/min",
        "Common Rail (CRDi) — precyzyjny wtrysk i kulturalna praca",
        "DOC + DPF zgodny z normą Stage V",
        "Suchy filtr powietrza dwustopniowy",
        "Zbiornik paliwa 72 L",
      ],
    },
    {
      icon: Settings,
      title: "Przeniesienie napędu",
      items: [
        "Skrzynia synchromesh 12F + 12R",
        "Rewers Shuttle XL — szybka zmiana kierunku",
        "Napęd 4×4",
        "Hamulce tarczowe w kąpieli olejowej",
      ],
    },
    {
      icon: Wrench,
      title: "Hydraulika i WOM",
      items: [
        "Hydraulika S Boost — udźwig TUZ 2 500 kg",
        "Pompa wysokowydajna z dwustopniowym sterowaniem",
        "2 pary rozdzielaczy w standardzie (opcjonalnie 3)",
        "WOM tylny 540 / 540E",
        "Szybki montaż ładowacza czołowego",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Kabina, oświetlenie i obsługa",
      items: [
        "S Command Centre — klimatyzowana kabina z ogrzewaniem",
        "Bliźniacze reflektory soczewkowe LED (twin projector)",
        "Kogut ostrzegawczy w standardzie",
        "Stylizowana maska otwierana w pełni",
        "Logiczny układ manetek, konsola pod prawą ręką",
      ],
    },
    {
      icon: Lightbulb,
      title: "Wyposażenie opcjonalne",
      items: [
        "Klimatyzowana kabina z ogrzewaniem i radiem (standard wersji Cabin)",
        "Ładowacz czołowy z joystickiem i łyżką roboczą",
        "Trzecia para rozdzielacza hydraulicznego",
        "Obciążniki przednie i tylne",
        "Ogumienie radialne, przemysłowe lub trawiaste",
        "Pakiet oświetlenia LED roboczego (przód + dach)",
        "Przedni TUZ + WOM przedni",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Gdzie S60 robi największą różnicę.",
    items: [
      { title: "Pełnowymiarowe gospodarstwa polowe", description: "Klasa 60 KM z momentem 250 Nm sprawdzi się przy orce, talerzowaniu, bronowaniu i siewie na areałach 30–80 ha. Skrzynia 12+12 Shuttle XL skraca manewry na uwrociu." },
      { title: "Hodowla, ferma i mieszalnia paszy", description: "Udźwig 2 500 kg, bliźniacze reflektory i komfortowa kabina to przepis na codzienną pracę z wozem paszowym, ścielarką i ładowaczem czołowym." },
      { title: "Transport i prace przeładunkowe", description: "Wysoki moment przy 1 400 obr/min i synchroniczna skrzynia z rewersem Shuttle XL idealnie nadają się do pracy z przyczepą lub remontów polowych." },
      { title: "Usługi rolnicze i komunalne", description: "DPF Stage V, S Command Centre i zbiornik paliwa 72 L pozwalają obsługiwać dłuższe zlecenia bez przerw — kosiarka, mulczer, opryskiwacz, pług śnieżny." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Solis S60 — kabina, bok i tył.",
    images: [
      { src: s60Hero, alt: "Solis S60 Shuttle XL z kabiną — widok 3/4 z przodu", emphasis: true },
      { src: s60Side, alt: "S60 — widok z boku" },
      { src: s60Front, alt: "S60 — atrapa i reflektory soczewkowe" },
      { src: s60Rear, alt: "S60 — widok z tyłu z lampami i kogutem" },
      { src: "/solis_S60/20260521_114732.webp", alt: "Solis S60 — zdjęcie 1" },
      { src: "/solis_S60/20260521_114740.webp", alt: "Solis S60 — zdjęcie 2" },
      { src: "/solis_S60/20260521_114748.webp", alt: "Solis S60 — zdjęcie 3" },
      { src: "/solis_S60/20260521_114804.webp", alt: "Solis S60 — zdjęcie 4" },
      { src: "/solis_S60/20260521_114902.webp", alt: "Solis S60 — zdjęcie 5" },
      { src: "/solis_S60/20260521_114917.webp", alt: "Solis S60 — zdjęcie 6" },
      { src: "/solis_S60/20260521_114933.webp", alt: "Solis S60 — zdjęcie 7" },
      { src: "/solis_S60/20260521_115107.webp", alt: "Solis S60 — zdjęcie 8" },
      { src: "/solis_S60/20260521_115113.webp", alt: "Solis S60 — zdjęcie 9" },
      { src: "/solis_S60/20260521_115513.webp", alt: "Solis S60 — zdjęcie 10" },
      { src: "/solis_S60/20260521_115521.webp", alt: "Solis S60 — zdjęcie 11" },
      { src: "/solis_S60/20260521_115528.webp", alt: "Solis S60 — zdjęcie 12" },
      { src: "/solis_S60/20260521_115614.webp", alt: "Solis S60 — zdjęcie 13" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Typ", "S Tech CRDi, 3-cylindrowy, turbo + intercooler"],
        ["Norma emisji", "Stage V"],
        ["System oczyszczania spalin", "DOC + DPF"],
        ["Pojemność skokowa", "3 065 cm³"],
        ["Moc znamionowa", "43,2 kW / 58 KM"],
        ["Obroty znamionowe", "2 000 obr./min"],
        ["Maksymalny moment", "250 Nm @ 1 400 obr./min"],
        ["Filtr powietrza", "Suchy, dwustopniowy"],
        ["Wydech", "Updraft (przez maskę)"],
        ["Pojemność zbiornika paliwa", "72 L"],
      ],
    },
    {
      title: "Przeniesienie napędu",
      rows: [
        ["Skrzynia biegów", "Synchromesh 12F + 12R"],
        ["Rewers", "Shuttle XL"],
        ["Napęd", "4×4 (4WD)"],
        ["Hamulce", "Tarczowe w kąpieli olejowej"],
      ],
    },
    {
      title: "Hydraulika i WOM",
      rows: [
        ["Udźwig TUZ", "2 500 kg (S Boost)"],
        ["Pompa hydrauliczna", "Wysokowydajna z dwustopniowym sterowaniem"],
        ["Rozdzielacz hydrauliczny", "2 pary w standardzie, opcjonalnie 3"],
        ["WOM tylny", "540 / 540E"],
        ["Mocowanie ładowacza czołowego", "Szybki montaż w standardzie"],
      ],
    },
    {
      title: "Kabina, oświetlenie i obsługa",
      rows: [
        ["Kabina", "S Command Centre, klimatyzowana z ogrzewaniem"],
        ["Reflektory", "Twin projector LED"],
        ["Lampa ostrzegawcza", "Kogut w standardzie"],
        ["Maska", "Stylizowana, otwierana w pełni"],
        ["Ergonomia", "Logiczny układ manetek i konsola pod prawą ręką"],
      ],
    },
  ],
  salesArguments: [
    "250 Nm momentu już przy 1 400 obr/min — ciąg jak w premium",
    "Klimatyzowana kabina z reflektorami soczewkowymi w standardzie",
    "Skrzynia 12+12 Shuttle XL — szybki rewers przy ładowaczu",
    "Udźwig TUZ 2 500 kg do pras, pługów i kosiarek dyskowych",
    "Magazyn części Stekro MiniTrak i serwis mobilny w Małopolsce",
  ],
};

export default function ModelSolisS60() {
  return <ModelPageLayout data={data} />;
}

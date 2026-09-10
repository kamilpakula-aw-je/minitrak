import { ArrowRight, Fuel, Gauge, Lightbulb, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";

const heroImg = "/model-aupax-2025.webp";

const data: ModelPageData = {
  brand: { name: "Aupax", catalogHref: "/#katalog-aupax" },
  model: {
    short: "2025",
    full: "Aupax 2025",
    headline: "Aupax 2025",
    accent: "Wszechstronny i prosty w obsłudze — 25 KM, 8+8 Synchro Shuttle i mechaniczny wtrysk paliwa.",
  },
  hero: {
    image: heroImg,
    alt: "Aupax 2025 z kabiną podczas prac komunalnych — zamiatarka czyszcząca ulicę",
    eyebrow: "Aupax / seria 2000 — kompakt 25 KM Stage V",
    description: (
      <>
        Aupax 2025 to <strong>kompaktowy ciągnik dla małych gospodarstw, sadów, winnic i&nbsp;prac komunalnych</strong>. Pod maską <strong>3-cylindrowy Diesel KM385BT-VT1</strong> o&nbsp;pojemności 1 532 cm³ z&nbsp;mechanicznym wtryskiem paliwa — prosta i&nbsp;niezawodna konstrukcja bez wrażliwej elektroniki. Synchronizowana skrzynia <strong>8 + 8 z&nbsp;rewersem</strong>, mokre hamulce tarczowe i&nbsp;WOM <strong>540/1000 obr/min</strong> — wszystko w&nbsp;stabilnej konstrukcji o&nbsp;rozstawie osi 1 700 mm. <strong>7 lat gwarancji bez limitu motogodzin.</strong>
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc maksymalna", value: "25 KM (18,4 kW)" },
    { icon: Fuel, label: "Silnik", value: "KM385BT-VT1, 1 532 cm³, 3-cyl Stage V" },
    { icon: Wrench, label: "Skrzynia", value: "Synchro Shuttle 8F + 8R" },
    { icon: Tractor, label: "WOM", value: "540 / 1000 obr/min" },
    { icon: ShieldCheck, label: "Hamulce", value: "Mokre tarczowe" },
    { icon: ArrowRight, label: "Rozstaw osi", value: "1 700 mm" },
  ],
  why: {
    eyebrow: "Dlaczego Aupax 2025",
    title: "Prostota, niezawodność i niski koszt eksploatacji.",
    paragraphs: [
      <>Aupax 2025 to ciągnik dla wszystkich, którzy szukają <strong>prostej i&nbsp;niezawodnej maszyny ze&nbsp;sprawdzonym układem</strong>. Mechaniczny wtrysk paliwa to świadoma decyzja konstruktorów — zamiast skomplikowanej elektroniki common-rail, dostajesz układ zasilania, który może serwisować każdy mechanik, a&nbsp;awarie są rzadkie i&nbsp;tanie w&nbsp;naprawie.</>,
      <>Mimo niskiej ceny, producent nie poszedł na&nbsp;kompromisy w&nbsp;kluczowych obszarach. <strong>Synchronizowana skrzynia 8 + 8 z&nbsp;rewersem</strong> pozwala płynnie zmieniać kierunek jazdy bez zatrzymywania ciągnika — to ogromna oszczędność czasu przy pracach z ładowaczem, kosiarką czy w&nbsp;wąskich miejscach.</>,
      <>Mokre hamulce tarczowe pracują w&nbsp;kąpieli olejowej — są <strong>znacznie trwalsze od&nbsp;suchych klocków</strong>, nie wymagają regulacji i&nbsp;nie boją się intensywnej pracy w&nbsp;wilgotnym lub&nbsp;zapylonym środowisku. WOM dwustopniowy <strong>540 / 1 000 obr/min</strong> umożliwia podłączenie zarówno standardowych kosiarek i&nbsp;opryskiwaczy, jak i&nbsp;osprzętu wymagającego wyższych obrotów.</>,
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik KM385BT-VT1",
      items: [
        "Spokojny 3-cylindrowy Diesel z mechanicznym wtryskiem paliwa",
        "Pojemność 1 532 cm³",
        "Moc 25 KM (18,4 kW), prędkość znamionowa 2 350 obr/min",
        "Konfigurowalny pod normę emisji Stage V (Euro V)",
        "Niskie wibracje i wysoka kultura pracy",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia i hamulce",
      items: [
        "Synchronizowana 8 + 8 z rewersem zsynchronizowanym",
        "Płynna zmiana kierunku bez zatrzymywania ciągnika",
        "Mokre, tarczowe hamulce — większa trwałość",
        "Brak konieczności regulacji klocków",
        "Odporność na pył i wilgoć",
      ],
    },
    {
      icon: Wrench,
      title: "WOM i TUZ",
      items: [
        "WOM dwustopniowy 540 / 1 000 obr/min",
        "TUZ tylny kategorii I",
        "Osprzęt: kosiarki, opryskiwacze, glebogryzarki, rozsiewacze",
        "Obciążniki przednie do 80 kg, tylne do 112 kg",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Konstrukcja",
      items: [
        "Rozstaw osi 1 700 mm — stabilność na pochyleniach",
        "Opony 260/70 R16 (przód) i 280/85 R24 (tył)",
        "Prosta budowa = łatwy serwis i niskie koszty eksploatacji",
        "7 lat gwarancji bez limitu motogodzin",
      ],
    },
    {
      icon: Lightbulb,
      title: "Stanowisko operatora",
      items: [
        "Platforma z ramką ROPS lub kabina z daszkiem (zależnie od konfiguracji)",
        "Płaska podłoga — łatwe wsiadanie i czystość",
        "Komfortowe siedzisko z amortyzacją",
        "Regulowana kolumna kierownicy, czytelne wskaźniki",
        "Dźwignia rewersu pod kierownicą",
        "Wszystkie funkcje w zasięgu ręki",
      ],
    },
  ],
  useCases: {
    eyebrow: "Cztery scenariusze",
    title: "Dla kogo jest Aupax 2025.",
    items: [
      { title: "Małe gospodarstwa rolne", description: "Idealny do uprawy roli, koszenia, transportu i obsługi opryskiwaczy w gospodarstwach do kilkunastu hektarów. Mechaniczny wtrysk paliwa = brak elektroniki, którą można popsuć." },
      { title: "Sady i winnice", description: "Kompaktowe wymiary i WOM 540 obr/min do koszenia trawy między rzędami, oprysku i transportu skrzynek z owocami. Stabilna konstrukcja na pochyleniach terenu." },
      { title: "Hodowla i mieszane gospodarstwa", description: "Codzienna praca przy hodowli — transport paszy, ścielenie boksów, czyszczenie obór z odpowiednim osprzętem. Niezawodność japońsko-koreańskiej szkoły konstrukcyjnej." },
      { title: "Hobby i agroturystyka", description: "Dla pasjonatów rolnictwa, agroturystyki i właścicieli większych posesji. Prostota obsługi, ekonomia eksploatacji i niski próg wejścia w nowoczesny sprzęt." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Zobacz Aupax 2025 z każdej strony.",
    images: [
      { src: "/aupax_2025/aupax_2025_1.webp", alt: "Aupax 2025 z kabiną — widok 3/4 z przodu, turkusowe nadwozie i przedni TUZ", emphasis: true },
      { src: "/aupax_2025/aupax_2025_6.webp", alt: "Aupax 2025 — widok z przodu: reflektory LED, lusterka i przednia wyciągarka" },
      { src: "/aupax_2025/aupax_2025_7.webp", alt: "Aupax 2025 — widok boczny prawej strony z kabiną i oznaczeniem modelu" },
      { src: "/aupax_2025/aupax_2025_8.webp", alt: "Aupax 2025 — widok 3/4 z przodu z prawej strony" },
      { src: "/aupax_2025/aupax_2025_3.webp", alt: "Aupax 2025 — widok 3/4 z tyłu z belką ostrzegawczą i lusterkami" },
      { src: "/aupax_2025/aupax_2025_2.webp", alt: "Aupax 2025 — tył: TUZ, WOM, wyjścia hydrauliki i światła tylne" },
      { src: "/aupax_2025/aupax_2025_4.webp", alt: "Aupax 2025 — wnętrze kabiny: fotel operatora z amortyzacją i kierownica" },
      { src: "/aupax_2025/aupax_2025_5.webp", alt: "Aupax 2025 — cyfrowy zestaw wskaźników AUPAX i dźwignia rewersu pod kierownicą" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Model silnika", "KM385BT-VT1"],
        ["Pojemność", "1 532 cm³ (1,5 L)"],
        ["Liczba cylindrów", "3"],
        ["Norma emisji", "Stage V (Euro V) — konfiguracja"],
        ["Moc maksymalna", "18,4 kW (25 KM)"],
        ["Prędkość znamionowa", "2 350 obr/min"],
        ["Wtrysk paliwa", "Mechaniczny — bez elektroniki, prosty serwis"],
      ],
    },
    {
      title: "Przekładnia i napęd",
      rows: [
        ["Typ skrzyni", "Synchronizowana z rewersem (Synchro Shuttle)"],
        ["Liczba biegów", "8 do przodu / 8 do tyłu"],
        ["Rewers", "Zsynchronizowany — płynna zmiana kierunku jazdy"],
        ["Hamulce", "Mokre, tarczowe"],
      ],
    },
    {
      title: "WOM i hydraulika",
      rows: [
        ["Wałek odbioru mocy (WOM)", "540 / 1 000 obr/min"],
        ["Możliwości WOM", "Kosiarki, opryskiwacze, glebogryzarki, rozsiewacze"],
        ["TUZ tylny", "Kategoria I"],
      ],
    },
    {
      title: "Wymiary, ogumienie i obciążenia",
      rows: [
        ["Rozstaw osi", "1 700 mm"],
        ["Maks. obciążniki przednie", "80 kg"],
        ["Maks. obciążniki tylne", "112 kg"],
        ["Opony przednie (standard)", "260/70 R16"],
        ["Opony tylne (standard)", "280/85 R24"],
        ["Gwarancja", "7 lat bez limitu motogodzin"],
      ],
    },
  ],
  salesArguments: [
    "Mechaniczny wtrysk paliwa — brak elektroniki, prosty serwis",
    "Synchro Shuttle 8+8 — płynny rewers bez zatrzymywania ciągnika",
    "Mokre hamulce tarczowe — trwałość i niezawodność",
    "WOM dwustopniowy 540/1000 — szeroka gama osprzętu",
    "Stabilna konstrukcja o rozstawie osi 1 700 mm",
    "7 lat gwarancji bez limitu motogodzin",
  ],
};

export default function ModelAupax2025() {
  return <ModelPageLayout data={data} />;
}

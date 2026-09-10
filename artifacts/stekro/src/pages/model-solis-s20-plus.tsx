import { ArrowRight, Fuel, Gauge, Lightbulb, Package, Settings, ShieldCheck, Tractor, Wrench } from "lucide-react";
import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import s20pHill from "@assets/S20+gallery1-min_1776837556088.webp";
import s20pPasture from "@assets/S20+gallery2-min_1776837556087.webp";

const data: ModelPageData = {
  brand: { name: "Solis", catalogHref: "/#katalog-solis" },
  model: {
    short: "S20+",
    full: "Solis S20+ 4WD",
    headline: "Solis S20+ 4WD",
    accent: "więcej udźwigu, więcej komfortu, te same gabaryty.",
  },
  hero: {
    image: s20pHill,
    alt: "Solis S20+ 4WD",
    eyebrow: "Solis / seria S",
    description: (
      <>
        Wzmocniona wersja Solisa S20: ten sam japoński silnik <strong>Mitsubishi 20 KM</strong>, ale TUZ podniesiony do&nbsp;<strong>600 kg</strong>, skrzynia <strong>6F+2R nowej generacji</strong> i&nbsp;pakiet S Comfort z&nbsp;ergonomicznym fotelem. Dla wymagających, którym potrzeba więcej mocy hydrauliki w&nbsp;ciasnych przestrzeniach.
      </>
    ),
  },
  stats: [
    { icon: Gauge, label: "Moc silnika", value: "20 KM" },
    { icon: Tractor, label: "Silnik", value: "Mitsubishi 3-cyl." },
    { icon: Wrench, label: "Napęd", value: "4WD" },
    { icon: ShieldCheck, label: "Udźwig TUZ", value: "600 kg" },
    { icon: ArrowRight, label: "Skrzynia", value: "6F + 2R" },
    { icon: Fuel, label: "Pojemność silnika", value: "953 cm³" },
  ],
  why: {
    eyebrow: "Co dodaje wersja Plus",
    title: "Plus to nie tylko nazwa — to konkretny bonus do hydrauliki, skrzyni i komfortu.",
    paragraphs: [
      <>Solis S20+ dzieli z&nbsp;modelem S20 ten sam dopracowany silnik Mitsubishi i&nbsp;hamulce w&nbsp;kąpieli olejowej, ale producent celowo wzmocnił trzy obszary: udźwig hydrauliki podniesiono z&nbsp;500 do&nbsp;<strong>600 kg</strong>, dołożono nową skrzynię biegów <strong>6F + 2R</strong> z&nbsp;płynniejszym przełączaniem i&nbsp;ergonomiczny fotel z&nbsp;pakietu S Comfort.</>,
      "Efekt? Maszyna nadal mieści się w bramach o standardowej szerokości, a zarazem obsłuży cięższe ładowacze, większe glebogryzarki i przyczepy z większą ładownością. Rozwiązanie dla użytkowników, którzy chcą długoterminowo pracować z osprzętem zbliżonym do limitu kompaktów — bez sięgania po model 26-konny.",
      "Stanowisko operatora zostało celowo otwarte. Więcej miejsca na nogi, mniej elementów blokujących wsiadanie, intuicyjnie rozmieszczone dźwignie boczne — wszystko po to, by 8-godzinny dzień pracy nie kończył się bólem pleców.",
    ],
  },
  featureGroups: [
    {
      icon: Fuel,
      title: "Silnik Mitsubishi",
      items: [
        "3-cylindrowy diesel, chłodzony cieczą, wolnossący",
        "Pojemność 953 cm³, moc 20 KM, moment 52 Nm",
        "Suchy filtr powietrza z czujnikiem zatkania",
        "Standardowy preheater do rozruchu w niskich temperaturach",
      ],
    },
    {
      icon: Settings,
      title: "Skrzynia nowej generacji",
      items: [
        "Skrzynia 6F + 2R z płynniejszym przełączaniem",
        "Boczne mocowanie głównej dźwigni biegów",
        "Napęd 4×4 — przełączalny",
        "Hydrauliczne wspomaganie kierownicy",
        "Hamulce mokre w kąpieli olejowej",
        "Blokada mechanizmu różnicowego",
      ],
    },
    {
      icon: Wrench,
      title: "WOM, TUZ i hydraulika",
      items: [
        "WOM tylny 540 / 1000 obr./min",
        "Hydrauliczny TUZ kat. I o udźwigu 600 kg",
        "2 wyjścia hydrauliczne / 1 sekcja — rozszerzalne",
        "Zaczep dolny do przyczepy",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Komfort i bezpieczeństwo",
      items: [
        "Pakiet S Comfort — ergonomiczny fotel do całodziennej pracy",
        "Przestronne stanowisko operatora — dużo miejsca na nogi",
        "Pałąk ROPS i pas bezpieczeństwa w standardzie",
        "Cztery opcje ogumienia: rolnicze, przemysłowe, trawnikowe, Galaxy Pro",
      ],
    },
    {
      icon: Package,
      title: "Osprzęt fabryczny",
      items: [
        "Ładowacz czołowy Solis — wyższy udźwig 600 kg pozwala na cięższe prace przeładunkowe",
        "Koparka tylna (Back Hoe) — drenaż, fundamenty, melioracje",
      ],
    },
    {
      icon: Lightbulb,
      title: "Dodatkowe wyposażenie u dealera",
      items: [
        "Glebogryzarka i kosiarka bijakowa",
        "Pług do śniegu, posypywarka, zamiatarka",
        "Przyczepa o ładowności do 1 200 kg",
        "Opryskiwacz sadowniczy",
        "Brona talerzowa i wirnikowa",
        "Przedni TUZ i WOM przedni",
      ],
    },
  ],
  useCases: {
    eyebrow: "Dla kogo jest Solis S20+",
    title: "Cztery scenariusze, w których 600 kg udźwigu robi różnicę.",
    items: [
      { title: "Stadniny i hodowle", description: "Czyszczenie wybiegów, transport bel, koszenie pastwisk i utrzymanie infrastruktury — komplet prac w jednej maszynie." },
      { title: "Małe i średnie gospodarstwa", description: "Większy udźwig 600 kg pozwala obsłużyć cięższe ładowacze, glebogryzarki i pługi bez kompromisu kompaktowych gabarytów." },
      { title: "Sady i winnice", description: "Wąska sylwetka i precyzyjne wspomaganie kierownicy umożliwiają pracę między rzędami z opryskiwaczem i kosiarką sadowniczą." },
      { title: "Tereny zielone i parki", description: "Opcja opon trawnikowych nie niszczy darni — idealny do utrzymania trawników, boisk i pasów zieleni miejskiej." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Solis S20+ — łąka, stadnina, codzienna praca.",
    images: [
      { src: s20pHill, alt: "Solis S20+ na łące", emphasis: true },
      { src: s20pPasture, alt: "Solis S20+ przy stadninie" },
    ],
  },
  specs: [
    {
      title: "Silnik",
      rows: [
        ["Marka", "Mitsubishi"],
        ["Typ", "3-cylindrowy diesel, chłodzony cieczą, wolnossący"],
        ["Moc znamionowa", "20 KM"],
        ["Pojemność skokowa", "953 cm³"],
        ["Prędkość znamionowa", "2 700 obr./min"],
        ["Maksymalny moment obrotowy", "52 Nm"],
        ["Filtr powietrza", "Suchy, z czujnikiem zatkania"],
        ["Rozruch w niskich temperaturach", "Standard (preheater)"],
        ["Tłumik wydechu", "W komorze silnika, wylot w dół"],
      ],
    },
    {
      title: "Przekładnia, napęd i hamulce",
      rows: [
        ["Typ skrzyni", "Mechaniczna 6F + 2R nowej generacji"],
        ["Boczne mocowanie dźwigni", "Tak"],
        ["Napęd", "4×4 (4WD) — przełączalny"],
        ["Wspomaganie kierownicy", "Hydrauliczne"],
        ["Hamulce", "Mokre, w kąpieli olejowej"],
        ["Blokada mechanizmu różnicowego", "Tak"],
      ],
    },
    {
      title: "WOM, TUZ i hydraulika",
      rows: [
        ["WOM tylny", "540 / 1000 obr./min"],
        ["TUZ", "Kategoria I, 3-punktowy"],
        ["Udźwig TUZ", "600 kg"],
        ["Wyjścia hydrauliczne", "2 sztuki / 1 sekcja (rozszerzalne)"],
        ["Zaczep do przyczepy", "Dolny"],
      ],
    },
    {
      title: "Komfort i bezpieczeństwo",
      rows: [
        ["Pakiet komfortu", "S Comfort — ergonomiczny fotel"],
        ["Stanowisko operatora", "Przestronne, dużo miejsca na nogi"],
        ["Opcje ogumienia", "Rolnicze / przemysłowe / trawnikowe / Galaxy Pro"],
        ["Pałąk ochronny", "ROPS w standardzie"],
        ["Pas bezpieczeństwa", "Standard"],
        ["Akumulator", "12 V"],
      ],
    },
  ],
  salesArguments: [
    "Udźwig TUZ 600 kg — o 100 kg więcej niż w S20",
    "Skrzynia 6F+2R z płynniejszym przełączaniem",
    "Pakiet S Comfort i przestronne stanowisko operatora",
    "Niezawodny silnik Mitsubishi z niską emisją",
    "Magazyn części Stekro MiniTrak i serwis w Brzeznej",
  ],
};

export default function ModelSolisS20Plus() {
  return <ModelPageLayout data={data} />;
}

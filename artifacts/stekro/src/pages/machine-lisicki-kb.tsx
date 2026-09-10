import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import { MoveHorizontal, Ruler, Weight, ShieldCheck, Tractor, Wrench } from "lucide-react";

export default function MachineLisickiKb() {
  const data: ModelPageData = {
    brand: {
      name: "Kosiarki bijakowe",
      catalogHref: "/maszyny/kosiarki-bijakowe",
    },
    model: {
      short: "LISICKI KB",
      full: "Kosiarka bijakowa LISICKI KB",
      headline: "Kosiarka bijakowa LISICKI KB",
      accent: "szer. 1,0–2,4 m",
    },
    primaryAction: {
      label: "Kup produkt",
      href: "/zamowienie/lisicki-kb",
      pricedOptions: [
        { value: "KB 120", label: "KB 120 — 1,2 m", price: 5950 },
        { value: "KB 140", label: "KB 140 — 1,4 m", price: 6300 },
        { value: "KB 160", label: "KB 160 — 1,6 m", price: 6900 },
        { value: "KB 180", label: "KB 180 — 1,8 m", price: 8000 },
        { value: "KB 200", label: "KB 200 — 2,0 m", price: 9000 },
      ],
      addOns: [
        { value: "WOM 75", label: "WOM 75", price: 270 },
        { value: "WOM 80", label: "WOM 80", price: 300 },
        { value: "WOM 90", label: "WOM 90", price: 350 },
      ],
    },
    hero: {
      image: "/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-1-1200.webp",
      imageWidth: 1200,
      imageHeight: 676,
      alt: "Czerwona kosiarka bijakowa LISICKI KB zamontowana za ciągnikiem.",
      eyebrow: "Mulczer do ciągnika",
      description: (
        <>
          Kosiarka bijakowa LISICKI KB to solidny mulczer przeznaczony do koszenia i rozdrabniania trawy, chwastów, pozostałości roślinnych oraz lekkich zakrzaczeń. Dzięki zastosowaniu ciężkich młotków bijakowych maszyna skutecznie rozdrabnia materiał, pozostawiając go równomiernie rozłożonego na powierzchni.
        </>
      ),
      badges: [
        { label: "Szerokość od 1,0 m do 2,4 m", primary: true },
        { label: "Młotki bijakowe 0,7 kg" },
      ],
    },
    hideDisclaimers: true,
    stats: [
      { icon: Ruler, label: "Szerokość robocza", value: "1,0 – 2,4 m" },
      { icon: Weight, label: "Masa", value: "230 – 460 kg" },
      { icon: ShieldCheck, label: "Element roboczy", value: "Młotki bijakowe" },
      { icon: Tractor, label: "Zapotrzebowanie", value: "Od 18 KM" },
      { icon: Wrench, label: "Kategoria TUZ", value: "I / II" },
      { icon: MoveHorizontal, label: "Przesuw", value: "Opcja hydrauliczna" },
    ],
    why: {
      eyebrow: "Zastosowanie",
      title: "Gdzie sprawdzi się kosiarka LISICKI KB?",
      paragraphs: [
        "Kosiarka sprawdzi się zarówno w gospodarstwach rolnych i sadowniczych, jak również przy pielęgnacji terenów zielonych, nieużytków, poboczy, parków czy większych działek.",
        "Dostępność wielu szerokości roboczych pozwala dobrać odpowiedni model zarówno do mniejszego ciągnika, jak i maszyny o większej mocy.",
        "Kosiarka bijakowa LISICKI może być wykorzystywana między innymi do: koszenia traw i roślin niskołodygowych; pielęgnacji łąk i trwałych użytków zielonych; wykaszania nieużytków; koszenia poboczy i terenów komunalnych; pielęgnacji sadów; rozdrabniania pozostałości po kukurydzy i tytoniu; mulczowania poplonów takich jak gorczyca, facelia czy łubin; rozdrabniania cienkich, niestwardniałych gałęzi o średnicy do około 1,5 cm."
      ],
    },
    featureGroups: [
      {
        title: "Kluczowe parametry",
        icon: Tractor,
        items: [
          "Szerokości robocze od 1,0 do 2,4 m",
          "Solidne młotki bijakowe o masie około 0,7 kg",
          "Możliwość koszenia trawy, chwastów i roślinności na nieużytkach",
          "Możliwość mulczowania pozostałości po zbiorach i poplonów"
        ]
      },
      {
        title: "Solidna konstrukcja",
        icon: ShieldCheck,
        items: [
          "Rozdrabnianie cienkich, niestwardniałych gałęzi",
          "Regulowana wysokość koszenia",
          "Wał kopiujący pomagający prowadzić maszynę po nierównym terenie",
          "Płozy ślizgowe chroniące konstrukcję podczas pracy"
        ]
      },
      {
        title: "Napęd i montaż",
        icon: Wrench,
        items: [
          "Otwierana tylna pokrywa ułatwiająca pracę i obsługę maszyny",
          "Przekładnia pasowa zabezpieczająca układ napędowy przed przeciążeniem",
          "Napęd z WOM ciągnika 540 obr./min",
          "Możliwość zastosowania przesuwu hydraulicznego – opcja"
        ]
      }
    ],
    gallery: {
      title: "Galeria LISICKI KB",
      images: [
        { src: "/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-1-1200.webp", alt: "Czerwona kosiarka bijakowa LISICKI KB zamontowana za ciągnikiem.", title: "LISICKI KB zamontowana za ciągnikiem", width: 1200, height: 676 },
        { src: "/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-2-1200.webp", alt: "Boczno-tylne ujęcie połączenia kosiarki LISICKI KB z ciągnikiem.", title: "Połączenie kosiarki LISICKI KB z ciągnikiem", emphasis: true, width: 1200, height: 676 },
        { src: "/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-3-1200.webp", alt: "Czerwony ciągnik z zamontowaną kosiarką bijakową LISICKI KB.", title: "Ciągnik z kosiarką bijakową LISICKI KB", width: 1200, height: 676 },
        { src: "/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-4-1200.webp", alt: "Spód kosiarki LISICKI KB z widocznymi młotkami bijakowymi.", title: "Młotki bijakowe kosiarki LISICKI KB", width: 1200, height: 676 },
        { src: "/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-5-1200.webp", alt: "Kosiarka bijakowa LISICKI KB widziana od tyłu za ciągnikiem.", title: "Tył kosiarki bijakowej LISICKI KB", width: 1200, height: 676 },
        { src: "/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-6-1200.webp", alt: "Uniesiona kosiarka LISICKI KB w ujęciu trzy czwarte za ciągnikiem.", title: "Uniesiona kosiarka LISICKI KB", width: 1200, height: 676 },
      ],
    },
    specs: [
      {
        title: "KB 100",
        rows: [
          ["Szerokość robocza", "1,0 m"],
          ["Szerokość całkowita", "1,25 m"],
          ["Masa", "230 kg"],
          ["Liczba młotków", "16 szt."],
          ["Zapotrzebowanie mocy", "18 KM"]
        ]
      },
      {
        title: "KB 120",
        rows: [
          ["Szerokość robocza", "1,2 m"],
          ["Szerokość całkowita", "1,45 m"],
          ["Masa", "260 kg"],
          ["Liczba młotków", "18 szt."],
          ["Zapotrzebowanie mocy", "22 KM"]
        ]
      },
      {
        title: "KB 140",
        rows: [
          ["Szerokość robocza", "1,4 m"],
          ["Szerokość całkowita", "1,65 m"],
          ["Masa", "290 kg"],
          ["Liczba młotków", "22 szt."],
          ["Zapotrzebowanie mocy", "26 KM"]
        ]
      },
      {
        title: "KB 160",
        rows: [
          ["Szerokość robocza", "1,6 m"],
          ["Szerokość całkowita", "1,85 m"],
          ["Masa", "320 kg"],
          ["Liczba młotków", "24 szt."],
          ["Zapotrzebowanie mocy", "35 KM"]
        ]
      },
      {
        title: "KB 180",
        rows: [
          ["Szerokość robocza", "1,8 m"],
          ["Szerokość całkowita", "2,075 m"],
          ["Masa", "395 kg"],
          ["Liczba młotków", "28 szt."],
          ["Zapotrzebowanie mocy", "50 KM"]
        ]
      },
      {
        title: "KB 200",
        rows: [
          ["Szerokość robocza", "2,0 m"],
          ["Szerokość całkowita", "2,27 m"],
          ["Masa", "420 kg"],
          ["Liczba młotków", "32 szt."],
          ["Zapotrzebowanie mocy", "60 KM"]
        ]
      },
      {
        title: "KB 220",
        rows: [
          ["Szerokość robocza", "2,2 m"],
          ["Szerokość całkowita", "2,47 m"],
          ["Masa", "440 kg"],
          ["Liczba młotków", "34 szt."],
          ["Zapotrzebowanie mocy", "70 KM"]
        ]
      },
      {
        title: "KB 240",
        rows: [
          ["Szerokość robocza", "2,4 m"],
          ["Szerokość całkowita", "2,67 m"],
          ["Masa", "460 kg"],
          ["Liczba młotków", "36 szt."],
          ["Zapotrzebowanie mocy", "80 KM"]
        ]
      },
      {
        title: "Pozostałe parametry",
        rows: [
          ["Masa pojedynczego bijaka", "ok. 0,7 kg"],
          ["Wysokość koszenia", "10 / 35 / 60 mm"],
          ["Prędkość WOM", "540 obr./min"],
          ["Kategoria TUZ", "I / II"],
          ["Przesuw", "możliwość wyposażenia w przesuw hydrauliczny"],
          ["Tylna pokrywa", "otwierana"],
          ["Element roboczy", "młotki bijakowe"]
        ]
      }
    ],
    useCases: {
      title: "Jak dobrać szerokość kosiarki?",
      subtitle: "Przy wyborze kosiarki warto zwrócić uwagę przede wszystkim na moc ciągnika, jego szerokość oraz rodzaj wykonywanych prac.",
      paragraphs: [
        "Do mniejszych ciągników i pracy w sadach dobrym wyborem będą modele KB 100–KB 140. Wersje KB 160–KB 180 zapewniają większą wydajność i są uniwersalnym rozwiązaniem do gospodarstwa, natomiast modele KB 200–KB 240 przeznaczone są do większych ciągników oraz pracy na dużych powierzchniach.",
        "Wybierz odpowiednią szerokość kosiarki LISICKI z dostępnych wariantów. W razie wątpliwości dotyczących dopasowania maszyny do ciągnika skontaktuj się z nami – pomożemy dobrać właściwy model."
      ],
    },
    contact: {
      intro: "Złóż zamówienie lub zapytaj o kosiarkę bijakową LISICKI KB.",
    }
  };

  return <ModelPageLayout data={data} />;
}

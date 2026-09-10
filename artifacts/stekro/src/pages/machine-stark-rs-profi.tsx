import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import { Gauge, Layers3, MoveHorizontal, Ruler, Tractor, Weight, Wrench } from "lucide-react";

const commonRows: Array<[string, string]> = [
  ["Kategoria TUZ", "I"],
  ["Prędkość WOM", "540 obr./min"],
  ["Wymiary oznaczone przez producenta", "E 60 / F 410"],
  ["Wartość przy symbolu katalogowym producenta", "190"],
];

export default function MachineStarkRsProfi() {
  const data: ModelPageData = {
    brand: {
      name: "Glebogryzarki",
      catalogHref: "/maszyny/glebogryzarki",
    },
    model: {
      short: "STARK RS Profi",
      full: "Glebogryzarka STARK RS Profi",
      headline: "Glebogryzarka STARK RS Profi",
      accent: "szer. 0,95–1,35 m",
    },
    primaryAction: {
      label: "Kup produkt",
      href: "/zamowienie/stark-rs-profi",
      options: ["RS 95 Profi", "RS 105 Profi", "RS 115 Profi", "RS 125 Profi", "RS 135 Profi"],
    },
    hero: {
      image: "/products/stark-rs-profi/glebogryzarka-stark-rs-profi-3-1200.webp",
      imageWidth: 1200,
      imageHeight: 675,
      alt: "Zielona glebogryzarka STARK RS Profi ustawiona na polu.",
      eyebrow: "Profesjonalna glebogryzarka do ciągnika",
      description: (
        <>
          Seria STARK RS Profi obejmuje glebogryzarki o&nbsp;szerokości roboczej od 0,95 do 1,35&nbsp;m. Każdy model może pracować centralnie albo z&nbsp;mechanicznym przesunięciem na prawą stronę.
        </>
      ),
      badges: [
        { label: "Mechaniczny przesuw boczny", primary: true },
        { label: "Napęd łańcuchowy w kąpieli olejowej" },
      ],
    },
    hideDisclaimers: true,
    stats: [
      { icon: Ruler, label: "Szerokość robocza", value: "0,95–1,35 m" },
      { icon: Gauge, label: "Zapotrzebowanie mocy", value: "12–35 KM" },
      { icon: Weight, label: "Masa", value: "132–167 kg" },
      { icon: Tractor, label: "Kategoria TUZ", value: "I" },
      { icon: Wrench, label: "Prędkość WOM", value: "540 obr./min" },
      { icon: Layers3, label: "Wartość katalogowa", value: "190" },
    ],
    why: {
      eyebrow: "Konstrukcja serii RS Profi",
      title: "Rozwiązania opisane przez producenta",
      paragraphs: [
        "Wszystkie maszyny STARK RS Profi mogą pracować zarówno w pozycji centralnej, jak i z regulowanym przesunięciem na prawą stronę. Umożliwia to specjalny wał oraz trzypunktowy układ zawieszenia zamontowany na przesuwnej ramie.",
        "Wszystkie modele RS Profi mają jednobiegową przekładnię redukcyjną oraz boczny napęd łańcuchowy pracujący w kąpieli olejowej, wyposażony w układ napinania.",
        "Tylna pokrywa wyrównująca ma stopniowo opadający profil i większą szerokość przy krawędzi natarcia, co według producenta zapewnia równomierne wyrównanie gleby.",
        "Pojedyncza śruba tworzy szybki i praktyczny system ustawiania płóz bocznych, które kontrolują głębokość roboczą.",
      ],
    },
    featureGroups: [
      {
        title: "Mechaniczny przesuw boczny",
        icon: MoveHorizontal,
        items: [
          "Praca w pozycji centralnej",
          "Regulowane przesunięcie na prawą stronę",
          "Specjalny wał i trzypunktowy układ zawieszenia na przesuwnej ramie",
        ],
      },
      {
        title: "Układ napędowy",
        icon: Wrench,
        items: [
          "Jednobiegowa przekładnia redukcyjna",
          "Boczny napęd łańcuchowy w kąpieli olejowej",
          "Układ napinania łańcucha",
        ],
      },
      {
        title: "Wyrównanie i głębokość",
        icon: Layers3,
        items: [
          "Tylna pokrywa wyrównująca o stopniowo opadającym profilu",
          "Poszerzona krawędź natarcia pokrywy",
          "Regulacja płóz bocznych pojedynczą śrubą",
        ],
      },
    ],
    gallery: {
      title: "Galeria STARK RS Profi",
      images: [
        { src: "/products/stark-rs-profi/glebogryzarka-stark-rs-profi-1-599.webp", alt: "Glebogryzarka STARK RS Profi widziana od strony zespołu noży.", title: "Zespół noży STARK RS Profi", width: 599, height: 325 },
        { src: "/products/stark-rs-profi/glebogryzarka-stark-rs-profi-2-599.webp", alt: "Glebogryzarka STARK RS Profi widziana z tyłu i z boku.", title: "Tył glebogryzarki STARK RS Profi", width: 599, height: 436 },
        { src: "/products/stark-rs-profi/glebogryzarka-stark-rs-profi-3-1200.webp", alt: "Zielona glebogryzarka STARK RS Profi ustawiona na polu.", title: "Glebogryzarka STARK RS Profi", emphasis: true, width: 1200, height: 675 },
        { src: "/products/stark-rs-profi/glebogryzarka-stark-rs-profi-4-1000.webp", alt: "Glebogryzarka STARK RS Profi zamontowana na trzypunktowym układzie ciągnika.", title: "Montaż STARK RS Profi na ciągniku", width: 1000, height: 562 },
      ],
    },
    specs: [
      {
        title: "RS 95 Profi",
        rows: [["Szerokość robocza", "0,95 m"], ["Zapotrzebowanie mocy", "12–20 KM"], ...commonRows, ["Liczba noży", "10 lewych / 10 prawych"], ["Masa", "132 kg"]],
      },
      {
        title: "RS 105 Profi",
        rows: [["Szerokość robocza", "1,05 m"], ["Zapotrzebowanie mocy", "16–22 KM"], ...commonRows, ["Liczba noży", "12 lewych / 12 prawych"], ["Masa", "147 kg"]],
      },
      {
        title: "RS 115 Profi",
        rows: [["Szerokość robocza", "1,15 m"], ["Zapotrzebowanie mocy", "22–25 KM"], ...commonRows, ["Liczba noży", "12 lewych / 12 prawych"], ["Masa", "152 kg"]],
      },
      {
        title: "RS 125 Profi",
        rows: [["Szerokość robocza", "1,25 m"], ["Zapotrzebowanie mocy", "25–30 KM"], ...commonRows, ["Liczba noży", "14 lewych / 14 prawych"], ["Masa", "162 kg"]],
      },
      {
        title: "RS 135 Profi",
        rows: [["Szerokość robocza", "1,35 m"], ["Zapotrzebowanie mocy", "30–35 KM"], ...commonRows, ["Liczba noży", "14 lewych / 14 prawych"], ["Masa", "167 kg"]],
      },
    ],
    contact: {
      intro: "Złóż zamówienie lub zapytaj o glebogryzarkę STARK RS Profi.",
    },
  };

  return <ModelPageLayout data={data} />;
}
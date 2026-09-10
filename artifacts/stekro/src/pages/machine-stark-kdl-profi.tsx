import { ModelPageLayout, type ModelPageData } from "@/components/model-page";
import { MoveHorizontal, Ruler, Weight, ShieldCheck, Tractor, Wrench } from "lucide-react";

export default function MachineStarkKdlProfi() {
  const data: ModelPageData = {
    brand: {
      name: "Kosiarki bijakowe",
      catalogHref: "/maszyny/kosiarki-bijakowe",
    },
    model: {
      short: "STARK KDL Profi",
      full: "Kosiarka bijakowa STARK KDL Profi",
      headline: "Kosiarka bijakowa STARK KDL Profi",
      accent: "szer. 1,6–2,2 m",
    },
    primaryAction: {
      label: "Kup produkt",
      href: "/zamowienie/stark-kdl-profi",
      options: ["KDL 160 Profi", "KDL 180 Profi", "KDL 200 Profi", "KDL 220 Profi"],
    },
    hero: {
      image: "/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-1-900.webp",
      imageWidth: 900,
      imageHeight: 675,
      alt: "Zielona kosiarka bijakowa STARK KDL Profi z ramieniem hydraulicznym.",
      eyebrow: "Mulczer boczny do ciągnika",
      description: (
        <>
          Kosiarka bijakowa STARK KDL Profi to profesjonalny mulczer boczny przeznaczony do intensywnego koszenia trawy, chwastów, nieużytków oraz roślinności na poboczach, skarpach i w rowach. Dzięki hydraulicznie regulowanemu wysięgowi oraz możliwości wychylania zespołu roboczego maszyna pozwala pracować nie tylko bezpośrednio za ciągnikiem, ale również z boku oraz pod kątem.
        </>
      ),
      badges: [
        { label: "Wychylenie 90° w górę / 60° w dół", primary: true },
        { label: "Przesuw boczny standard" },
      ],
    },
    hideDisclaimers: true,
    stats: [
      { icon: Ruler, label: "Szerokość robocza", value: "1,60 – 2,20 m" },
      { icon: Weight, label: "Masa", value: "650 – 761 kg" },
      { icon: ShieldCheck, label: "Zabezpieczenie", value: "Mechaniczne najazdowe" },
      { icon: Tractor, label: "Zapotrzebowanie", value: "70 – 100 KM" },
      { icon: Wrench, label: "Kategoria TUZ", value: "II / III" },
      { icon: MoveHorizontal, label: "Maks. wysięg", value: "Do 324 cm" },
    ],
    why: {
      eyebrow: "Zastosowanie",
      title: "Gdzie sprawdzi się STARK KDL Profi?",
      paragraphs: [
        "Seria KDL Profi została wyposażona w wzmocnione ramię robocze oraz mechaniczne zabezpieczenie najazdowe, dzięki czemu dobrze sprawdza się podczas wymagającej, regularnej eksploatacji.",
        "To szczególnie praktyczne rozwiązanie przy pielęgnacji dróg, rowów melioracyjnych, skarp, sadów oraz terenów komunalnych.",
        "STARK KDL Profi może być wykorzystywany między innymi do: koszenia traw i wysokich chwastów; pielęgnacji poboczy drogowych; wykaszania rowów; koszenia skarp i nasypów; pielęgnacji nieużytków; koszenia terenów komunalnych; pielęgnacji sadów i terenów zielonych; rozdrabniania pozostałości roślinnych; pracy przy drogach, ogrodzeniach i innych miejscach wymagających bocznego wysięgu maszyny. Dzięki dużemu zakresowi wychylenia kosiarka może pracować zarówno na powierzchniach poziomych, jak również na pochyłościach i skarpach."
      ],
    },
    salesArgumentsHeading: "Dlaczego warto wybrać STARK KDL Profi?",
    salesArgumentsText: [
      "KDL Profi to dobry wybór dla użytkowników, którzy potrzebują czegoś więcej niż standardowej kosiarki pracującej wyłącznie za ciągnikiem. Hydrauliczny wysięg umożliwia przesunięcie maszyny daleko poza obrys ciągnika, dzięki czemu operator może bezpieczniej i wygodniej wykaszać pobocza, rowy oraz skarpy.",
      "Możliwość wychylenia zespołu roboczego od 60° w dół do 90° w górę znacząco zwiększa zakres zastosowania maszyny i pozwala wykorzystać ją przy pracach, których wykonanie klasycznym mulczerem byłoby znacznie trudniejsze."
    ],
    featureGroups: [
      {
        title: "Zakres pracy",
        icon: Tractor,
        items: [
          "Dostępne szerokości robocze od 1,6 do 2,2 m",
          "Hydrauliczny przesuw boczny w wyposażeniu standardowym",
          "Możliwość pracy z boku ciągnika",
          "Zakres wychylenia do 90° w górę",
          "Zakres wychylenia do 60° w dół"
        ]
      },
      {
        title: "Wytrzymała konstrukcja",
        icon: ShieldCheck,
        items: [
          "Solidne młotki bijakowe",
          "Mechaniczne zabezpieczenie najazdowe ze sprężynowym mechanizmem",
          "Przekładnia z wolnym kołem i dodatkowym zabezpieczeniem",
          "Napęd za pomocą 4 pasków klinowych",
          "Regulowany wał kopiujący"
        ]
      },
      {
        title: "Montaż i wyposażenie",
        icon: Wrench,
        items: [
          "Regulowane płozy ślizgowe",
          "Wał WOM w zestawie",
          "Solidna konstrukcja przeznaczona do profesjonalnego użytkowania",
          "Mocowanie do ciągnika w kategorii II / III",
          "Prędkość WOM 540 obr./min"
        ]
      }
    ],
    gallery: {
      title: "Galeria STARK KDL Profi",
      images: [
        { src: "/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-1-900.webp", alt: "Zielona kosiarka bijakowa STARK KDL Profi z ramieniem hydraulicznym.", title: "Kosiarka bijakowa STARK KDL Profi", width: 900, height: 675 },
        { src: "/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-2-1200.webp", alt: "Kosiarka STARK KDL Profi z widocznym wałem WOM i cylindrami hydraulicznymi.", title: "Wał WOM i hydraulika STARK KDL Profi", emphasis: true, width: 1200, height: 900 },
        { src: "/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-3-1200.webp", alt: "Przód korpusu kosiarki STARK KDL Profi z ramieniem i wałem WOM.", title: "Korpus i ramię STARK KDL Profi", width: 1200, height: 900 },
        { src: "/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-4-1200.webp", alt: "Kosiarka STARK KDL Profi widziana z boku i z góry.", title: "Boczny widok STARK KDL Profi", width: 1200, height: 675 },
        { src: "/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-5-1200.webp", alt: "Zbliżenie sprężynowego zabezpieczenia kosiarki STARK KDL Profi.", title: "Sprężynowe zabezpieczenie STARK KDL Profi", width: 1200, height: 675 },
        { src: "/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-6-1200.webp", alt: "Spód rotora kosiarki STARK KDL Profi z młotkami bijakowymi.", title: "Rotor i młotki STARK KDL Profi", width: 1200, height: 675 },
      ],
    },
    specs: [
      {
        title: "KDL 160 Profi",
        rows: [
          ["Szerokość robocza", "1,60 m"],
          ["Zapotrzebowanie mocy", "70 KM"],
          ["Liczba młotków", "22 szt."],
          ["Masa", "650 kg"],
          ["Maks. wysięg hydrauliczny", "264 cm"]
        ]
      },
      {
        title: "KDL 180 Profi",
        rows: [
          ["Szerokość robocza", "1,80 m"],
          ["Zapotrzebowanie mocy", "80 KM"],
          ["Liczba młotków", "26 szt."],
          ["Masa", "685 kg"],
          ["Maks. wysięg hydrauliczny", "284 cm"]
        ]
      },
      {
        title: "KDL 200 Profi",
        rows: [
          ["Szerokość robocza", "2,00 m"],
          ["Zapotrzebowanie mocy", "90 KM"],
          ["Liczba młotków", "28 szt."],
          ["Masa", "747 kg"],
          ["Maks. wysięg hydrauliczny", "304 cm"]
        ]
      },
      {
        title: "KDL 220 Profi",
        rows: [
          ["Szerokość robocza", "2,20 m"],
          ["Zapotrzebowanie mocy", "100 KM"],
          ["Liczba młotków", "32 szt."],
          ["Masa", "761 kg"],
          ["Maks. wysięg hydrauliczny", "324 cm"]
        ]
      },
      {
        title: "Pozostałe parametry",
        rows: [
          ["Prędkość WOM", "540 obr./min"],
          ["Kategoria TUZ", "II / III"],
          ["Średnica rotora", "127 mm"],
          ["Elementy robocze", "młotki bijakowe"],
          ["Napęd", "4 paski klinowe"],
          ["Przesuw boczny", "hydrauliczny – wyposażenie standardowe"],
          ["Maksymalne wychylenie w górę", "90°"],
          ["Maksymalne wychylenie w dół", "60°"],
          ["Wał kopiujący", "regulowany"],
          ["Płozy ślizgowe", "regulowane"],
          ["Wał WOM", "w wyposażeniu"],
          ["Zabezpieczenie najazdowe", "mechaniczne, sprężynowe"],
          ["Przekładnia", "z wolnym kołem i dodatkowym zabezpieczeniem"]
        ]
      }
    ],
    useCases: {
      title: "Jak dobrać szerokość kosiarki?",
      subtitle: "Przy wyborze odpowiedniego modelu warto uwzględnić przede wszystkim moc i masę ciągnika, szerokość roboczą oraz rodzaj wykonywanych prac.",
      paragraphs: [
        "Model KDL 160 Profi wymaga ciągnika o mocy około 70 KM i jest najbardziej kompaktowym wariantem serii. KDL 180 Profi przeznaczony jest do ciągników od około 80 KM. Przy większych powierzchniach i cięższej pracy warto wybrać KDL 200 Profi lub KDL 220 Profi, wymagające odpowiednio około 90 i 100 KM.",
        "Ze względu na dużą masę oraz boczny wysięg maszyny szczególnie ważne jest również odpowiednie dociążenie i stabilność ciągnika.",
        "Wybierz odpowiednią szerokość kosiarki STARK KDL Profi z dostępnych wariantów. W razie wątpliwości dotyczących doboru maszyny do ciągnika skontaktuj się z nami – pomożemy dobrać właściwy model."
      ]
    },
    contact: {
      intro: "Złóż zamówienie lub zapytaj o kosiarkę bijakową STARK KDL Profi.",
    }
  };

  return <ModelPageLayout data={data} />;
}

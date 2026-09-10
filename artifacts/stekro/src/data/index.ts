export interface TractorModel {
  id: string;
  name: string;
  power: string;
  engine: string;
  transmission: string;
  liftCapacity: string;
  keyFeature: string;
  features: string[];
  image: string;
  vin: string;
  first_registration: string;
  registration_number: string;
  video_url: string;
  priceFrom?: number;
}

export type PurposeId =
  | "rolnictwo"
  | "sady-winnice"
  | "komunalne"
  | "lesnictwo"
  | "ogrodnictwo"
  | "stoki";

export type FunctionalityId =
  | "kabina"
  | "klimatyzacja"
  | "hst"
  | "tur"
  | "gasienice"
  | "odwracalny";

export const PURPOSE_LABELS: Record<PurposeId, string> = {
  "rolnictwo": "Rolnictwo polowe",
  "sady-winnice": "Sady i winnice",
  "komunalne": "Komunalne i odśnieżanie",
  "lesnictwo": "Leśnictwo",
  "ogrodnictwo": "Ogrodnictwo i szklarnie",
  "stoki": "Stoki i zbocza",
};

export const FUNCTIONALITY_LABELS: Record<FunctionalityId, string> = {
  "kabina": "Z kabiną",
  "klimatyzacja": "Klimatyzacja",
  "hst": "Hydrostatyczna (HST)",
  "tur": "Pod ładowacz / TUR",
  "gasienice": "Gąsienicowy",
  "odwracalny": "Odwracalny / rewers",
};

const parseHp = (power: string): number =>
  Number(power.replace(",", ".").match(/\d+(\.\d+)?/)?.[0] ?? 0);

export function derivePurposes(model: TractorModel): PurposeId[] {
  const text = `${model.name} ${model.keyFeature} ${model.transmission} ${model.engine} ${model.liftCapacity}`.toLowerCase();
  const hp = parseHp(model.power);
  const out = new Set<PurposeId>();
  if (/sad\b|sad\w|winn|owoco|frutteto|orchard|sadown/.test(text)) out.add("sady-winnice");
  if (/komunaln|odśnież|odsniez|śnież|sniez|zamiat|park\b|boisk|gmin/.test(text)) out.add("komunalne");
  if (/leśn|lesn|drewn|las\b|forest/.test(text)) out.add("lesnictwo");
  if (/szklarn|tunel|ogród|ogrod|szkółk|szkolk/.test(text)) out.add("ogrodnictwo");
  if (/stok|zbocz|skarp|gór|gor\b|spadek/.test(text)) out.add("stoki");
  if (/orka|prasowani|pole\b|polow|orne|areał|areal|zbiorów|kombajn|gospodars/.test(text) || hp >= 50) out.add("rolnictwo");
  if (out.size === 0) out.add("rolnictwo");
  return Array.from(out);
}

export function deriveFunctionality(model: TractorModel): FunctionalityId[] {
  const text = `${model.name} ${model.keyFeature} ${model.transmission} ${model.engine} ${model.liftCapacity}`.toLowerCase();
  const out = new Set<FunctionalityId>();
  if (/kabin|cab\b|cabin/.test(text)) out.add("kabina");
  if (/klimatyzac|aircon|a\/c\b/.test(text)) out.add("klimatyzacja");
  if (/hst\b|hydrostat/.test(text)) out.add("hst");
  if (/ładowacz|tur\b|fel\b|loader|tuz/.test(text)) out.add("tur");
  if (/gąsienic|gasienic|crawler|track|quadtrack/.test(text)) out.add("gasienice");
  if (/odwracaln|reversible|rev-guide|rgs|rewers|shuttle/.test(text)) out.add("odwracalny");
  return Array.from(out);
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  models: TractorModel[];
}

const feedFields = {
  vin: '',
  first_registration: '',
  registration_number: '',
  video_url: '',
};

const tractor = (
  id: string,
  name: string,
  power: string,
  engine: string,
  transmission: string,
  liftCapacity: string,
  keyFeature: string,
  image = '/hero-tractor.webp',
  priceFrom?: number,
): TractorModel => ({
  id,
  name,
  power,
  engine,
  transmission,
  liftCapacity,
  keyFeature,
  features: ['Napęd 4WD', liftCapacity, transmission],
  image,
  ...(priceFrom !== undefined ? { priceFrom } : {}),
  ...feedFields,
});

export const BRANDS: Brand[] = [
  {
    id: 'solis',
    name: 'Solis',
    description: 'Traktory Solis to wytrzymałość zaprojektowana do ciężkiej pracy: od kompaktowych maszyn ogrodniczych po 90-konne ciągniki z kabiną premium, mocnym TUZ i prostą, tanią w eksploatacji mechaniką.',
    models: [
      tractor('solis-s16', 'Solis S16 4WD', '18 KM', 'ITL, 3-cylindrowy Diesel', 'Mechaniczna 6+2 / 4WD', '500 kg', 'Kompaktowa budowa do szklarni, tuneli foliowych i prac ogrodniczych.', '/model-solis-s16.webp', 29000),
      tractor('solis-s20', 'Solis S20 4WD', '20 KM', 'Mitsubishi 3-cyl., 953 cm³', 'Mechaniczna / 4WD', '500 kg', 'Zwinny i ekonomiczny do lekkich prac komunalnych, odśnieżania i koszenia.', '/model-solis-s20.webp'),
      tractor('solis-s20-plus', 'Solis S20+ 4WD', '20 KM', 'Mitsubishi 3-cyl., 953 cm³', 'Mechaniczna 6F+2R / 4WD', '600 kg', 'Wersja Plus z większym udźwigiem 600 kg, skrzynią 6F+2R i pakietem S Comfort.', '/model-solis-s20-plus.webp'),
      tractor('solis-s22', 'Solis S22 4WD', '22 KM', 'ITL GTV BB 3-cyl., 1 130 cm³', 'Mechaniczna / 4WD', '600 kg', 'Najmocniejszy subkompakt Solisa: 55 Nm, centralna dźwignia biegów i Operator Presence Control.', '/model-solis-s22.webp', 35000),
      tractor('solis-s26', 'Solis S26 9+9 (bez kabiny)', '24,5 KM', 'Mitsubishi MVS3L2, 1 318 cm³', 'Mechaniczna 9F+9R / 4WD', '600 kg', 'Bestseller subkompaktów w wersji z ramą ROPS: 75 Nm momentu, hamulce tarczowe w oleju i skrzynia 9+9.', '/model-solis-s26.jpeg', 37500),
      tractor('solis-s26-cab', 'Solis S26 9+9 z kabiną', '24,5 KM', 'Mitsubishi MVS3L2, 1 318 cm³', 'Mechaniczna 9F+9R / 4WD', '600 kg', 'Ta sama mechanika 9+9 z fabryczną, ogrzewaną kabiną — komfort pracy przez cały rok.', '/model-solis-s26-cab-front.webp'),
      tractor('solis-s26-hst', 'Solis S26 HST z kabiną', '24,5 KM', 'Mitsubishi 3-cyl., 1 318 cm³', 'Hydrostatyczna 2-zakresowa / 4WD', '600 kg', 'Hydrostatyka z tempomatem i ogrzewaną kabiną — idealna do kosiarek, ładowacza i prac komunalnych.', '/model-solis-s26-hst-field-1.webp', 60200),
      tractor('solis-s40', 'Solis S40 4WD', '38 KM', 'S Tech 3-cyl. wolnossący, 1 642 cm³, Stage V', 'Synchromesh 8F+8R / 4WD', '1 000 kg', 'Wolnossący Stage V bez DPF, 109,4 Nm momentu i opcjonalny ładowacz czołowy 3400 — uniwersalny kompakt 38 KM.', '/model-solis-s40.webp', 60000),
      tractor('solis-s50', 'Solis S50 4WD', '50 KM', 'S Tech 3-cyl. wolnossący, 3 067 cm³, Stage V', 'Synchromesh 12F+12R Shuttle XL / 4WD', '1 600 kg', 'Wolnossący Stage V bez DPF, 205 Nm momentu i pakiet S Boost do 2 500 kg.', '/model-solis-s50-cabrio-front.webp', 78000),
      tractor('solis-s60', 'Solis S60 Shuttle XL Cabin', '58 KM', 'S Tech CRDi 3-cyl., 3 065 cm³, Stage V (DOC+DPF)', 'Synchromesh 12F+12R Shuttle XL / 4WD', '2 500 kg', 'Klimatyzowana kabina, 250 Nm momentu już od 1 400 obr. i bliźniacze reflektory soczewkowe.', '/model-solis-s60.webp', 101600),
      tractor('solis-s75', 'Solis S75 Shuttle XL', '75 KM', 'S Tech 4-cyl. turbo, 3 707 cm³, Stage V', 'Synchromesh 12F+12R Shuttle XL / 4WD', '2 500 / 3 000 kg', 'Czterocylindrowy utility 75 KM: 289 Nm momentu, trzy warianty kabiny i pełen pakiet komunalny.', '/model-solis-s75.webp', 129000),
      tractor('solis-s90', 'Solis S90 Shuttle XL', '90 KM', '4-cyl. turbo Stage V, 4 087 cm³', 'Synchromesh 12F+12R Shuttle XL / 4WD', '3 000 / 3 500 kg', 'Flagowiec serii S: 360 Nm momentu, blokada mechanizmu różnicowego i kabina S Command Centre.', '/model-solis-s90-side.webp'),
      tractor('solis-n75', 'Solis N75 Cabin', '73,5 KM', '4-cyl. turbo + intercooler, 4 088 cm³, Stage V (DOC+DPF)', 'Synchromesh 12F+12R Shuttle / 4WD', '2 500 kg', 'Sadowniczy specjalista: wąska budowa od 1 400 mm, 340 Nm momentu i kabina (opcja klimatyzacji) do sadów i winnic.', '/model-solis-n75.webp', 132900),
    ],
  },
  {
    id: 'ls-tractor',
    name: 'LS Tractor',
    description: 'LS Tractor łączy południowokoreańską precyzję, komfort operatora i przekładnie hydrostatyczne dla prac komunalnych, sadowniczych, stadnin oraz architektury krajobrazu.',
    models: [
      tractor('ls-mt1', 'MT1.25 (IND / TURF)', '24,7 KM', 'LS 3-cylindrowy Diesel', 'Hydrostatyczna 2/2 z tempomatem / 4WD', '450 kg (kat. I)', 'Najmniejszy ciągnik LS — masa tylko 655 kg, dwie wersje opon (industrialne IND lub trawiaste TURF), wspomaganie kierownicy i baza pod ładowacz, koparkę i kosiarkę międzyosiową (3w1).', '/model-ls-mt125.webp'),
      tractor('ls-xj25-mec', 'XJ25 MEC', '24,4 KM', 'Mitsubishi S3L2-Z561GT, 1 318 cm³', 'Mechaniczna 6F+2R / 4WD', '650 kg (kat. I)', 'Subkompakt premium z klasyczną skrzynią mechaniczną 6+2: 70,8 Nm momentu, niezależny WOM międzyosiowy i baza pod ładowacz LL2101.', '/model-ls-xj25-mec.webp'),
      tractor('ls-xj25-hst', 'XJ25 HST', '24,4 KM', 'Mitsubishi S3L2-Z561GT, 1 318 cm³', 'Hydrostatyczna 2/2 z tempomatem / 4WD', '650 kg (kat. I)', 'Subkompakt premium z hydrostatyką i tempomatem: jazda bez sprzęgła, niezależny WOM międzyosiowy i baza pod ładowacz LL2101.', '/model-ls-xj25-hst-hero.webp'),
      tractor('ls-mt335', 'MT3.35', '35 KM', 'LS Mtron L3CRV-T5 3-cyl. Diesel', 'Mechaniczna F12/R12 z rewersem / 4WD', '820 kg (kat. I)', 'Premium 35 KM — masa 1 460 kg, ROPS przed lub za operatorem, do wyboru opony rolnicze, industrialne lub trawiaste, 3 prędkości WOM w opcji, wspomaganie kierownicy.', '/model-ls-mt335.webp'),
      tractor('ls-mt340hc', 'MT3.40 (HST / MEC, ROPS / kabina)', '40 KM', 'LS Mtron L3CRV-T4 3-cyl. Diesel', 'Mechaniczna z rewersem lub hydrostatyczna F3/R3 / 4WD', '820 kg (kat. I)', 'Premium MT3 — 1 460 kg z ROPS lub 1 660 kg z kabiną, 8 wyjść hydraulicznych, fotel Grammer, kabina z klimatyzacją, ogrzewaniem i audio w opcji.', '/model-ls-mt340-hero.webp', 96000),
      tractor('ls-mt350', 'MT3.50 (HST / MEC, ROPS / kabina)', '47 KM', 'LS Mtron L3CRV-T9A 3-cyl. Diesel', 'Mechaniczna F16/R16 lub F32/R16 z pełzaczem, lub HST / 4WD', '1 250 kg (kat. I)', 'Wszechstronny MT3 — 1 720 kg (ROPS) lub 1 950 kg (kabina), 8 wyjść hydraulicznych, 3 prędkości WOM, opcjonalna kabina premium z klimatyzacją.', '/model-ls-mt350-cab-field.webp', 102500),
      tractor('ls-mt360', 'MT3.60', '57 KM', 'LS Mtron L3CRV-T7 turbo, 1 879 cm³', 'Mechaniczna 32+16 z rewersem lub HST 3+3 / 4WD', '1 250 kg (kat. I)', 'Topowy MT3 — masa 1 950 kg z kabiną, 8 wyjść hydraulicznych w 4 sekcjach, 3 prędkości WOM (540/540E/1000), klimatyzacja, ogrzewanie i system audio standard.', '/model-ls-mt360-hero.webp', 110000),
      tractor('ls-xu6168', 'XU6168 (MEC SS / PST EHL Auto)', '68 KM', 'LS Mtron 4-cyl., 2 505 cm³, Diesel chłodzony cieczą', 'Mechaniczna Synchro Shuttle lub Power Shuttle z rewersem hydraulicznym / 4WD', '2 460 kg', 'Premium utility — wybór rewersu mechanicznego (SS) lub elektrohydraulicznego (PS), opcjonalny asystent TUZ EHL Auto, regulowany napęd 4×4 do oszczędności paliwa, wyciszona kabina premium.', '/model-ls-xu6168.webp', 124500),
      tractor('ls-mt573', 'MT5.73 (MEC / PST / PST EHL)', '73 KM', 'LS Mtron L4CRV-T1A 4-cyl. Diesel chłodzony cieczą', 'Mechaniczna lub Power Shuttle z opcjonalnym asystentem TUZ EHL / 4WD', '3 000 kg (kat. II)', 'Klasa średnia LS — masa 3 300 kg, kabina 4-słupkowa z obrotowym fotelem Grammer z zawieszeniem pneumatycznym, 6 wyjść hydraulicznych z tyłu, niezależny WOM.', '/model-ls-mt573.webp', 139900),
      tractor('ls-mt7101', 'MT7.101 (MEC / PST / PST EHL / EHL Auto)', '101 KM', '4-cylindrowy turbodiesel chłodzony cieczą', 'Mechaniczna Synchro Shuttle lub PST (rewers hydrauliczny) z opcjonalnym EHL / EHL Auto / 4WD', '3 800 kg (kat. II)', 'Flagowy LS — masa 3 860 kg, cztery warianty rewersu i sterowania TUZ, przestronna kabina z klimatyzacją i ogrzewaniem, mocne podwozie do prac na dużych areałach.', '/model-ls-mt7101-hero.webp'),
    ],
  },
  {
    id: 'aupax',
    name: 'Aupax',
    description: 'Aupax to potężny moment obrotowy, odporność na przeciążenia i maszyny od wąskich mikrotraktorów po ciągniki powyżej 160 KM do najcięższej pracy.',
    models: [
      tractor('aupax-2025', 'Aupax 2025', '25 KM', 'KM385BT-VT1, 1 532 cm³ Stage V, 3-cyl', '8F+8R Synchro Shuttle', 'WOM 540/1000, mokre hamulce tarczowe', 'Prosta budowa z mechanicznym wtryskiem paliwa, rozstaw osi 1 700 mm i 7 lat gwarancji.', '/model-aupax-2025.webp'),
      tractor('aupax-2040', 'Aupax 2040', '40 KM', 'Doosan D18, 1 800 cm³ Stage V, 155 Nm @ 1 680 obr', '8F+8R Synchro Shuttle, 4WD', 'TUZ 810 kg z elektrohydrauliką, klimatyzacja', 'Szerokość 1 650 mm — uniwersalna maszyna do sadów, prac komunalnych i odśnieżania, 7 lat gwarancji.', '/model-aupax-2040-1.webp'),
      tractor('aupax-3055', 'Aupax 3055', '55 KM', 'Doosan DM02, 2 393 cm³ Stage V, 4-cyl', '12F+12R Synchro Shuttle', '10\" sprzęgło dwuczynnościowe, balast tył 516 kg', 'Duża pojemność = ogromna rezerwa momentu, mokre hamulce tarczowe i 7 lat gwarancji.', '/model-aupax-3055-1.webp'),
      tractor('aupax-3075', 'Aupax 3075', '75 KM', 'Doosan DM02 Stage V (bez DEF), 4-cyl, 320 Nm @ 1 600 obr', '12F+12R Synchro Shuttle, 4WD', 'Pełna kabina z klimatyzacją, masa ok. 2 600 kg', 'Najmocniejszy w serii 3000 — duża rezerwa momentu do orki, prasowania i transportu, 10\" sprzęgło dwuczynnościowe i 7 lat gwarancji.', '/model-aupax-3075.webp'),
      tractor('aupax-m404', 'Aupax M404', '40 KM (SAE J1995)', 'Doosan D18 Stage V, 1 794 cm³, 3-cyl', '8F+8R Synchro, rewers mechaniczny, 4WD', 'TUZ 850 kg kat. I, 2 pompy hydrauliczne', 'Fabrycznie nowy rocznik 2025 — kabina 4-słupkowa z klimatyzacją, fotel Grammer, dwa kolory do wyboru, 7 lat gwarancji.', '/model-aupax-m404.webp'),
    ],
  },
];

export interface KroneCategory {
  id: string;
  name: string;
  tagline: string;
  lead: string;
  description: string;
  models: string[];
  images: string[];
}

export const KRONE_CATEGORIES: KroneCategory[] = [
  {
    id: 'prasy-rolujace',
    name: 'Prasy rolujące',
    tagline: 'Bele cylindryczne',
    lead: 'Ewolucja systemów zagęszczania biomasy',
    description:
      'Prasy rolujące KRONE to synonim niezawodności i bezkompromisowej jakości formowania bel w każdych warunkach pogodowych. Nasza oferta obejmuje szeroki przekrój maszyn dopasowanych do specyfiki każdego gospodarstwa. Znajdziesz tu klasyczne, niezwykle trwałe prasy stałokomorowe serii Bellima, a także zaawansowane modele Fortima wyposażone w innowacyjny przenośnik łańcuchowo-listwowy oraz bezkrzywkowy podbieracz EasyFlow. Dla najbardziej wymagających przygotowaliśmy serie Comprima i Comprima X-treme, które wykorzystują przełomową technologię pasowo-listwową NovoGrip i opcję podwójnego wiązania folią, gwarantując najwyższy stopień zgniotu oraz doskonałe warunki do zakiszania. Od prostych konstrukcji po w pełni zautomatyzowane kombajny prasoowijające Ultima — KRONE wyznacza standardy zbioru.',
    models: ['Ultima', 'Bellima', 'Fortima', 'Comprima', 'Comprima X-treme'],
    images: [
      '/krone/_V9H0738_Variante2_100220.webp',
      '/krone/_MG_2025_132227.webp',
      '/krone/_V9H5682_98681.webp',
    ],
  },
  {
    id: 'kosiarki-dyskowe',
    name: 'Kosiarki dyskowe',
    tagline: 'Koszenie zielonek',
    lead: 'Perfekcyjna aerodynamika i najwyższa jakość cięcia',
    description:
      'Kosiarki dyskowe KRONE gwarantują wydajność operacyjną przy jednoczesnym poszanowaniu darni i zachowaniu maksymalnej wartości odżywczej plonu. W naszej ofercie posiadamy zoptymalizowane maszyny boczne ActiveMow, kosiarki czołowe (EasyCut F) i tylne (EasyCut R), warianty zaczepiane, a także potężne kombinacje wielkogabarytowe EasyCut B. Konstrukcje bazują na dożywotnio uszczelnionych, w pełni zespawanych listwach tnących oraz innowacyjnym systemie zabezpieczającym każdy dysk z osobna — SafeCut. W trosce o optymalne schnięcie biomasy, kosiarki KRONE wyposażane są w wyspecjalizowane układy kondycjonujące (uderzeniowe CV dla traw oraz walcowe CR/M-Rolls dla delikatnych roślin motylkowych), które skutecznie przyspieszają proces parowania wody.',
    models: [
      'ActiveMow (tylna)',
      'EasyCut F (czołowe)',
      'EasyCut R (tylna)',
      'EasyCut (zaczepiane)',
      'EasyCut B (kombinacje koszenia)',
    ],
    images: [
      '/krone/kosiarki-dyskowe.webp',
      '/krone/AK_08565_205951.webp',
      '/krone/AK_08586_205977.webp',
    ],
  },
  {
    id: 'przetrzasacze',
    name: 'Przetrząsacze',
    tagline: 'Szybkie suszenie',
    lead: 'Równomierne suszenie i minimalizacja strat',
    description:
      'Aby proces suszenia skoszonego plonu przebiegał bez zakłóceń, niezbędny jest sprzęt o perfekcyjnej kinematyce działania. Oferujemy bogatą gamę przetrząsaczy: od zawieszanych modeli KW, przez ciągnięte z podwoziem transportowym KWT, aż po specjalistyczne warianty KW-T. Sercem każdego przetrząsacza KRONE jest bezobsługowe, ośmiopalcowe sprzęgło OctoLink, pozwalające na bezawaryjne przenoszenie napędu pod każdym kątem. Dzięki zastosowaniu asymetrycznych palców Super-C maszyny uzyskują unikalny „efekt czesania" — plon jest delikatnie podrywany i precyzyjnie rozkładany bez ryzyka zanieczyszczenia go grudkami gleby, co ma fundamentalne znaczenie dla higieny i późniejszego procesu zakiszania paszy.',
    models: ['KW (przyczepiany)', 'KWT (ciągnięty z zawieszeniem)', 'KW-T (ciągnięty bez zawieszenia)'],
    images: ['/krone/_V9H7400_2_97969.webp'],
  },
  {
    id: 'zgrabiarki',
    name: 'Zgrabiarki',
    tagline: 'Czysty pokos',
    lead: 'Precyzyjna matematyka profilowania pokosu',
    description:
      'Zgrabiarki wirnikowe KRONE z serii Swadro to klasa sama w sobie, gwarantująca uformowanie idealnie prostopadłościennego pokosu, który płynnie zasila kolejne maszyny w łańcuchu zbioru. W zależności od potrzeb oferujemy kompaktowe maszyny jednowirnikowe, wszechstronne dwuwirnikowe (boczne i środkowe), a także potężne kombinaty 3-, 4- i 6-wirnikowe z serii Swadro TC. Osią technologiczną tych maszyn jest niesamowicie trwała, bezobsługowa krzywka DuraMax (pracująca na sucho), która zapewnia niemal natychmiastowe podnoszenie ramienia w końcowej fazie obrotu. Zapobiega to splątywaniu się paszy w warkocze i gwarantuje błyskawiczne zgrabianie materiału bez jego zanieczyszczania.',
    models: [
      'Jednowirnikowe',
      'Dwuwirnikowe boczne',
      'Dwuwirnikowe środkowe',
      'Trzywirnikowe',
      'Czterowirnikowe',
      'Sześciowirnikowe',
    ],
    images: ['/krone/P1010849_27019.webp'],
  },
  {
    id: 'przyczepy-samozbierajace',
    name: 'Przyczepy samozbierające',
    tagline: 'Zbiór i transport',
    lead: 'Potężna kompresja i inteligentna logistyka terenowa',
    description:
      'Wielkotowarowy zbiór zielonek z blisko położonych pól to domena naszych przyczep samozbierających. Eliminują one koszty belowania, dostarczając potężne ilości gotowej, uciętej sieczki prosto do silosu. Oferujemy rodziny produktowe zróżnicowane pojemnościowo: uniwersalne serie AX, MX, RX, maszyny do logistyki płynnej TX oraz potężne agregaty klasy ciężkiej ZX (nawet do 56 m³ pojemności). Szerokie ogumienie flotacyjne chroni darń przed zniszczeniem, a potężne bezkrzywkowe podbieracze zintegrowane z rotorami tnącymi zapewniają najwyższą wydajność wchłaniania pokosu. Wersje wyposażone w tylne walce dozujące gwarantują dodatkowo ułożenie na silosie idealnie równego dywanu paszy, gotowego do uklepywania.',
    models: ['AX', 'MX', 'RX', 'ZX', 'TX'],
    images: [
      '/krone/20160716_AX_45_38362.webp',
      '/krone/IMG_1904_93087.webp',
      '/krone/DJI_0244_118555.webp',
    ],
  },
  {
    id: 'prasy-kostkujace',
    name: 'Prasy kostkujące',
    tagline: 'Wysokie zagęszczenie',
    lead: 'Przemysłowe technologie pakowania BiG Pack',
    description:
      'Kategoria pras wielkogabarytowych to propozycja dla rolnictwa przemysłowego, handlu biomasą i potężnych przedsiębiorstw logistycznych. Seria BiG Pack definiuje współczesne standardy w dziedzinie maksymalnego zagęszczenia (technologie HDP i HDP II). Zastosowanie układu zmiennego napełniania VFS (Variable Filling System) sprawia, że bez względu na rodzaj materiału, prasa generuje idealnie prostopadłościenne, symetryczne kostki. Pionierskie innowacje, takie jak system bezścinkowego wiązania V-Knotter (eliminujący opadanie fragmentów sznurka na pole) oraz technologia MultiBale (związanie do 9 mniejszych paczek w jednej ogromnej beli), czynią prasy KRONE BiG Pack niezrównanym narzędziem na światowym rynku pasz objętościowych.',
    models: ['BigPack'],
    images: [
      '/krone/_V9H9648_99113.webp',
      '/krone/DSC_6586_36207.webp',
    ],
  },
];

export const MACHINES = [
  { id: 'kosiarki-bijakowe', name: 'Kosiarki bijakowe', desc: 'Profesjonalne mulczery do wysokiej trawy, chwastów i nieużytków.' },
  { id: 'ladowacze', name: 'Ładowacze czołowe TUR', desc: 'Łyżki, widły, chwytaki i samopoziomowanie ładunku.' },
  { id: 'kosiarki-pielegnacyjne', name: 'Kosiarki pielęgnacyjne', desc: 'Precyzyjne cięcie parków, boisk, pól golfowych i terenów zielonych.' },
  { id: 'kosiarki-rotacyjne', name: 'Kosiarki rotacyjne', desc: 'Wydajne koszenie traw, łąk i poboczy — prosta, trwała konstrukcja.' },
  { id: 'plugi-sniezne', name: 'Pługi śnieżne', desc: 'Hydrauliczny osprzęt zimowy z listwami amortyzującymi.' },
  { id: 'glebogryzarki', name: 'Glebogryzarki', desc: 'Przygotowanie ziemi pod siew w jednym przejeździe.' },
  { id: 'plugi-obracalne', name: 'Pługi', desc: 'Ciężka uprawa roli przy minimalnym ugniataniu gleby.' },
  { id: 'zamiatarki', name: 'Zamiatarki komunalne', desc: 'Hydrauliczne szczotki, zbiorniki zrzutowe i całoroczne utrzymanie placów.' },
  { id: 'rozsiewacze', name: 'Rozsiewacze i posypywarki', desc: 'Nawozy, piasek i sól drogowa w całorocznym zastosowaniu.' },
  { id: 'przyczepy', name: 'Przyczepy i wywrotki', desc: 'Hydrauliczny wywrot 1- lub 3-stronny do drewna, ziemi i gruzu.' },
  { id: 'prasy-zgrabiarki', name: 'Prasy i zgrabiarki', desc: 'Zbiór siana i słomy — zgrabianie pokosów i formowanie bel.' },
];

const partNames = {
  filters: ['Filtr powietrza główny', 'Filtr powietrza bezpieczeństwa', 'Filtr oleju silnikowego', 'Filtr paliwa wstępny', 'Filtr paliwa dokładny', 'Filtr hydrauliki wysokociśnieniowy', 'Filtr kabinowy', 'Separator wody', 'Zestaw filtrów Yanmar', 'Zestaw filtrów Mitsubishi', 'Zestaw filtrów ITL 33507', 'Olej silnikowy 10W-40', 'Olej przekładniowy UTTO', 'Płyn chłodniczy', 'Smar wielozadaniowy', 'Wkład filtra HST', 'Uszczelka korka spustu', 'Korek wlewu oleju', 'Pasek wentylatora', 'Zestaw przeglądowy 100h'],
  engine: ['Świeca żarowa', 'Wtryskiwacz Common Rail', 'Pompa paliwa', 'Pasek klinowy', 'Zestaw uszczelek dolny', 'Zestaw uszczelek górny', 'Termostat', 'Pompa wody', 'Alternator', 'Rozrusznik', 'Linka gazu', 'Tłumik końcowy', 'Kolektor wydechowy', 'Czujnik temperatury', 'Czujnik ciśnienia oleju', 'Przewód paliwowy', 'Korek chłodnicy', 'Wentylator chłodnicy', 'Koło pasowe', 'Poduszka silnika'],
  electrical: ['Lampa robocza LED', 'Lampa tylna', 'Kierunkowskaz', 'Włącznik świateł', 'Przekaźnik rozrusznika', 'Bezpiecznik główny', 'Stacyjka', 'Akumulator', 'Czujnik WOM', 'Czujnik neutralny', 'Instalacja tylna', 'Gniazdo 7-pin', 'Panel przełączników', 'Klakson', 'Licznik motogodzin', 'Czujnik paliwa', 'Regulator napięcia', 'Przewód masowy', 'Kamera cofania', 'Moduł oświetlenia'],
  transmission: ['Tarcza sprzęgła', 'Docisk sprzęgła', 'Łożysko oporowe', 'Linka sprzęgła', 'Rewers mechaniczny', 'Dźwignia zmiany biegów', 'Przegub napędowy', 'Wał napędowy', 'Uszczelniacz półosi', 'Zębatka skrzyni', 'Synchronizator', 'Pompa HST', 'Filtr HST', 'Oś przednia', 'Krzyżak wału', 'Przekładnia kierownicza', 'Końcówka drążka', 'Piasta koła', 'Zestaw hamulcowy', 'Tarcza hamulcowa mokra'],
  hydraulics: ['Pompa hydrauliczna', 'Siłownik podnośnika', 'Siłownik ładowacza', 'Rozdzielacz hydrauliczny', 'Szybkozłącze euro', 'Przewód hydrauliczny', 'Manometr', 'Zawór bezpieczeństwa', 'Wąż wysokociśnieniowy', 'Uszczelniacz siłownika', 'Tuleja ramienia TUZ', 'Łącznik centralny', 'Wieszak TUZ', 'Hak transportowy', 'Sworzeń TUZ', 'Końcówka kulowa', 'Zestaw O-ringów', 'Chłodnica oleju', 'Dźwignia hydrauliki', 'Zawór sekcji zewnętrznej'],
};

export const PART_CATEGORIES = [
  { id: 'filters', name: 'Filtry i elementy eksploatacyjne', items: partNames.filters },
  { id: 'engine', name: 'Silnik i systemy paliwowe', items: partNames.engine },
  { id: 'electrical', name: 'Elektryka i oświetlenie', items: partNames.electrical },
  { id: 'transmission', name: 'Skrzynia, napęd i hamulce', items: partNames.transmission },
  { id: 'hydraulics', name: 'Hydraulika i TUZ', items: partNames.hydraulics },
];

export const ACCESSORY_CATEGORIES = [
  { id: 'transport', name: 'Transport i zaczepy', items: ['Zaczep kulowy', 'Zaczep automatyczny', 'Zaczep transportowy', 'Belka zaczepowa', 'Hak holowniczy', 'Adapter przyczepy', 'Gniazdo elektryczne', 'Trójkąt ostrzegawczy', 'Lampa kogut LED', 'Tablica wyróżniająca', 'Obciążnik przedni', 'Obciążniki kół', 'Łańcuch transportowy', 'Pas mocujący', 'Skrzynka narzędziowa', 'Błotnik dodatkowy', 'Stopień wejściowy', 'Uchwyt transportowy', 'Zestaw homologacyjny', 'Belka świetlna', 'Klin pod koło', 'Lina holownicza', 'Koło podporowe', 'Adapter WOM', 'Osłona WOM'] },
  { id: 'loader', name: 'Osprzęt do ładowaczy', items: ['Łyżka uniwersalna', 'Łyżka krokodyl', 'Widły do palet', 'Chwytak do bel', 'Chwytak do drewna', 'Pług do ładowacza', 'Szybkozłącze euro', 'Rama adaptacyjna', 'Trzecia sekcja hydrauliki', 'Amortyzator ładowacza', 'Przewód do osprzętu', 'Joystick ładowacza', 'Łyżka objętościowa', 'Łyżka do ziemi', 'Łyżka do śniegu', 'Widły krokodyl', 'Chwytak kiszonki', 'Wskaźnik poziomu łyżki', 'Stopka podporowa', 'Sworzeń mocowania', 'Tuleja ładowacza', 'Zestaw smarowniczek', 'Osłona przewodów', 'Łącznik szybki', 'Hak big-bag'] },
  { id: 'consumables', name: 'Materiały i eksploatacja', items: ['Olej silnikowy', 'Olej hydrauliczny', 'Olej przekładniowy', 'Płyn chłodniczy', 'Płyn hamulcowy', 'Smar grafitowy', 'Smar litowy', 'Preparat do styków', 'Środek do chłodnic', 'Uszczelniacz gwintów', 'Zestaw bezpieczników', 'Żarówki robocze', 'Pióro wycieraczki', 'Noże Y', 'Młotki bijakowe 400 g', 'Młotki kute 700 g', 'Śruby zrywalne', 'Linka gazu uniwersalna', 'Kalamitka', 'Zestaw opasek', 'Łańcuch WOM', 'Osłona noży', 'Pasek kosiarki', 'Tarcza tnąca', 'Ostrze lemiesza'] },
  { id: 'cabin', name: 'Kabina i komfort', items: ['Fotel pneumatyczny', 'Pokrowiec fotela', 'Radio Bluetooth', 'Głośniki kabinowe', 'Klimatyzacja serwis', 'Mata gumowa', 'Lusterko boczne', 'Lusterko panoramiczne', 'Wycieraczka tylna', 'Spryskiwacz', 'Szyba boczna', 'Uszczelka drzwi', 'Ogrzewanie dodatkowe', 'Uchwyt telefonu', 'Port USB', 'Kamera cofania', 'Monitor kabinowy', 'Roleta przeciwsłoneczna', 'Gałka kierownicy', 'Podłokietnik', 'Lampka kabinowa', 'Dywanik operatora', 'Zamek drzwi', 'Klamka kabiny', 'Filtr kabinowy komfort'] },
];

export const TEAM: { name: string; role: string; phone: string; type: string }[] = [
  { name: 'Paweł', role: 'Doradca techniczno-handlowy', phone: '786 656 715', type: 'sales' },
];

export const CONTACT_INFO = {
  companyName: 'Stekro MiniTrak',
  legalName: 'Stekro MiniTrak Sp. z o.o. Sp.k.',
  registeredAddress: 'Brzezna 466, 33-386 Podegrodzie',
  nip: '7372223088',
  address: 'ul. Królowej Jadwigi 80A, 34-400 Nowy Targ',
  temporaryPoint: 'Brzezna (tymczasowy punkt sprzedaży)',
  emailMain: 'minitrak@stekro.pl',
  emailService: 'serwis@stekro.pl',
  emailParts: 'sklep.stekro@gmail.com',
  mainPhone: '18 511 10 79',
  salesPhone: '786 656 715',
  partsPhone: '18 52 11 079 / 661 115 163',
  servicePhone: '517 745 185',
  hoursWeekday: 'Pn–Pt 7:00–17:00',
  hoursSaturday: 'Sob. 7:30–13:00',
  facebook: 'https://www.facebook.com/people/Stekro-MiniTrak/61590779794890/',
  instagram: 'https://www.instagram.com/stekro_minitrak/',
  mapBrzezna: 'https://share.google/CVGO1AHBOM0gsP2ab',
  mapNowyTarg: 'https://www.google.com/maps/dir/?api=1&destination=ul.+Kr%C3%B3lowej+Jadwigi+80A,+34-400+Nowy+Targ',
};

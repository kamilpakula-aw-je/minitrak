import { useEffect, useMemo, useRef, useState } from "react";
import { catalogSrcSet } from "@/lib/img-utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  PhoneCall,
  Mail,
  MapPin,
  Wrench,
  Truck,
  PackageCheck,
  Gauge,
  Settings,
  Banknote,
  Percent,
  CalendarRange,
  Coins,
  Building2,
  Headphones,
  CheckCircle2,
  Scissors,
  Snowflake,
  Sprout,
  Mountain,
  Wind,
  Droplets,
  SprayCan,
  Hammer,
  Forklift,
  RotateCw,
  Wheat,
  RefreshCcw,
  Menu,
  Phone,
  Loader2,
  Star,
  HelpCircle,
  Quote,
  Clock,
  Facebook,
  Instagram,
} from "lucide-react";
import {
  BRANDS,
  MACHINES,
  KRONE_CATEGORIES,
  CONTACT_INFO,
  TEAM,
  PART_CATEGORIES,
  ACCESSORY_CATEGORIES,
  PURPOSE_LABELS,
  FUNCTIONALITY_LABELS,
  derivePurposes,
  deriveFunctionality,
  type TractorModel,
  type PurposeId,
  type FunctionalityId,
} from "@/data";
import { SiteFooter } from "@/components/site-footer";
const BRAND_LOGOS: { id: string; name: string; src: string; width: number; height: number; href?: string }[] = [
  { id: "solis", name: "Solis", src: "/brands/solis.png", width: 320, height: 140 },
  { id: "ls-tractor", name: "LS Tractor", src: "/brands/ls-tractor.png", width: 320, height: 140 },
  { id: "aupax", name: "Aupax", src: "/brands/aupax.png", width: 320, height: 140 },
  { id: "krone", name: "Krone", src: "/brands/krone.png", width: 300, height: 166, href: "#krone" },
];

// ---------- helpers --------------------------------------------------------

const parsePower = (power: string) =>
  Number(power.replace(",", ".").match(/\d+(\.\d+)?/)?.[0] ?? 0);

type EnrichedModel = TractorModel & {
  brandId: string;
  brandName: string;
  hp: number;
  powerClass: "Subkompakt" | "Kompakt" | "Uniwersalny" | "Wysoka moc";
  detailHref?: string;
  purposes: PurposeId[];
  functionality: FunctionalityId[];
};

const MODEL_DETAIL_HREFS: Record<string, string> = {
  "solis-s16": "/modele/solis-s16",
  "solis-s20": "/modele/solis-s20",
  "solis-s20-plus": "/modele/solis-s20-plus",
  "solis-s22": "/modele/solis-s22",
  "solis-s26": "/modele/solis-s26",
  "solis-s26-cab": "/modele/solis-s26",
  "solis-s26-hst": "/modele/solis-s26-hst",
  "solis-s40": "/modele/solis-s40",
  "solis-s50": "/modele/solis-s50",
  "solis-s60": "/modele/solis-s60",
  "solis-s75": "/modele/solis-s75",
  "solis-s90": "/modele/solis-s90",
  "solis-n75": "/modele/solis-n75",
  "ls-mt1": "/modele/ls-mt1",
  "ls-xj25-mec": "/modele/ls-xj25-mec",
  "ls-xj25-hst": "/modele/ls-xj25-hst",
  "ls-mt335": "/modele/ls-mt335",
  "ls-mt340hc": "/modele/ls-mt340",
  "ls-mt350": "/modele/ls-mt350",
  "ls-mt360": "/modele/ls-mt360",
  "ls-xu6168": "/modele/ls-xu6168",
  "ls-mt573": "/modele/ls-mt573",
  "ls-mt7101": "/modele/ls-mt7101",
  "aupax-2025": "/modele/aupax-2025",
  "aupax-2040": "/modele/aupax-2040",
  "aupax-3055": "/modele/aupax-3055",
  "aupax-3075": "/modele/aupax-3075",
  "aupax-m404": "/modele/aupax-m404",
};

const classifyPower = (hp: number): EnrichedModel["powerClass"] => {
  if (hp <= 25) return "Subkompakt";
  if (hp <= 45) return "Kompakt";
  if (hp <= 75) return "Uniwersalny";
  return "Wysoka moc";
};

const ALL_MODELS: EnrichedModel[] = BRANDS.flatMap((brand) =>
  brand.models.map((model) => {
    const hp = parsePower(model.power);
    return {
      ...model,
      brandId: brand.id,
      brandName: brand.name,
      hp,
      powerClass: classifyPower(hp),
      detailHref: MODEL_DETAIL_HREFS[model.id],
      purposes: derivePurposes(model),
      functionality: deriveFunctionality(model),
    };
  }),
);

const PURPOSE_OPTIONS = (Object.keys(PURPOSE_LABELS) as PurposeId[]).filter((id) =>
  ALL_MODELS.some((m) => m.purposes.includes(id)),
);
const FUNCTIONALITY_OPTIONS = (Object.keys(FUNCTIONALITY_LABELS) as FunctionalityId[]).filter((id) =>
  ALL_MODELS.some((m) => m.functionality.includes(id)),
);

const formatPrice = (priceFrom?: number) =>
  typeof priceFrom === "number"
    ? `od ${priceFrom.toLocaleString("pl-PL")} PLN netto`
    : "Cena na zapytanie";

const MIN_POWER = Math.floor(Math.min(...ALL_MODELS.map((m) => m.hp)));
const MAX_POWER = Math.ceil(Math.max(...ALL_MODELS.map((m) => m.hp)));

const MACHINE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "kosiarki-bijakowe": Hammer,
  "ladowacze": Forklift,
  "kosiarki-pielegnacyjne": Scissors,
  "kosiarki-rotacyjne": RotateCw,
  "plugi-sniezne": Snowflake,
  "glebogryzarki": Sprout,
  "plugi-obracalne": Mountain,
  "zamiatarki": Wind,
  "rozsiewacze": Droplets,
  "przyczepy": Truck,
  "prasy-zgrabiarki": Wheat,
};

// ---------- shared UI ------------------------------------------------------

/**
 * Dekoracyjne wideo tła z YouTube — dogrywane leniwie: iframe montowany
 * dopiero, gdy sekcja zbliża się do viewportu, i tylko na desktopie
 * (na telefonie zostaje samo tło/gradienty). Oszczędza ~2 s pracy CPU
 * (skrypty YouTube) przy pierwszym ładowaniu na mobile.
 */
function LazyYouTubeBackground({ videoId, title, className }: { videoId: string; title: string; className: string }) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = holderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={holderRef} className="absolute inset-0">
      {load && (
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&disablekb=1`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen={false}
          frameBorder={0}
          className={className}
        />
      )}
    </div>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-display text-xs tracking-[0.4em] text-primary font-semibold">
        {index}
      </span>
      <span className="h-px w-10 bg-primary/40" />
      <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground font-medium">
        {label}
      </span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <span className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
        {value}
      </span>
      <span className="text-xs uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
    </div>
  );
}

function RevealToggle({
  open,
  onToggle,
  openLabel,
  closeLabel,
  tone = "light",
}: {
  open: boolean;
  onToggle: () => void;
  openLabel: string;
  closeLabel: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className={`flex justify-center ${open ? "mt-12" : "mt-2"}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`group inline-flex items-center gap-2.5 rounded-full px-7 h-12 text-sm font-semibold transition-all border ${
          isDark
            ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
            : "border-border bg-background hover:border-primary hover:text-primary"
        }`}
      >
        {open ? closeLabel : openLabel}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}

function ModelThumb({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-xl border border-border bg-white ${className}`}>
      <img
        src={src}
        srcSet={catalogSrcSet(src)}
        sizes="(max-width: 640px) 96px, 80px"
        alt={`Miniatura ciągnika ${alt}`}
        title={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain p-1"
      />
    </div>
  );
}

function ModelCard({ model }: { model: EnrichedModel }) {
  const card = (
    <Card className="group h-full overflow-hidden border-border/60 bg-card hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col">
      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#1a2010] via-[#10130d] to-[#0a0c08]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_30%,rgba(176,203,31,0.18),transparent_60%)]"
        />
        <img
          src={model.image}
          srcSet={catalogSrcSet(model.image)}
          sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 3rem), calc(33vw - 3rem)"
          alt={`Ciągnik ${model.brandName} ${model.name} o mocy ${model.power}`}
          title={`${model.brandName} ${model.name}`}
          loading="lazy"
          decoding="async"
          className="relative w-full h-full object-contain p-4 transition-all duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded shadow-lg shadow-primary/30 tracking-wide z-10">
          {model.power}
        </span>
        <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white/90 text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-[0.18em] z-10">
          {model.powerClass}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
          {model.brandName}
        </span>
        <h3 className="font-display text-lg font-bold mt-1 leading-tight">{model.name}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{model.keyFeature}</p>
        <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs mt-4 pt-4 border-t border-border/60">
          <div>
            <dt className="text-muted-foreground">Silnik</dt>
            <dd className="font-medium leading-tight mt-0.5">{model.engine}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Skrzynia</dt>
            <dd className="font-medium leading-tight mt-0.5">{model.transmission}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted-foreground">TUZ / Klasa</dt>
            <dd className="font-medium leading-tight mt-0.5">{model.liftCapacity}</dd>
          </div>
        </dl>
        <div className="mt-4 pt-4 border-t border-border/60 flex items-baseline justify-between gap-2">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">Cena</span>
          <span className={`font-display font-bold leading-none tabular-nums ${typeof model.priceFrom === "number" ? "text-primary text-lg" : "text-foreground/70 text-sm"}`}>
            {formatPrice(model.priceFrom)}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between text-sm font-semibold text-primary">
          <span>{model.detailHref ? "Zobacz model" : "Zapytaj o ofertę"}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Card>
  );
  return model.detailHref ? (
    <Link href={model.detailHref} className="block h-full">{card}</Link>
  ) : (
    <a href="#kontakt" className="block h-full">{card}</a>
  );
}

// ---------- sekcje poniżej fold-u ------------------------------------------
// Ładowane lazy po stronie klienta (patrz home.tsx); SSR renderuje je eager
// przez home-ssr.tsx, więc HTML jest kompletny, a hydratacja bez migotania.

export default function HomeBelowFold() {
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [powerRange, setPowerRange] = useState<[number, number]>([MIN_POWER, MAX_POWER]);
  const [purposeFilters, setPurposeFilters] = useState<Set<PurposeId>>(new Set());
  const [funcFilters, setFuncFilters] = useState<Set<FunctionalityId>>(new Set());
  const [showFinancing, setShowFinancing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [rodo, setRodo] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string>("");
  const idempotencyKeyRef = useRef<string | null>(null);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rodo) {
      setSubmitStatus("error");
      setSubmitError("Aby wysłać zapytanie, potwierdź zgodę na przetwarzanie danych (RODO).");
      return;
    }
    setSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError("");
    try {
      const idempotencyKey = idempotencyKeyRef.current ?? crypto.randomUUID();
      idempotencyKeyRef.current = idempotencyKey;
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          ...form,
          rodo: true,
          marketing,
          source: "minitrak.pl / formularz #kontakt",
        }),
      });
      if (!r.ok) {
        throw new Error(
          r.status === 400
            ? "Sprawdź, czy imię (min. 2 znaki) i telefon (min. 7 cyfr) są wpisane poprawnie."
            : "Serwer odrzucił zapytanie. Spróbuj ponownie lub zadzwoń."
        );
      }
      setSubmitStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
      setRodo(false);
      setMarketing(false);
      idempotencyKeyRef.current = null;
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(
        err instanceof Error ? err.message : "Nie udało się wysłać zapytania. Spróbuj ponownie."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredModels = useMemo(() => {
    return ALL_MODELS.filter((m) => {
      if (activeBrand !== "all" && m.brandId !== activeBrand) return false;
      if (m.hp < powerRange[0] || m.hp > powerRange[1]) return false;
      if (purposeFilters.size > 0 && !m.purposes.some((p) => purposeFilters.has(p))) return false;
      if (funcFilters.size > 0 && ![...funcFilters].every((f) => m.functionality.includes(f))) return false;
      return true;
    }).sort((a, b) => b.hp - a.hp);
  }, [activeBrand, powerRange, purposeFilters, funcFilters]);

  const isPowerRangeActive = powerRange[0] !== MIN_POWER || powerRange[1] !== MAX_POWER;
  const isAnyFilterActive =
    isPowerRangeActive || activeBrand !== "all" || purposeFilters.size > 0 || funcFilters.size > 0;

  const togglePurpose = (id: PurposeId) =>
    setPurposeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleFunc = (id: FunctionalityId) =>
    setFuncFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const resetFilters = () => {
    setActiveBrand("all");
    setPowerRange([MIN_POWER, MAX_POWER]);
    setPurposeFilters(new Set());
    setFuncFilters(new Set());
  };

  const activeBrandObj = activeBrand === "all" ? null : BRANDS.find((b) => b.id === activeBrand);

  useEffect(() => {
    const validBrands = new Set(BRANDS.map((b) => b.id));
    const applyHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      const m = raw.match(/^katalog(?:-(.+))?$/);
      if (!m) return;
      const brand = m[1];
      if (brand && validBrands.has(brand)) {
        setActiveBrand(brand);
      } else if (!brand) {
        setActiveBrand("all");
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);


  return (
    <>
      {/* STATS STRIP */}
      <section className="bg-[#0e110d] border-y border-white/8">
        <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Stat value="30+" label="Lat doświadczenia" />
          <Stat value="4" label="Marki autoryzowane" />
          <Stat value="27" label="Modeli ciągników" />
          <Stat value="2" label="Serwisbusy mobilne" />
          <Stat value="10 000+" label="Pozycji magazynowych" />
        </div>
      </section>

      {/* BRANDS STRIP */}
      <section aria-label="Autoryzowany dealer marek" className="bg-background border-b border-border/60 py-14 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="font-display text-xs tracking-[0.4em] text-primary font-semibold uppercase">
                Autoryzowany dealer
              </span>
              <h2 className="font-display italic font-bold text-2xl md:text-3xl mt-2 leading-tight">
                Marki, które reprezentujemy.
              </h2>
            </div>
            <span className="text-sm text-muted-foreground max-w-md md:text-right">
              Kliknij w&nbsp;logo, aby przejść do&nbsp;katalogu konkretnej marki.
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
            {BRAND_LOGOS.map((b) => (
              <a
                key={b.id}
                href={b.href ?? `#katalog-${b.id}`}
                aria-label={`Przejdź do katalogu marki ${b.name}`}
                className="group relative bg-background flex items-center justify-center h-28 md:h-36 px-6 transition-colors hover:bg-muted/40"
              >
                <img
                  src={b.src}
                  alt={`Logo autoryzowanego dealera marki ${b.name}`}
                  title={`Marka ${b.name}`}
                  loading="lazy"
                  decoding="async"
                  width={b.width}
                  height={b.height}
                  className="max-h-16 md:max-h-20 w-auto object-contain grayscale opacity-55 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  {b.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 01 ABOUT */}
      <section id="firma" className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <SectionLabel index="01" label="O firmie" />
              <h2 className="font-display italic font-bold text-3xl md:text-4xl leading-[1.08] tracking-tight">
                Nowa marka stworzona przez{" "}
                <span className="text-primary">STEKRO.</span>
              </h2>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Stekro MiniTrak to nowa marka stworzona przez firmę STEKRO z&nbsp;myślą
                o&nbsp;właścicielach małych i&nbsp;średnich gospodarstw, sadów, terenów zielonych
                oraz&nbsp;firm komunalnych. Odpowiadamy na&nbsp;realne potrzeby klientów z&nbsp;Małopolski
                i&nbsp;południowej Polski, gdzie liczy się kompaktowy sprzęt, zwrotność,
                ekonomiczna praca i&nbsp;niezawodność w&nbsp;trudnym terenie.
              </p>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Naszą specjalizacją są traktory niskiej i&nbsp;średniej mocy, idealnie dopasowane
                do&nbsp;lokalnych warunków — wąskich działek, terenów pagórkowatych, sadów
                oraz&nbsp;prac komunalnych wykonywanych przez cały rok. Łączymy doświadczenie
                z&nbsp;nowoczesnym podejściem do&nbsp;sprzedaży i&nbsp;obsługi klienta.
              </p>
              <ul className="mt-6 space-y-2.5 max-w-xl">
                {[
                  "Sprawdzone ciągniki do\u00A0codziennej pracy",
                  "Profesjonalne doradztwo techniczne",
                  "Serwis i\u00A0wsparcie posprzedażowe",
                  "Atrakcyjne formy finansowania i\u00A0leasingu",
                  "Indywidualne podejście do\u00A0każdego klienta",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm md:text-base text-foreground/85">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Tworzymy markę blisko ludzi — praktyczną, uczciwą i&nbsp;skoncentrowaną na&nbsp;tym,
                czego naprawdę potrzebują małe gospodarstwa oraz&nbsp;firmy komunalne w&nbsp;regionie.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="rounded-full px-6" asChild>
                  <a href="#katalog">Przeglądaj maszyny</a>
                </Button>
                <Button variant="outline" className="rounded-full px-6" asChild>
                  <a href="#kontakt">Porozmawiaj z ekspertem</a>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-1 gap-5">
              {[
                {
                  icon: <Wrench className="w-5 h-5" />,
                  title: "Bezkompromisowe zaplecze serwisowe",
                  desc:
                    "W\u00A0pełni wyposażone stacje serwisowe do\u00A0napraw głównych oraz\u00A0mobilne serwisbusy, które docierają bezpośrednio do\u00A0klienta — kluczowe w\u00A0szczycie prac agrotechnicznych.",
                  meta: "naprawa stacjonarna • 2 mobilne ekipy",
                },
                {
                  icon: <PackageCheck className="w-5 h-5" />,
                  title: "Gwarancja dostępności części",
                  desc:
                    "Magazyn centralny z\u00A0ponad 10 000 pozycji w\u00A0stałej, natychmiastowej dostępności. Wysyłka kurierska lub\u00A0dowóz bezpośrednio do\u00A0gospodarstwa.",
                  meta: "10 000+ pozycji magazynowych",
                },
                {
                  icon: <Truck className="w-5 h-5" />,
                  title: "Kompleksowa wygoda i rozliczenia",
                  desc:
                    "Bezpieczna dostawa pod\u00A0drzwi naszym własnym transportem. Przyjmiemy Twój dotychczasowy sprzęt w\u00A0rozliczeniu, optymalizując koszty inwestycji.",
                  meta: "Transport własny • odkup używanego sprzętu",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border/70 bg-card p-6 md:p-7 flex gap-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg leading-tight">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                    <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">
                      {p.meta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 CATALOG */}
      <section id="katalog" className="py-24 md:py-32 px-4 bg-muted/40 border-y border-border/60">
        {BRANDS.map((b) => (
          <span key={b.id} id={`katalog-${b.id}`} className="block -translate-y-24" aria-hidden="true" />
        ))}
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <SectionLabel index="02" label="Traktory" />
              <h2 className="font-display italic font-bold text-3xl md:text-4xl leading-[1.08] tracking-tight">
                Trzy marki. <span className="text-primary">Dwadzieścia siedem modeli.</span> Jedno źródło.
              </h2>
              <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-xl">
                Wybierz markę i&nbsp;ustaw zakres mocy — pokażemy ciągniki, które
                pasują do&nbsp;Twojej pracy.
              </p>
            </div>
          </div>

          {/* Brand tabs */}
          <Tabs value={activeBrand} onValueChange={setActiveBrand} className="w-full">
            <TabsList className="bg-background border border-border rounded-full p-1 h-auto flex-wrap">
              <TabsTrigger value="all" className="rounded-full px-5 py-2 text-sm font-semibold">
                Wszystkie marki
              </TabsTrigger>
              {BRANDS.map((b) => (
                <TabsTrigger key={b.id} value={b.id} className="rounded-full px-5 py-2 text-sm font-semibold">
                  {b.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Brand pitch */}
            {activeBrandObj && (
              <div className="mt-8 rounded-2xl bg-background border border-border p-6 md:p-8">
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                  {activeBrandObj.description}
                </p>
              </div>
            )}

            {/* Power calculator — only filter */}
            <div className="mt-8 rounded-2xl bg-background border border-border p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex items-start gap-4">
                  <span className="hidden md:flex w-12 h-12 rounded-xl bg-primary/10 text-primary items-center justify-center shrink-0">
                    <Gauge className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">
                      Kalkulator mocy
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      Przeciągnij suwak, aby zawęzić katalog do&nbsp;ciągników o&nbsp;pożądanej mocy silnika.
                    </p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="font-display font-bold text-4xl md:text-5xl text-primary leading-none tabular-nums">
                    {powerRange[0]}<span className="text-foreground/30 mx-1">–</span>{powerRange[1]}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mt-2">
                    Koni mechanicznych
                  </div>
                </div>
              </div>

              <div className="mt-8 px-2">
                <Slider
                  aria-label="Zakres mocy silnika w koniach mechanicznych"
                  min={MIN_POWER}
                  max={MAX_POWER}
                  step={1}
                  value={powerRange}
                  onValueChange={(v) => setPowerRange([v[0], v[1]] as [number, number])}
                />
                <div className="flex justify-between mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                  <span>Min {MIN_POWER} KM</span>
                  <span>Max {MAX_POWER} KM</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">
                    Przeznaczenie
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PURPOSE_OPTIONS.map((id) => {
                      const active = purposeFilters.has(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => togglePurpose(id)}
                          aria-pressed={active}
                          className={`text-xs font-semibold rounded-full px-3.5 h-8 border transition-colors ${
                            active
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground/70 hover:border-primary/60 hover:text-foreground"
                          }`}
                        >
                          {PURPOSE_LABELS[id]}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">
                    Funkcjonalność
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {FUNCTIONALITY_OPTIONS.map((id) => {
                      const active = funcFilters.has(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleFunc(id)}
                          aria-pressed={active}
                          className={`text-xs font-semibold rounded-full px-3.5 h-8 border transition-colors ${
                            active
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground/70 hover:border-primary/60 hover:text-foreground"
                          }`}
                        >
                          {FUNCTIONALITY_LABELS[id]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-border/60">
                <span className="text-sm text-muted-foreground">
                  Pasujące modele:{" "}
                  <span className="font-display font-bold text-foreground text-base">
                    {filteredModels.length}
                  </span>{" "}
                  z {ALL_MODELS.length}
                </span>
                {isAnyFilterActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="rounded-full text-xs h-9"
                  >
                    <RefreshCcw className="w-3.5 h-3.5 mr-1.5" />
                    Resetuj wybór
                  </Button>
                )}
              </div>
            </div>

            {/* Cards grid (shared content for all tabs) */}
            <TabsContent value={activeBrand} className="mt-10 m-0">
              {filteredModels.length === 0 ? (
                <div className="rounded-2xl bg-background border border-border p-16 text-center">
                  <p className="text-lg font-semibold">Brak modeli spełniających kryteria.</p>
                  <p className="text-muted-foreground mt-2">Rozszerz zakres mocy lub zmień klasę.</p>
                  <Button onClick={resetFilters} className="mt-6 rounded-full">Resetuj filtry</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredModels.map((m) => (
                    <ModelCard key={m.id} model={m} />
                  ))}
                </div>
              )}

              {/* Full spec table per brand (collapsed) */}
              <div className="mt-12">
                <Accordion type="single" collapsible className="rounded-2xl bg-background border border-border">
                  {(activeBrandObj ? [activeBrandObj] : BRANDS).map((b) => (
                    <AccordionItem key={b.id} value={b.id} className="border-b last:border-b-0">
                      <AccordionTrigger className="px-6 py-5 hover:no-underline">
                        <span className="font-display font-bold text-base md:text-lg">
                          Pełna tabela specyfikacji — {b.name}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-2 md:px-6 pb-6">
                        <div className="overflow-x-auto -mx-2">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground border-b border-border">
                                <th className="py-3 px-3 font-semibold">Model</th>
                                <th className="py-3 px-3 font-semibold">Moc</th>
                                <th className="py-3 px-3 font-semibold">Silnik</th>
                                <th className="py-3 px-3 font-semibold">Skrzynia</th>
                                <th className="py-3 px-3 font-semibold">TUZ / Klasa</th>
                                <th className="py-3 px-3 font-semibold">Cecha kluczowa</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[...b.models].sort((x, y) => parsePower(y.power) - parsePower(x.power)).map((model) => (
                                <tr key={model.id} className="border-b border-border/50 last:border-0 hover:bg-muted/40">
                                  <td className="py-3 px-3 align-top">
                                    <div className="flex items-center gap-3">
                                      <ModelThumb src={model.image} alt={model.name} className="w-12 h-12" />
                                      <span className="font-semibold whitespace-nowrap">{model.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-3 align-top whitespace-nowrap font-bold text-primary">{model.power}</td>
                                  <td className="py-3 px-3 align-top text-muted-foreground">{model.engine}</td>
                                  <td className="py-3 px-3 align-top text-muted-foreground">{model.transmission}</td>
                                  <td className="py-3 px-3 align-top text-muted-foreground">{model.liftCapacity}</td>
                                  <td className="py-3 px-3 align-top text-muted-foreground max-w-md">{model.keyFeature}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 02B KRONE */}
      <section id="krone" className="relative py-24 md:py-32 px-4 bg-background border-b border-border/60 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <span className="font-display text-xs tracking-[0.4em] text-primary font-semibold uppercase">
                Maszyny zielonkowe
              </span>
              <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl leading-[1.08] uppercase mt-3">
                Krone — światowy numer jeden{" "}
                <span className="text-primary">w&nbsp;zbiorze zielonek</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Pełna gama maszyn do&nbsp;zbioru: od&nbsp;kosiarek dyskowych i&nbsp;przetrząsaczy,
                przez zgrabiarki i&nbsp;przyczepy samozbierające, po&nbsp;prasy rolujące
                i&nbsp;kostkujące. Najlepsza technologia, solidne wykonanie i&nbsp;niezawodność
                sezon po&nbsp;sezonie.
              </p>
            </div>
            <div className="shrink-0 rounded-2xl border border-border bg-muted/40 px-8 py-6 flex items-center justify-center">
              <img
                src="/brands/krone.png"
                alt="Logo marki Krone — maszyny do zbioru zielonek"
                title="Marka Krone"
                loading="lazy"
                decoding="async"
                width={300}
                height={166}
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          </div>

          <div className="grid gap-px bg-border/60 rounded-3xl overflow-hidden border border-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {KRONE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="group bg-background p-8 flex flex-col transition-colors hover:bg-muted/40"
              >
                <span className="font-display text-[11px] tracking-[0.3em] text-primary font-semibold uppercase">
                  {cat.tagline}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl mt-2 leading-tight">
                  {cat.name}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {cat.models.map((model) => (
                    <li
                      key={model}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {model}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold" asChild>
              <Link href="/marka/krone">
                Zobacz pełną ofertę Krone
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-14 px-8 text-base"
              asChild
            >
              <a href="#kontakt">Zapytaj o ofertę</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 03 MASZYNY */}
      <section id="osprzet" className="relative py-24 md:py-32 px-4 bg-[#0e110d] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <LazyYouTubeBackground
            videoId="YAh0cXv5yOY"
            title="Stekro MiniTrak film tła — maszyny"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full opacity-35 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e110d] via-[#0e110d]/80 to-[#0e110d]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e110d] via-[#0e110d]/40 to-[#0e110d]/15" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mb-14">
            <SectionLabel index="03" label="Maszyny" />
            <h2 className="font-display italic font-bold text-3xl md:text-4xl leading-[1.08] tracking-tight text-white">
              Maszyny zwiększające{" "}
              <span className="text-primary">Twoją wydajność.</span>
            </h2>
            <p className="mt-5 text-white/65 text-base md:text-lg">
              Dziesięć kategorii maszyn dodatkowych — od&nbsp;rolnictwa po&nbsp;sektor komunalny.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {MACHINES.map((m, i) => {
              const Icon = MACHINE_ICONS[m.id] ?? Settings;
              const categoryHref =
                m.id === "kosiarki-bijakowe"
                  ? "/maszyny/kosiarki-bijakowe"
                  : m.id === "glebogryzarki"
                    ? "/maszyny/glebogryzarki"
                    : "#kontakt";
              return (
                <Link
                  key={m.id}
                  href={categoryHref}
                  title={m.desc}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-primary/50 backdrop-blur-sm p-5 md:p-6 transition-all flex flex-col items-start"
                >
                  <span className="absolute top-4 right-4 font-display text-[10px] tracking-[0.2em] text-white/30 font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-black transition-colors">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-display font-bold text-sm md:text-base leading-tight text-white">
                    {m.name}
                  </h3>
                  <span className="mt-4 inline-flex items-center text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Zapytaj
                    <ArrowUpRight className="ml-1 w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="mt-10 text-sm text-white/50 max-w-2xl">
            Każdą z&nbsp;kategorii konfigurujemy pod konkretny ciągnik — TUZ, WOM,
            hydraulika i&nbsp;elektryka. Skontaktuj się, aby otrzymać pełny zestaw
            techniczny i&nbsp;wycenę.
          </p>
        </div>
      </section>

      {/* 04 PARTS */}
      <section id="czesci" className="py-24 md:py-32 px-4 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionLabel index="04" label="Części zamienne" />
              <h2 className="font-display italic font-bold text-3xl md:text-4xl leading-[1.08] tracking-tight">
                <span className="text-primary">Tysiące pozycji.</span> Pięć logicznych bloków.
              </h2>
              <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-md">
                Pięć logicznych bloków części eksploatacyjnych i&nbsp;zamiennych. Szukasz
                konkretnej pozycji? Zadzwoń lub&nbsp;napisz — sprawdzimy dostępność
                w&nbsp;magazynie i&nbsp;przygotujemy wycenę.
              </p>
              <div className="mt-8 rounded-2xl border border-border bg-background p-5 flex items-start gap-4">
                <Headphones className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Sklep części</p>
                  <p className="text-sm text-muted-foreground">{CONTACT_INFO.partsPhone}</p>
                  <a href={`mailto:${CONTACT_INFO.emailParts}`} className="text-sm text-primary font-semibold hover:underline">
                    {CONTACT_INFO.emailParts}
                  </a>
                </div>
              </div>

            </div>
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-3">
                {PART_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Settings className="w-5 h-5" />
                    </span>
                    <span className="font-display font-bold text-base md:text-lg leading-tight">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 ACCESSORIES */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mb-12">
            <SectionLabel index="05" label="Akcesoria" />
            <h2 className="font-display italic font-bold text-3xl md:text-4xl leading-[1.08] tracking-tight">
              Wyposażenie, które{" "}
              <span className="text-primary">domyka projekt.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg">
              Cztery kategorie osprzętu — od&nbsp;homologowanych zaczepów i&nbsp;wymiennego
              osprzętu do&nbsp;ładowaczy, po&nbsp;fotele Grammer i&nbsp;koguty stroboskopowe.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ACCESSORY_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="rounded-2xl border border-border/60 bg-card p-5"
              >
                <PackageCheck className="w-5 h-5 text-primary" />
                <p className="font-display font-bold text-sm md:text-base mt-3 leading-tight">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 FINANSOWANIE + LOGISTYKA */}
      <section id="finansowanie" className="relative py-24 md:py-32 px-4 bg-[#0e110d] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <LazyYouTubeBackground
            videoId="PM-r8CH-21Q"
            title="Stekro MiniTrak film tła — finansowanie"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full opacity-30 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e110d] via-[#0e110d]/85 to-[#0e110d]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e110d] via-[#0e110d]/40 to-[#0e110d]/10" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mb-14">
            <SectionLabel index="06" label="Finansowanie i logistyka" />
            <h2 className="font-display italic font-bold text-3xl md:text-4xl leading-[1.08] tracking-tight text-white">
              Eliminujemy{" "}
              <span className="text-primary">obiekcje zakupowe.</span>
            </h2>
            <p className="mt-5 text-white/65 text-base md:text-lg">
              Oferujemy najbardziej korzystne formy finansowania fabrycznego, często
              totalne 0%. Ponadto współpracujemy z&nbsp;wiodącymi instytucjami leasingowymi.
            </p>
          </div>

          {showFinancing && (
          <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-500">
            {/* Financing */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Banknote className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-2xl">Finansowanie Agro</h3>
              </div>
              <ul className="space-y-5">
                {[
                  { icon: <CheckCircle2 className="w-4 h-4" />, title: "Absolutne minimum formalności", desc: "W\u00A0większości przypadków wystarczy oświadczenie o\u00A0dochodach i\u00A0dokument potwierdzający areał. Procedura uproszczona, bez analizy pełnych ksiąg." },
                  { icon: <Percent className="w-4 h-4" />, title: "Opłata wstępna już od\u00A00%", desc: "Rozpoczynasz pracę z\u00A0fabrycznie nową maszyną bez angażowania kapitału startowego." },
                  { icon: <CalendarRange className="w-4 h-4" />, title: "Elastyczne raty sezonowe", desc: "Harmonogram spłat dopasowany do\u00A0sezonowości przychodów — miesięcznie, kwartalnie lub\u00A0półrocznie." },
                  { icon: <Coins className="w-4 h-4" />, title: "Dedykowana Pożyczka Agro", desc: "Alternatywa dla leasingu operacyjnego, idealne rozwiązanie pomostowe pod programy dotacyjne UE." },
                ].map((it) => (
                  <li key={it.title} className="flex gap-4">
                    <span className="shrink-0 w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center mt-0.5">
                      {it.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{it.title}</p>
                      <p className="text-sm text-white/60 mt-1 leading-relaxed">{it.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logistics */}
            <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-5 h-5" />
                <h3 className="font-display font-bold text-2xl">Logistyka i dostawa</h3>
              </div>
              <ul className="space-y-5">
                {[
                  { title: "Bezpieczny transport własny Stekro MiniTrak", desc: "Własna flota ciężkich samochodów. Wykwalifikowani kierowcy-mechanicy dostarczają maszynę pod wskazany adres w\u00A0Polsce wraz z\u00A0fachowym instruktażem startowym." },
                  { title: "Szybkie wysyłki kurierskie (DHL)", desc: "Części krytyczne i\u00A0mniejsze akcesoria. Paczki krajowe do\u00A031,5 kg oraz\u00A0ubezpieczone ładunki paletowe od\u00A040 kg w\u00A0górę." },
                  { title: "Tradycyjny odbiór osobisty w\u00A0Brzeznej", desc: "Zapraszamy do\u00A0centrum ekspozycyjno-sprzedażowego — obejrzysz, przetestujesz i\u00A0odbierzesz maszynę bezpośrednio z\u00A0placu wystawowego." },
                ].map((it) => (
                  <li key={it.title} className="flex gap-4">
                    <span className="shrink-0 w-9 h-9 rounded-full bg-black/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="font-bold">{it.title}</p>
                      <p className="text-sm text-black/70 mt-1 leading-relaxed">{it.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-black/15 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <div>
                  <span className="block text-xs uppercase tracking-[0.22em] opacity-65 font-semibold">Biuro sprzedaży</span>
                  <a href={`tel:${CONTACT_INFO.salesPhone.replace(/\s/g, "")}`} className="font-bold text-base">
                    {CONTACT_INFO.salesPhone}
                  </a>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-[0.22em] opacity-65 font-semibold">E-mail</span>
                  <a href={`mailto:${CONTACT_INFO.emailMain}`} className="font-bold text-base">
                    {CONTACT_INFO.emailMain}
                  </a>
                </div>
              </div>
            </div>
          </div>
          )}
          <RevealToggle
            open={showFinancing}
            onToggle={() => setShowFinancing((v) => !v)}
            openLabel={"Pokaż szczegóły finansowania i\u00A0logistyki"}
            closeLabel="Zwiń szczegóły"
            tone="dark"
          />
        </div>
      </section>

      {/* 07 OPINIE */}
      <section id="opinie" className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mb-14">
            <SectionLabel index="07" label="Opinie klientów" />
            <h2 className="font-display italic font-bold text-3xl md:text-4xl leading-[1.08] tracking-tight">
              Autentyczne opinie klientów <span className="text-primary">prosto z&nbsp;Google.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg">
              Niezmienione, prawdziwe opinie wystawione przez naszych klientów w&nbsp;wizytówce
              Google — od&nbsp;sadowników po&nbsp;firmy komunalne.
            </p>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-5">
              {[
                {
                  quote:
                    "Szeroki asortyment, fachowe doradztwo, pełny profesjonalizm i super obsługa. Serdecznie pozdrawiam tą firmę.",
                  author: "to ja ktoś",
                  role: "Opinia z Google · edytowano 3 miesiące temu",
                  rating: 5,
                },
                {
                  quote:
                    "Fachowe podejście, miła obsługa, szybki czas realizacji, traktor jest naprawdę super, BARDZO WAM DZIĘKUJE (Solis S26 Black Panther).",
                  author: "Mariusz Padło",
                  role: "Opinia z Google",
                  rating: 5,
                },
                {
                  quote:
                    "Serdecznie polecam! Kupiłem traktor sadowniczy Solis 26, glebogryzarkę, kosiarkę bijakową i przyczepkę. Profesjonalne doradztwo dla niedoświadczonego klienta, dostosowanie oferty do określonych potrzeb, dobre warunki cenowe. Transport i rozładunek sprawny, konkretne szkolenie z podstaw użytkowania sprzętu.",
                  author: "Jarosław Januszewski",
                  role: "Opinia z Google · 4 opinie",
                  rating: 5,
                },
                {
                  quote:
                    "Polecam. Dużo maszyn na placu — nie ma takiego drugiego sklepu w okolicy.",
                  author: "Kamil Kamilu",
                  role: "Opinia z Google · Lokalny przewodnik · 23 opinie",
                  rating: 5,
                },
                {
                  quote:
                    "Firma godna polecenia, świetny kontakt, fachowe doradztwo, szybka realizacja.",
                  author: "Paulina Kochan",
                  role: "Opinia z Google · 1 opinia",
                  rating: 5,
                },
                {
                  quote: "Sklep dobrze wyposażony.",
                  author: "Ja Tak",
                  role: "Opinia z Google · Lokalny przewodnik · 437 opinii",
                  rating: 5,
                },
                {
                  quote: "Części do maszyny. Szybko, profesjonalnie.",
                  author: "Bogdan Krynicki",
                  role: "Opinia z Google · Lokalny przewodnik · 9 opinii",
                  rating: 5,
                },
              ].map((t) => (
                <CarouselItem
                  key={t.author}
                  className="pl-5 md:basis-1/2 lg:basis-1/3"
                >
                  <figure className="h-full rounded-2xl border border-border/70 bg-card p-7 flex flex-col">
                    <div className="flex items-center justify-between">
                      <Quote className="w-7 h-7 text-primary/40" />
                      <div className="flex gap-0.5" aria-label={`Ocena ${t.rating} na 5`}>
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="mt-4 text-sm md:text-base leading-relaxed text-foreground/90 flex-1">
                      „{t.quote}"
                    </blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-border/60">
                      <p className="font-display font-bold text-sm leading-tight">{t.author}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{t.role}</p>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-end gap-3 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* 08 FAQ */}
      <section id="faq" className="py-24 md:py-32 px-4 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionLabel index="08" label="Najczęstsze pytania" />
              <h2 className="font-display italic font-bold text-3xl md:text-4xl leading-[1.08] tracking-tight">
                Szybkie odpowiedzi na&nbsp;<span className="text-primary">częste pytania.</span>
              </h2>
              <p className="mt-5 text-muted-foreground text-base md:text-lg">
                Najczęstsze wątpliwości dotyczące zakupu, leasingu, serwisu i&nbsp;części.
                Nie znalazłeś odpowiedzi? Napisz lub&nbsp;zadzwoń — odpowiemy w&nbsp;ciągu doby.
              </p>
              <div className="mt-8 rounded-2xl border border-border bg-background p-5 flex items-start gap-4">
                <HelpCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Nie ma Twojego pytania?</p>
                  <a href={`tel:${CONTACT_INFO.salesPhone.replace(/\s/g, "")}`} className="text-sm text-primary font-semibold hover:underline">
                    Zadzwoń: {CONTACT_INFO.salesPhone}
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="rounded-2xl bg-background border border-border">
                {[
                  {
                    q: "Czy Stekro Mini Trak to nowa firma?",
                    a: "Nie. Stekro Mini Trak to nowa marka rozwijana przez firmę STEKRO. Powstała po\u00A0to, aby jeszcze lepiej odpowiadać na\u00A0potrzeby klientów poszukujących kompaktowych traktorów i\u00A0maszyn niskiej mocy.",
                  },
                  {
                    q: "Dlaczego powstała marka Mini Trak?",
                    a: "Zauważyliśmy rosnące zainteresowanie małymi i\u00A0zwrotnymi ciągnikami, szczególnie wśród gospodarstw z\u00A0Małopolski, sadowników oraz\u00A0firm komunalnych. Marka Mini Trak została stworzona specjalnie dla tego segmentu klientów.",
                  },
                  {
                    q: "Czy wcześniejsze gwarancje STEKRO nadal obowiązują?",
                    a: "Tak. Wszystkie gwarancje, serwis oraz\u00A0wcześniejsze ustalenia realizowane przez Stekro pozostają ważne i\u00A0są nadal obsługiwane bez zmian.",
                  },
                  {
                    q: "Czy oferujecie leasing na\u00A0traktory?",
                    a: "Tak. Oferujemy leasing dla firm, gospodarstw rolnych oraz\u00A0klientów indywidualnych prowadzących działalność gospodarczą. Pomagamy przejść przez cały proces finansowania.",
                  },
                  {
                    q: "Jak wygląda procedura leasingowa?",
                    a: "Proces jest prosty: 1) wybór modelu traktora i\u00A0wyposażenia, 2) przygotowanie najkorzystniejszej oferty finansowania, 3) złożenie podstawowych dokumentów, 4) decyzja leasingowa, 5) odbiór maszyny. Nasi doradcy pomagają na\u00A0każdym etapie formalności.",
                  },
                  {
                    q: "Czy można kupić ciągnik na\u00A0raty?",
                    a: "Tak, oferujemy również finansowanie ratalne oraz\u00A0indywidualne rozwiązania dopasowane do\u00A0możliwości klienta.",
                  },
                  {
                    q: "Czy pomagacie dobrać odpowiedni model traktora?",
                    a: "Oczywiście. Doradzamy w\u00A0wyborze ciągnika na\u00A0podstawie rodzaju prac, wielkości gospodarstwa oraz\u00A0planowanego budżetu.",
                  },
                  {
                    q: "Czy traktory Mini Trak nadają się do\u00A0pracy komunalnej?",
                    a: "Tak. W\u00A0naszej ofercie znajdują się modele idealne do\u00A0odśnieżania, koszenia terenów zielonych, utrzymania dróg lokalnych i\u00A0innych prac komunalnych.",
                  },
                  {
                    q: "Gdzie można obejrzeć maszyny?",
                    a: "Zapraszamy do\u00A0kontaktu i\u00A0odwiedzenia naszej siedziby w\u00A0Nowym Targu (otwarcie wkrótce) lub\u00A0punktu sprzedaży w\u00A0Brzeznej. Chętnie prezentujemy maszyny oraz\u00A0organizujemy pokazy wybranych modeli.",
                  },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                      <span className="font-display font-bold text-base md:text-lg pr-4">{item.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* 09 KONTAKT */}
      <section id="kontakt" className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mb-14">
            <SectionLabel index="07" label="Kontakt" />
            <h2 className="font-display italic font-bold text-3xl md:text-4xl leading-[1.08] tracking-tight">
              Skontaktuj się{" "}
              <span className="text-primary">bezpośrednio z ekspertem.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg">
              Nasi doradcy ds. sprzedaży maszyn nowych i&nbsp;używanych dobiorą sprzęt
              skrojony pod parametry Twojego gospodarstwa.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Advisors */}
            <div className="lg:col-span-7 grid gap-4 content-start">
              <div className="rounded-2xl border border-border bg-card p-7 md:p-8">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Biuro sprzedaży</p>
                    <p className="font-display font-bold text-xl mt-1 leading-tight">
                      {TEAM[0].role}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      Pomoże dobrać model pod gospodarstwo, przygotuje ofertę leasingową
                      i&nbsp;ustali termin dostawy. Zadzwoń lub&nbsp;napisz — odpowiemy
                      w&nbsp;ciągu 1 dnia roboczego.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${TEAM[0].phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 hover:border-primary/60 transition"
                  >
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Telefon</p>
                      <p className="text-sm font-semibold truncate">{TEAM[0].phone}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${CONTACT_INFO.emailMain}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 hover:border-primary/60 transition"
                  >
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">E-mail</p>
                      <p className="text-sm font-semibold truncate">{CONTACT_INFO.emailMain}</p>
                    </div>
                  </a>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    Centrala: <a href={`tel:${CONTACT_INFO.mainPhone.replace(/\s/g, "")}`} className="font-semibold text-foreground hover:text-primary">{CONTACT_INFO.mainPhone}</a>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    {CONTACT_INFO.hoursWeekday} • {CONTACT_INFO.hoursSaturday}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Building2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">Siedziba</p>
                    <p className="text-sm font-semibold mt-1">{CONTACT_INFO.companyName}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary/70 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">Punkt w Brzeznej</p>
                    <p className="text-sm font-medium mt-1">{CONTACT_INFO.temporaryPoint}</p>
                    <a
                      href={CONTACT_INFO.mapBrzezna}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center text-xs font-semibold text-primary hover:underline"
                    >
                      Wyznacz trasę <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">Centrala</p>
                    <a href={`tel:${CONTACT_INFO.mainPhone.replace(/\s/g, "")}`} className="text-sm font-medium hover:text-primary">
                      {CONTACT_INFO.mainPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">Biuro sprzedaży</p>
                    <a href={`tel:${CONTACT_INFO.salesPhone.replace(/\s/g, "")}`} className="text-sm font-medium hover:text-primary">
                      {CONTACT_INFO.salesPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PackageCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">Sklep części</p>
                    <span className="text-sm font-medium mt-1 block">{CONTACT_INFO.partsPhone}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">Godziny otwarcia</p>
                    <p className="text-sm font-medium mt-1">{CONTACT_INFO.hoursWeekday} · {CONTACT_INFO.hoursSaturday}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Brzezna oraz&nbsp;salon w&nbsp;Nowym Targu</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-border/60 bg-muted/30">
                <iframe
                  title="Stekro MiniTrak — mapa siedziby"
                  src="https://www.google.com/maps?q=ul.+Kr%C3%B3lowej+Jadwigi+80A,+34-400+Nowy+Targ&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[280px] md:h-[340px] block border-0"
                />
                <div className="px-5 py-3 flex items-center justify-between gap-3 text-xs border-t border-border/60">
                  <span className="text-muted-foreground">{CONTACT_INFO.address}</span>
                  <a
                    href={CONTACT_INFO.mapNowyTarg}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-primary hover:underline whitespace-nowrap inline-flex items-center"
                  >
                    Wyznacz trasę <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-5">
              {submitStatus === "success" ? (
                <div
                  id="formularz-kontakt"
                  className="rounded-2xl border border-primary/40 bg-primary/[0.06] p-8 md:p-10 sticky top-28 text-center"
                >
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <p className="font-display font-bold text-2xl mt-5 leading-tight">Dziękujemy!</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    Twoje zapytanie trafiło do&nbsp;biura sprzedaży Stekro MiniTrak.
                    Odpowiemy w&nbsp;ciągu 1 dnia roboczego — w&nbsp;pilnych sprawach zadzwoń pod{" "}
                    <a href={`tel:${CONTACT_INFO.salesPhone.replace(/\s/g, "")}`} className="text-primary font-semibold">
                      {CONTACT_INFO.salesPhone}
                    </a>.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-6 rounded-full"
                  >
                    Wyślij kolejne zapytanie
                  </Button>
                </div>
              ) : (
                <form
                  id="kontakt-form"
                  name="kontakt"
                  onSubmit={onSubmitForm}
                  className="rounded-2xl border border-border bg-card p-7 md:p-8 sticky top-28"
                  noValidate
                >
                  {/* Honeypot — niewidoczne pole dla botów; prawdziwi użytkownicy nie wypełniają */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute opacity-0 pointer-events-none -left-[9999px] w-px h-px"
                  />
                  <p className="font-display font-bold text-xl">Zostaw zapytanie</p>
                  <p className="text-sm text-muted-foreground mt-1">Odpowiadamy w&nbsp;ciągu jednego dnia roboczego.</p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="form-name" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Imię lub firma</label>
                      <Input
                        id="form-name"
                        required
                        minLength={2}
                        maxLength={120}
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="mt-1.5 h-11 rounded-xl"
                        placeholder="Jan Kowalski"
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="form-phone" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Telefon</label>
                      <Input
                        id="form-phone"
                        required
                        type="tel"
                        pattern="[+0-9 ]{9,}"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="mt-1.5 h-11 rounded-xl"
                        placeholder="+48 ___ ___ ___"
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="form-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">E-mail (opcjonalnie)</label>
                      <Input
                        id="form-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="mt-1.5 h-11 rounded-xl"
                        placeholder="kontakt@firma.pl"
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="form-message" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Czego szukasz?</label>
                      <textarea
                        id="form-message"
                        required
                        minLength={5}
                        maxLength={2000}
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
                        placeholder="Np. ciągnik 50 KM z ładowaczem do 80 ha + serwis"
                        disabled={submitting}
                      />
                    </div>

                    <div className="space-y-3 pt-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={rodo}
                          onCheckedChange={(v) => setRodo(v === true)}
                          disabled={submitting}
                          className="mt-0.5"
                          required
                        />
                        <span className="text-[11px] leading-relaxed text-muted-foreground">
                          <span className="text-foreground font-medium">Wyrażam zgodę</span> na&nbsp;przetwarzanie moich danych osobowych
                          przez Stekro MiniTrak w&nbsp;celu odpowiedzi na&nbsp;zapytanie zgodnie z&nbsp;
                          <a href="/polityka-prywatnosci" className="text-primary hover:underline" target="_blank" rel="noreferrer">
                            polityką prywatności
                          </a>. <span className="text-foreground/60">(wymagane)</span>
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={marketing}
                          onCheckedChange={(v) => setMarketing(v === true)}
                          disabled={submitting}
                          className="mt-0.5"
                        />
                        <span className="text-[11px] leading-relaxed text-muted-foreground">
                          Chcę otrzymywać informacje o&nbsp;nowych modelach, promocjach i&nbsp;wydarzeniach
                          branżowych (opcjonalnie).
                        </span>
                      </label>
                    </div>

                    {submitStatus === "error" && (
                      <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
                        {submitError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={submitting || !rodo}
                      className="w-full rounded-full h-12 font-semibold disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          Wyślij zapytanie
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />

      {/* MOBILE STICKY CALL BAR — dodaje globalny padding-bottom, by nie zakrywać stopki */}
      <div aria-hidden="true" className="md:hidden h-20" />
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0e110d]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2.5 flex gap-2 shadow-[0_-8px_24px_rgba(0,0,0,0.35)]">
        <a
          href={`tel:${CONTACT_INFO.salesPhone.replace(/\s/g, "")}`}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full h-11 bg-primary text-primary-foreground font-semibold text-sm"
          aria-label="Zadzwoń do Stekro MiniTrak"
        >
          <Phone className="w-4 h-4" />
          Zadzwoń
        </a>
        <a
          href="#kontakt"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full h-11 bg-white/10 text-white font-semibold text-sm border border-white/15"
        >
          <Mail className="w-4 h-4" />
          Napisz
        </a>
      </div>
    </>
  );
}

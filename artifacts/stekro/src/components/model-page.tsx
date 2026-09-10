import { Breadcrumbs } from "@/components/breadcrumbs";
import { gallerySrcSet } from "@/lib/img-utils";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  PhoneCall,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { CONTACT_INFO } from "@/data";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import logoWhite from "@assets/stekro_minitrak_logo_white_nobg_small.webp";

export type GalleryImage = {
  src: string;
  alt: string;
  title?: string;
  emphasis?: boolean;
  width?: number;
  height?: number;
};

export type FeatureGroup = {
  icon: LucideIcon;
  title: string;
  items: string[];
};

export type SpecSection = {
  title: string;
  rows: Array<[string, string]>;
};

export type UseCase = {
  title: string;
  description: string;
};

export type QuickStat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export type HeroBadge = {
  icon?: LucideIcon;
  label: string;
  primary?: boolean;
};

export type ModelPageData = {
  brand: {
    name: string;
    catalogHref: string;
  };
  model: {
    short: string;
    full: string;
    headline: ReactNode;
    accent?: ReactNode;
  };
  primaryAction?: {
    label: string;
    href: string;
    options?: string[];
    pricedOptions?: Array<{ value: string; label: string; price: number }>;
    addOns?: Array<{ value: string; label: string; price: number }>;
  };
  hero: {
    image: string;
    imageWidth?: number;
    imageHeight?: number;
    alt: string;
    description: ReactNode;
    eyebrow?: string;
    badges?: HeroBadge[];
  };
  stats: QuickStat[];
  why: {
    eyebrow?: string;
    title: string;
    paragraphs: ReactNode[];
  };
  featureGroups: FeatureGroup[];
  useCases?: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    items?: UseCase[];
    paragraphs?: ReactNode[];
  };
  gallery?: {
    eyebrow?: string;
    title: string;
    subtitle?: ReactNode;
    images: GalleryImage[];
  };
  specs: SpecSection[];
  hideDisclaimers?: boolean;
  salesArguments?: string[];
  salesArgumentsText?: ReactNode[];
  salesArgumentsHeading?: string;
  contact?: {
    intro?: string;
  };
};

export function ModelPageLayout({ data }: { data: ModelPageData }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-24">
        <ModelHero data={data} />
        <SpecTabsSection specs={data.specs} model={data.model.short} hideDisclaimers={data.hideDisclaimers} />
        <StatsBar stats={data.stats} />
        <WhyAndFeatures data={data} />
        {data.useCases && <UseCasesSection useCases={data.useCases} />}
        {data.gallery && <GallerySection gallery={data.gallery} />}
        {(data.salesArguments || data.salesArgumentsText) && <SalesArguments data={data} />}
        <ContactCTA data={data} />
      </main>
      <SiteFooter />
    </div>
  );
}

function ModelHero({ data }: { data: ModelPageData }) {
  const { hero, model, brand } = data;
  const shouldFillImageContainer =
    brand.name === "Kosiarki bijakowe" || brand.name === "Glebogryzarki";

  return (
    <section className="relative overflow-hidden bg-[#0e110d] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#10130f] via-[#0a0d08] to-[#1a2014]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(176,203,31,0.10),transparent_60%)]" />
      <div className="container relative mx-auto grid min-h-[calc(100svh-6rem)] gap-8 px-4 py-10 lg:h-[calc(100svh-6rem)] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-8 lg:py-4">
        <div className="relative order-2 lg:order-1 lg:h-[min(76vh,760px)]">
          <div className="absolute -inset-6 rounded-[3rem] bg-primary/20 blur-3xl" />
          <div className="relative h-full min-h-[300px] overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl sm:min-h-[440px] lg:min-h-0">
            <img
              src={hero.image}
              srcSet={gallerySrcSet(hero.image, hero.imageWidth)}
              sizes="(max-width: 1023px) calc(100vw - 2rem), 54vw"
              alt={hero.alt}
              title={`${model.full} — zdjęcie główne`}
              width={hero.imageWidth}
              height={hero.imageHeight}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={
                shouldFillImageContainer
                  ? "h-full w-full object-cover"
                  : "h-full w-full object-contain"
              }
            />
          </div>
        </div>
        <div className="order-1 flex min-w-0 flex-col lg:order-2 lg:max-h-[calc(100svh-9rem)]">
          <a
            href={brand.catalogHref}
            className="mb-1 inline-flex items-center gap-2 self-start text-sm font-semibold text-white/70 transition-colors hover:text-primary lg:text-[11px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Wróć do&nbsp;katalogu {brand.name}
          </a>
          <Breadcrumbs
            tone="dark"
            className="mb-1.5 lg:text-[11px]"
            current={data.model.full}
            parents={
              data.brand.name === "Kosiarki bijakowe" || data.brand.name === "Glebogryzarki"
                ? [{ label: data.brand.name, href: data.brand.catalogHref }]
                : undefined
            }
          />
          {hero.eyebrow && (
            <div className="mb-1.5 inline-flex items-center self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary lg:py-0.5 lg:text-[11px]">
              {hero.eyebrow}
            </div>
          )}
          <h1 className="mb-1.5 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-5xl lg:text-[clamp(1.65rem,2.35vw,2.35rem)]">
            {model.headline}
            {model.accent && <span className="mt-1 block text-primary">{model.accent}</span>}
          </h1>
          <div className="mb-2.5 max-w-2xl text-base leading-7 text-white/72 lg:text-[13px] lg:leading-[1.1rem] xl:text-sm xl:leading-5">
            {hero.description}
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl backdrop-blur-sm">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Konfiguracja i&nbsp;zakup
          </p>
          <div className="flex flex-col gap-2.5">
            {data.primaryAction?.options || data.primaryAction?.pricedOptions ? (
              <VariantPurchaseAction action={data.primaryAction} />
            ) : (
              <Button size="lg" className="h-11 w-full rounded-full px-8 text-sm font-semibold" asChild>
                {data.primaryAction ? (
                <Link href={data.primaryAction.href}>
                  {data.primaryAction.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                ) : (
                  <a href="#kontakt-model">
                    Zapytaj o&nbsp;dostępność
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                )}
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="h-11 w-full rounded-full border-white/20 bg-white/10 px-8 text-sm text-white hover:bg-white/20"
              asChild
            >
              <a href="#specyfikacja">Zobacz specyfikację</a>
            </Button>
          </div>
          {hero.badges && hero.badges.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {hero.badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <span
                    key={badge.label}
                    className={
                      badge.primary
                        ? "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 text-xs font-bold text-primary"
                        : "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white"
                    }
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {badge.label}
                  </span>
                );
              })}
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}

function VariantPurchaseAction({ action }: { action: NonNullable<ModelPageData["primaryAction"]> }) {
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedAddOn, setSelectedAddOn] = useState("");
  const modelSelectRef = useRef<HTMLSelectElement>(null);
  const addOnSelectRef = useRef<HTMLSelectElement>(null);
  const normalizeOptionValue = (value: string) => value.replace(/\s+/g, " ").trim();
  const selectedModelOption = action.pricedOptions?.find(
    (option) => normalizeOptionValue(option.value) === normalizeOptionValue(selectedModel),
  );
  const selectedAddOnOption = action.addOns?.find(
    (option) => normalizeOptionValue(option.value) === normalizeOptionValue(selectedAddOn),
  );
  const selectedModelPrice = selectedModelOption?.price;
  const selectedAddOnPrice = selectedAddOnOption?.price;
  const hasValidModel = action.pricedOptions
    ? Boolean(selectedModelOption)
    : Boolean(action.options?.some(
        (option) => normalizeOptionValue(option) === normalizeOptionValue(selectedModel),
      ));
  const hasValidAddOn = !action.addOns?.length || Boolean(selectedAddOnOption);
  const configuredPrice =
    selectedModelPrice === undefined || !hasValidAddOn
      ? undefined
      : selectedModelPrice + (selectedAddOnPrice ?? 0);
  const isConfigured = hasValidModel && hasValidAddOn;

  useEffect(() => {
    const syncRestoredSelections = () => {
      setSelectedModel(modelSelectRef.current?.value ?? "");
      setSelectedAddOn(addOnSelectRef.current?.value ?? "");
    };
    const modelSelect = modelSelectRef.current;
    const addOnSelect = addOnSelectRef.current;
    const timeoutId = window.setTimeout(syncRestoredSelections, 0);
    const animationFrameId = window.requestAnimationFrame(syncRestoredSelections);
    modelSelect?.addEventListener("input", syncRestoredSelections);
    modelSelect?.addEventListener("change", syncRestoredSelections);
    addOnSelect?.addEventListener("input", syncRestoredSelections);
    addOnSelect?.addEventListener("change", syncRestoredSelections);
    window.addEventListener("pageshow", syncRestoredSelections);
    window.addEventListener("focus", syncRestoredSelections);
    document.addEventListener("visibilitychange", syncRestoredSelections);
    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(animationFrameId);
      modelSelect?.removeEventListener("input", syncRestoredSelections);
      modelSelect?.removeEventListener("change", syncRestoredSelections);
      addOnSelect?.removeEventListener("input", syncRestoredSelections);
      addOnSelect?.removeEventListener("change", syncRestoredSelections);
      window.removeEventListener("pageshow", syncRestoredSelections);
      window.removeEventListener("focus", syncRestoredSelections);
      document.removeEventListener("visibilitychange", syncRestoredSelections);
    };
  }, []);

  const params = new URLSearchParams();
  if (selectedModel) params.set("model", selectedModel);
  if (selectedAddOn) params.set("wom", selectedAddOn);
  if (configuredPrice !== undefined) params.set("price", String(configuredPrice));
  const href = `${action.href}?${params.toString()}`;
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(price);

  return (
    <div id="wybor-modelu" className="w-full rounded-3xl border border-white/15 bg-white/5 p-4 lg:max-w-2xl lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
      <p className="mb-3 text-sm font-semibold text-white lg:mb-1.5 lg:text-xs">Skonfiguruj produkt przed zakupem</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:gap-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-white lg:gap-1 lg:text-xs">
          Model *
        <select
          ref={modelSelectRef}
          id="product-model"
          data-testid="select-product-model"
          defaultValue=""
          onInput={(event) => setSelectedModel(event.currentTarget.value)}
          onChange={(event) => setSelectedModel(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/20 bg-[#171b15] px-4 text-base text-white [color-scheme:dark] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 lg:h-10 lg:px-3 lg:text-sm"
        >
          <option value="" className="bg-[#171b15] text-white">Wybierz model</option>
          {action.pricedOptions
            ? action.pricedOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#171b15] text-white">
                  {option.label} — {formatPrice(option.price)}
                </option>
              ))
            : action.options?.map((option) => (
                <option key={option} value={option} className="bg-[#171b15] text-white">{option}</option>
              ))}
        </select>
        </label>
        {action.addOns && (
          <label className="flex flex-col gap-2 text-sm font-semibold text-white lg:gap-1 lg:text-xs">
            Wał odbioru mocy (WOM) *
            <select
              ref={addOnSelectRef}
              data-testid="select-product-addon"
              defaultValue=""
              onInput={(event) => setSelectedAddOn(event.currentTarget.value)}
              onChange={(event) => setSelectedAddOn(event.target.value)}
              className="h-12 w-full rounded-xl border border-white/20 bg-[#171b15] px-4 text-base text-white [color-scheme:dark] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 lg:h-10 lg:px-3 lg:text-sm"
            >
              <option value="" className="bg-[#171b15] text-white">Wybierz WOM</option>
              {action.addOns.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#171b15] text-white">
                  {option.label} (+{formatPrice(option.price)})
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mt-2 lg:gap-2">
        <div aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/55">Aktualna cena konfiguracji</p>
          <p data-testid="configured-price" className="mt-1 font-display text-2xl font-bold text-primary lg:text-xl">
            {configuredPrice !== undefined && isConfigured ? formatPrice(configuredPrice) : "Wybierz wszystkie opcje"}
          </p>
        </div>
        {isConfigured ? (
          <Button size="lg" className="h-11 rounded-full px-7 text-sm font-semibold" asChild>
            <a href={href}>
              {action.label}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        ) : (
          <Button size="lg" className="h-11 rounded-full px-7 text-sm font-semibold" disabled>
            {action.label}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
      {action.pricedOptions && (
        <p className="mt-2 text-xs leading-5 text-white/55 lg:text-[11px] lg:leading-4">
          Cena wynika z&nbsp;wybranego modelu i&nbsp;opcji WOM. Szczegóły oferty potwierdzi doradca przed realizacją zamówienia.
        </p>
      )}
    </div>
  );
}

function StatsBar({ stats }: { stats: QuickStat[] }) {
  return (
    <section data-testid="product-quick-stats" className="border-b border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-border/70 bg-background">
                <CardContent className="p-5">
                  <Icon className="mb-3 h-5 w-5 text-primary" />
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                  <p className="mt-1.5 font-display text-base font-bold leading-tight">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyAndFeatures({ data }: { data: ModelPageData }) {
  const { why, featureGroups, model } = data;
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            {why.eyebrow && (
              <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
                {why.eyebrow}
              </div>
            )}
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {why.title}
            </h2>
            <div className="space-y-5 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {why.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {model.short} — co dostajesz w&nbsp;pakiecie
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {featureGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.title}
                    className="flex flex-col rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/40"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="font-display text-sm font-bold uppercase tracking-wide">
                        {group.title}
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-6">
                          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({ useCases }: { useCases: NonNullable<ModelPageData["useCases"]> }) {
  return (
    <section className="border-y border-border bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          {useCases.eyebrow && (
            <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
              {useCases.eyebrow}
            </div>
          )}
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {useCases.title}
          </h2>
          {useCases.subtitle && (
            <p className="text-base text-muted-foreground md:text-lg">{useCases.subtitle}</p>
          )}
        </div>
        {useCases.items && useCases.items.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/40">
                <h3 className="mb-3 font-display text-lg font-bold leading-tight">{item.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        )}
        {useCases.paragraphs && useCases.paragraphs.length > 0 && (
          <div className={`mx-auto max-w-4xl space-y-5 text-base leading-7 text-muted-foreground md:text-lg md:leading-8 ${
            useCases.items && useCases.items.length > 0 ? "mt-8" : ""
          }`}>
            {useCases.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function GallerySection({ gallery }: { gallery: NonNullable<ModelPageData["gallery"]> }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = gallery.images;
  const isLightboxOpen = lightboxIndex !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const previouslyFocused = lastTriggerRef.current;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [isLightboxOpen, images.length]);

  return (
    <section id="galeria" className="border-y border-border bg-[#10130f] py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-3xl">
          {gallery.eyebrow && (
            <div className="mb-5 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {gallery.eyebrow}
            </div>
          )}
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl lg:text-5xl">{gallery.title}</h2>
          {gallery.subtitle && <p className="text-base text-white/65 md:text-lg">{gallery.subtitle}</p>}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img, idx) => (
            <button
              key={img.src + idx}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setLightboxIndex(idx);
              }}
              aria-label={`Otwórz zdjęcie: ${img.alt}`}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white transition-all hover:border-primary/40 ${
                img.emphasis ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div className={`bg-white ${img.emphasis ? "aspect-[4/3] sm:aspect-square" : "aspect-[4/3]"}`}>
                <img
                  src={img.src}
                  srcSet={gallerySrcSet(img.src, img.width)}
                  sizes={
                    img.emphasis
                      ? "(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) 66vw, 50vw"
                      : "(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  }
                  alt={img.alt}
                  title={img.title ?? `Galeria ${gallery.title} — zdjęcie ${idx + 1}`}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Powiększona galeria: ${gallery.title}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Zamknij galerię"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
            }}
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
            }}
            aria-label="Następne zdjęcie"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <img
            src={images[lightboxIndex].src}
            srcSet={gallerySrcSet(images[lightboxIndex].src, images[lightboxIndex].width)}
            sizes="92vw"
            alt={images[lightboxIndex].alt}
            title={images[lightboxIndex].title ?? `Powiększenie ${gallery.title} — zdjęcie ${lightboxIndex + 1}`}
            width={images[lightboxIndex].width}
            height={images[lightboxIndex].height}
            loading="eager"
            decoding="async"
            className="max-h-[88vh] max-w-[92vw] bg-white object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 max-w-[80vw] -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-center text-xs text-white/80">
            {lightboxIndex + 1} / {images.length} — {images[lightboxIndex].alt}
          </p>
        </div>
      )}
    </section>
  );
}

function SpecTabsSection({ specs, model, hideDisclaimers }: { specs: SpecSection[]; model: string; hideDisclaimers?: boolean }) {
  if (specs.length === 0) return null;
  return (
    <section id="specyfikacja" className="scroll-mt-24 border-b border-border bg-muted/20 py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
            Dane techniczne
          </div>
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Specyfikacja {model}
          </h2>
          {!hideDisclaimers && (
            <p className="text-base text-muted-foreground md:text-lg">
              Parametry zgodne z&nbsp;fabryczną kartą katalogową. Stekro MiniTrak doprecyzuje konfigurację (warianty wyposażenia, opcje, ogumienie) przed zamówieniem.
            </p>
          )}
        </div>

        <Tabs defaultValue={specs[0].title} className="w-full">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl bg-muted/60 p-1.5">
            {specs.map((section) => (
              <TabsTrigger
                key={section.title}
                value={section.title}
                className="rounded-xl px-4 py-2 text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
              >
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {specs.map((section) => (
            <TabsContent
              key={section.title}
              value={section.title}
              forceMount
              className="mt-6 data-[state=inactive]:hidden"
            >
              <div className="overflow-hidden rounded-3xl border border-border bg-background">
                <div className="divide-y divide-border">
                  {section.rows.map(([label, value]) => (
                    <div key={label} className="grid gap-2 px-6 py-4 sm:grid-cols-[0.9fr_1.1fr]">
                      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
                      <p className="text-sm font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {!hideDisclaimers && (
          <p className="mt-6 text-xs text-muted-foreground">
            Podane dane techniczne mają charakter informacyjny. Producent zastrzega sobie prawo do&nbsp;zmian specyfikacji bez&nbsp;uprzedniego powiadomienia.
          </p>
        )}
      </div>
    </section>
  );
}

function SalesArguments({ data }: { data: ModelPageData }) {
  return (
    <section className="border-y border-border bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-background p-8 shadow-xl md:p-10">
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            Najważniejsze argumenty
          </div>
          <h3 className="mb-6 font-display text-2xl font-bold md:text-3xl">
            {data.salesArgumentsHeading ?? `Dlaczego warto wybrać ${data.model.short}?`}
          </h3>
          {data.salesArgumentsText ? (
            <div className="space-y-4 text-base leading-7 text-muted-foreground">
              {data.salesArgumentsText.map((arg, i) => (
                <p key={i}>{arg}</p>
              ))}
            </div>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {data.salesArguments?.map((arg) => (
                <li key={arg} className="flex gap-3 rounded-xl bg-muted/40 p-3 text-sm leading-6">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{arg}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactCTA({ data }: { data: ModelPageData }) {
  const intro =
    data.contact?.intro ??
    `Doradca Stekro MiniTrak odpowie na\u00A0pytania o\u00A0dostępność, terminy dostaw, leasing oraz\u00A0wybór konfiguracji ${data.model.short}.`;
  return (
    <section id="kontakt-model" className="bg-[#0e110d] py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04]">
          <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <img
                src={logoWhite}
                alt="Logo Stekro MiniTrak — kontakt w sprawie zakupu ciągnika"
                title="Stekro MiniTrak — kontakt"
                width={480}
                height={240}
                loading="lazy"
                decoding="async"
                className="mb-8 h-10 w-auto object-contain"
              />
              <h2 className="mb-5 font-display text-3xl font-bold md:text-4xl lg:text-5xl">
                Skontaktuj się w&nbsp;sprawie {data.model.full}.
              </h2>
              <p className="mb-8 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
                {intro}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={`tel:${CONTACT_INFO.partsPhone.replace(/\s+/g, "")}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-primary/50"
                >
                  <PhoneCall className="mb-4 h-5 w-5 text-primary" />
                  <p className="text-sm text-white/50">Telefon</p>
                  <p className="font-bold">{CONTACT_INFO.partsPhone}</p>
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.emailMain}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-primary/50"
                >
                  <Mail className="mb-4 h-5 w-5 text-primary" />
                  <p className="text-sm text-white/50">E-mail</p>
                  <p className="font-bold break-all">{CONTACT_INFO.emailMain}</p>
                </a>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-2">
                  <MapPin className="mb-4 h-5 w-5 text-primary" />
                  <p className="text-sm text-white/50">Lokalizacja</p>
                  <p className="font-bold">{CONTACT_INFO.address}</p>
                  <p className="mt-1 text-sm text-white/60">{CONTACT_INFO.temporaryPoint}</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <img
                src={data.hero.image}
                srcSet={gallerySrcSet(data.hero.image, data.hero.imageWidth)}
                sizes="(max-width: 1024px) calc(100vw - 2rem), 45vw"
                alt={data.hero.alt}
                title={`${data.model.full} — zdjęcie kontaktowe`}
                width={data.hero.imageWidth}
                height={data.hero.imageHeight}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

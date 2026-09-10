import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { gallerySrcSet } from "@/lib/img-utils";
import { SiteHeader } from "@/components/site-header";

const orderSchema = z.object({
  firstName: z.string().trim().min(1, "Imię jest wymagane").max(80),
  lastName: z.string().trim().min(1, "Nazwisko jest wymagane").max(80),
  email: z.string().trim().min(1, "E-mail jest wymagany").email("Niepoprawny format e-mail").max(160),
  phone: z.string().trim().min(7, "Podaj poprawny numer").max(40, "Numer jest za długi"),
  companyName: z.string().trim().max(160).optional(),
  nip: z.string().trim().max(40).optional(),
  country: z.string().trim().min(1, "Kraj jest wymagany").max(100),
  city: z.string().trim().min(1, "Miasto jest wymagane").max(120),
  postalCode: z.string().trim().min(1, "Kod pocztowy jest wymagany").max(20),
  street: z.string().trim().min(1, "Ulica i numer są wymagane").max(200),
  rodo: z.boolean().refine(val => val === true, { message: "Zgoda jest wymagana" }),
  website: z.string().max(500).optional(), // honeypot
  selectedModel: z.string().max(80).optional(),
  selectedAddOn: z.string().max(80).optional(),
  configuredPrice: z.number().positive().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface ProductOrderPageProps {
  productSlug: "lisicki-kb" | "stark-kdl-profi" | "stark-rs-profi";
  productName: string;
  productImage: string;
  productImageWidth?: number;
  productImageHeight?: number;
  productImageAlt?: string;
  catalogHref: string;
  formId: string;
  successId: string;
  modelOptions?: string[];
  addOnOptions?: string[];
  modelPrices?: Record<string, number>;
  addOnPrices?: Record<string, number>;
}

export function ProductOrderPage({
  productSlug,
  productName,
  productImage,
  productImageWidth,
  productImageHeight,
  productImageAlt,
  catalogHref,
  formId,
  successId,
  modelOptions,
  addOnOptions,
  modelPrices,
  addOnPrices,
}: ProductOrderPageProps) {
  const idempotencyKey = useRef<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      nip: "",
      country: "Polska",
      city: "",
      postalCode: "",
      street: "",
      rodo: false,
      website: "",
      selectedModel: "",
      selectedAddOn: "",
      configuredPrice: undefined,
    },
  });

  useEffect(() => {
    if (modelOptions) {
      const model = new URLSearchParams(window.location.search).get("model") ?? "";
      if (modelOptions.includes(model)) form.setValue("selectedModel", model);
      const addOn = new URLSearchParams(window.location.search).get("wom") ?? "";
      if (addOnOptions?.includes(addOn)) form.setValue("selectedAddOn", addOn);
      if (!modelPrices) {
        const price = Number(new URLSearchParams(window.location.search).get("price"));
        if (Number.isFinite(price) && price > 0) form.setValue("configuredPrice", price);
      }
    }
  }, [form, modelOptions, addOnOptions, modelPrices]);

  const selectedModel = form.watch("selectedModel");
  const selectedAddOn = form.watch("selectedAddOn");
  const configuredPrice = form.watch("configuredPrice");
  const formattedConfiguredPrice = configuredPrice
    ? new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(configuredPrice)
    : null;

  useEffect(() => {
    if (!modelPrices) return;
    const modelPrice = selectedModel ? modelPrices[selectedModel] : undefined;
    const addOnIsRequired = Boolean(addOnOptions?.length);
    const addOnPrice = selectedAddOn ? addOnPrices?.[selectedAddOn] : undefined;
    const calculatedPrice =
      modelPrice !== undefined && (!addOnIsRequired || addOnPrice !== undefined)
        ? modelPrice + (addOnPrice ?? 0)
        : undefined;
    form.setValue("configuredPrice", calculatedPrice, { shouldValidate: true });
  }, [
    form,
    modelPrices,
    addOnOptions,
    addOnPrices,
    selectedModel,
    selectedAddOn,
  ]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const onSubmit = async (data: OrderFormData) => {
    if (!idempotencyKey.current) idempotencyKey.current = crypto.randomUUID();
    setStatus("submitting");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          idempotencyKey: idempotencyKey.current,
          productSlug,
          productName,
        }),
      });

      const body = await res.json();
      if (!res.ok || !body.ok) {
        throw new Error(body.error || "Wystąpił błąd");
      }

      setStatus("success");
      idempotencyKey.current = null;
      
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submit_success",
          form_id: formId,
          product_slug: productSlug,
        });
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="mx-auto max-w-[1000px]">
            <Breadcrumbs 
              current="Zamówienie" 
              tone="light" 
              parents={[{ label: productName, href: catalogHref }]}
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 items-start">
              <div>
                <h1 className="mb-8 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Zamówienie produktu
                </h1>

                {status === "success" ? (
                  <Alert ref={successRef} tabIndex={-1} role="status" className="border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400 p-6 rounded-2xl focus:outline-none" id={successId} data-testid="success-alert">
                    <CheckCircle2 className="h-6 w-6 !text-green-600 dark:!text-green-400" />
                    <AlertTitle className="text-xl font-bold ml-2">Zamówienie zostało wysłane.</AlertTitle>
                    <AlertDescription className="mt-4 text-base ml-2 text-foreground">
                      Dziękujemy za przesłanie danych dotyczących <strong>{productName}</strong>.
                      Nasz doradca skontaktuje się w&nbsp;sprawie ceny, dostępności i&nbsp;szczegółów dostawy.
                    </AlertDescription>
                    <Button variant="outline" className="mt-6 ml-2" asChild data-testid="back-button">
                      <Link href={catalogHref}>Wróć do produktu</Link>
                    </Button>
                  </Alert>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id={formId} data-testid="order-form">
                    {status === "error" && (
                      <Alert ref={errorRef} tabIndex={-1} role="alert" variant="destructive" className="focus:outline-none" data-testid="error-alert">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Błąd wysyłania</AlertTitle>
                        <AlertDescription>
                          Wystąpił problem techniczny podczas wysyłania zamówienia. Spróbuj ponownie lub skontaktuj się z nami telefonicznie.
                        </AlertDescription>
                      </Alert>
                    )}
                    {modelOptions && (
                      <div className="space-y-2">
                        <Label htmlFor="selectedModel">Wybrany model *</Label>
                        <select
                          id="selectedModel"
                          data-testid="select-order-model"
                          required
                          {...form.register("selectedModel")}
                          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Wybierz model</option>
                          {modelOptions.map((model) => <option key={model} value={model}>{model}</option>)}
                        </select>
                      </div>
                    )}
                    {addOnOptions && (
                      <div className="space-y-2">
                        <Label htmlFor="selectedAddOn">Wybrany WOM *</Label>
                        <select
                          id="selectedAddOn"
                          data-testid="select-order-addon"
                          required
                          {...form.register("selectedAddOn")}
                          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Wybierz WOM</option>
                          {addOnOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </div>
                    )}
                    {modelPrices && (
                      <div
                        className="rounded-2xl border border-primary/30 bg-primary/5 p-4"
                        data-testid="order-configured-price"
                        aria-live="polite"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Aktualna cena</p>
                        {formattedConfiguredPrice ? (
                          <>
                            <p className="mt-1 font-display text-3xl font-bold text-primary">
                              {formattedConfiguredPrice}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Cena obejmuje wybrany model i&nbsp;WOM.
                            </p>
                          </>
                        ) : (
                          <p className="mt-1 text-sm font-medium text-foreground">
                            Wybierz model i&nbsp;WOM, aby zobaczyć cenę.
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold">1. Dane zamawiającego</h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Imię *</Label>
                            <Input id="firstName" {...form.register("firstName")} aria-invalid={!!form.formState.errors.firstName} aria-describedby={form.formState.errors.firstName ? "firstName-error" : undefined} data-testid="input-firstName" />
                            {form.formState.errors.firstName && <p id="firstName-error" className="text-sm text-destructive" role="alert">{form.formState.errors.firstName.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Nazwisko *</Label>
                            <Input id="lastName" {...form.register("lastName")} aria-invalid={!!form.formState.errors.lastName} aria-describedby={form.formState.errors.lastName ? "lastName-error" : undefined} data-testid="input-lastName" />
                            {form.formState.errors.lastName && <p id="lastName-error" className="text-sm text-destructive" role="alert">{form.formState.errors.lastName.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail *</Label>
                            <Input id="email" type="email" {...form.register("email")} aria-invalid={!!form.formState.errors.email} aria-describedby={form.formState.errors.email ? "email-error" : undefined} data-testid="input-email" />
                            {form.formState.errors.email && <p id="email-error" className="text-sm text-destructive" role="alert">{form.formState.errors.email.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefon *</Label>
                            <Input id="phone" type="tel" {...form.register("phone")} aria-invalid={!!form.formState.errors.phone} aria-describedby={form.formState.errors.phone ? "phone-error" : undefined} data-testid="input-phone" />
                            {form.formState.errors.phone && <p id="phone-error" className="text-sm text-destructive" role="alert">{form.formState.errors.phone.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="companyName">Firma (opcjonalnie)</Label>
                            <Input id="companyName" {...form.register("companyName")} data-testid="input-companyName" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nip">NIP (opcjonalnie)</Label>
                            <Input id="nip" {...form.register("nip")} data-testid="input-nip" />
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-border" />

                      <div>
                        <h2 className="text-lg font-bold">2. Adres dostawy / rozliczeniowy</h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="country">Kraj *</Label>
                            <Input id="country" {...form.register("country")} aria-invalid={!!form.formState.errors.country} aria-describedby={form.formState.errors.country ? "country-error" : undefined} data-testid="input-country" />
                            {form.formState.errors.country && <p id="country-error" className="text-sm text-destructive" role="alert">{form.formState.errors.country.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">Miasto *</Label>
                            <Input id="city" {...form.register("city")} aria-invalid={!!form.formState.errors.city} aria-describedby={form.formState.errors.city ? "city-error" : undefined} data-testid="input-city" />
                            {form.formState.errors.city && <p id="city-error" className="text-sm text-destructive" role="alert">{form.formState.errors.city.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Kod pocztowy *</Label>
                            <Input id="postalCode" {...form.register("postalCode")} aria-invalid={!!form.formState.errors.postalCode} aria-describedby={form.formState.errors.postalCode ? "postalCode-error" : undefined} data-testid="input-postalCode" />
                            {form.formState.errors.postalCode && <p id="postalCode-error" className="text-sm text-destructive" role="alert">{form.formState.errors.postalCode.message}</p>}
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="street">Ulica i numer *</Label>
                            <Input id="street" {...form.register("street")} aria-invalid={!!form.formState.errors.street} aria-describedby={form.formState.errors.street ? "street-error" : undefined} data-testid="input-street" />
                            {form.formState.errors.street && <p id="street-error" className="text-sm text-destructive" role="alert">{form.formState.errors.street.message}</p>}
                          </div>
                        </div>
                      </div>

                      {/* Honeypot field */}
                      <input type="text" {...form.register("website")} className="hidden" tabIndex={-1} aria-hidden="true" data-testid="input-website" />

                      <div className="h-px bg-border" />

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="rodo"
                            checked={form.watch("rodo")}
                            onCheckedChange={(checked) => form.setValue("rodo", checked === true, { shouldValidate: true })}
                            className="mt-1"
                            data-testid="checkbox-rodo"
                            aria-describedby={form.formState.errors.rodo ? "rodo-error" : undefined}
                            aria-invalid={!!form.formState.errors.rodo}
                          />
                          <Label htmlFor="rodo" className="text-sm leading-snug font-normal text-muted-foreground">
                            Wyrażam zgodę na przetwarzanie moich danych osobowych w&nbsp;celu przygotowania oferty i&nbsp;realizacji zamówienia, zgodnie z&nbsp;<Link href="/polityka-prywatnosci" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" data-testid="link-privacy">Polityką Prywatności</Link>. *
                          </Label>
                        </div>
                        {form.formState.errors.rodo && <p id="rodo-error" className="text-sm text-destructive" role="alert">{form.formState.errors.rodo.message}</p>}
                      </div>

                      <Button type="submit" size="lg" className="w-full h-14 rounded-full text-base" disabled={status === "submitting"} data-testid="submit-button">
                        {status === "submitting" ? "Wysyłanie..." : "Finalizuj zamówienie"}
                      </Button>
                      <p className="text-center text-xs text-muted-foreground mt-4">
                        Po przesłaniu formularza doradca skontaktuje się w&nbsp;sprawie potwierdzenia ceny, dostępności i&nbsp;dostawy.
                      </p>
                    </div>
                  </form>
                )}
              </div>

              <aside className="rounded-3xl border border-border bg-muted/30 p-6 lg:p-8">
                <div className="mb-6 rounded-2xl bg-white p-4">
                  <img
                    src={productImage}
                    srcSet={gallerySrcSet(productImage, productImageWidth)}
                    sizes="(max-width: 1024px) calc(100vw - 5rem), 336px"
                    alt={productImageAlt || productName}
                    title={productName}
                    width={productImageWidth}
                    height={productImageHeight}
                    loading="lazy"
                    decoding="async"
                    data-testid="image-product"
                    className="aspect-[4/3] w-full object-contain"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold">{productName}</h3>
                {modelPrices && (
                  <div
                    className="mt-5 rounded-2xl border border-primary/30 bg-background p-4"
                    data-testid="order-summary-price"
                    aria-live="polite"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Aktualna cena</p>
                    {formattedConfiguredPrice ? (
                      <>
                        <p className="mt-1 font-display text-3xl font-bold text-primary">
                          {formattedConfiguredPrice}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {selectedModel} + {selectedAddOn}
                        </p>
                      </>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-foreground">
                        Wybierz model i&nbsp;WOM w&nbsp;formularzu.
                      </p>
                    )}
                  </div>
                )}
                <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <p>
                      Po wysłaniu formularza doradca skontaktuje się w sprawie ceny, dostępności i dostawy.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="mt-8 w-full rounded-full" asChild>
                  <Link href={catalogHref}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Wróć do produktu
                  </Link>
                </Button>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

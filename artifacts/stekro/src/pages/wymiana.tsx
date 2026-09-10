import { Breadcrumbs } from "@/components/breadcrumbs";
import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Clock,
  Handshake,
  ImagePlus,
  Loader2,
  Mail,
  MapPin,
  PhoneCall,
  Send,
  Tractor,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoWhite from "@assets/stekro_minitrak_logo_white_nobg_small.webp";
import heroImage from "@assets/Solis-Line-Up_DSCF9480-1080x675_1783683645582.webp";

const PHONE_MOBILE = "+48 786 656 715";
const EMAIL = "minitrak@stekro.pl";

const NAV_LINKS = [
  { label: "Jak to działa", href: "#jak-to-dziala" },
  { label: "Wycena online", href: "#formularz" },
  { label: "Ciągniki", href: "#ciagniki" },
  { label: "FAQ", href: "#faq" },
];

const STEPS = [
  {
    icon: Camera,
    title: "Wyślij formularz ze zdjęciami",
    description:
      "Wypełnij krótki formularz, dołącz kilka zdjęć i\u00A0podstawowe dane maszyny — markę, model i\u00A0rok produkcji.",
  },
  {
    icon: Clock,
    title: "Otrzymasz bezpłatną wycenę",
    description:
      "Przygotujemy bezpłatną wycenę i\u00A0skontaktujemy się z\u00A0Tobą telefonicznie lub\u00A0mailowo.",
  },
  {
    icon: Handshake,
    title: "Potwierdzamy wartość przy oględzinach",
    description:
      "Potwierdzamy wartość maszyny przy oględzinach na\u00A0miejscu — u\u00A0Ciebie, bez zbędnych formalności.",
  },
  {
    icon: Tractor,
    title: "Odbierasz nowy ciągnik",
    description:
      "Odbierasz nowy ciągnik kompaktowy, a\u00A0starą maszynę zostawiasz nam w\u00A0rozliczeniu jako wkład własny.",
  },
];

const TRACTORS = [
  {
    name: "Solis S26",
    image: "/model-solis-s26.jpeg",
    width: 1000,
    height: 666,
    description:
      "Ekonomiczny, bez kabiny, idealny do sadów, mniejszych gospodarstw i\u00A0prac komunalnych.",
    specs: [
      ["Moc", "26 KM"],
      ["Silnik", "3-cyl. 1,3 l"],
      ["Napęd", "4WD, Stage V"],
      ["Udźwig TUZ", "600 kg"],
      ["Kabina", "ROPS"],
    ],
  },
  {
    name: "Solis S50",
    image: "/model-solis-s50-cab-showroom-front.webp",
    width: 1536,
    height: 1024,
    description:
      "Z komfortową kabiną, więcej mocy i\u00A0udźwigu do cięższych prac.",
    specs: [
      ["Moc", "50 KM"],
      ["Silnik", "3-cyl. 3,1 l CRDi"],
      ["Napęd", "4WD, Stage V"],
      ["Udźwig TUZ", "2500 kg"],
      ["Kabina", "z kabiną"],
    ],
  },
  {
    name: "Aupax 2025",
    image: "/model-aupax-2025.webp",
    width: 1536,
    height: 1024,
    description:
      "Mały, zwrotny, do\u00A0pracy tam, gdzie duża maszyna się nie zmieści.",
    specs: [
      ["Moc", "25 KM"],
      ["Silnik", "1,5 l"],
      ["Skrzynia", "4WD, 8+8"],
      ["Udźwig TUZ", "720 kg"],
      ["WOM", "540/1000"],
    ],
  },
  {
    name: "Aupax 2040",
    image: "/model-aupax-2040-1.webp",
    width: 1600,
    height: 901,
    description:
      "Mocniejszy, większy udźwig do wymagających zadań w\u00A0ciasnych miejscach.",
    specs: [
      ["Moc", "40 KM"],
      ["Silnik", "Doosan 1,8 l"],
      ["Skrzynia", "4WD, 8+8"],
      ["Udźwig TUZ", "850 kg"],
      ["WOM", "540/1000"],
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Czy wycena jest płatna?",
    a: "Nie. Wycena jest bezpłatna i niezobowiązująca. Wystarczy wysłać formularz z kilkoma zdjęciami maszyny.",
  },
  {
    q: "Jakie maszyny przyjmujecie w rozliczeniu?",
    a: "Przyjmujemy używane ciągniki i maszyny różnych marek. Stan i wartość ustalamy indywidualnie przy wycenie.",
  },
  {
    q: "Czy muszę sam sprzedawać starą maszynę?",
    a: "Nie. Rozliczamy ją przy zakupie nowego ciągnika — jej wartość zaliczamy jako wkład własny, więc oszczędzasz czas i formalności.",
  },
  {
    q: "Co się dzieje po wysłaniu zgłoszenia?",
    a: "Skontaktujemy się telefonicznie lub mailowo, przedstawimy wycenę i umówimy oględziny maszyny na miejscu.",
  },
  {
    q: "Czy muszę dopłacać całość od razu?",
    a: "Wartość starej maszyny obniża kwotę zakupu nowego ciągnika. Możliwe jest również finansowanie — szczegóły ustalamy indywidualnie.",
  },
];

const MAX_PHOTOS = 10;
const MAX_DIMENSION = 1600;

async function compressImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.82),
    );
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

function LpHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0e110d]/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0">
          <img
            src={logoWhite}
            alt="Logo Stekro Mini Trak"
            title="Stekro Mini Trak"
            width={480}
            height={240}
            className="h-9 w-auto object-contain md:h-10"
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${PHONE_MOBILE.replace(/\s+/g, "")}`}
            className="hidden items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white md:flex"
          >
            <PhoneCall className="h-4 w-4 text-primary" />
            {PHONE_MOBILE}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="hidden items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white xl:flex"
          >
            <Mail className="h-4 w-4 text-primary" />
            {EMAIL}
          </a>
          <Button className="h-9 whitespace-nowrap rounded-full px-4 text-[13px] font-semibold sm:px-5" asChild>
            <a href="#formularz">Zapytaj o wycenę</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function TradeInForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    machineBrand: "",
    machineModel: "",
    machineYear: "",
    message: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [rodo, setRodo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const idempotencyKeyRef = useRef<string | null>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onPickPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/"));
    setPhotos((prev) => [...prev, ...picked].slice(0, MAX_PHOTOS));
    e.target.value = "";
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rodo) {
      setStatus("error");
      setErrorMsg("Aby wysłać zgłoszenie, potwierdź zgodę na\u00A0przetwarzanie danych (RODO).");
      return;
    }
    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");
    try {
      const idempotencyKey = idempotencyKeyRef.current ?? crypto.randomUUID();
      idempotencyKeyRef.current = idempotencyKey;
      const fd = new FormData();
      fd.set("idempotencyKey", idempotencyKey);
      fd.set("name", form.name);
      fd.set("phone", form.phone);
      fd.set("email", form.email);
      fd.set("machineBrand", form.machineBrand);
      fd.set("machineModel", form.machineModel);
      fd.set("machineYear", form.machineYear);
      fd.set("message", form.message);
      fd.set("rodo", "true");
      fd.set("source", "minitrak.pl/wymiana — formularz wyceny");
      fd.set("website", websiteRef.current?.value ?? "");
      for (const photo of photos) {
        const compressed = await compressImage(photo);
        fd.append("photos", compressed, photo.name.replace(/\.[^.]+$/, "") + ".jpg");
      }
      const r = await fetch("/api/trade-in", { method: "POST", body: fd });
      if (!r.ok) throw new Error("server");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", machineBrand: "", machineModel: "", machineYear: "", message: "" });
      setPhotos([]);
      setRodo(false);
      idempotencyKeyRef.current = null;
    } catch {
      setStatus("error");
      setErrorMsg(
        `Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub\u00A0zadzwoń: ${PHONE_MOBILE}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div
        id="formularz-wymiana"
        className="rounded-3xl border border-primary/30 bg-primary/5 p-8 text-center md:p-12"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <h3 className="mb-3 font-display text-2xl font-bold">Zgłoszenie wysłane!</h3>
        <p className="mx-auto max-w-md text-muted-foreground">
          Dziękujemy. Przygotujemy bezpłatną wycenę i&nbsp;skontaktujemy się z&nbsp;Tobą telefonicznie lub&nbsp;mailowo.
        </p>
        <Button variant="outline" className="mt-6 rounded-full" onClick={() => setStatus("idle")}>
          Wyślij kolejne zgłoszenie
        </Button>
      </div>
    );
  }

  return (
    <form id="wymiana-form" name="wymiana" onSubmit={onSubmit} className="rounded-3xl border border-border bg-background p-6 shadow-xl md:p-10">
      <input
        ref={websiteRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ti-name">Imię i nazwisko *</Label>
          <Input id="ti-name" required minLength={2} maxLength={120} value={form.name} onChange={set("name")} placeholder="Jan Kowalski" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ti-phone">Telefon *</Label>
          <Input id="ti-phone" type="tel" required minLength={7} maxLength={40} value={form.phone} onChange={set("phone")} placeholder="600 000 000" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="ti-email">E-mail</Label>
          <Input id="ti-email" type="email" maxLength={160} value={form.email} onChange={set("email")} placeholder="jan@przyklad.pl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ti-brand">Marka maszyny</Label>
          <Input id="ti-brand" maxLength={120} value={form.machineBrand} onChange={set("machineBrand")} placeholder="Podaj markę maszyny" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ti-model">Model</Label>
          <Input id="ti-model" maxLength={120} value={form.machineModel} onChange={set("machineModel")} placeholder="Podaj model" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="ti-year">Rok produkcji</Label>
          <Input id="ti-year" inputMode="numeric" maxLength={20} value={form.machineYear} onChange={set("machineYear")} placeholder="np. 1998" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="ti-message">Wiadomość</Label>
          <textarea
            id="ti-message"
            maxLength={2000}
            value={form.message}
            onChange={set("message")}
            placeholder="Opisz stan maszyny, wyposażenie, przebieg motogodzin..."
            className="flex min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="sm:col-span-2">
          <Label>Zdjęcia maszyny</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onPickPhotos}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <ImagePlus className="h-6 w-6 text-primary" />
            <span className="font-semibold">Dodaj zdjęcia (maks. {MAX_PHOTOS})</span>
            <span className="text-xs">Kilka zdjęć z&nbsp;różnych stron pomoże nam przygotować dokładną wycenę.</span>
          </button>
          {photos.length > 0 && (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {photos.map((photo, idx) => (
                <li key={photo.name + idx} className="flex items-center justify-between gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2 text-xs">
                  <span className="truncate font-medium">{photo.name}</span>
                  <button
                    type="button"
                    aria-label={`Usuń zdjęcie ${photo.name}`}
                    onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                    className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-xs leading-5 text-muted-foreground">
        <input
          type="checkbox"
          checked={rodo}
          onChange={(e) => setRodo(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          Wyrażam zgodę na&nbsp;przetwarzanie moich danych osobowych w&nbsp;celu przygotowania wyceny i&nbsp;kontaktu w&nbsp;sprawie
          zgłoszenia. Administratorem danych jest Stekro Mini Trak, ul. Królowej Jadwigi 80A, 34-400 Nowy Targ.
          Szczegóły w{" "}
          <Link href="/polityka-prywatnosci" className="underline hover:text-foreground">
            polityce prywatności
          </Link>
          . *
        </span>
      </label>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMsg}
        </p>
      )}

      <Button type="submit" size="lg" disabled={submitting} className="mt-6 h-14 w-full rounded-full text-base font-semibold sm:w-auto sm:px-10">
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Wysyłanie...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Wyślij do wyceny
          </>
        )}
      </Button>
    </form>
  );
}

export default function Wymiana() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LpHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-black px-4 pb-20 pt-16 text-white md:pb-28 md:pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Ciągniki kompaktowe Solis na tle pola i gór"
            title="Ciągniki kompaktowe Solis"
            width={1080}
            height={675}
            className="absolute inset-0 h-full w-full object-cover object-[center_78%]"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-md">
              <Tractor className="h-4 w-4" />
              Akcja: stara maszyna w&nbsp;rozliczeniu
            </div>
            <Breadcrumbs tone="dark" current="Wymiana — maszyna w rozliczeniu" />
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Zostaw starą maszynę w&nbsp;rozliczeniu i&nbsp;odbierz nowy ciągnik kompaktowy
            </h1>
            <p className="mb-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg md:leading-8">
              <strong className="text-white">Zostaw maszynę w&nbsp;rozliczeniu</strong> — nie musisz sam sprzedawać starej
              maszyny. Rozliczamy ją przy zakupie nowego ciągnika, a&nbsp;jej wartość zaliczamy jako Twój wkład własny.
            </p>
            <p className="mb-8 text-lg font-bold text-primary md:text-xl">Bezpłatna i niezobowiązująca wycena.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-14 rounded-full px-8 text-base font-semibold" asChild>
                <a href="#formularz">
                  Wyślij maszynę do wyceny
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/20 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href={`tel:${PHONE_MOBILE.replace(/\s+/g, "")}`}>
                  <PhoneCall className="mr-2 h-5 w-5" />
                  Zadzwoń: {PHONE_MOBILE}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* JAK TO DZIAŁA */}
      <section id="jak-to-dziala" className="scroll-mt-20 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
              Jak to działa
            </div>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Cztery proste kroki do nowego ciągnika
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Cały proces jest prosty i&nbsp;przejrzysty — od zdjęć po odbiór nowej maszyny.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, idx) => (
              <div key={step.title} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-display text-3xl font-bold text-muted-foreground/30">0{idx + 1}</span>
                </div>
                <h3 className="mb-2 font-display text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARZ */}
      <section id="formularz" className="scroll-mt-20 border-y border-border bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
                Wycena online
              </div>
              <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Wyślij maszynę do bezpłatnej wyceny
              </h2>
              <p className="text-base text-muted-foreground md:text-lg">
                Wypełnij formularz i&nbsp;dołącz zdjęcia — odezwiemy się z&nbsp;wyceną. Bez żadnych zobowiązań.
              </p>
            </div>
            <TradeInForm />
          </div>
        </div>
      </section>

      {/* CIĄGNIKI */}
      <section id="ciagniki" className="scroll-mt-20 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
              Nasze ciągniki kompaktowe
            </div>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Wybierz nowy ciągnik dla&nbsp;siebie
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Kompaktowe ciągniki Solis i&nbsp;Aupax — do sadu, gospodarstwa i&nbsp;prac komunalnych.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRACTORS.map((tractor) => (
              <div key={tractor.name} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
                <div className="aspect-[4/3] overflow-hidden bg-muted/40">
                  <img
                    src={tractor.image}
                    alt={`Ciągnik kompaktowy ${tractor.name}`}
                    title={tractor.name}
                    width={tractor.width}
                    height={tractor.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 font-display text-xl font-bold">{tractor.name}</h3>
                  <p className="mb-4 text-sm leading-6 text-muted-foreground">{tractor.description}</p>
                  <dl className="mt-auto divide-y divide-border rounded-2xl border border-border">
                    {tractor.specs.map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-3 px-3 py-2">
                        <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
                        <dd className="text-right text-xs font-bold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" className="h-auto min-h-14 whitespace-normal rounded-full px-6 py-3 text-center text-base font-semibold sm:px-8" asChild>
              <a href="#formularz">
                Zostaw maszynę w&nbsp;rozliczeniu — wyślij do&nbsp;wyceny
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CYTAT */}
      <section className="border-y border-border bg-[#0e110d] py-20 text-white">
        <div className="container mx-auto px-4">
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-display text-2xl font-bold leading-snug md:text-3xl lg:text-4xl">
              „Twoja obecna maszyna to realny wkład własny. Wyceniamy ją uczciwie na&nbsp;podstawie zdjęć i&nbsp;stanu, a&nbsp;potem
              potwierdzamy przy oględzinach. Dzięki temu przesiadka na&nbsp;nowy ciągnik po&nbsp;prostu się opłaca."
            </p>
            <footer className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">
              Stekro Mini Trak
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
                FAQ
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Najczęstsze pytania
              </h2>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={item.q} className="overflow-hidden rounded-2xl border border-border bg-background">
                  <button
                    type="button"
                    onClick={() => setOpenFaq((cur) => (cur === idx ? null : idx))}
                    aria-expanded={openFaq === idx}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
                  >
                    {item.q}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === idx && (
                    <p className="px-5 pb-5 text-sm leading-6 text-muted-foreground">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KOŃCOWE CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-[2rem] bg-[#0e110d] px-8 py-10 text-white md:flex-row md:px-12">
            <h2 className="text-center font-display text-2xl font-bold md:text-left md:text-3xl">
              Gotowy na nowy ciągnik kompaktowy?
            </h2>
            <Button size="lg" className="h-14 shrink-0 rounded-full px-8 text-base font-semibold" asChild>
              <a href="#formularz">
                Wyślij maszynę do wyceny
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* STOPKA */}
      <SiteFooter />
    </div>
  );
}

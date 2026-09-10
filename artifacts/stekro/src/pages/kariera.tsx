import { Breadcrumbs } from "@/components/breadcrumbs";
import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Phone,
  Mail,
  Send,
  Handshake,
  Wrench,
  Truck,
  CheckCircle2,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteFooter } from "@/components/site-footer";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_INFO } from "@/data";

const karieraHero = "/kariera-siedziba-nowy-targ.webp";

const POSITIONS = [
  {
    id: "handlowiec",
    icon: Handshake,
    title: "Handlowiec",
    description:
      "Znasz rynek agrotechniczny od podszewki? Szukamy Handlowca, który potrafi rozmawiać z\u00A0rolnikami i\u00A0firmami komunalnymi ich własnym językiem. Oczekujemy znajomości budowy i\u00A0specyfiki maszyn oraz\u00A0umiejętności budowania długotrwałych relacji.",
  },
  {
    id: "mechanik",
    icon: Wrench,
    title: "Mechanik",
    description:
      "Szukamy fachowych rąk do naszego warsztatu. Jeśli diagnozowanie usterek w\u00A0nowoczesnych ciągnikach i\u00A0maszynach komunalnych nie ma dla\u00A0Ciebie tajemnic, a\u00A0klucz płaski to Twoje podstawowe narzędzie pracy — czekamy właśnie na\u00A0Ciebie.",
  },
  {
    id: "pracownik-serwisu",
    icon: Truck,
    title: "Pracownik serwisu",
    description:
      "Nasz serwis działa stacjonarnie i\u00A0mobilnie, dbając o\u00A0ciągłość pracy maszyn w\u00A0sezonie. Oczekujemy wszechstronnej znajomości techniki rolniczej i\u00A0komunalnej oraz\u00A0gotowości do szybkiego reagowania na\u00A0awarie u\u00A0klientów.",
  },
] as const;

const POSITION_OPTIONS = [
  { value: "Handlowiec", label: "Handlowiec" },
  { value: "Mechanik", label: "Mechanik" },
  { value: "Pracownik Serwisu", label: "Pracownik Serwisu" },
] as const;

export default function Kariera() {
  const { toast } = useToast();
  const [fileName, setFileName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("imie-nazwisko") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("telefon") || "").trim();
    const position = String(data.get("stanowisko") || "").trim();

    const subject = `Aplikacja: ${position || "Kariera"} — ${name}`;
    const body = [
      `Stanowisko: ${position}`,
      `Imię i nazwisko: ${name}`,
      `E-mail: ${email}`,
      `Telefon: ${phone}`,
      "",
      "Proszę o załączenie CV do tej wiadomości.",
    ].join("\n");

    window.location.href = `mailto:${CONTACT_INFO.emailMain}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    toast({
      title: "Otwieramy Twojego klienta poczty",
      description:
        "Dokończ wysyłkę i pamiętaj o załączeniu pliku CV w wiadomości e-mail.",
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-[#0e110d] text-white">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Powrót na stronę główną</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-white/45">
            Kariera
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-[#0e110d] text-white px-4 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-white/10">
        <img
          src={karieraHero}
          alt="Siedziba Stekro MiniTrak w Nowym Targu"
          title="Siedziba Stekro MiniTrak"
          width={1600}
          height={900}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e110d] via-[#0e110d]/85 to-[#0e110d]/45" />
        <div className="absolute inset-0 bg-[#0e110d]/40" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2.5" />
              Dołącz do zespołu Stekro
            </div>
            <Breadcrumbs tone="dark" current="Kariera" />
            <h1 className="font-display font-extrabold uppercase tracking-tight leading-[1.05] text-3xl md:text-4xl xl:text-5xl">
              Zbuduj swoją karierę na&nbsp;solidnym fundamencie.{" "}
              <span className="text-primary">Dołącz do zespołu STEKRO.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/72 max-w-2xl leading-relaxed">
              Jesteśmy liderem w&nbsp;sprzedaży i&nbsp;serwisie maszyn rolniczych oraz&nbsp;komunalnych.
              Szukamy ludzi z&nbsp;pasją, dla&nbsp;których ryk silnika
              ciągnika i&nbsp;nowoczesne technologie w&nbsp;rolnictwie to chleb powszedni.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-full h-14 px-8 text-base font-semibold"
                asChild
              >
                <a href="#aplikuj">
                  <Send className="mr-2 w-5 h-5" />
                  Aplikuj teraz
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-8 text-base bg-white/5 border-white/20 hover:bg-white/15 text-white"
                asChild
              >
                <a href="#stanowiska">Zobacz stanowiska</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* KOGO SZUKAMY */}
      <section id="stanowiska" className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="font-display text-xs tracking-[0.35em] text-primary font-semibold uppercase">
            Kogo szukamy
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl mt-3 leading-tight">
            Otwarte stanowiska
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Rozwijamy się i&nbsp;poszukujemy specjalistów, którzy chcą tworzyć
            nowoczesne rolnictwo razem z&nbsp;nami. Sprawdź, gdzie pasujesz najlepiej.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSITIONS.map((pos) => {
            const Icon = pos.icon;
            return (
              <article
                key={pos.id}
                className="group flex flex-col rounded-3xl border border-border bg-card p-8 transition-colors hover:border-primary/60"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="font-display font-bold text-xl mt-6">
                  {pos.title}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">
                  {pos.description}
                </p>
                <a
                  href="#aplikuj"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Aplikuj na to stanowisko
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* APLIKACJA */}
      <section id="aplikuj" className="bg-[#0e110d] text-white scroll-mt-20">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="font-display text-xs tracking-[0.35em] text-primary font-semibold uppercase">
                Aplikuj
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mt-3 leading-tight">
                Wyślij swoją aplikację
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed">
                Nie zwlekaj, dołącz do grona profesjonalistów. Wybierz
                stanowisko, zostaw swoje dane, załącz CV i&nbsp;daj się poznać!
              </p>

              <ul className="mt-8 space-y-3 text-sm text-white/75">
                {[
                  "Stabilne zatrudnienie w\u00A0rozwijającej się firmie",
                  "Praca z\u00A0nowoczesnymi maszynami i\u00A0technologiami",
                  "Realny wpływ na\u00A0rozwój polskiego rolnictwa",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-white/10 space-y-3 text-sm">
                <p className="text-white/55">
                  Masz pytania? Skontaktuj się z nami:
                </p>
                <a
                  href={`tel:${CONTACT_INFO.salesPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  {CONTACT_INFO.salesPhone}
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.emailMain}`}
                  className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  {CONTACT_INFO.emailMain}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                id="kariera-form"
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="imie-nazwisko"
                      className="text-white/80 mb-2 block"
                    >
                      Imię i&nbsp;nazwisko
                    </Label>
                    <Input
                      id="imie-nazwisko"
                      name="imie-nazwisko"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jan Kowalski"
                      className="h-12 bg-white/5 border-white/15 text-white placeholder:text-white/35 focus-visible:ring-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white/80 mb-2 block">
                      Adres e-mail
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="jan.kowalski@email.pl"
                      className="h-12 bg-white/5 border-white/15 text-white placeholder:text-white/35 focus-visible:ring-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefon" className="text-white/80 mb-2 block">
                      Numer telefonu
                    </Label>
                    <Input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="600 000 000"
                      className="h-12 bg-white/5 border-white/15 text-white placeholder:text-white/35 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="stanowisko"
                      className="text-white/80 mb-2 block"
                    >
                      Stanowisko, na&nbsp;które aplikujesz
                    </Label>
                    <select
                      id="stanowisko"
                      name="stanowisko"
                      required
                      defaultValue=""
                      className="h-12 w-full rounded-md border border-white/15 bg-white/5 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                    >
                      <option value="" disabled className="bg-[#0e110d]">
                        Wybierz stanowisko
                      </option>
                      {POSITION_OPTIONS.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-[#0e110d]"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="cv" className="text-white/80 mb-2 block">
                      Załącz CV (PDF, DOC, DOCX)
                    </Label>
                    <label
                      htmlFor="cv"
                      className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-md border border-dashed border-white/25 bg-white/5 px-4 text-sm text-white/60 transition-colors hover:border-primary/60 hover:text-white/80"
                    >
                      <Paperclip className="w-4 h-4 text-primary shrink-0" />
                      <span className="truncate">
                        {fileName || "Kliknij, aby wybrać plik CV"}
                      </span>
                    </label>
                    <input
                      id="cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="sr-only"
                      onChange={(e) =>
                        setFileName(e.target.files?.[0]?.name ?? "")
                      }
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-8 w-full rounded-full h-14 text-base font-semibold"
                >
                  <Send className="mr-2 w-5 h-5" />
                  Wyślij aplikację
                </Button>

                <p className="mt-4 text-xs text-white/40 leading-relaxed">
                  Klikając „Wyślij aplikację" wyrażasz zgodę na&nbsp;przetwarzanie
                  Twoich danych osobowych w&nbsp;celu realizacji procesu rekrutacji.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

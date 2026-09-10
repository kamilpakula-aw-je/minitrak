import { Breadcrumbs } from "@/components/breadcrumbs";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { KRONE_CATEGORIES, CONTACT_INFO } from "@/data";
import kroneHero from "@assets/3_(4)_1780051918282.webp";

export default function Krone() {
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
            Maszyny zielonkowe
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-[#0e110d] text-white px-4 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-white/10">
        <img
          src={kroneHero}
          alt="Ciągnik z przetrząsaczem Krone w pracy na łące"
          title="Maszyny Krone w pracy"
          width={819}
          height={494}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e110d] via-[#0e110d]/85 to-[#0e110d]/40" />
        <div className="absolute inset-0 bg-[#0e110d]/40" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2.5" />
              Autoryzowany dealer Krone
            </div>
            <Breadcrumbs tone="dark" current="Krone" />
            <h1 className="font-display font-extrabold uppercase tracking-tight leading-[1.05] text-3xl md:text-4xl xl:text-5xl">
              Krone — światowy numer jeden{" "}
              <span className="text-primary">w&nbsp;zbiorze zielonek</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/72 max-w-2xl leading-relaxed">
              KRONE posiada idealną gamę produktów do zbioru — od prostych
              kosiarek dyskowych i&nbsp;przetrząsaczy, przez zgrabiarki i&nbsp;przyczepy
              samozbierające, po prasy rolujące oraz&nbsp;kostkujące. Najlepsza
              technologia, solidne wykonanie i&nbsp;świetny design.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold" asChild>
                <Link href="/#kontakt">
                  <Phone className="mr-2 w-5 h-5" />
                  Zapytaj o ofertę
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-8 text-base bg-white/5 border-white/20 hover:bg-white/15 text-white"
                asChild
              >
                <a href={`mailto:${CONTACT_INFO.emailMain}`}>Napisz do nas</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-4 bottom-8 hidden lg:flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-10 py-8">
          <img
            src="/brands/krone.png"
            alt="Logo marki Krone — autoryzowany dealer maszyn zielonkowych"
            title="Logo Krone"
            width={300}
            height={166}
            loading="lazy"
            decoding="async"
            className="h-16 w-auto object-contain"
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="space-y-20 md:space-y-24">
          {KRONE_CATEGORIES.map((cat, i) => {
            const hasImages = cat.images.length > 0;
            const flip = i % 2 === 1;
            const extras = cat.images.slice(1);
            return (
              <div
                key={cat.id}
                id={cat.id}
                className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center scroll-mt-24"
              >
                <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                  <span className="font-display text-xs tracking-[0.35em] text-primary font-semibold uppercase">
                    {String(i + 1).padStart(2, "0")} · {cat.tagline}
                  </span>
                  <h2 className="font-display font-bold text-2xl md:text-3xl mt-3 leading-tight">
                    {cat.name}
                  </h2>
                  <p className="mt-3 text-base md:text-lg font-medium text-foreground/90">
                    {cat.lead}
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-2.5">
                    {cat.models.map((model) => (
                      <li
                        key={model}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-sm font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{model}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                  {hasImages ? (
                    <div className="space-y-3">
                      <div className="overflow-hidden rounded-2xl border border-border/60 aspect-[16/10]">
                        <img
                          src={cat.images[0]}
                          alt={`Maszyna Krone z kategorii ${cat.name}`}
                          title={cat.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {extras.length > 0 && (
                        <div
                          className={`grid gap-3 ${
                            extras.length === 1 ? "grid-cols-1" : "grid-cols-2"
                          }`}
                        >
                          {extras.map((img) => (
                            <div
                              key={img}
                              className="overflow-hidden rounded-xl border border-border/60 aspect-[16/10]"
                            >
                              <img
                                src={img}
                                alt={`Maszyna Krone z kategorii ${cat.name} — zdjęcie dodatkowe`}
                                title={`${cat.name} — galeria`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-border/60 bg-muted/30 aspect-[16/10] flex items-center justify-center">
                      <img
                        src="/brands/krone.png"
                        alt="Logo marki Krone jako placeholder kategorii bez zdjęć"
                        title="Krone"
                        width={300}
                        height={166}
                        loading="lazy"
                        decoding="async"
                        className="h-14 w-auto object-contain opacity-40"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0e110d] text-white border-t border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-2xl md:text-3xl leading-tight">
              Dobierzemy maszynę Krone do&nbsp;Twojego gospodarstwa.
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Skontaktuj się z&nbsp;naszymi doradcami — pomożemy dobrać kosiarkę, prasę
              czy&nbsp;zgrabiarkę, przygotujemy ofertę, finansowanie i&nbsp;serwis posprzedażowy.
            </p>
          </div>
          <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold shrink-0" asChild>
            <Link href="/#kontakt">
              Przejdź do kontaktu
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

import { ArrowRight, CheckCircle2, Mail, PhoneCall, Tractor } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/data";

export interface MachineCategoryPageProps {
  name: string;
  eyebrow: string;
  lead: string;
  description: string;
  applications: string[];
  benefits: string[];
  children?: React.ReactNode;
}

export function MachineCategoryPage({
  name,
  eyebrow,
  lead,
  description,
  applications,
  benefits,
  children,
}: MachineCategoryPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="pt-24">
        <section className="border-b border-white/10 bg-[#0e110d] px-4 py-16 text-white md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <Breadcrumbs current={name} tone="dark" />
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
              <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">{name}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75 md:text-xl">
                <strong className="text-white">{lead}</strong> {description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full px-7" asChild>
                  <Link href="/#kontakt">
                    Zapytaj o dostępne maszyny <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 rounded-full border-white/20 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white" asChild>
                  <a href={`tel:${CONTACT_INFO.salesPhone.replace(/\s/g, "")}`}>
                    <PhoneCall className="mr-2 h-5 w-5" /> {CONTACT_INFO.salesPhone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {children}

        <section className="px-4 py-20 md:py-28">
          <div className="container mx-auto grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Zastosowanie</p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Do jakich prac dobieramy {name.toLowerCase()}?</h2>
              <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
                Dobieramy maszynę do mocy ciągnika, rodzaju podłoża, szerokości roboczej oraz częstotliwości pracy.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {applications.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-3xl border border-border bg-muted/40 p-7 md:p-9">
              <Tractor className="h-8 w-8 text-primary" />
              <h2 className="mt-5 font-display text-2xl font-bold">Dobór do Twojego ciągnika</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Podaj model ciągnika i&nbsp;rodzaj wykonywanych prac. Doradca sprawdzi kompatybilność oraz aktualnie dostępne warianty.
              </p>
              <ul className="mt-6 space-y-3">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full rounded-full" asChild>
                <a href={`mailto:${CONTACT_INFO.emailMain}`}>
                  <Mail className="mr-2 h-4 w-4" /> Napisz do doradcy
                </a>
              </Button>
            </aside>
          </div>
        </section>

        <section className="bg-[#0e110d] px-4 py-16 text-center text-white md:py-20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Zapytaj o aktualną ofertę</h2>
            <p className="mt-4 text-white/70">
              Potwierdzimy dostępność i&nbsp;pomożemy dopasować maszynę do ciągnika oraz planowanych prac.
            </p>
            <Button size="lg" className="mt-8 h-14 rounded-full px-8" asChild>
              <Link href="/#kontakt">Przejdź do formularza</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
import { MachineCategoryPage } from "@/components/machine-category-page";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { gallerySrcSet } from "@/lib/img-utils";

export default function KosiarkiBijakowe() {
  return (
    <MachineCategoryPage
      name="Kosiarki bijakowe"
      eyebrow="Maszyny do koszenia i mulczowania"
      lead="Kosiarki bijakowe rozdrabniają trawę, chwasty i pozostałości roślinne."
      description="Sprawdzają się na nieużytkach, poboczach, w sadach oraz na terenach komunalnych."
      applications={[
        "Wysoka trawa i chwasty",
        "Nieużytki i pobocza",
        "Sady i plantacje",
        "Tereny komunalne",
        "Rozdrabnianie pozostałości",
        "Pielęgnacja terenów zielonych",
      ]}
      benefits={[
        "Dobór szerokości roboczej do mocy ciągnika",
        "Sprawdzenie WOM i sposobu zawieszenia",
        "Pomoc w doborze noży lub młotków bijakowych",
      ]}
    >
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Dostępne modele</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Porównaj dwa modele kosiarek bijakowych dostępne w&nbsp;ofercie.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden transition-colors hover:border-primary/50">
              <Link href="/maszyny/kosiarki-bijakowe/lisicki-kb" className="group flex flex-col h-full" data-testid="link-product-lisicki-kb">
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src="/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-1-1200.webp"
                    srcSet={gallerySrcSet("/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-1-1200.webp", 1200)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Czerwona kosiarka bijakowa LISICKI KB zamontowana za ciągnikiem."
                    title="Kosiarka bijakowa LISICKI KB"
                    width={1200}
                    height={676}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">LISICKI</p>
                  <h3 className="font-display text-2xl font-bold">Kosiarka bijakowa LISICKI KB</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">
                    Mulczer do trawy, chwastów i&nbsp;lekkich zakrzaczeń, dostępny w&nbsp;szerokościach od 1,0 do 2,4&nbsp;m. Przeznaczony do pracy w&nbsp;sadach, na nieużytkach i&nbsp;terenach zielonych.
                  </p>
                  <div className="mt-6 inline-flex items-center font-semibold text-primary">
                    Zobacz więcej <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="overflow-hidden transition-colors hover:border-primary/50">
              <Link href="/maszyny/kosiarki-bijakowe/stark-kdl-profi" className="group flex flex-col h-full" data-testid="link-product-stark-kdl-profi">
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src="/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-1-900.webp"
                    srcSet={gallerySrcSet("/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-1-900.webp", 900)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Zielona kosiarka bijakowa STARK KDL Profi z ramieniem hydraulicznym."
                    title="Kosiarka bijakowa STARK KDL Profi"
                    width={900}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">STARK</p>
                  <h3 className="font-display text-2xl font-bold">STARK KDL Profi</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">
                    Profesjonalny mulczer boczny z wychylnym zespołem roboczym. Przeznaczony do koszenia poboczy, skarp i rowów. Szerokości 1,6–2,2 m.
                  </p>
                  <div className="mt-6 inline-flex items-center font-semibold text-primary">
                    Zobacz więcej <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </MachineCategoryPage>
  );
}

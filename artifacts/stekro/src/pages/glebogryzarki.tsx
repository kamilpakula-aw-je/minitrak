import { MachineCategoryPage } from "@/components/machine-category-page";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { gallerySrcSet } from "@/lib/img-utils";

export default function Glebogryzarki() {
  return (
    <MachineCategoryPage
      name="Glebogryzarki"
      eyebrow="Maszyny do uprawy gleby"
      lead="Glebogryzarki spulchniają i mieszają glebę przed siewem lub sadzeniem."
      description="Pozwalają przygotować równe podłoże podczas jednego przejazdu ciągnika."
      applications={[
        "Przygotowanie gleby pod siew",
        "Ogrody i warzywniki",
        "Sady i plantacje",
        "Małe gospodarstwa",
        "Mieszanie nawozu z glebą",
        "Rozbijanie zbitej warstwy ziemi",
      ]}
      benefits={[
        "Dobór szerokości roboczej do rozstawu kół",
        "Sprawdzenie wymaganej mocy i prędkości WOM",
        "Dopasowanie głębokości oraz intensywności pracy",
      ]}
    >
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Dostępne modele</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Poznaj serię profesjonalnych glebogryzarek STARK RS Profi.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden transition-colors hover:border-primary/50">
              <Link href="/maszyny/glebogryzarki/stark-rs-profi" className="group flex h-full flex-col" data-testid="link-product-stark-rs-profi">
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src="/products/stark-rs-profi/glebogryzarka-stark-rs-profi-3-1200.webp"
                    srcSet={gallerySrcSet("/products/stark-rs-profi/glebogryzarka-stark-rs-profi-3-1200.webp", 1200)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Zielona glebogryzarka STARK RS Profi ustawiona na polu."
                    title="Glebogryzarka STARK RS Profi"
                    width={1200}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">STARK</p>
                  <h3 className="font-display text-2xl font-bold">Glebogryzarka STARK RS Profi</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">
                    Profesjonalna seria glebogryzarek o&nbsp;szerokości roboczej od 0,95 do 1,35&nbsp;m, z&nbsp;mechanicznym przesuwem bocznym i&nbsp;napędem łańcuchowym.
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
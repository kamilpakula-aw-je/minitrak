import { useEffect, useState, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HomeBelowFold from "./home-sections";
import { SiteHeader } from "@/components/site-header";

/**
 * Strona główna używa tego samego drzewa komponentów na serwerze i podczas
 * pierwszego renderu klienta. Zapobiega to rozbieżności hydratacji.
 */

/**
 * Tło hero: SSR i mobile renderują tylko lekki poster (dobre LCP na telefonie),
 * a wideo MP4 dogrywane jest wyłącznie na desktopie, po hydratacji i po tym,
 * jak przeglądarka ma wolną chwilę (requestIdleCallback). Na mobile wideo
 * nigdy nie jest pobierane.
 */
function HeroBackground() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => setShowVideo(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const timeoutId = window.setTimeout(start, 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <img
        src="/hero-tractor.webp"
        srcSet="/hero-tractor-640.webp 640w, /hero-tractor-960.webp 960w, /hero-tractor.webp 1408w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      {showVideo && (
        <video
          src="/solis-s22-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      )}
    </>
  );
}

export function HomeShell({ BelowFold }: { BelowFold: ComponentType }) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <SiteHeader />

      {/* HERO */}
      <section id="top" className="relative pt-36 pb-24 md:pt-52 md:pb-36 px-4 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <HeroBackground />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase backdrop-blur-md mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2.5" />
              Centrum nowoczesnego rolnictwa
            </div>
            <h1 className="font-display font-extrabold tracking-tight text-balance leading-[1.05] text-3xl md:text-4xl lg:text-5xl uppercase">
              Ciągniki i&nbsp;maszyny{" "}
              <span className="text-primary drop-shadow-[0_0_30px_rgba(132,204,22,0.35)]">
                rolniczo-komunalne
              </span>{" "}
              — sprzedaż, serwis i&nbsp;części.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/72 max-w-2xl text-balance leading-relaxed">
              Od ponad 30 lat dostarczamy maszyny, części i&nbsp;serwis dla rolnictwa,
              sadownictwa, leśnictwa oraz sektora komunalnego. Autoryzowany dealer
              marek <span className="text-white">Solis</span>,{" "}
              <span className="text-white">LS Tractor</span>,{" "}
              <span className="text-white">Aupax</span> i{" "}
              <span className="text-white">Krone</span>.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold" asChild>
                <a href="#katalog">
                  Zobacz katalog maszyn
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-8 text-base bg-white/5 border-white/20 hover:bg-white/15 text-white"
                asChild
              >
                <a href="#kontakt">Skontaktuj się z doradcą</a>
              </Button>
            </div>
          </div>
        </div>
      </section>


      <BelowFold />
    </div>
  );
}

export default function Home() {
  return <HomeShell BelowFold={HomeBelowFold} />;
}

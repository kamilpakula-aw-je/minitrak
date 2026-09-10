import { Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleTagManager } from "@/components/gtm";
import { Tracking } from "@/components/tracking";
import { useSEO } from "@/hooks/use-seo";
import { getSEO } from "@/lib/seo-map";
import { buildJsonLd } from "@/lib/schema";
import { ROUTES, NotFound, type AppRoute } from "@/routes";

function SEOManager() {
  const [location] = useLocation();
  useSEO(getSEO(location));

  // Dane strukturalne JSON-LD zależne od trasy (BreadcrumbList, ItemPage).
  // Podmieniamy tylko przy realnej zmianie treści, żeby uniknąć podwójnego
  // wstrzykiwania (Google Rich Results Test liczy duplikaty podwójnie).
  useEffect(() => {
    const next = buildJsonLd(location).map((b) =>
      JSON.stringify(b).replace(/</g, "\\u003c"),
    );
    const existing = Array.from(
      document.head.querySelectorAll<HTMLScriptElement>(
        'script[data-route-jsonld]',
      ),
    );
    const same =
      existing.length === next.length &&
      existing.every((el, i) => el.textContent === next[i]);
    if (same) return;
    existing.forEach((el) => el.remove());
    for (const json of next) {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-route-jsonld", "");
      el.textContent = json;
      document.head.appendChild(el);
    }
  }, [location]);

  return null;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);
  return null;
}

function Router({ routes }: { routes: AppRoute[] }) {
  return (
    // Suspense: strony (poza Home) są lazy po stronie klienta.
    // fallback=null — przy hydratacji React zachowuje HTML z SSR do czasu
    // załadowania paczki, więc nie ma migotania ani mismatchu.
    <Suspense fallback={null}>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

interface AppProps {
  /** Ścieżka żądania przy renderowaniu po stronie serwera (SSR). */
  ssrPath?: string;
  /** Trasy z komponentami eager dla SSR (renderToString nie zna lazy). */
  routes?: AppRoute[];
}

function App({ ssrPath, routes = ROUTES }: AppProps) {
  return (
    <TooltipProvider>
        <GoogleTagManager />
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(/\/$/, "")}
          ssrPath={ssrPath}
        >
          <SEOManager />
          <ScrollToTop />
          <Tracking />
          <Router routes={routes} />
        </WouterRouter>
        <CookieConsent />
        <Toaster />
    </TooltipProvider>
  );
}

export default App;

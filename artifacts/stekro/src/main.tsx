import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import { PAGE_LOADERS, ROUTES, ROUTE_DEFS, type AppRoute } from "./routes";
import "./index.css";

const container = document.getElementById("root")!;

async function getHydrationRoutes(): Promise<AppRoute[]> {
  const pathname =
    window.location.pathname.length > 1 && window.location.pathname.endsWith("/")
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;
  const route = ROUTE_DEFS.find(({ path }) => path === pathname);
  if (!route || route.page === "home") return ROUTES;

  const page = await PAGE_LOADERS[route.page]();
  return ROUTES.map((appRoute) =>
    ROUTE_DEFS.find(({ path }) => path === appRoute.path)?.page === route.page
      ? { ...appRoute, component: page.default }
      : appRoute,
  );
}

const prefetchPages = () => {
  for (const load of Object.values(PAGE_LOADERS)) {
    load().catch(() => {
      // Ignorujemy błędy prefetch (np. offline) — paczka dociągnie się
      // normalnie przy wejściu na trasę.
    });
  }
};

async function bootstrap() {
  // Nie używamy top-level await: w produkcyjnym code splittingu podstrona może
  // importować współdzielone moduły z głównej paczki. Oczekiwanie na nią przed
  // zakończeniem inicjalizacji entry tworzyłoby cykliczną blokadę i wyłączało
  // wszystkie interakcje po SSR.
  if (container.hasChildNodes()) {
    const hydrationRoutes = await getHydrationRoutes();
    hydrateRoot(container, <App routes={hydrationRoutes} />);
  } else {
    createRoot(container).render(<App />);
  }

  // Po hydratacji dogrywamy paczki podstron w tle (w czasie bezczynności),
  // żeby nawigacja SPA była natychmiastowa i bez migotania.
  if ("requestIdleCallback" in window) {
    requestIdleCallback(prefetchPages, { timeout: 5000 });
  } else {
    setTimeout(prefetchPages, 2000);
  }
}

void bootstrap().catch((error) => {
  console.error("[bootstrap] Nie udało się uruchomić aplikacji:", error);
});

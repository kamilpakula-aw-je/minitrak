import { lazy, type ComponentType } from "react";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

type PageModule = { default: ComponentType };
export type PageLoader = () => Promise<PageModule>;

/**
 * Loadery podstron — dynamiczne importy, dzięki którym Vite tnie build
 * na osobne paczki per podstrona. Strona główna (Home) i NotFound są
 * importowane statycznie, bo potrzebne od razu przy pierwszym wejściu.
 */
export const PAGE_LOADERS = {
  "solis-s16": () => import("@/pages/model-solis-s16"),
  "solis-s20": () => import("@/pages/model-solis-s20"),
  "solis-s20-plus": () => import("@/pages/model-solis-s20-plus"),
  "solis-s22": () => import("@/pages/model-solis-s22"),
  "solis-s26": () => import("@/pages/model-solis-s26"),
  "solis-s26-hst": () => import("@/pages/model-solis-s26-hst"),
  "solis-s40": () => import("@/pages/model-solis-s40"),
  "solis-s50": () => import("@/pages/model-solis-s50"),
  "solis-s60": () => import("@/pages/model-solis-s60"),
  "solis-s75": () => import("@/pages/model-solis-s75"),
  "solis-s90": () => import("@/pages/model-solis-s90"),
  "solis-n75": () => import("@/pages/model-solis-n75"),
  "ls-mt125": () => import("@/pages/model-ls-mt125"),
  "ls-xj25-hst": () => import("@/pages/model-ls-xj25-hst"),
  "ls-xj25-mec": () => import("@/pages/model-ls-xj25-mec"),
  "ls-mt335": () => import("@/pages/model-ls-mt335"),
  "ls-mt340": () => import("@/pages/model-ls-mt340"),
  "ls-mt350": () => import("@/pages/model-ls-mt350"),
  "ls-mt360": () => import("@/pages/model-ls-mt360"),
  "ls-xu6168": () => import("@/pages/model-ls-xu6168"),
  "ls-mt573": () => import("@/pages/model-ls-mt573"),
  "ls-mt7101": () => import("@/pages/model-ls-mt7101"),
  "aupax-2025": () => import("@/pages/model-aupax-2025"),
  "aupax-2040": () => import("@/pages/model-aupax-2040"),
  "aupax-3055": () => import("@/pages/model-aupax-3055"),
  "aupax-3075": () => import("@/pages/model-aupax-3075"),
  "aupax-m404": () => import("@/pages/model-aupax-m404"),
  krone: () => import("@/pages/krone"),
  kariera: () => import("@/pages/kariera"),
  wymiana: () => import("@/pages/wymiana"),
  "polityka-prywatnosci": () => import("@/pages/polityka-prywatnosci"),
  regulamin: () => import("@/pages/regulamin"),
  "kosiarki-bijakowe": () => import("@/pages/kosiarki-bijakowe"),
  "lisicki-kb": () => import("@/pages/machine-lisicki-kb"),
  "stark-kdl-profi": () => import("@/pages/machine-stark-kdl-profi"),
  "zamowienie-lisicki-kb": () => import("@/pages/order-lisicki-kb"),
  "zamowienie-stark-kdl-profi": () => import("@/pages/order-stark-kdl-profi"),
  glebogryzarki: () => import("@/pages/glebogryzarki"),
  "stark-rs-profi": () => import("@/pages/machine-stark-rs-profi"),
  "zamowienie-stark-rs-profi": () => import("@/pages/order-stark-rs-profi"),
} satisfies Record<string, PageLoader>;

export type PageId = keyof typeof PAGE_LOADERS;

/**
 * Jedyne źródło prawdy o trasach aplikacji: ścieżka → identyfikator strony.
 * `page: "home"` oznacza statycznie zaimportowany Home (bez lazy).
 * Aliasowe ścieżki wskazują ten sam identyfikator, więc współdzielą paczkę.
 */
export const ROUTE_DEFS: { path: string; page: PageId | "home" }[] = [
  { path: "/", page: "home" },
  { path: "/modele/solis-s16", page: "solis-s16" },
  { path: "/modele/solis-s20", page: "solis-s20" },
  { path: "/modele/solis-s20-plus", page: "solis-s20-plus" },
  { path: "/modele/solis-s22", page: "solis-s22" },
  { path: "/modele/solis-s26", page: "solis-s26" },
  { path: "/modele/solis-s26-cab", page: "solis-s26" },
  { path: "/modele/solis-s26-hst", page: "solis-s26-hst" },
  { path: "/modele/solis-s40", page: "solis-s40" },
  { path: "/modele/solis-s50", page: "solis-s50" },
  { path: "/modele/solis-s60", page: "solis-s60" },
  { path: "/modele/solis-s75", page: "solis-s75" },
  { path: "/modele/solis-s90", page: "solis-s90" },
  { path: "/modele/solis-n75", page: "solis-n75" },
  { path: "/modele/ls-mt1", page: "ls-mt125" },
  { path: "/modele/ls-mt125", page: "ls-mt125" },
  { path: "/modele/ls-xj25", page: "ls-xj25-hst" },
  { path: "/modele/ls-xj25-hst", page: "ls-xj25-hst" },
  { path: "/modele/ls-xj25-mec", page: "ls-xj25-mec" },
  { path: "/modele/ls-mt335", page: "ls-mt335" },
  { path: "/modele/ls-mt3-35", page: "ls-mt335" },
  { path: "/modele/ls-mt340", page: "ls-mt340" },
  { path: "/modele/ls-mt340hc", page: "ls-mt340" },
  { path: "/modele/ls-mt3-40", page: "ls-mt340" },
  { path: "/modele/ls-mt350", page: "ls-mt350" },
  { path: "/modele/ls-mt3-50", page: "ls-mt350" },
  { path: "/modele/ls-mt360", page: "ls-mt360" },
  { path: "/modele/ls-mt3-60", page: "ls-mt360" },
  { path: "/modele/ls-xu6168", page: "ls-xu6168" },
  { path: "/modele/ls-mt573", page: "ls-mt573" },
  { path: "/modele/ls-mt7101", page: "ls-mt7101" },
  { path: "/modele/aupax-2025", page: "aupax-2025" },
  { path: "/modele/aupax-2040", page: "aupax-2040" },
  { path: "/modele/aupax-3055", page: "aupax-3055" },
  { path: "/modele/aupax-3075", page: "aupax-3075" },
  { path: "/modele/aupax-m404", page: "aupax-m404" },
  { path: "/marka/krone", page: "krone" },
  { path: "/krone", page: "krone" },
  { path: "/kariera", page: "kariera" },
  { path: "/wymiana", page: "wymiana" },
  { path: "/polityka-prywatnosci", page: "polityka-prywatnosci" },
  { path: "/regulamin", page: "regulamin" },
  { path: "/maszyny/kosiarki-bijakowe", page: "kosiarki-bijakowe" },
  { path: "/maszyny/kosiarki-bijakowe/lisicki-kb", page: "lisicki-kb" },
  { path: "/maszyny/kosiarki-bijakowe/stark-kdl-profi", page: "stark-kdl-profi" },
  { path: "/zamowienie/lisicki-kb", page: "zamowienie-lisicki-kb" },
  { path: "/zamowienie/stark-kdl-profi", page: "zamowienie-stark-kdl-profi" },
  { path: "/maszyny/glebogryzarki", page: "glebogryzarki" },
  { path: "/maszyny/glebogryzarki/stark-rs-profi", page: "stark-rs-profi" },
  { path: "/zamowienie/stark-rs-profi", page: "zamowienie-stark-rs-profi" },
];

export interface AppRoute {
  path: string;
  component: ComponentType;
}

// Jeden lazy-komponent per strona (aliasy współdzielą instancję).
const LAZY_PAGES = Object.fromEntries(
  Object.entries(PAGE_LOADERS).map(([id, load]) => [id, lazy(load)]),
) as unknown as Record<PageId, ComponentType>;

/** Trasy klienta: Home statycznie, pozostałe strony lazy (osobne paczki). */
export const ROUTES: AppRoute[] = ROUTE_DEFS.map(({ path, page }) => ({
  path,
  component: page === "home" ? Home : LAZY_PAGES[page],
}));

const KNOWN_PATHS = new Set(ROUTE_DEFS.map((r) => r.path));

export function isKnownPath(pathname: string): boolean {
  const norm =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return KNOWN_PATHS.has(norm);
}

export { NotFound };

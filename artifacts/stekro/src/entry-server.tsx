import { renderToString } from "react-dom/server";
import App from "./App";
import { isKnownPath, ROUTE_DEFS } from "./routes";
import { SSR_ROUTES } from "./routes-ssr";
import { buildHeadTags } from "./lib/seo-head";
import { ALIAS_PATHS } from "./lib/seo-map";

/**
 * Kanoniczne ścieżki do sitemap.xml — wszystkie trasy z ROUTES
 * z pominięciem aliasów (przekierowań SEO zdefiniowanych w seo-map).
 */
export function getSitemapPaths(): string[] {
  return ROUTE_DEFS.map((r) => r.path).filter((p) => !ALIAS_PATHS.has(p));
}

export interface RenderResult {
  html: string;
  head: string;
  status: number;
}

export function render(pathname: string): RenderResult {
  const html = renderToString(<App ssrPath={pathname} routes={SSR_ROUTES} />);
  return {
    html,
    head: buildHeadTags(pathname),
    status: isKnownPath(pathname) ? 200 : 404,
  };
}

import { getSEO } from "./seo-map";
import { renderJsonLdScripts } from "./schema";

const SITE_URL = "https://minitrak.pl";
const DEFAULT_OG = "/og-image.png";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Buduje tagi <head> dla danej ścieżki po stronie serwera (SSR),
 * 1:1 z logiką klienta w hooks/use-seo.ts.
 */
export function buildHeadTags(pathname: string): string {
  const { title, description, ogImage, canonical } = getSEO(pathname);

  const fullOg = (ogImage ?? DEFAULT_OG).startsWith("http")
    ? (ogImage ?? DEFAULT_OG)
    : `${SITE_URL}${ogImage ?? DEFAULT_OG}`;
  const fullCanonical = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical}`
    : `${SITE_URL}${pathname}`;

  const tags = [
    // Preload postera hero (LCP) na stronie głównej — imagesrcset/imagesizes
    // musi być 1:1 z <img> w HeroBackground (home.tsx), żeby przeglądarka
    // pobrała dokładnie ten sam wariant i nie dublowała żądań.
    pathname === "/"
      ? `<link rel="preload" as="image" fetchpriority="high" imagesrcset="/hero-tractor-640.webp 640w, /hero-tractor-960.webp 960w, /hero-tractor.webp 1408w" imagesizes="100vw" />`
      : "",
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${esc(fullOg)}" />`,
    `<meta property="og:url" content="${esc(fullCanonical)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(fullOg)}" />`,
    `<link rel="canonical" href="${esc(fullCanonical)}" />`,
    renderJsonLdScripts(pathname),
  ];

  return tags.filter(Boolean).join("\n    ");
}

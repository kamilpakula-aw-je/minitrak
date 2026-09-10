import { useEffect } from "react";

export interface SEOData {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}

const SITE_URL = "https://minitrak.pl";
const DEFAULT_OG = "/og-image.png";

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? [];
    if (key && name) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO(data: SEOData) {
  useEffect(() => {
    const { title, description, ogImage, canonical } = data;
    const fullOg = (ogImage ?? DEFAULT_OG).startsWith("http")
      ? (ogImage ?? DEFAULT_OG)
      : `${SITE_URL}${ogImage ?? DEFAULT_OG}`;
    const fullCanonical = canonical
      ? (canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`)
      : `${SITE_URL}${window.location.pathname}`;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);

    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", fullOg);
    setMeta('meta[property="og:url"]', "content", fullCanonical);

    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", fullOg);

    setLink("canonical", fullCanonical);
  }, [data.title, data.description, data.ogImage, data.canonical]);
}

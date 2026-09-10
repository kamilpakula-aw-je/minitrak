import { useEffect } from "react";
import { useLocation } from "wouter";

// Warstwa trackingowa dla GTM (GTM-W7JL8VC3). Wypycha zdarzenia do
// window.dataLayer — GTM sam filtruje je wg Consent Mode v2, więc listenery
// działają niezależnie od zgody użytkownika.
//
// Zdarzenia:
//   - scroll_depth  (progi 25/50/75/100%, każdy raz na odsłonę trasy)
//   - file_download (kliknięcia w linki do plików)
//   - form_submit_success (potwierdzone, udane wysłanie formularza)
//
// GTM jest ładowany statycznie w index.html; tutaj tylko emitujemy dane.

function pushToDataLayer(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

// Rozszerzenia plików uznawane za pobranie.
const FILE_EXTENSIONS = [
  "pdf",
  "zip",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "csv",
  "jpg",
  "png",
  "webp",
  "mp4",
] as const;

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

/** Głębokość przewijania — progi resetowane przy zmianie trasy wouter. */
function ScrollDepthTracker() {
  const [location] = useLocation();

  useEffect(() => {
    // Nowa odsłona trasy = świeży zestaw progów.
    const fired = new Set<number>();

    const evaluate = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const viewport = window.innerHeight || doc.clientHeight || 0;
      const scrollHeight = doc.scrollHeight || 0;
      const scrollable = scrollHeight - viewport;

      // Strona bez możliwości przewijania — zaliczamy komplet progów.
      const percent =
        scrollable <= 0
          ? 100
          : Math.min(100, Math.round(((scrollTop + viewport) / scrollHeight) * 100));

      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          pushToDataLayer({ event: "scroll_depth", percent: threshold });
        }
      }
    };

    // Sprawdzenie po zmianie trasy (np. krótka strona = od razu 100%).
    evaluate();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        evaluate();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location]);

  return null;
}

/** Delegowany listener kliknięć w linki do plików. */
function FileDownloadTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Wyciągamy nazwę pliku i rozszerzenie (bez query/hash).
      let pathname = href;
      try {
        pathname = new URL(href, window.location.href).pathname;
      } catch {
        pathname = href.split(/[?#]/)[0];
      }

      const fileName = pathname.split("/").pop() ?? "";
      const dotIndex = fileName.lastIndexOf(".");
      if (dotIndex < 0) return;
      const extension = fileName.slice(dotIndex + 1).toLowerCase();

      if (!(FILE_EXTENSIONS as readonly string[]).includes(extension)) return;

      // Bez preventDefault — pobieranie ma działać normalnie.
      pushToDataLayer({
        event: "file_download",
        file_name: fileName,
        file_extension: extension,
      });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}

const SUCCESS_FORM_IDS = {
  "formularz-kontakt": "kontakt-form",
  "formularz-wymiana": "wymiana-form",
} as const;

/**
 * Zdarzenie GTM emitujemy dopiero po pojawieniu się komunikatu sukcesu.
 * Sam event submit nie potwierdza zapisu — request może zakończyć się błędem.
 */
function FormSuccessTracker() {
  useEffect(() => {
    const tracked = new WeakSet<Element>();

    const trackSuccess = (element: Element) => {
      if (tracked.has(element)) return;
      const formId = SUCCESS_FORM_IDS[element.id as keyof typeof SUCCESS_FORM_IDS];
      if (!formId) return;
      tracked.add(element);
      pushToDataLayer({
        event: "form_submit_success",
        formId,
        success_element_id: element.id,
      });
    };

    const inspect = (node: Node) => {
      if (!(node instanceof Element)) return;
      trackSuccess(node);
      for (const id of Object.keys(SUCCESS_FORM_IDS)) {
        node.querySelectorAll(`#${id}`).forEach(trackSuccess);
      }
    };

    Object.keys(SUCCESS_FORM_IDS).forEach((id) => {
      const element = document.getElementById(id);
      if (element) trackSuccess(element);
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach(inspect));
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}

export function Tracking() {
  return (
    <>
      <ScrollDepthTracker />
      <FileDownloadTracker />
      <FormSuccessTracker />
    </>
  );
}

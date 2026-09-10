import { useEffect } from "react";

// GTM (GTM-W7JL8VC3) jest ładowany statycznie w index.html (snippet w <head> +
// noscript po <body>), razem z Google Consent Mode v2 z domyślną odmową zgody.
// Ten komponent tylko przekazuje wybory z banera cookies do GTM.

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

type ConsentDetail = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // Consent API wymaga obiektu `arguments`, nie tablicy.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function pushConsent(detail: ConsentDetail) {
  const consent = {
    ad_storage: detail.marketing ? "granted" : "denied",
    ad_user_data: detail.marketing ? "granted" : "denied",
    ad_personalization: detail.marketing ? "granted" : "denied",
    analytics_storage: detail.analytics ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  } as const;

  // Google Consent Mode v2 — właściwa aktualizacja zgody.
  gtag("consent", "update", consent);

  // Dodatkowe zdarzenie dla własnych tagów/triggerów w GTM.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "consent_update", consent });
}

export function GoogleTagManager() {
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentDetail>).detail;
      if (detail) pushConsent(detail);
    };
    window.addEventListener("stekro:consent", handler as EventListener);
    return () => window.removeEventListener("stekro:consent", handler as EventListener);
  }, []);

  return null;
}

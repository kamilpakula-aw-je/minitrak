import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "stekro_cookie_consent_v1";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function saveConsent(state: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cookie_consent",
    categories: {
      necessary: true,
      analytics: state.analytics,
      marketing: state.marketing,
    },
  });
  window.dispatchEvent(new CustomEvent("stekro:consent", { detail: state }));
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  // Przed dokonaniem wyboru tylko cookies niezbędne są aktywne (RODO).
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = loadConsent();
    if (!existing) {
      setOpen(true);
    } else {
      window.dispatchEvent(new CustomEvent("stekro:consent", { detail: existing }));
    }
  }, []);

  // Blokada scrolla strony, dopóki baner jest otwarty.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus trap + klawiatura (Tab/Shift+Tab w pętli, Escape = tylko niezbędne).
  const rejectOptional = useCallback(() => {
    saveConsent({ necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() });
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusables = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    const first = focusables()[0];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        rejectOptional();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const firstEl = els[0];
      const lastEl = els[els.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === firstEl || !dialog.contains(active)) {
          e.preventDefault();
          lastEl.focus();
        }
      } else if (active === lastEl || !dialog.contains(active)) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, rejectOptional]);

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() });
    setOpen(false);
  };

  const saveCustom = () => {
    saveConsent({ necessary: true, analytics, marketing, timestamp: new Date().toISOString() });
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          const ex = loadConsent();
          if (ex) {
            setAnalytics(ex.analytics);
            setMarketing(ex.marketing);
          }
          setShowSettings(true);
          setOpen(true);
        }}
        className="fixed bottom-20 md:bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs text-white/85 backdrop-blur-md shadow-lg hover:bg-black hover:text-white transition-colors"
        aria-label="Ustawienia cookies"
      >
        <Cookie className="w-3.5 h-3.5" />
        <span>Cookies</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6 animate-in fade-in duration-300">
      {/* Overlay blokujący interakcję z resztą strony do momentu wyboru */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
        className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#0e110d] text-white shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-bottom-4 duration-300 max-h-[90dvh] overflow-y-auto"
      >
        <div className="p-5 md:p-7">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <Cookie className="w-4.5 h-4.5" />
              </span>
              <div>
                <h2 id="cookie-consent-title" className="font-display font-bold text-base leading-tight">
                  Pliki cookies i&nbsp;RODO
                </h2>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/45 font-semibold mt-1">
                  Twoja prywatność
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={rejectOptional}
              className="text-white/45 hover:text-white transition-colors -mr-1 -mt-1 p-1"
              aria-label="Zamknij i odrzuć cookies opcjonalne"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p id="cookie-consent-desc" className="text-sm text-white/70 leading-relaxed">
            Używamy plików cookies oraz&nbsp;podobnych technologii w&nbsp;celu zapewnienia
            działania serwisu, analizy ruchu (Google Analytics) oraz&nbsp;personalizacji
            komunikacji marketingowej (Google Ads). Dopóki nie dokonasz wyboru,
            aktywne są wyłącznie cookies niezbędne. Szczegóły znajdziesz w{" "}
            <a href="/polityka-prywatnosci" className="text-primary underline hover:no-underline">
              polityce prywatności
            </a>
            .
          </p>

          {showSettings && (
            <div className="mt-5 space-y-3">
              <ConsentSwitch
                label="Niezbędne"
                description={"Wymagane do\u00A0podstawowego działania serwisu (sesja, formularz kontaktowy)."}
                checked
                disabled
                onChange={() => {}}
              />
              <ConsentSwitch
                label="Analityczne"
                description={"Anonimowy ruch i\u00A0statystyki odwiedzin (Google Analytics, GTM)."}
                checked={analytics}
                onChange={setAnalytics}
              />
              <ConsentSwitch
                label="Marketingowe"
                description={"Reklama i\u00A0remarketing (Google Ads, Google Merchant Center)."}
                checked={marketing}
                onChange={setMarketing}
              />
            </div>
          )}

          <div className="mt-5 flex flex-col sm:flex-row gap-2">
            {showSettings ? (
              <Button onClick={saveCustom} className="rounded-full flex-1">
                Zapisz wybór
              </Button>
            ) : (
              <Button onClick={acceptAll} className="rounded-full flex-1">
                Akceptuję wszystkie
              </Button>
            )}
            <Button
              variant="outline"
              onClick={rejectOptional}
              className="rounded-full flex-1 bg-white/5 border-white/15 hover:bg-white/15 text-white"
            >
              Tylko niezbędne
            </Button>
          </div>
          {!showSettings && (
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="mt-3 text-xs text-white/55 hover:text-white transition-colors w-full text-center"
            >
              Dostosuj ustawienia
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsentSwitch({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 cursor-pointer hover:bg-white/[0.05] transition-colors">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 accent-primary shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white">{label}</div>
        <div className="text-xs text-white/55 leading-snug mt-0.5">{description}</div>
      </div>
    </label>
  );
}

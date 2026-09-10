// Testy przeglądarkowe (jsdom) banera cookies pod kątem zgodności z RODO.
//
// Weryfikują, że:
//  - modal blokuje stronę (overlay + zablokowany scroll) dopóki użytkownik nie wybierze,
//  - Escape oraz przycisk X NIGDY nie oznaczają akceptacji (zawsze odrzucenie opcjonalnych),
//  - domyślne przełączniki analityczne/marketingowe są wyłączone, niezbędne zablokowane,
//  - dataLayer dostaje cookie_consent, a przy skonfigurowanym GTM także consent_update,
//  - focus pozostaje uwięziony w modalu (focus trap).
//
// Uruchamianie: pnpm --filter @workspace/stekro run test:consent

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleTagManager } from "@/components/gtm";

const CONSENT_KEY = "stekro_cookie_consent_v1";

type DataLayerEntry = Record<string, unknown>;

function dataLayer(): DataLayerEntry[] {
  return (window.dataLayer as DataLayerEntry[] | undefined) ?? [];
}

function consentEvents(name: string): DataLayerEntry[] {
  return dataLayer().filter((e) => e.event === name);
}

function storedConsent(): { analytics: boolean; marketing: boolean } | null {
  const raw = localStorage.getItem(CONSENT_KEY);
  return raw ? JSON.parse(raw) : null;
}

beforeEach(() => {
  localStorage.clear();
  window.dataLayer = [];
  document.body.style.overflow = "";
});

afterEach(() => {
  cleanup();
  document.getElementById("gtm-script")?.remove();
});

describe("CookieConsent – modal blokujący", () => {
  it("bez zapisanej zgody pokazuje modal z overlayem i blokuje scroll strony", () => {
    const { container } = render(<CookieConsent />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");

    // Overlay przykrywający całą stronę do momentu wyboru.
    const overlay = container.querySelector('[aria-hidden="true"].absolute.inset-0');
    expect(overlay).not.toBeNull();

    // Scroll strony zablokowany, dopóki modal jest otwarty.
    expect(document.body.style.overflow).toBe("hidden");

    // Żaden wybór nie został jeszcze zapisany ani wypchnięty do dataLayer.
    expect(storedConsent()).toBeNull();
    expect(consentEvents("cookie_consent")).toHaveLength(0);
  });

  it("po zapisanej zgodzie nie pokazuje modala, tylko przycisk ustawień", () => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ necessary: true, analytics: true, marketing: false, timestamp: "2026-01-01" }),
    );
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("button", { name: /ustawienia cookies/i })).toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("utrzymuje focus wewnątrz modala (focus trap)", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    const dialog = screen.getByRole("dialog");

    // Pierwszy element dostaje focus automatycznie.
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    // Wielokrotny Tab nie wyprowadza fokusa poza modal.
    for (let i = 0; i < 12; i++) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
    // Shift+Tab też zostaje w pętli.
    await user.tab({ shift: true });
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});

describe("CookieConsent – Escape i X to zawsze odrzucenie", () => {
  it("Escape zapisuje tylko niezbędne i zamyka modal", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(storedConsent()).toMatchObject({ analytics: false, marketing: false });

    const events = consentEvents("cookie_consent");
    expect(events).toHaveLength(1);
    expect(events[0].categories).toMatchObject({ necessary: true, analytics: false, marketing: false });
  });

  it("przycisk X zapisuje tylko niezbędne", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: /zamknij i odrzuć/i }));

    expect(storedConsent()).toMatchObject({ analytics: false, marketing: false });
    expect(consentEvents("cookie_consent")[0].categories).toMatchObject({
      analytics: false,
      marketing: false,
    });
  });

  it("Escape odrzuca opcjonalne nawet po zaznaczeniu przełączników w ustawieniach", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await user.click(screen.getByRole("button", { name: /dostosuj ustawienia/i }));
    await user.click(screen.getByRole("checkbox", { name: /analityczne/i }));
    await user.click(screen.getByRole("checkbox", { name: /marketingowe/i }));

    await user.keyboard("{Escape}");

    // Mimo zaznaczonych przełączników Escape NIE może oznaczać akceptacji.
    expect(storedConsent()).toMatchObject({ analytics: false, marketing: false });
  });
});

describe("CookieConsent – domyślne przełączniki", () => {
  it("analityczne i marketingowe są domyślnie wyłączone, niezbędne włączone i zablokowane", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: /dostosuj ustawienia/i }));

    const necessary = screen.getByRole("checkbox", { name: /niezbędne/i });
    const analytics = screen.getByRole("checkbox", { name: /analityczne/i });
    const marketing = screen.getByRole("checkbox", { name: /marketingowe/i });

    expect(necessary).toBeChecked();
    expect(necessary).toBeDisabled();
    expect(analytics).not.toBeChecked();
    expect(marketing).not.toBeChecked();
  });

  it("'Zapisz wybór' bez zmian zapisuje wyłącznie niezbędne", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: /dostosuj ustawienia/i }));
    await user.click(screen.getByRole("button", { name: /zapisz wybór/i }));

    expect(storedConsent()).toMatchObject({ analytics: false, marketing: false });
  });

  it("'Akceptuję wszystkie' zapisuje pełną zgodę", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: /akceptuję wszystkie/i }));

    expect(storedConsent()).toMatchObject({ analytics: true, marketing: true });
    expect(consentEvents("cookie_consent")[0].categories).toMatchObject({
      analytics: true,
      marketing: true,
    });
  });
});

describe("GTM – consent_update w dataLayer", () => {
  it("index.html ustawia Consent Mode default 'denied' i ładuje GTM statycznie", async () => {
    // Domyślna odmowa zgody i snippet GTM są teraz statycznie w <head> index.html,
    // żeby GTM ładował się jak najwcześniej (wymóg instalacyjny Google).
    const fs = await import("node:fs");
    const path = await import("node:path");
    const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

    const consentIdx = html.indexOf("gtag('consent', 'default'");
    const gtmIdx = html.indexOf("googletagmanager.com/gtm.js");
    expect(consentIdx).toBeGreaterThan(-1);
    expect(gtmIdx).toBeGreaterThan(-1);
    // Default consent musi być PRZED snippetem GTM.
    expect(consentIdx).toBeLessThan(gtmIdx);
    for (const key of ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"]) {
      expect(html).toMatch(new RegExp(`${key}:\\s*'denied'`));
    }
    expect(html).toContain("GTM-W7JL8VC3");
    expect(html).toContain("googletagmanager.com/ns.html?id=GTM-W7JL8VC3");
  });

  it("reaguje consent_update na wybór (odrzucenie = wszystko 'denied')", async () => {
    const user = userEvent.setup();
    render(
      <>
        <GoogleTagManager />
        <CookieConsent />
      </>,
    );

    expect(consentEvents("consent_update")).toHaveLength(0);

    // Odrzucenie (Escape) → consent_update nadal wszystko 'denied'.
    await user.keyboard("{Escape}");
    const updates = consentEvents("consent_update");
    expect(updates).toHaveLength(1);
    expect(updates[0].consent).toMatchObject({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  });

  it("po 'Akceptuję wszystkie' consent_update daje 'granted' dla analityki i marketingu", async () => {
    const user = userEvent.setup();
    render(
      <>
        <GoogleTagManager />
        <CookieConsent />
      </>,
    );
    await user.click(screen.getByRole("button", { name: /akceptuję wszystkie/i }));

    const updates = consentEvents("consent_update");
    expect(updates).toHaveLength(1);
    expect(updates[0].consent).toMatchObject({
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  });
});

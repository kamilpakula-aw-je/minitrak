# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

- **Stekro Mini Trak Landing Page** (`artifacts/stekro`, preview `/`): React/Vite **SSR** landing page. SSR: `server.mjs` (Express; dev = Vite middlewareMode, prod = `dist/public` + `dist/server/entry-server.js`; gzip, cache headers, 301 dla trailing slash, realny HTTP 404 dla nieznanych tras). Trasy: jedno źródło prawdy `src/routes.tsx` (używane przez `App.tsx` i detekcję 404). Meta per trasa serwerowo: `src/lib/seo-head.ts` (mirror `use-seo.ts`); `src/main.tsx` hydratuje (`hydrateRoot`). Build: `vite build` (klient) + `vite build --ssr` (wymaga env PORT+BASE_PATH). `artifact.toml` production: `node artifacts/stekro/server.mjs` (już NIE static serve). Fonty self-hosted w `public/fonts/` (Inter, Space Grotesk, Exo 2; woff2 latin+latin-ext, `font-display: swap`, preload) — Google Fonts usunięte z `index.html` i `index.css`. Landing page dla Stekro Mini Trak (rebrand z STEKRO) — polskiego dealera maszyn rolniczych i komunalnych. SEO: `src/hooks/use-seo.ts` (hook ustawiający title/meta/og/canonical dynamicznie) + `src/lib/seo-map.ts` (mapa pathname → SEOData dla wszystkich tras modeli z aliasami) + `SEOManager` w `App.tsx`. OG image: `public/og-image.png` (1200×630 fotoreal ciągnik). Bazowy meta + JSON-LD AutoDealer w `index.html` (2 adresy: Nowy Targ + Brzezna, 3 contactPoints: sales/parts/service, NIP 7372223088). Wszystkie dane w `src/data/index.ts`: marki/modele ciągników (Solis, LS Tractor, Aupax — 25 modeli; z opcjonalnym `priceFrom`, mapy `PURPOSE_LABELS`/`FUNCTIONALITY_LABELS` + funkcje `derivePurposes`/`deriveFunctionality`). Solis S26 rozbity na 3 karty: `solis-s26` (9+9 bez kabiny), `solis-s26-cab` (9+9 z kabiną, cena na zapytanie, placeholder zdjęcia = `/model-solis-s26.jpeg`, detail page reużywa `/modele/solis-s26` przez alias SEO), `solis-s26-hst` (HST z kabiną). Aupax okrojony — usunięte 1025, seria 5000 (5100/5115/5130) i p5130; zostają 2025/2040/3055/3075/m404, `KroneCategory` interface + `KRONE_CATEGORIES` (6 kategorii maszyn zielonkowych Krone — implementy bez mocy KM: prasy rolujące, kosiarki dyskowe, przetrząsacze, zgrabiarki, przyczepy samozbierające, prasy kostkujące — osobna struktura, NIE w kalkulatorze mocy), maszyny, części, akcesoria, finansowanie. Antonio Carraro całkowicie usunięty. Dedykowana strona `src/pages/krone.tsx` (trasy `/marka/krone` + alias `/krone`) renderowana z `KRONE_CATEGORIES`; sekcja `#krone` na home też z tych danych. Logo Krone: `public/brands/krone.png`. `TEAM = []` (placeholder do czasu uzupełnienia doradców). `CONTACT_INFO`: companyName "Stekro Mini Trak", adres "ul. Królowej Jadwigi 80A, 34-400 Nowy Targ", `temporaryPoint` "Brzezna (tymczasowy punkt sprzedaży)". Logo: `stekro_minitrak_logo_white.png` (ciemne tła) i `stekro_minitrak_logo_dark.png` (jasne tła) w `attached_assets/`. Cookie consent (RODO 3 kategorie) w `components/cookie-consent.tsx` + Google Tag Manager w `components/gtm.tsx` z consent-mode default denied; GTM aktywuje się dopiero gdy ustawiony jest secret `VITE_GTM_ID`. Filtry katalogu: kalkulator mocy + chips Przeznaczenie (OR-logic) + Funkcjonalność (AND-logic). ModelCard pokazuje `od X PLN netto` lub `Cena na zapytanie`. Kontakt sprzedażowy scentralizowany: `CONTACT_INFO.salesPhone = '786 656 715'` + `emailMain` — kontakt do serwisu (`servicePhone`/`emailService`) NIE jest już pokazywany publicznie (klient dostaje rozpiskę serwisową przy zakupie). Sekcje Części (04) i Akcesoria (05) to statyczne bloki kategorii bez liczników pozycji i bez rozwijania podkategorii (usunięty stan `showParts`/`showAccessories`). FAQ = 9 pytań brand-story (nowa marka, gwarancje STEKRO, leasing, raty, komunalne, gdzie obejrzeć). Sekcja 01 „O firmie" = brand-story (2 paragrafy + 5 punktów + zamknięcie). Stats strip bez „5 stacji"; magazyn „10 000+".

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/stekro run dev` — run the STEKRO landing page locally through its configured workflow
- `pnpm run images` — generate missing -400/-800 webp variants for all images in `artifacts/stekro/public/` (idempotent; run after adding new photos)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

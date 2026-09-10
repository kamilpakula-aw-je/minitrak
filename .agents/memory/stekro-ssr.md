---
name: Stekro SSR setup
description: How the stekro artifact's SSR works and its non-obvious constraints
---

- Stekro is SSR via Express (`artifacts/stekro/server.mjs`), not static. Production in `artifact.toml` runs `node artifacts/stekro/server.mjs`; changing it back to `serve = "static"` breaks per-route meta and 404s.
- **Why:** user's custom skill mandates SSR-by-default for all her sites (SEO: full HTML + real 404 + server-rendered meta).
- **How to apply:** new routes must be added to `src/routes.tsx` (single source of truth for router AND 404 status) and `src/lib/seo-map.ts`. Server-side head tags come from `src/lib/seo-head.ts` — keep it mirroring `src/hooks/use-seo.ts` 1:1.
- `vite.config.ts` throws without `PORT` and `BASE_PATH` env — shell builds need `PORT=23785 BASE_PATH=/ pnpm run build`.
- Trailing-slash URLs 301-redirect to no-slash (SEO canonical); without it `getSEO()` missed aliases.
- Fonts are self-hosted woff2 in `public/fonts/` per the user's FONTY skill; don't reintroduce Google Fonts links.
- Images: all site photos are WebP (public/ and attached_assets referenced via @assets). **Why:** user's OBRAZY skill + a 2026-08 slow-load complaint caused by multi-MB PNG/JPG (18 MB poster). **How to apply:** any new image gets `magick <src> -resize "1600x1600>" -quality 82 <dst>.webp` before referencing; never commit raw PNG/JPG into public/.
- JSON-LD: route-specific blocks (BreadcrumbList + ItemPage for machine pages — never Product, no prices/ratings) come from src/lib/schema.ts; SSR injects via seo-head, client syncs `script[data-route-jsonld]` on SPA nav only when content changes. SSR tests assert counts/canonical URLs.

## Hero video / obrazy — wydajność
- Wideo hero na home (`public/solis-s22-hero.mp4`) musi zostać krótkie (~24 s) i skompresowane (~3 MB, H.264 CRF 30, faststart) z `preload="metadata"`. Wcześniej 101 s / 19 MB z `preload="auto"` było główną przyczyną wolnego ładowania.
- Wszystkie obrazy poniżej foldu (katalog modeli itd.) mają mieć `loading="lazy" decoding="async"`; hero/nav zostają eager.

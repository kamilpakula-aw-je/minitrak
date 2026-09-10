---
name: express.static vs SSR trailing-slash
description: Why stekro's static middleware must have redirect:false
---
The SSR server 301-redirects trailing slashes away (`/x/` → `/x`), while `express.static`'s default `redirect: true` sends `/dir` → `/dir/` when a same-named directory exists in `public/` (e.g. `public/krone` vs SSR route `/krone`) — creating a 301 loop.

**Why:** caught by the SSR integration test; `/krone` looped between the two middlewares.

**How to apply:** keep `redirect: false` in `express.static` options in `artifacts/stekro/server.mjs`; avoid adding public/ directories named like routes, and if serving static dirs elsewhere with SSR trailing-slash normalization, disable static redirects there too.

---
name: Lead retry loop test
description: How the e-mail retry loop is tested with a mocked mailer and DI
---
Run: `pnpm --filter @workspace/api-server run test:retry`.

- `retryFailedLeads()` accepts an optional `Partial<LeadRetryDeps>` override (mailer, lead query, photo download, status update) — production defaults unchanged.
- The test bundles `tests/lead-retry-harness.ts` with esbuild (must BUNDLE `@workspace/db`/drizzle-zod/zod since lib/db exports .ts sources and drizzle-zod isn't a dep of api-server; pg/drizzle-orm/pino stay external).
- Harness scopes `getFailedLeads()` results to a marker name prefix so real "failed" leads in the dev DB are never touched or falsely flipped to "sent". Never run the retry pass unscoped in tests.
- **Why:** spawning the full server for retry tests is unsafe — its retry loop would process real failed leads.

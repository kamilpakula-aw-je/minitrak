---
name: Leads preview integration test
description: How the /api/leads filters+pagination integration test works and its safety constraints
---

Run: `pnpm --filter @workspace/api-server run test:leads` (node --test, tests/leads-preview.test.mjs).

**Rules:**
- The test seeds a few hundred leads directly into the dev database with a unique `LEADTEST<ts>` name marker, isolates all assertions via `q=<marker>`, and deletes them in `after()`.
- The spawned server MUST have `GMAIL_USER`/`GMAIL_APP_PASSWORD` removed from env — otherwise the lead retry loop would send real e-mails for seeded leads. Never seed leads with `email_status='failed'` either: the always-running dev workflow server has the mailer configured and would resend them.
- **Why:** the retry loop does one pass shortly after startup and every 15 min on any `failed` lead.
- **How to apply:** when extending the leads preview (CSV export, "oddzwoniono" status), extend this test and keep the seed status set to non-retried statuses (`sent`/`pending`).

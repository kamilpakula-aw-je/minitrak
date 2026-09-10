---
name: Leads admin preview & photo endpoint
description: How the protected leads preview and lead-photo serving work on the API server
---

- The leads preview and photo endpoints live on the API server under `/api/leads` and `/api/leads/:id/photos/:index`, protected with HTTP Basic auth checked against the `ADMIN_PASSWORD` secret (username ignored, timing-safe compare). Reuse the same `requireAdmin` middleware for any future admin/lead endpoints (CSV export, status updates) so protection stays consistent.
- **Why:** ADMIN_PASSWORD is the only admin credential in this project; Basic auth needs no session infra and works in a plain browser tab.
- **How to apply:** import `requireAdmin` from the leads router; photo URLs in the preview HTML are relative (`leads/<id>/photos/<i>`) so they work behind the `/api` path prefix and the Replit proxy.
- Dev DB schema drift: if a query fails with a missing column, run `pnpm run push` in `lib/db` (drizzle-kit push) — parallel task branches may merge schema changes without the dev DB being migrated.

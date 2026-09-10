---
name: Lead photo storage
description: How trade-in lead photos persist in object storage and the retry-attachment rule
---
Trade-in photos upload server-side to the private object storage dir (`PRIVATE_OBJECT_DIR` already includes the bucket: `/<bucket>/.private`); metadata lives in `leads.photos` jsonb.

**Why:** e-mail retry must re-attach photos; an incomplete resend is worse than a delayed one, so any photo download failure keeps the lead `failed` for the next cycle. Legacy leads with `photosCount > 0` but empty `photos` get the "could not re-attach" note instead.

**How to apply:** when touching lead retry or lead photo serving, never send a trade-in resend with a partial photo set; production schema changes apply via Replit Publish (no startup DDL).

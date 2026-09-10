---
name: Lead submission idempotency
description: Durable rule for preventing duplicate lead records and side effects during client retries.
---

Atomically claim a client-generated request key through a database uniqueness constraint before performing uploads, e-mail delivery, or other side effects. A retry must reuse its original key; only a completed intentional new submission rotates it.

**Why:** Application-level read-then-insert checks race under concurrent retries, and claiming after side effects can still duplicate e-mails or create orphaned uploads.

**How to apply:** Any new lead form or side effect added to lead intake must participate in the same claim-first flow. Keep legacy rows compatible without weakening the requirement for new public submissions.
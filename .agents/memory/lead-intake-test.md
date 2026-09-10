---
name: Lead intake e-mail failure semantics
description: How lead e-mail statuses behave and how tests simulate mail failure safely
---

- "not_configured" (missing GMAIL_*) and "failed" (configured mailer whose SMTP send throws) are distinct statuses; the retry loop only retries "failed" and only when the mailer is configured. Tests asserting the "lead never lost" guarantee must cover BOTH.
- Deterministic SMTP failure in tests: set fake GMAIL_* plus SMTP_HOST=127.0.0.1 with a closed port (mailer honors SMTP_HOST/SMTP_PORT overrides) — no external network traffic.
- Any test server spawned with a working-looking mailer config must be killed before its retry loop's first pass (~5 s after start), or it will touch real "failed" leads in the dev DB.
- Spawned test servers should also strip PRIVATE_OBJECT_DIR so multipart uploads leave no files in object storage (photosCount is still recorded).

**Why:** guards the business guarantee that a form submission never gets lost even when e-mail delivery fails, without side effects on real data.

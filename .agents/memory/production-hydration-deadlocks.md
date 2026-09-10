---
name: Production hydration deadlocks
description: Preventing silent React hydration failure caused by top-level await and code-split route cycles.
---

Do not use top-level await in the client entry to load the current lazy route before hydration. Start an asynchronous bootstrap without awaiting it at module scope, so the entry module can finish initializing before route chunks consume shared exports.

**Why:** A production-only circular dependency can occur when the entry waits for a code-split page and that page imports shared symbols emitted into the entry chunk. The browser downloads every script without logging an error, but the module promise never resolves and React never hydrates. SSR HTML remains visible while tabs, selects, buttons, cookie controls, and URL-parameter effects all appear silently broken.

**How to apply:** Keep the entry module synchronous at its top level, invoke an async bootstrap with explicit error logging, and verify a real production build in a browser. Confirm both React attachment markers and representative interactions rather than relying only on SSR HTML or development mode.
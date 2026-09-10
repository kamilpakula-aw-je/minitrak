---
name: Browser harness TrustedHTML
description: How to distinguish application TrustedHTML failures from errors injected by browser-testing helpers.
---

Treat a TrustedHTML or innerHTML error whose stack points only to `<anonymous>` functions named `SmoothPointer` or `onReady` as browser-harness noise, not an application failure.

**Why:** The human-pointer helper used by browser testing injects its own script and assigns to `innerHTML`. Under Trusted Types this can produce the same console wording as a real application bug.

**How to apply:** Re-run the flow with direct Playwright locator actions and inspect source URLs/stacks. Application acceptance still requires no hydration, TrustedHTML, innerHTML, or React errors originating from the app bundle.
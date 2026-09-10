---
name: SSR select restoration
description: How to prevent SSR product configurators from showing selected options while React still treats the configuration as empty.
---

For SSR forms and configurators, do not rely only on controlled React select state when browsers may restore previous field values. Preserve the DOM selection and synchronize state from refs on mount, pageshow, focus, visibility changes, and native input/change events.

**Why:** A production browser can visually restore valid select values during hydration while React state remains empty. The fields then look complete, but derived prices and purchase links stay disabled without any console error.

**How to apply:** Use uncontrolled selects where restored values matter, read their refs after hydration, and keep native input/change listeners as a fallback alongside React handlers. Cover both browser-restoration and native-input paths in tests.
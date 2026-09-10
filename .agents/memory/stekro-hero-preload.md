---
name: Hero LCP preload sync
description: Keep hero image srcset and SSR head preload in lockstep on stekro
---
Rule: the hero `<img srcSet/sizes>` (HeroBackground) and the homepage-only `<link rel="preload" imagesrcset/imagesizes>` built in seo-head.ts must stay identical, or the browser downloads two hero variants.

**Why:** PageSpeed mobile task added responsive hero variants (640/960/1408 webp, generated with ImageMagick `convert -resize -quality ~70`). A mismatched preload double-fetches and hurts LCP instead of helping.

**How to apply:** when changing hero art or adding variants, update both places; also note React 19 SSR auto-emits its own preload for images with fetchPriority="high" — browsers dedupe identical resources, so keep attribute values identical.

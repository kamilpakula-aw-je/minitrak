---
name: "@workspace/db stale types"
description: Fixing bogus "has no exported member" errors from @workspace/db
---
Rule: when `tsc` in an artifact reports `Module '"@workspace/db"' has no exported member ...` for symbols that clearly exist in `lib/db/src`, rebuild the db package's declaration output (`cd lib/db && pnpm exec tsc -b`).

**Why:** artifact typechecks resolve `@workspace/db` through project references / `lib/db/dist` `.d.ts`, which go stale after schema files are added.

**How to apply:** rebuild before chasing phantom export problems.

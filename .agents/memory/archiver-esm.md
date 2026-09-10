---
name: archiver v8 ESM exports
description: How to import/use archiver v8 in the api-server (no default factory)
---
archiver v8 is pure ESM with named class exports — there is no default `archiver("zip", opts)` factory. Use `import { ZipArchive } from "archiver"` and `new ZipArchive({ zlib: { level } })`.
**Why:** @types/archiver@8 has no callable default; default import fails typecheck (no esModuleInterop in tsconfig.base).
**How to apply:** any ZIP/TAR streaming in api-server; append GCS read streams and `await archive.finalize()`.

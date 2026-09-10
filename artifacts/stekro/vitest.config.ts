import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Konfiguracja testów przeglądarkowych (jsdom) dla komponentów React.
// Uruchamianie: pnpm --filter @workspace/stekro run test:consent
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "../../attached_assets"),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.tsx"],
    setupFiles: ["tests/setup.ts"],
    env: {
      // GTM musi być "skonfigurowany" w testach, żeby zweryfikować consent_update.
      VITE_GTM_ID: "GTM-TEST123",
    },
  },
});

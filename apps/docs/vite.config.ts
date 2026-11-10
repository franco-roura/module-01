import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

// The docs are served from https://franco-roura.github.io/module-01/.
export default defineConfig({
  base: "/module-01/",
  plugins: [react(), tailwindcss()],
  // The server build (for prerendering) bundles everything, so it runs as one plain Node module.
  ssr: { noExternal: true },
  build: { chunkSizeWarningLimit: 1200 },
});

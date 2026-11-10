import { defineConfig } from "vite-plus";

export default defineConfig({
  // One ESM file per source file, so apps tree-shake down to the components they import.
  pack: {
    entry: ["src/index.ts", "src/finance.ts", "src/charts.ts", "src/site.ts"],
    format: "esm",
    platform: "neutral",
    target: "es2022",
    unbundle: true,
    dts: true,
    sourcemap: true,
    clean: true,
    // Unbundled output keeps "use client" at the top of each file, so the bundling caveat
    // Rolldown warns about does not apply.
    inputOptions: {
      onLog(level, log, handler) {
        if (log.code !== "MODULE_LEVEL_DIRECTIVE") handler(level, log);
      },
    },
  },
  test: {
    environment: "happy-dom",
    include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.ts", "test/**/*.test.{ts,tsx}"],
  },
});

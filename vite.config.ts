import { defineConfig } from "vite-plus";

// Shared formatting and lint rules for every package. Builds and tests are configured in each
// package's own vite.config.ts.
export default defineConfig({
  fmt: {
    printWidth: 100,
    singleQuote: false,
    semi: true,
    trailingComma: "all",
    ignorePatterns: ["**/dist/**", "**/CHANGELOG.md", "**/*.generated.*", "**/generated/**"],
  },
  lint: {
    ignorePatterns: ["**/dist/**", "**/generated/**"],
    options: { typeAware: true, typeCheck: true },
    overrides: [
      {
        // The chart primitives follow shadcn/ui's source, which formats Recharts keys loosely.
        files: ["packages/module-01/src/components/chart.tsx"],
        rules: { "typescript/restrict-template-expressions": "off" },
      },
    ],
  },
  staged: { "*": "vp check --fix" },
});

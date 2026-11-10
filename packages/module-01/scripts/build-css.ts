// Builds the stylesheets the package publishes, after `vp pack` has written dist/:
//   dist/theme.css   Tailwind v4 preset: tokens, kit utilities, base layer, and an @source over
//                    the built components so the consuming app's Tailwind sees their classes.
//   dist/tokens.css  The tokens as plain custom properties, for use without Tailwind.
//   dist/styles.css  theme.css compiled by Tailwind, for apps that do not run it.

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const dir = join(import.meta.dirname, "..");
const dist = join(dir, "dist");
const read = (path: string) => readFileSync(join(dir, path), "utf8");

const tokens = read("src/styles/tokens.generated.css");
const banner = "/* Module/01 — https://franco-roura.github.io/module-01/ */";

mkdirSync(dist, { recursive: true });

writeFileSync(
  join(dist, "theme.css"),
  [
    banner,
    '@import "tw-animate-css";',
    '@source "./";',
    "",
    tokens,
    read("src/styles/kit.css"),
    read("src/styles/base.css"),
  ].join("\n"),
);

// @theme is Tailwind syntax; without Tailwind the same declarations go on :root.
const plainTokens = tokens
  .replace("@theme static {", ":root {")
  .split("\n")
  .filter((line) => !/^\s*--[a-z]+-\*: initial;$/.test(line))
  .join("\n");
writeFileSync(join(dist, "tokens.css"), plainTokens);

const require = createRequire(import.meta.url);
const cliPackage = require.resolve("@tailwindcss/cli/package.json");
const cliBin = (JSON.parse(readFileSync(cliPackage, "utf8")) as { bin: Record<string, string> }).bin
  .tailwindcss;
if (!cliBin) throw new Error("@tailwindcss/cli has no tailwindcss bin");

const input = join(dist, ".styles.input.css");
writeFileSync(input, '@import "tailwindcss";\n@import "./theme.css";\n');
try {
  execFileSync(
    process.execPath,
    [join(dirname(cliPackage), cliBin), "-i", input, "-o", join(dist, "styles.css"), "--minify"],
    { cwd: dir, stdio: "inherit" },
  );
} finally {
  rmSync(input);
}

// Builds src/generated/data.json for the docs site:
//   - props tables, read from the package's component types with react-docgen-typescript;
//   - component guidelines and the changelog, rendered from Markdown;
//   - the source of every example function in src/examples, shown under its live render.

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { marked } from "marked";
import { withCustomConfig } from "react-docgen-typescript";
import ts from "typescript";

const docs = join(import.meta.dirname, "..");
const pkg = join(docs, "../../packages/module-01");
const read = (path: string) => readFileSync(path, "utf8");
const md = (source: string) => marked.parse(source, { async: false });

// --- Props ---------------------------------------------------------------------------------

type Prop = {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string | null;
  description: string;
};

const componentFiles = readdirSync(join(pkg, "src/components"))
  .filter((file) => file.endsWith(".tsx") && !file.includes(".test."))
  .map((file) => join(pkg, "src/components", file));

const parser = withCustomConfig(join(pkg, "tsconfig.json"), {
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  savePropValueAsString: true,
  // Only the props the kit declares: native element and Radix props are linked to instead.
  propFilter: (prop) =>
    !prop.declarations?.length ||
    prop.declarations.some((d) => !d.fileName.includes("node_modules")),
});

const props: Record<string, Prop[]> = {};
for (const doc of parser.parse(componentFiles)) {
  props[doc.displayName] = Object.values(doc.props)
    .map((prop) => ({
      name: prop.name,
      type: (prop.type.raw ?? prop.type.name).replaceAll(" | null", ""),
      required: prop.required,
      defaultValue: (prop.defaultValue as { value?: string } | null)?.value ?? null,
      description: prop.description,
    }))
    .sort((a, b) => Number(b.required) - Number(a.required) || a.name.localeCompare(b.name));
}

// --- Guidelines ----------------------------------------------------------------------------

// Each guideline is "# Name", a one-paragraph summary, then the rules.
const guidelines: Record<string, { summary: string; html: string }> = {};
for (const file of readdirSync(join(pkg, "guidelines"))) {
  if (file === "README.md") continue;
  const [, summary = "", ...rest] = read(join(pkg, "guidelines", file))
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/);
  guidelines[basename(file, ".md")] = {
    summary: md(summary),
    html: md(rest.join("\n\n")),
  };
}

// --- Example sources -----------------------------------------------------------------------

const sources: Record<string, Record<string, string>> = {};
for (const file of readdirSync(join(docs, "src/examples"))) {
  if (!file.endsWith(".tsx")) continue;
  const source = ts.createSourceFile(
    file,
    read(join(docs, "src/examples", file)),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const functions: Record<string, string> = {};
  source.forEachChild((node) => {
    if (!ts.isFunctionDeclaration(node) || !node.name) return;
    const exported = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (exported) functions[node.name.text] = node.getText(source).replace(/^export /, "");
  });
  sources[basename(file, ".tsx")] = functions;
}

// --- Write ---------------------------------------------------------------------------------

const manifest = JSON.parse(read(join(pkg, "package.json"))) as { name: string; version: string };

mkdirSync(join(docs, "src/generated"), { recursive: true });
writeFileSync(
  join(docs, "src/generated/data.json"),
  JSON.stringify({
    name: manifest.name,
    version: manifest.version,
    changelog: md(read(join(pkg, "CHANGELOG.md")).replace(/^# .*\n/, "")),
    guidelines,
    props,
    sources,
  }),
);
console.log(
  `docs data: ${Object.keys(props).length} components, ${Object.keys(guidelines).length} guidelines, ${Object.keys(sources).length} example files`,
);

// Renders every route to its own HTML file, so deep links work on GitHub Pages and the pages
// read without JavaScript. Runs after `vp build` (client) and `vp build --ssr` (server).

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = join(import.meta.dirname, "..");
const dist = join(root, "dist");

type Server = {
  routes: () => string[];
  render: (path: string) => { html: string; title: string };
};
const server = (await import(
  pathToFileURL(join(root, "dist-server/entry-server.js")).href
)) as Server;

const template = readFileSync(join(dist, "index.html"), "utf8");
const page = (path: string) => {
  const { html, title } = server.render(path);
  // Replacer functions, because a "$" in the HTML would otherwise be read as a pattern.
  return template
    .replace("<!--app-->", () => html)
    .replace(/<title>.*<\/title>/, () => `<title>${title}</title>`);
};

const routes = server.routes();
for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(route));
}
// GitHub Pages serves 404.html for unknown paths.
writeFileSync(join(dist, "404.html"), page("/404"));
// Pages would otherwise run Jekyll, which drops files starting with an underscore.
writeFileSync(join(dist, ".nojekyll"), "");

rmSync(join(root, "dist-server"), { recursive: true });
console.log(`prerendered ${routes.length} pages`);

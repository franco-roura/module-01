import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App, documentTitle } from "./app";
import { allRoutes } from "./registry";

// The prerenderer's view of the site: which pages exist and each one's HTML.

export const routes = () => allRoutes;

export function render(path: string) {
  const html = renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
  return { html, title: documentTitle(path) };
}

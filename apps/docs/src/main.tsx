import "./styles.css";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./app";

const root = document.getElementById("root");
if (!root) throw new Error("No #root element");

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered pages hydrate; the dev server's empty shell renders from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);

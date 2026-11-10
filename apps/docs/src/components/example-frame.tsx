import { Button, HudLabel } from "@franco_roura/module-01";
import { useState } from "react";
import { example } from "../registry";
import { data } from "../data";
import { Link } from "../router";
import { CodeBlock } from "./code-block";

/** URL-safe base64 of the source, carried to the playground in the hash. */
export const encodeCode = (code: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(code)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

/** One example: its live render on canvas, then its source. */
export function ExampleFrame({ reference, code }: { reference: string; code: string }) {
  const { Component, file, fn, title } = example(reference);
  const source = data.sources[file]?.[fn] ?? "";
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col gap-3">
      <HudLabel code={code}>{title}</HudLabel>
      <div className="rounded-lg border border-seam bg-canvas p-5 sm:p-8">
        <Component />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Hide code" : "Show code"}
        </Button>
        <Button variant="bracket" size="sm" asChild>
          <Link to={`/playground#code=${encodeCode(source)}`}>Open in playground</Link>
        </Button>
      </div>
      {open && <CodeBlock code={source} />}
    </section>
  );
}

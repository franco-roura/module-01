import * as core from "@franco_roura/module-01";
import * as charts from "@franco_roura/module-01/charts";
import * as finance from "@franco_roura/module-01/finance";
import * as site from "@franco_roura/module-01/site";
import * as icons from "lucide-react";
import * as React from "react";
import { LiveEditor as Editor, LiveError, LivePreview, LiveProvider } from "react-live";
import { toast } from "sonner";

// Everything an example can reference. The icons come first so a kit export wins a name clash.
// Module namespaces carry a `default` key, which is not a usable variable name.
const scope = Object.fromEntries(
  Object.entries({ ...icons, ...React, ...core, ...finance, ...charts, ...site, toast }).filter(
    ([name]) => name !== "default",
  ),
);

/** Editable source on visor beside its live render. Loaded only on the playground page. */
export function LiveEditor({ code }: { code: string }) {
  return (
    <LiveProvider code={code} scope={scope} language="tsx" enableTypeScript>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md bg-visor">
          <div className="hud-sm px-5 pt-3 text-visor-mark">Code</div>
          <Editor
            className="font-mono text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-5 [&_textarea]:!p-5 [&_textarea]:outline-none"
            aria-label="Playground code"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="min-h-64 rounded-lg border border-seam bg-canvas p-5 sm:p-8">
            <LivePreview />
          </div>
          <LiveError className="overflow-x-auto rounded-md bg-danger-tint px-4 py-3 font-mono text-[13px] whitespace-pre-wrap text-danger" />
        </div>
      </div>
    </LiveProvider>
  );
}

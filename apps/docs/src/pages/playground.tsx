import { SectionHeader, Skeleton } from "@franco_roura/module-01";
import { type ComponentType, useEffect, useState } from "react";

const starter = `function Demo() {
  const [count, setCount] = useState(0);
  return (
    <Panel serial="P-01 · PLAYGROUND" hinge="32px" cross className="max-w-md">
      <SectionHeader as="h2" code="S-01" label="Counter" title="Press the button" />
      <div className="mt-6 flex items-center gap-4">
        <Button arrow onClick={() => setCount(count + 1)}>
          Add one
        </Button>
        <Amount minor={BigInt(count * 100)} currency="USD" minorUnits={2} size="lg" />
      </div>
    </Panel>
  );
}`;

/** "#code=<url-safe base64>" from an example's "Open in playground" link. */
function codeFromHash(): string | null {
  const match = /^#code=(.+)$/.exec(window.location.hash);
  if (!match?.[1]) return null;
  try {
    const binary = atob(match[1].replace(/-/g, "+").replace(/_/g, "/"));
    return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
  } catch {
    return null;
  }
}

/**
 * The editor compiles code in the browser, so it only loads here and only after hydration:
 * no other page pays for it.
 */
export function PlaygroundPage() {
  const [Live, setLive] = useState<ComponentType<{ code: string }> | null>(null);
  const [code, setCode] = useState(starter);

  useEffect(() => {
    setCode(codeFromHash() ?? starter);
    void import("../components/live-editor").then((module) => setLive(() => module.LiveEditor));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader code="S-04" label="Try it" title="Playground" ruler />
      <p className="max-w-[70ch] text-ink-soft">
        Edit the code and the preview follows. Every export of the kit is in scope, along with
        React's hooks, <code className="font-mono">toast</code> and the Lucide icons. Write one
        component, or a single JSX expression.
      </p>
      {Live ? (
        <Live key={code} code={code} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-96 rounded-md" />
          <Skeleton className="h-96 rounded-lg" />
        </div>
      )}
    </div>
  );
}

import { Button, cn } from "@franco_roura/module-01";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

/** Source on visor, with a copy button. */
export function CodeBlock({
  code,
  title,
  className,
}: {
  code: string;
  title?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("relative rounded-md bg-visor text-shell", className)}>
      {title && <div className="hud-sm px-5 pt-3 text-visor-mark">{title}</div>}
      <pre className="overflow-x-auto px-5 py-4 pr-14 font-mono text-[13px] leading-relaxed">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={copied ? "Copied" : "Copy code"}
        onClick={copy}
        className="absolute top-2 right-2 text-visor-mark hover:bg-shell/10 hover:text-shell"
      >
        {copied ? <Check strokeWidth={1.25} /> : <Copy strokeWidth={1.25} />}
      </Button>
    </div>
  );
}

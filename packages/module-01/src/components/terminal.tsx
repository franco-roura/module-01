import { cn } from "../lib/utils";

export type TerminalProps = {
  /** One command per line; each gets a signal `$` prompt. */
  lines: string[];
  /** Microprint above the lines. */
  title?: string;
  className?: string;
};

/** Terminal snippet on visor: black glass, shell text, signal prompts. */
export function Terminal({ lines, title, className }: TerminalProps) {
  return (
    <div className={cn("rounded-md bg-visor px-6 py-4 font-mono text-code text-shell", className)}>
      {title && <div className="hud-sm mb-2 text-visor-mark">{title}</div>}
      {lines.map((line, index) => (
        <div key={index}>
          <span aria-hidden className="text-signal select-none">
            ${" "}
          </span>
          {line}
        </div>
      ))}
    </div>
  );
}

import { cn } from "@franco_roura/module-01";

/** Markdown rendered to HTML at build time by scripts/generate.ts, from files in this repo. */
export function Prose({
  html,
  compact,
  className,
}: {
  html: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("prose max-w-[70ch]", compact && "prose-compact", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

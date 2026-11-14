import { cn } from "../lib/utils";
import type * as React from "react";

export type SharePart = {
  /** This part's size, in any unit; parts are drawn relative to their sum. */
  share: number;
  /** What the part is, e.g. "To the models". */
  label: React.ReactNode;
  /** Fill. Defaults by position: signal, ink, tint, seam. */
  tone?: "signal" | "ink" | "tint" | "seam";
};

const tones = ["signal", "ink", "tint", "seam"] as const;

const fill: Record<NonNullable<SharePart["tone"]>, string> = {
  signal: "bg-signal",
  ink: "bg-ink",
  tint: "bg-signal-tint",
  seam: "bg-seam",
};

/**
 * Parts of one whole on one sunken track (an 80/20 split, a budget by category), with a legend
 * that names each part and its percentage. The legend carries the meaning; the fills only echo it.
 */
export function ShareBar({
  parts,
  label,
  percent = true,
  size = "md",
  className,
}: {
  /** Two to five parts, in reading order. */
  parts: SharePart[];
  /** Accessible name for the whole, e.g. "Where each dollar goes". */
  label: string;
  /** Shows each part's rounded percentage in the legend. */
  percent?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const total = parts.reduce((sum, part) => sum + Math.max(part.share, 0), 0);
  const items = parts.map((part, i) => {
    const ratio = total > 0 ? Math.max(part.share, 0) / total : 0;
    return { ...part, ratio, tone: part.tone ?? tones[i % tones.length] ?? "signal" };
  });

  return (
    <div
      role="group"
      aria-label={label}
      data-slot="share-bar"
      className={cn("flex flex-col gap-3", className)}
    >
      <div
        aria-hidden
        className={cn(
          "flex gap-0.5 overflow-hidden rounded-full bg-shell-recess p-0.5 shadow-press",
          size === "sm" && "h-3",
          size === "md" && "h-4",
          size === "lg" && "h-6",
        )}
      >
        {items.map((item, i) =>
          item.ratio > 0 ? (
            <span
              key={i}
              className={cn("h-full rounded-full", fill[item.tone])}
              style={{ flexGrow: item.ratio, flexBasis: 0 }}
            />
          ) : null,
        )}
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-body-sm text-ink">
            <span
              aria-hidden
              className={cn(
                "size-2.5 shrink-0 rounded-full",
                fill[item.tone],
                (item.tone === "tint" || item.tone === "seam") &&
                  "shadow-[inset_0_0_0_1px_var(--color-hud-mark)]",
              )}
            />
            {percent && (
              <span className="font-mono text-hud-num tabular-nums">
                {Math.round(item.ratio * 100)}%
              </span>
            )}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

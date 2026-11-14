import { cn } from "../lib/utils";
import { CheckIcon, XIcon } from "lucide-react";
import type * as React from "react";

export type CompareItem = {
  /** The old way, crossed out. */
  instead: React.ReactNode;
  /** The new way, checked. */
  get: React.ReactNode;
};

/**
 * Before and after, line by line: a recessed cross for the old way, a signal check for the new.
 * Each line carries its label for screen readers, so the icons are never the only cue.
 */
export function CompareList({
  items,
  insteadLabel = "Instead of",
  getLabel = "You get",
  showLabels = false,
  className,
}: {
  items: CompareItem[];
  /** Names the old way, e.g. "Instead of". Read aloud before each line. */
  insteadLabel?: string;
  /** Names the new way, e.g. "With Northwind". Read aloud before each line. */
  getLabel?: string;
  /** Shows both labels as microprint above the lines too. */
  showLabels?: boolean;
  className?: string;
}) {
  return (
    <ul data-slot="compare-list" className={cn("flex flex-col gap-5", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex flex-col gap-2.5">
          <CompareLine kind="instead" label={insteadLabel} showLabel={showLabels}>
            {item.instead}
          </CompareLine>
          <CompareLine kind="get" label={getLabel} showLabel={showLabels}>
            {item.get}
          </CompareLine>
        </li>
      ))}
    </ul>
  );
}

function CompareLine({
  kind,
  label,
  showLabel,
  children,
}: {
  kind: "instead" | "get";
  label: string;
  showLabel: boolean;
  children: React.ReactNode;
}) {
  const Icon = kind === "get" ? CheckIcon : XIcon;
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className={cn(
          "mt-px flex size-6 shrink-0 items-center justify-center rounded-full",
          kind === "get"
            ? "bg-signal text-ink shadow-mold"
            : "bg-shell-recess text-ink-soft shadow-press",
        )}
      >
        <Icon strokeWidth={1.25} className="size-3.5" />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        {showLabel ? (
          <span className="hud-sm text-ink-soft">{label}</span>
        ) : (
          <span className="sr-only">{label}: </span>
        )}
        <span
          className={cn(
            "text-body-md",
            kind === "get" ? "font-semibold text-ink" : "text-ink-soft",
          )}
        >
          {children}
        </span>
      </div>
    </div>
  );
}

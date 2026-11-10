import type * as React from "react";
import { cn } from "../lib/utils";

export type SpecItem = {
  label: string;
  value: React.ReactNode;
};

/** A row of spec cells: HUD label over a bold value, split by seams. Stacks on phones. */
export function SpecReadout({ items, className }: { items: SpecItem[]; className?: string }) {
  return (
    // Every cell has a seam on its left; the negative margin tucks each row's first seam under
    // the clipped edge, however the cells wrap.
    <div className={cn("overflow-hidden", className)}>
      <dl className="grid gap-y-4 sm:-ml-[17px] sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-seam max-sm:border-t max-sm:pt-4 max-sm:first:border-t-0 max-sm:first:pt-0 sm:border-l sm:pl-4"
          >
            <dt className="hud mb-1.5 text-ink-soft">{item.label}</dt>
            <dd className="text-label text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

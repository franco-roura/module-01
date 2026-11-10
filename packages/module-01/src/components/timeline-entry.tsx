import type * as React from "react";
import { Fragment } from "react";
import { cn } from "../lib/utils";
import { Tag } from "./tag";

export type TimelineEntryProps = {
  /** What happened: a role, a release, a milestone. */
  title: React.ReactNode;
  /** Who or where: a company, a team, a product. */
  subtitle?: React.ReactNode;
  /** Start date as text, e.g. "2022.03". */
  start: string;
  /** End date as text. Omitted, it reads "Now". */
  end?: string;
  /** Fills the timeline node with signal. */
  current?: boolean;
  /** Entry code, e.g. "R-03". */
  code?: string;
  /** One more line under the dates, e.g. a place or a version. */
  detail?: string;
  /** Bullets: start each with a verb and carry one result. */
  points?: React.ReactNode[];
  tags?: string[];
  /** Renders a tag yourself, e.g. as an interactive Tag. */
  renderTag?: (tag: string) => React.ReactNode;
  className?: string;
};

/** One entry on a timeline (a job, a release, a milestone): dates and code, a node on the track, then title, subtitle and bullets. */
export function TimelineEntry({
  title,
  subtitle,
  start,
  end,
  current,
  code,
  detail,
  points,
  tags,
  renderTag,
  className,
}: TimelineEntryProps) {
  return (
    <article
      className={cn("grid grid-cols-[24px_1fr] gap-x-4 md:grid-cols-[180px_24px_1fr]", className)}
    >
      <div className="col-start-2 row-start-1 flex flex-col gap-1.5 pt-0.5 max-md:pb-2 md:col-start-1">
        <span className="font-mono text-hud-num text-ink">
          {start} — {end ?? "Now"}
        </span>
        {code && <span className="hud-sm text-hud-mark">{code}</span>}
        {detail && <span className="hud-sm text-ink-soft">{detail}</span>}
      </div>
      <div
        aria-hidden
        className="relative col-start-1 row-span-2 row-start-1 before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-seam md:col-start-2 md:row-span-1"
      >
        <span
          className={cn(
            "absolute top-1 left-1 size-4 rounded-full",
            current
              ? "bg-signal shadow-[0_0_0_4px_var(--color-canvas)]"
              : "bg-shell shadow-[0_0_0_4px_var(--color-canvas),inset_0_0_0_2px_var(--color-hud-mark)]",
          )}
        />
      </div>
      <div className="col-start-2 row-start-2 flex flex-col gap-2 pb-12 md:col-start-3 md:row-start-1">
        <h3 className="font-display text-display-sm text-ink">{title}</h3>
        {subtitle && <p className="text-body-sm text-ink-soft">{subtitle}</p>}
        {points && points.length > 0 && (
          <ul className="mt-2 list-disc pl-[18px] text-body-md text-ink marker:font-mono marker:text-signal-ink">
            {points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) =>
              renderTag ? (
                <Fragment key={tag}>{renderTag(tag)}</Fragment>
              ) : (
                <Tag key={tag}>{tag}</Tag>
              ),
            )}
          </div>
        )}
      </div>
    </article>
  );
}

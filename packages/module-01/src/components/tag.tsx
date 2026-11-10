import type * as React from "react";
import { cn } from "../lib/utils";
import { badgeVariants } from "./badge";

export type TagProps = {
  /** Fill: recessed by default, `signal` to highlight, `tint` for soft, `outline` for quiet. */
  tone?: "signal" | "tint" | "outline";
  /** A lit LED before the label, for "live" and "available". */
  led?: boolean;
  /** Renders a focusable button (a keycap) instead of a plain label. */
  interactive?: boolean;
  /** The pressed state of an interactive tag. */
  pressed?: boolean;
  className?: string;
  children: React.ReactNode;
} & Pick<
  React.ComponentProps<"button">,
  "onClick" | "onPointerEnter" | "onPointerLeave" | "onFocus" | "onBlur" | "aria-describedby"
>;

/** Stadium chip in HUD type: skills on an entry, the status on a project card. */
export function Tag({
  tone,
  led,
  interactive,
  pressed,
  className,
  children,
  ...handlers
}: TagProps) {
  const classes = cn(
    badgeVariants({ variant: tone ?? "default" }),
    "gap-1.5 px-3 py-1",
    interactive &&
      "cursor-pointer outline-none aria-pressed:bg-signal-tint aria-pressed:shadow-press",
    className,
  );
  const content = (
    <>
      {led && (
        <span
          aria-hidden
          className="size-2 shrink-0 rounded-full bg-led-on shadow-[0_0_0_3px_rgba(31,164,90,0.18)]"
        />
      )}
      {children}
    </>
  );

  if (!interactive) return <span className={classes}>{content}</span>;
  return (
    <button type="button" className={classes} aria-pressed={pressed} {...handlers}>
      {content}
    </button>
  );
}

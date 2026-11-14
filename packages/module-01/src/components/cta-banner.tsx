import type * as React from "react";
import { cn } from "../lib/utils";
import { Grill } from "./hud";

export type CtaBannerProps = {
  title: React.ReactNode;
  id?: string;
  text?: React.ReactNode;
  /** Microprint above the title, e.g. "S-05 · START". */
  code?: string;
  /** The call to action, usually a secondary Button (shell on signal). */
  action?: React.ReactNode;
  /** A form or other content set full width under the text, e.g. a waitlist signup. */
  children?: React.ReactNode;
  className?: string;
};

/** The whole-signal call to action that closes a page. Text on it is ink, never white. */
export function CtaBanner({ title, id, text, code, action, children, className }: CtaBannerProps) {
  return (
    <section id={id} className={cn("relative drop-float", className)}>
      <div className="grid items-end gap-8 rounded-xl bg-signal notch-lg p-8 md:grid-cols-[1fr_auto] md:p-12">
        <div>
          {code && <div className="hud-sm mb-4 text-ink">{code}</div>}
          <h2 className="font-display text-display-md text-ink">{title}</h2>
          {text && <p className="mt-3 max-w-[32em] text-body-md text-ink">{text}</p>}
        </div>
        <div className="flex flex-col items-start gap-6 md:items-end">
          <Grill count={6} tone="on-signal" slotWidth={30} gap="8px" />
          {action}
        </div>
        {children !== undefined && (
          // Fields on signal: shell wells, and labels and help in ink (ink-soft is too faint here).
          <div className="min-w-0 md:col-span-2 [&_[data-slot=input]]:bg-shell [&_[data-slot=label]]:text-ink [&_[data-slot=textarea]]:bg-shell [&_p]:text-ink">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

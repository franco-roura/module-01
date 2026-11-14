"use client";

import { cn } from "../lib/utils";
import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type * as React from "react";

/**
 * Sections that open in place: questions and answers, settings groups, details under a summary.
 * `type="single"` keeps one open at a time; `type="multiple"` lets several stay open.
 */
function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/** One section: a trigger and its content, divided from the next by a seam. */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-seam last:border-b-0", className)}
      {...props}
    />
  );
}

/**
 * The row you press. A plus keycap turns 45° into a close mark and lights signal while open.
 * Rendered inside a heading (h3 by default; pass `asChild` on a wrapping header to change it).
 */
function AccordionTrigger({
  className,
  code,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  /** Microprint before the label, e.g. "01". Decoration; the label carries the meaning. */
  code?: string;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger flex flex-1 cursor-pointer items-center gap-4 rounded-sm py-4 text-left text-body-md font-semibold text-ink outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {code && <span className="hud-sm shrink-0 text-ink-soft">{code}</span>}
        <span className="min-w-0 flex-1">{children}</span>
        <span
          aria-hidden
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-shell-recess text-ink shadow-press transition-[background-color,box-shadow] group-hover/trigger:bg-signal-tint group-data-[state=open]/trigger:bg-signal group-data-[state=open]/trigger:shadow-mold"
        >
          <PlusIcon
            strokeWidth={1.25}
            className="size-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-45 motion-reduce:transition-none"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/** What opens under the trigger. Animates its height; reduced motion turns that off. */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-body-md text-ink-soft data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none"
      {...props}
    >
      <div className={cn("pr-11 pb-5", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

// A conversation is laid out by Message (the row: avatar, alignment, header, footer) and drawn
// by Bubble (the surface). Bubbles are soft parts: radius-md, with the corner nearest the
// speaker tucked in to radius-xs. No notch: a conversation would be a field of them.

/** One message row. `align="end"` puts it on the far side: the reader's own messages. */
function Message({
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /** `start` for the other party, `end` for the reader's own messages. */
  align?: "start" | "end";
}) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(
        "group/message flex w-full items-end gap-3 data-[align=end]:flex-row-reverse",
        className,
      )}
      {...props}
    />
  );
}

/** Stacks consecutive messages from one sender closer together than separate turns. */
function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="message-group" className={cn("flex flex-col gap-1.5", className)} {...props} />
  );
}

/**
 * The avatar slot, anchored to the bottom of the bubble. Pass an image, or `fallback` initials
 * for a recessed disc. Leave it empty on earlier messages of a group to keep them aligned.
 */
function MessageAvatar({
  fallback,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** One or two letters shown on a recessed disc when there is no image. */
  fallback?: string;
}) {
  return (
    <div
      data-slot="message-avatar"
      aria-hidden={children === undefined || undefined}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full group-has-[[data-slot=message-footer]]/message:mb-7 [&>img]:size-full [&>img]:object-cover",
        (fallback !== undefined || children !== undefined) && "bg-shell-recess shadow-press",
        className,
      )}
      {...props}
    >
      {children ?? (fallback && <span className="hud-sm text-ink">{fallback}</span>)}
    </div>
  );
}

/** Wraps the header, the bubble and the footer, and lines them up on the message's side. */
function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex max-w-[min(36rem,85%)] min-w-0 flex-col items-start gap-1.5 group-data-[align=end]/message:items-end",
        className,
      )}
      {...props}
    />
  );
}

/** Above the bubble: the sender's name, in microprint. */
function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn("hud-sm flex items-center gap-2 px-1 text-ink-soft", className)}
      {...props}
    />
  );
}

/** Below the bubble: a delivery status, a time, or small actions (icon Buttons with labels). */
function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        "hud-sm flex min-h-6 items-center gap-1 px-1 text-ink-soft group-data-[align=end]/message:flex-row-reverse",
        className,
      )}
      {...props}
    />
  );
}

const bubbleVariants = cva(
  "w-fit max-w-full rounded-md px-4 py-2.5 text-body-md break-words text-ink group-data-[align=end]/message:rounded-br-xs group-data-[align=start]/message:rounded-bl-xs [&_a]:text-signal-ink [&_a]:underline [&_a]:underline-offset-4",
  {
    variants: {
      tone: {
        // The other party: a molded white part.
        shell: "bg-shell shadow-mold",
        // The reader's own words: soft signal.
        tint: "bg-signal-tint",
        // Quiet asides: a sunken well.
        recess: "bg-shell-recess",
        // Code or machine output: black glass.
        visor: "bg-visor font-mono text-code text-shell",
      },
    },
  },
);

/**
 * The message surface. Without a `tone` it follows the row: `shell` on the start side, `tint`
 * on the end side.
 */
function Bubble({
  tone,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof bubbleVariants>) {
  return (
    <div
      data-slot="bubble"
      data-tone={tone ?? undefined}
      className={cn(
        bubbleVariants({ tone }),
        !tone &&
          "bg-shell shadow-mold group-data-[align=end]/message:bg-signal-tint group-data-[align=end]/message:shadow-none",
        className,
      )}
      {...props}
    />
  );
}

export {
  Bubble,
  bubbleVariants,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
};

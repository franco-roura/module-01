import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

// Module/01: everything you press is a molded stadium. Signal orange carries ink text, never white.
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 rounded-full font-sans text-label whitespace-nowrap transition-[background-color,box-shadow,transform] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-signal text-ink shadow-mold hover:bg-[color-mix(in_srgb,var(--color-signal)_88%,white)] active:shadow-press active:translate-y-px",
        destructive:
          "bg-danger text-shell shadow-mold hover:bg-[color-mix(in_srgb,var(--color-danger)_90%,black)] active:shadow-press active:translate-y-px",
        outline:
          "border border-seam bg-shell text-ink shadow-mold hover:bg-shell-recess active:shadow-press",
        secondary:
          "bg-shell text-ink shadow-mold hover:bg-shell-recess active:shadow-press active:translate-y-px",
        ghost: "text-ink hover:bg-shell-recess active:shadow-press",
        link: "rounded-none px-0 text-signal-ink underline-offset-4 hover:underline",
        // [ Label ] in mono brackets: footer and card links on a site.
        bracket:
          "h-auto min-h-control-height gap-1 px-2 text-ink before:font-mono before:text-signal-ink before:content-['['] after:font-mono after:text-signal-ink after:content-[']'] hover:text-signal-ink",
      },
      size: {
        default: "h-control-height px-5 has-[>svg]:px-4",
        xs: "h-7 gap-1 px-3 text-body-sm [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 px-7 has-[>svg]:px-5",
        icon: "size-control-height",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  arrow = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Appends a mono → after the label. Ignored with `asChild`; put the arrow in the child. */
    arrow?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild || !arrow ? (
        children
      ) : (
        <>
          {children}
          <span aria-hidden className="font-mono">
            →
          </span>
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };

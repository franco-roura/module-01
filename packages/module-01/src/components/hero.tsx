import type * as React from "react";
import { cn } from "../lib/utils";
import { Crosshair, Grill } from "./hud";
import { type SpecItem, SpecReadout } from "./spec-readout";

export type HeroProps = {
  /** The page title or product name, set in display-xl. One per page. */
  title: React.ReactNode;
  /** The line under the title, in HUD type: a tagline, a category, a role. */
  subtitle?: React.ReactNode;
  lead?: React.ReactNode;
  /** Buttons under the lead. */
  actions?: React.ReactNode;
  specs?: SpecItem[];
  /** An image for the studio frame: a product shot, a screenshot, a portrait. Without it the frame shows a crosshair. */
  image?: React.ReactNode;
  imageLabel?: string;
  /** Replaces the studio frame and grill entirely. */
  media?: React.ReactNode;
  serial?: string;
  coords?: string;
  className?: string;
};

/** Studio-backdrop frame for the hero image, with an inner ring and a microprint tag. */
export function HeroFrame({ image, label }: { image?: React.ReactNode; label?: string }) {
  return (
    <div className="relative flex h-60 w-50 items-center justify-center overflow-hidden rounded-md bg-studio [&>img]:size-full [&>img]:object-cover">
      {image ?? <Crosshair className="size-5 text-ink/45" />}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-3.5 rounded-sm shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]"
      />
      {label && <span className="hud-sm absolute bottom-2.5 left-2.5 text-ink">{label}</span>}
    </div>
  );
}

/** The opening part of a page: title, subtitle, lead, actions and specs beside an image. */
export function Hero({
  title,
  subtitle,
  lead,
  actions,
  specs,
  image,
  imageLabel,
  media,
  serial,
  coords,
  className,
}: HeroProps) {
  return (
    <section className={cn("relative drop-float", className)}>
      <span
        aria-hidden
        className="absolute -top-1.5 left-6 z-10 h-3 w-18 rounded-full bg-signal md:left-16"
      />
      <div className="relative grid gap-12 rounded-xl bg-shell notch-lg px-6 pt-12 pb-8 md:grid-cols-[1fr_auto] md:px-16 md:pt-16 md:pb-12">
        {serial && (
          <span className="hud-sm absolute top-6 left-6 text-hud-mark md:left-16">{serial}</span>
        )}
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="font-display text-display-lg text-ink md:text-display-xl">{title}</h1>
          {subtitle && <p className="hud text-signal-ink">{subtitle}</p>}
          {lead && <p className="max-w-[36em] text-body-lg text-ink-soft">{lead}</p>}
          {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
          {specs && <SpecReadout items={specs} />}
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          {media ?? (
            <>
              <HeroFrame image={image} label={imageLabel} />
              <Grill count={4} slotWidth={28} gap="8px" />
            </>
          )}
          {coords && <span className="hud-sm text-hud-mark">{coords}</span>}
        </div>
        <Crosshair tone="signal" className="absolute right-3.5 bottom-3.5" />
      </div>
    </section>
  );
}

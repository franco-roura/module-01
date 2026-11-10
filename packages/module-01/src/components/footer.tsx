import type * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { TickRuler } from "./hud";

export type FooterLink = {
  label: string;
  href: string;
  target?: string;
};

export type FooterProps = {
  links?: FooterLink[];
  /** Microprint on the left, e.g. a build stamp. */
  left?: React.ReactNode;
  /** Microprint on the right, e.g. coordinates. */
  right?: React.ReactNode;
  rulerLabels?: string[];
  className?: string;
};

/** Page footer: a tick ruler, then microprint either side of bracketed links. */
export function Footer({ links, left, right, rulerLabels, className }: FooterProps) {
  return (
    <footer className={cn("flex flex-col gap-4 pt-8 pb-6", className)}>
      <TickRuler labels={rulerLabels} />
      <div className="flex flex-wrap items-center justify-between gap-6">
        <span className="hud-sm text-ink-soft">{left}</span>
        <div className="flex flex-wrap gap-1">
          {links?.map((link) => (
            <Button key={link.label} variant="bracket" asChild>
              <a
                href={link.href}
                target={link.target}
                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            </Button>
          ))}
        </div>
        <span className="hud-sm text-ink-soft">{right}</span>
      </div>
    </footer>
  );
}

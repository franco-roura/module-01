import type * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Crosshair } from "./hud";
import { HingeTab } from "./panel";
import { Tag, type TagProps } from "./tag";

export type MediaCardLink = {
  label: string;
  href: string;
  target?: string;
};

export type MediaCardProps = {
  title: React.ReactNode;
  /** Entry code on the media frame, e.g. "C-01". */
  code?: string;
  image?: string;
  imageAlt?: string;
  /** What it is, in HUD type: "Product", "Case study". */
  kind?: string;
  /** "Live" gets a green LED; anything else is a tint tag unless `statusTone` says otherwise. */
  status?: string;
  statusTone?: TagProps["tone"];
  description?: React.ReactNode;
  tags?: string[];
  links?: MediaCardLink[];
  /** Left offset of the hinge tab. Vary it from card to card. */
  hingeLeft?: string;
  className?: string;
  style?: React.CSSProperties;
};

/** A product, project or story as a product shot: media on a studio backdrop, then kind, title, tags and links. */
export function MediaCard({
  title,
  code,
  image,
  imageAlt = "",
  kind,
  status,
  statusTone,
  description,
  tags,
  links,
  hingeLeft = "28px",
  className,
  style,
}: MediaCardProps) {
  const live = status?.toLowerCase() === "live";
  return (
    <article className={cn("relative drop-float", className)} style={style}>
      <HingeTab style={{ left: hingeLeft }} />
      <div className="relative flex h-full flex-col gap-3 rounded-lg bg-shell notch-md px-3.5 pt-3.5 pb-6">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-studio">
          {image && <img src={image} alt={imageAlt} className="block size-full object-cover" />}
          <Crosshair className="absolute top-3 left-3 text-ink/45" />
          <Crosshair className="absolute right-3 bottom-3 text-ink/45" />
          {code && <span className="hud-sm absolute top-3 right-[30px] text-ink">{code}</span>}
        </div>
        <div className="flex items-center justify-between px-2.5 pt-2">
          <span className="hud text-ink-soft">{kind}</span>
          {status && (
            <Tag tone={statusTone ?? (live ? undefined : "tint")} led={live}>
              {status}
            </Tag>
          )}
        </div>
        <div className="flex flex-col gap-2 px-2.5">
          <h3 className="font-display text-display-sm text-ink">{title}</h3>
          {description && <p className="text-body-sm text-ink-soft">{description}</p>}
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-2.5">
            {tags.map((tag) => (
              <Tag key={tag} tone="outline">
                {tag}
              </Tag>
            ))}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="mt-auto flex gap-2 px-1">
            {links.map((link) => (
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
        )}
      </div>
    </article>
  );
}

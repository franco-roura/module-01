"use client";

import { cn } from "../lib/utils";
import { MenuIcon } from "lucide-react";
import type * as React from "react";
import { Fragment, useState } from "react";
import { buttonVariants } from "./button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./sheet";

export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  /** Hidden on phones, e.g. a link the user menu also offers. Still listed in the mobile menu. */
  desktopOnly?: boolean;
};

/**
 * Floating frosted stadium bar: brand on the left, numbered links, an end slot (user menu).
 * With `mobileMenu`, phones get a menu key that opens the links in a sheet instead.
 * `renderLink` lets the app use its router's Link component.
 */
export function NavBar({
  brand,
  serial,
  links,
  end,
  mobileMenu = false,
  menuLabel = "Menu",
  renderLink = (item, props) => <a href={item.href} {...props} />,
  className,
}: {
  brand: React.ReactNode;
  serial?: React.ReactNode;
  links: NavItem[];
  end?: React.ReactNode;
  /** On phones, hide the links and show a menu key that opens them in a sheet. */
  mobileMenu?: boolean;
  /** Accessible name of the menu key and title of the sheet. */
  menuLabel?: string;
  renderLink?: (item: NavItem, props: React.ComponentProps<"a">) => React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Main"
      className={cn(
        "glass flex h-nav-height items-center gap-2 rounded-full pr-2.5 pl-4 sm:gap-6 sm:pl-6",
        className,
      )}
    >
      <div className="flex min-w-0 shrink-0 flex-col gap-0.5">
        <span className="font-display text-display-sm whitespace-nowrap text-ink">{brand}</span>
        {serial !== undefined && (
          <span className="hud-sm hidden text-ink-soft sm:block">{serial}</span>
        )}
      </div>
      <div
        className={cn("ml-auto flex min-w-0 items-center sm:gap-1", mobileMenu && "max-sm:hidden")}
      >
        {links.map((item, i) => (
          <Fragment key={item.href}>
            {renderLink(item, {
              "aria-current": item.active ? "page" : undefined,
              className: cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-label whitespace-nowrap text-ink hover:bg-shell-recess sm:px-3.5",
                item.active && "text-signal-ink",
                item.desktopOnly && "max-sm:hidden",
              ),
              children: (
                <>
                  <span className="hud-sm hidden text-ink-soft md:inline">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </>
              ),
            })}
          </Fragment>
        ))}
      </div>
      <div className={cn("flex shrink-0 items-center gap-1", mobileMenu && "max-sm:ml-auto")}>
        {end}
        {mobileMenu && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label={menuLabel}
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "sm:hidden")}
            >
              <MenuIcon strokeWidth={1.25} className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 bg-canvas p-6 pt-5">
              <SheetTitle className="hud text-ink-soft">{menuLabel}</SheetTitle>
              <SheetDescription className="sr-only">Links to the main pages.</SheetDescription>
              <div className="mt-8 flex flex-col">
                {links.map((item, i) => (
                  <Fragment key={item.href}>
                    {renderLink(item, {
                      "aria-current": item.active ? "page" : undefined,
                      onClick: () => setOpen(false),
                      className: cn(
                        "flex min-h-control-height items-center gap-4 border-b border-seam py-3 font-display text-display-sm text-ink outline-none last:border-b-0 hover:text-signal-ink focus-visible:text-signal-ink",
                        item.active && "text-signal-ink",
                      ),
                      children: (
                        <>
                          <span className="hud-sm text-ink-soft">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </>
                      ),
                    })}
                  </Fragment>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
}

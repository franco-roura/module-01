import { Badge, HudLabel, Panel, SectionHeader, cn } from "@franco_roura/module-01";
import { CategoryIcon } from "@franco_roura/module-01/finance";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type * as React from "react";
import { CodeBlock } from "../components/code-block";
import {
  type ColorToken,
  PALETTES,
  categorical,
  color,
  contrast,
  palette,
  readsDark,
  semantic,
  usedBy,
} from "../tokens";

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    void navigator.clipboard.writeText(text);
    setCopied(text);
    window.setTimeout(() => setCopied((current) => (current === text ? null : current)), 1200);
  };
  return { copied, copy };
}

const paletteNotes: Record<string, [string, string]> = {
  graphite: ["Graphite", "The neutral scale, with a cool cast: plastic, seams and ink."],
  signal: ["Signal", "The trim color. 500 is the orange of buttons, hinges and code chips."],
  green: ["Green", "Live and available states, and money coming in."],
  red: ["Red", "Danger, errors, and money going out."],
};

/** One palette as a strip of ten steps. Click a step to copy its hex value. */
function Ramp({ name }: { name: string }) {
  const { copied, copy } = useCopy();
  const [title = name, note = ""] = paletteNotes[name] ?? [];
  return (
    <Panel notch={false} bodyClassName="p-0 sm:p-0 overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 pt-4 pb-3">
        <h3 className="font-display text-display-sm text-ink">{title}</h3>
        <p className="text-body-sm text-ink-soft">{note}</p>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10">
        {palette(name).map((step) => {
          const dark = readsDark(step.resolved);
          const tokens = usedBy(step.name);
          return (
            <button
              key={step.name}
              type="button"
              onClick={() => copy(step.resolved)}
              title={`Copy ${step.resolved}`}
              className={cn(
                "group flex h-28 cursor-pointer flex-col justify-between p-2.5 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-inset",
                dark ? "text-ink" : "text-shell",
              )}
              style={{ background: step.resolved }}
            >
              <span className="flex items-start justify-between gap-1">
                <span className="font-mono text-body-sm font-bold">{step.name.split("-")[1]}</span>
                {copied === step.resolved ? (
                  <Check className="size-3.5" strokeWidth={1.25} />
                ) : (
                  <Copy
                    className="size-3.5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    strokeWidth={1.25}
                  />
                )}
              </span>
              <span className="flex flex-col gap-0.5">
                {tokens.slice(0, 2).map((token) => (
                  <span key={token} className="hud-sm truncate">
                    {token}
                  </span>
                ))}
                <span className="font-mono text-[11px] opacity-80">{step.resolved}</span>
              </span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

const roles: { title: string; note: string; names: string[] }[] = [
  {
    title: "Surfaces",
    note: "What parts are made of. The page is canvas, parts are shell, wells are shell-recess.",
    names: ["canvas", "shell", "shell-recess", "seam", "studio", "visor", "glass", "overlay"],
  },
  {
    title: "Text and markings",
    note: "Ink for reading, ink-soft for secondary text, hud-mark for decoration only.",
    names: ["ink", "ink-soft", "hud-mark", "visor-mark", "signal-ink"],
  },
  {
    title: "Signal",
    note: "The accent. A fill for things you press and things that matter; never small text.",
    names: ["signal", "signal-tint", "signal-shade", "glass-edge"],
  },
  {
    title: "Status and money",
    note: "Always paired with a word or a sign, so color never carries the meaning alone.",
    names: ["led-on", "income-ink", "expense-ink", "danger", "danger-tint"],
  },
  {
    title: "Charts",
    note: "Marks only. Text never takes a series color.",
    names: ["chart-line", "chart-income", "chart-expense"],
  },
];

function TokenCard({ token }: { token: ColorToken }) {
  const { copied, copy } = useCopy();
  const utility = `bg-${token.name}`;
  const translucent = !token.resolved.startsWith("#");
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-seam bg-shell">
      <button
        type="button"
        onClick={() => copy(utility)}
        title={`Copy ${utility}`}
        className={cn(
          "group relative h-20 cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-inset",
          translucent && "bg-studio",
        )}
      >
        <span className="absolute inset-0" style={{ background: token.resolved }} />
        <span
          className={cn(
            "absolute top-2 right-2",
            translucent || readsDark(token.resolved) ? "text-ink" : "text-shell",
          )}
        >
          {copied === utility ? (
            <Check className="size-3.5" strokeWidth={1.25} />
          ) : (
            <Copy
              className="size-3.5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              strokeWidth={1.25}
            />
          )}
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-1 border-t border-seam p-3">
        <p className="flex flex-wrap items-baseline justify-between gap-x-2">
          <span className="font-mono text-body-sm font-bold text-ink">{token.name}</span>
          <span className="font-mono text-[12px] text-ink-soft">
            {token.alias ?? token.resolved}
          </span>
        </p>
        <p className="text-[13px] leading-snug text-ink-soft">{token.usage.split(". ")[0]}.</p>
      </div>
    </div>
  );
}

// Text and background pairs the kit uses, checked against WCAG AA as the page renders.
const pairs: [string, string][] = [
  ["ink", "canvas"],
  ["ink", "shell"],
  ["ink", "shell-recess"],
  ["ink", "signal"],
  ["ink", "signal-tint"],
  ["ink", "studio"],
  ["ink-soft", "canvas"],
  ["ink-soft", "shell"],
  ["ink-soft", "shell-recess"],
  ["signal-ink", "canvas"],
  ["signal-ink", "shell"],
  ["income-ink", "shell"],
  ["expense-ink", "shell"],
  ["danger", "danger-tint"],
  ["shell", "danger"],
  ["shell", "visor"],
  ["visor-mark", "visor"],
  ["shell", "signal"],
  ["signal", "shell"],
];

function Pair({ foreground, background }: { foreground: string; background: string }) {
  const ratio = contrast(color(foreground).resolved, color(background).resolved) ?? 0;
  const verdict = ratio >= 4.5 ? "AA" : ratio >= 3 ? "Large only" : "Fail";
  return (
    <div className="flex items-center gap-3 border-t border-seam px-4 py-3 first:border-t-0 sm:px-5">
      <span
        className="flex h-11 w-24 shrink-0 items-center justify-center rounded-sm border border-seam text-label"
        style={{
          color: `var(--color-${foreground})`,
          background: `var(--color-${background})`,
        }}
      >
        Aa 123
      </span>
      <span className="min-w-0 flex-1 font-mono text-body-sm">
        <span className="font-bold text-ink">{foreground}</span>
        <span className="text-ink-soft"> on {background}</span>
      </span>
      <span className="tabular text-body-sm text-ink">{ratio.toFixed(2)}:1</span>
      <Badge
        variant={verdict === "AA" ? "tint" : verdict === "Fail" ? "destructive" : "outline"}
        className="w-24"
      >
        {verdict}
      </Badge>
    </div>
  );
}

function Group({
  code,
  title,
  note,
  children,
}: {
  code: string;
  title: string;
  note: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <HudLabel code={code}>{title}</HudLabel>
        <p className="max-w-[70ch] text-ink-soft">{note}</p>
      </div>
      {children}
    </section>
  );
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded-xs bg-shell-recess px-1.5 py-px font-mono text-[0.85em] text-ink">
    {children}
  </code>
);

export function ColorsPage() {
  return (
    <div className="flex flex-col gap-20">
      <header className="flex flex-col gap-6">
        <SectionHeader code="S-02" label="Foundations" title="Colors" ruler />
        <p className="max-w-[70ch] text-body-lg text-ink-soft">
          Four palettes of ten steps each, and a set of named tokens that point into them. Build
          with the names: they say what a color is for, and they keep text readable.
        </p>
      </header>

      <Group
        code="C-01"
        title="Palettes"
        note="Each palette runs from 50 (lightest) to 900 (darkest). The labels on a step are the named tokens that use it. Select a step to copy its hex value."
      >
        <div className="flex flex-col gap-6">
          {PALETTES.map((name) => (
            <Ramp key={name} name={name} />
          ))}
        </div>
      </Group>

      <Group
        code="C-02"
        title="Named tokens"
        note={
          <>
            These are the colors components use. Each is a Tailwind utility (<Code>bg-shell</Code>,{" "}
            <Code>text-ink-soft</Code>, <Code>border-seam</Code>) and a custom property (
            <Code>var(--color-shell)</Code>). Select a swatch to copy its utility.
          </>
        }
      >
        {roles.map((role) => (
          <div key={role.title} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-display text-display-sm text-ink">{role.title}</h3>
              <p className="text-body-sm text-ink-soft">{role.note}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {role.names
                .map((name) => semantic.find((token) => token.name === name))
                .filter((token) => token !== undefined)
                .map((token) => (
                  <TokenCard key={token.name} token={token} />
                ))}
            </div>
          </div>
        ))}
      </Group>

      <Group
        code="C-03"
        title="Category palette"
        note="Sixteen colors for categories and labels: the disc behind a glyph, the dot beside a name. They are fills, never text, and every one keeps an ink glyph readable."
      >
        <Panel notch="sm">
          <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-8">
            {categorical.map((token) => (
              <div key={token.name} className="flex flex-col items-center gap-2">
                <CategoryIcon icon="palette" color={token.name} size="lg" />
                <span className="hud-sm text-ink">{token.name.replace("cat-", "")}</span>
                <span className="font-mono text-[11px] text-ink-soft">{token.resolved}</span>
              </div>
            ))}
          </div>
        </Panel>
      </Group>

      <Group
        code="C-04"
        title="Contrast"
        note="The pairs the kit sets text in, measured as this page renders. AA needs 4.5:1; large text and marks need 3:1. The last two rows are why text on signal is ink, and why orange text uses signal-ink."
      >
        <Panel notch={false} bodyClassName="p-0 sm:p-0">
          {pairs.map(([foreground, background]) => (
            <Pair
              key={`${foreground}-${background}`}
              foreground={foreground}
              background={background}
            />
          ))}
        </Panel>
      </Group>

      <Group
        code="C-05"
        title="Using and changing colors"
        note="Use the utilities in markup and the custom properties in CSS. To retheme, override a palette step or a named token after importing the theme; everything that points at it follows."
      >
        <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
          <CodeBlock
            title="IN MARKUP"
            code={`<div className="rounded-lg bg-shell text-ink shadow-float">\n  <p className="text-ink-soft">Secondary text</p>\n  <a className="text-signal-ink">A link</a>\n  <span className="bg-signal-200">A raw palette step</span>\n</div>`}
          />
          <CodeBlock
            title="APP.CSS"
            code={`@import "tailwindcss";\n@import "@franco_roura/module-01/theme.css";\n\n/* A cooler accent: every signal fill follows. */\n:root {\n  --color-signal-500: #ff4d2e;\n  --color-signal-700: #b3321a;\n}`}
          />
        </div>
        <p className="max-w-[70ch] text-body-sm text-ink-soft">
          Module/01 has one theme, lit like a white studio. There is no dark mode: the molded
          shadows and glass edges are drawn for light surfaces.
        </p>
      </Group>
    </div>
  );
}

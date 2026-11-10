import { HudLabel, Panel, SectionHeader } from "@franco_roura/module-01";
import tokens from "@franco_roura/module-01/tokens.json";
import type * as React from "react";

type Token = { name: string; value: string; usage: string };

function Group({
  code,
  title,
  note,
  children,
}: {
  code: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <HudLabel code={code}>{title}</HudLabel>
      <p className="max-w-[70ch] text-ink-soft">{note}</p>
      {children}
    </section>
  );
}

/** A token row: a sample on the left, then its name, value and usage note. */
function Row({ token, sample }: { token: Token; sample: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 border-t border-seam px-5 py-4 first:border-t-0">
      <div className="flex w-24 shrink-0 items-center justify-center self-stretch">{sample}</div>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-mono text-body-sm font-bold">{token.name}</span>
          <span className="font-mono text-[13px] break-all text-ink-soft">{token.value}</span>
        </p>
        <p className="mt-1 text-body-sm text-ink-soft">{token.usage}</p>
      </div>
    </div>
  );
}

const List = ({ children }: { children: React.ReactNode }) => (
  <Panel notch={false} bodyClassName="p-0 sm:p-0">
    {children}
  </Panel>
);

export function TokensPage() {
  return (
    <div className="flex flex-col gap-16">
      <SectionHeader code="S-03" label="Foundations" title="Tokens" ruler />
      <p className="max-w-[70ch] text-body-lg text-ink-soft">
        Every value in the kit comes from <code className="font-mono">tokens.json</code>. With
        Tailwind they are utilities (<code className="font-mono">p-6</code>,{" "}
        <code className="font-mono">text-display-lg</code>,{" "}
        <code className="font-mono">rounded-lg</code>); everywhere else they are custom properties (
        <code className="font-mono">var(--radius-lg)</code>). Colors have their own page.
      </p>

      <Group
        code="T-01"
        title="Type"
        note="Michroma for display, Manrope for reading, Space Mono for HUD markings and money."
      >
        {tokens.type.groups.map((group) => (
          <List key={group.name}>
            {group.styles.map((style) => (
              <div
                key={style.name}
                className="flex flex-col gap-2 border-t border-seam px-5 py-4 first:border-t-0"
              >
                <p
                  className="truncate text-ink"
                  style={{
                    fontFamily: `var(--font-${group.family})`,
                    fontSize: style.fontSize,
                    fontWeight: style.fontWeight,
                    lineHeight: style.lineHeight,
                    letterSpacing: style.letterSpacing,
                    textTransform:
                      style.name.startsWith("hud") && style.name !== "hud-num"
                        ? "uppercase"
                        : undefined,
                  }}
                >
                  {style.sample}
                </p>
                <p className="flex flex-wrap items-baseline gap-x-3 text-body-sm text-ink-soft">
                  <span className="font-mono font-bold text-ink">text-{style.name}</span>
                  <span className="font-mono text-[13px]">
                    {style.fontSize} / {style.lineHeight} / {style.fontWeight}
                  </span>
                  <span>{style.usage}</span>
                </p>
              </div>
            ))}
          </List>
        ))}
      </Group>

      <Group
        code="T-02"
        title="Spacing"
        note="The same 4px scale as Tailwind, so p-6 is space-6. The named steps are the ones the layouts use."
      >
        <List>
          {(tokens.spacing.tokens as Token[]).map((token) => (
            <Row
              key={token.name}
              token={token}
              sample={
                <span className="block h-3 rounded-full bg-signal" style={{ width: token.value }} />
              }
            />
          ))}
        </List>
      </Group>

      <Group
        code="T-03"
        title="Radius and notch"
        note="Soft parts with one hard cut. Everything you press is a stadium."
      >
        <List>
          {(tokens.radius.tokens as Token[]).map((token) => (
            <Row
              key={token.name}
              token={token}
              sample={
                <span
                  className="block h-12 w-20 border border-seam bg-shell-recess"
                  style={{ borderRadius: token.value }}
                />
              }
            />
          ))}
          {(tokens.notch.tokens as Token[]).map((token) => (
            <Row
              key={token.name}
              token={token}
              sample={
                <span
                  className="block h-12 w-20 rounded-sm bg-signal"
                  style={{
                    clipPath: `polygon(0 0, calc(100% - ${token.value}) 0, 100% ${token.value}, 100% 100%, 0 100%)`,
                  }}
                />
              }
            />
          ))}
        </List>
      </Group>

      <Group
        code="T-04"
        title="Depth"
        note="Parts float, buttons are molded, wells are pressed, glass has an edge."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {(tokens.shadow.tokens as Token[]).map((token) => (
            <div key={token.name} className="flex flex-col gap-3 rounded-lg bg-canvas p-2">
              <div
                className={
                  token.name === "shadow-glass"
                    ? "flex h-24 items-center justify-center rounded-lg bg-studio"
                    : "flex h-24 items-center justify-center"
                }
              >
                <span
                  className={
                    token.name === "shadow-press"
                      ? "block h-12 w-40 rounded-full bg-shell-recess"
                      : token.name === "shadow-glass"
                        ? "block h-12 w-40 rounded-full bg-glass backdrop-blur-lg"
                        : "block h-12 w-40 rounded-full bg-shell"
                  }
                  style={{ boxShadow: `var(--${token.name})` }}
                />
              </div>
              <p className="font-mono text-body-sm font-bold">{token.name}</p>
              <p className="text-body-sm text-ink-soft">{token.usage}</p>
            </div>
          ))}
        </div>
      </Group>

      <Group
        code="T-05"
        title="Size"
        note="The few fixed measurements: page width, bar and control heights."
      >
        <List>
          {(tokens.size.tokens as Token[]).map((token) => (
            <Row
              key={token.name}
              token={token}
              sample={<span className="tabular text-amount-md">{token.value}</span>}
            />
          ))}
        </List>
      </Group>
    </div>
  );
}

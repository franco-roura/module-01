import tokens from "@franco_roura/module-01/tokens.json";

export type ColorToken = {
  name: string;
  /** The value as written in tokens.json: a color, or an alias like "{signal-500}". */
  value: string;
  /** The color the token resolves to, following aliases. */
  resolved: string;
  /** The palette step the token points at, if it is an alias. */
  alias: string | null;
  usage: string;
};

const raw = tokens.color.tokens as { name: string; value: string; usage: string }[];
const byName = new Map(raw.map((token) => [token.name, token]));

function resolve(value: string, depth = 0): string {
  const target = /^\{(.+)\}$/.exec(value)?.[1];
  const next = target ? byName.get(target) : undefined;
  return next && depth < 8 ? resolve(next.value, depth + 1) : value;
}

export const colors: ColorToken[] = raw.map((token) => ({
  ...token,
  resolved: resolve(token.value),
  alias: /^\{(.+)\}$/.exec(token.value)?.[1] ?? null,
}));

export const color = (name: string): ColorToken => {
  const found = colors.find((token) => token.name === name);
  if (!found) throw new Error(`Unknown color token ${name}`);
  return found;
};

export const PALETTES = ["graphite", "signal", "green", "red"] as const;
export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

/** The ten steps of one palette, light to dark. */
export const palette = (name: string) => STEPS.map((step) => color(`${name}-${step}`));

/** Semantic tokens that point at a palette step, e.g. "signal-500" -> ["signal"]. */
export const usedBy = (step: string) =>
  colors.filter((token) => token.alias === step).map((token) => token.name);

const isScale = (name: string) => /^(graphite|signal|green|red)-\d+$/.test(name);
export const categorical = colors.filter((token) => token.name.startsWith("cat-"));
export const semantic = colors.filter(
  (token) => !isScale(token.name) && !token.name.startsWith("cat-"),
);

// --- Contrast (WCAG 2.x) -------------------------------------------------------------------

function luminance(hex: string): number | null {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match?.[1]) return null;
  const [r = 0, g = 0, b = 0] = [0, 2, 4].map((i) => {
    const channel = parseInt(match[1]!.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two hex colors, or null when either is translucent. */
export function contrast(foreground: string, background: string): number | null {
  const a = luminance(foreground);
  const b = luminance(background);
  if (a === null || b === null) return null;
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** Whether ink or white reads better on a color: used to label swatches. */
export const readsDark = (hex: string) => (luminance(hex) ?? 1) > 0.32;

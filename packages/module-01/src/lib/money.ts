// Money helpers. Amounts are integer minor units (bigint, matching protobuf int64) plus the
// currency's number of decimal places. Never use floats for money.

export type SignDisplay = "auto" | "always" | "never";

const pow10 = (n: number) => 10n ** BigInt(n);

/** Exact decimal string for a minor-unit amount: (123456n, 2) -> "1234.56". */
export function minorToDecimal(amount: bigint, minorUnits: number): string {
  const neg = amount < 0n;
  const abs = neg ? -amount : amount;
  if (minorUnits === 0) return `${neg ? "-" : ""}${abs}`;
  const scale = pow10(minorUnits);
  const whole = abs / scale;
  const frac = (abs % scale).toString().padStart(minorUnits, "0");
  return `${neg ? "-" : ""}${whole}.${frac}`;
}

/** How a locale writes numbers: its decimal and group separators, and how it groups digits. */
export type NumberSeparators = {
  decimal: string;
  group: string;
  /** Groups of two after the first three, as in en-IN "12,34,567". */
  lakh: boolean;
};

const separatorCache = new Map<string, NumberSeparators>();

/** The decimal and group separators a locale uses, read from Intl. Defaults to en-US. */
export function numberSeparators(locale = "en-US"): NumberSeparators {
  let s = separatorCache.get(locale);
  if (!s) {
    const parts = new Intl.NumberFormat(locale, { numberingSystem: "latn" }).formatToParts(
      1234567.5,
    );
    const integers = parts.filter((p) => p.type === "integer");
    s = {
      decimal: parts.find((p) => p.type === "decimal")?.value ?? ".",
      group: parts.find((p) => p.type === "group")?.value ?? ",",
      lakh: integers.length > 2 && integers[1]?.value.length === 2,
    };
    separatorCache.set(locale, s);
  }
  return s;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Characters people type for a group separator: any space for a space, either apostrophe. */
function groupClass(group: string): string {
  if (/\s/.test(group)) return "[\\s\\u00a0\\u202f]";
  if (group === "'" || group === "’") return "['\\u2019]";
  return escapeRegExp(group);
}

const groupingCache = new Map<string, RegExp>();

/**
 * Splits a non-negative decimal written in a locale into its whole and fraction digits, or
 * returns null. Group separators must sit where the locale puts them ("1,234" but never "12,50"
 * or "1,2,3" in en-US), so a decimal written the other way round is rejected, not misread.
 */
export function splitDecimal(
  input: string,
  locale?: string,
): { whole: string; frac: string } | null {
  const { decimal, group, lakh } = numberSeparators(locale);
  const s = input.trim();
  const parts = s.split(decimal);
  if (parts.length > 2) return null;
  const [rawWhole = "", frac = ""] = parts;
  if (!/^\d*$/.test(frac)) return null;

  let whole = rawWhole;
  if (!/^\d*$/.test(whole)) {
    const key = `${locale ?? ""}|${group}|${lakh}`;
    let grouped = groupingCache.get(key);
    if (!grouped) {
      const g = groupClass(group);
      grouped = lakh
        ? new RegExp(`^\\d{1,2}(?:${g}\\d{2})*${g}\\d{3}$`)
        : new RegExp(`^\\d{1,3}(?:${g}\\d{3})+$`);
      groupingCache.set(key, grouped);
    }
    if (!grouped.test(whole)) return null;
    whole = whole.replace(/\D/g, "");
  }
  if (whole === "" && frac === "") return null;
  return { whole, frac };
}

/**
 * Parses an amount the person typed into minor units, reading separators from `locale`
 * (default en-US): "1,234.5" in en-US, "1.234,5" or "12,50" in es-UY. Returns null for anything
 * that isn't a non-negative decimal with at most `minorUnits` decimals, including misplaced
 * group separators.
 */
export function parseAmount(input: string, minorUnits: number, locale?: string): bigint | null {
  const parts = splitDecimal(input, locale);
  if (!parts) return null;
  const { whole, frac } = parts;
  if (frac.length > minorUnits) return null;
  return BigInt(whole || "0") * pow10(minorUnits) + BigInt(frac.padEnd(minorUnits, "0") || "0");
}

/** Writes a plain decimal string ("1234.56") with the locale's decimal separator, no grouping. */
export function localizeDecimal(decimal: string, locale?: string): string {
  const sep = numberSeparators(locale).decimal;
  return sep === "." ? decimal : decimal.replace(".", sep);
}

const formatters = new Map<number, Intl.NumberFormat>();
function formatter(minorUnits: number) {
  let f = formatters.get(minorUnits);
  if (!f) {
    f = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
      signDisplay: "never",
    });
    formatters.set(minorUnits, f);
  }
  return f;
}

/**
 * Formats an amount the way the app shows money: "+1,234.56 USD", "−42.05 USD", "0.00 USD".
 * Uses a true minus sign (U+2212) so negatives align with plus signs in mono type.
 */
export function formatMoney(
  amount: bigint,
  currency: string,
  minorUnits: number,
  opts: { sign?: SignDisplay; code?: boolean } = {},
): string {
  const { sign = "auto", code = true } = opts;
  // Intl formats decimal strings exactly (no float rounding).
  const digits = formatter(minorUnits).format(
    minorToDecimal(amount < 0n ? -amount : amount, minorUnits) as unknown as number,
  );
  let prefix = "";
  if (amount < 0n && sign !== "never") prefix = "−";
  else if (amount > 0n && sign === "always") prefix = "+";
  return `${prefix}${digits}${code ? ` ${currency}` : ""}`;
}

/**
 * Plain input-friendly value without grouping, in the locale's decimal separator:
 * 123456n, 2 -> "1234.56" (en-US) or "1234,56" (es-UY). Round-trips through `parseAmount`.
 */
export function formatAmountInput(
  amount: bigint | null,
  minorUnits: number,
  locale?: string,
): string {
  return amount === null ? "" : localizeDecimal(minorToDecimal(amount, minorUnits), locale);
}

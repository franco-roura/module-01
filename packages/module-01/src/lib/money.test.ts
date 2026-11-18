import { describe, expect, test } from "vite-plus/test";
import {
  formatAmountInput,
  formatMoney,
  minorToDecimal,
  numberSeparators,
  parseAmount,
} from "./money";

describe("minorToDecimal", () => {
  test("handles scale, sign and zero decimals", () => {
    expect(minorToDecimal(123456n, 2)).toBe("1234.56");
    expect(minorToDecimal(-5n, 2)).toBe("-0.05");
    expect(minorToDecimal(1866n, 0)).toBe("1866");
  });
});

describe("parseAmount", () => {
  test("accepts plain and grouped decimals", () => {
    expect(parseAmount("1,234.5", 2)).toBe(123450n);
    expect(parseAmount("0.99", 2)).toBe(99n);
    expect(parseAmount(".5", 2)).toBe(50n);
    expect(parseAmount("42", 0)).toBe(42n);
  });

  test("rejects too many decimals, signs and junk", () => {
    expect(parseAmount("1.234", 2)).toBeNull();
    expect(parseAmount("-1", 2)).toBeNull();
    expect(parseAmount("1e3", 2)).toBeNull();
    expect(parseAmount("", 2)).toBeNull();
  });

  test("rejects misplaced group separators instead of dropping them", () => {
    // "12,50" used to become 1250.00.
    expect(parseAmount("12,50", 2)).toBeNull();
    expect(parseAmount("1,2,3", 2)).toBeNull();
    expect(parseAmount("1,23.4", 2)).toBeNull();
    expect(parseAmount("1234,567.8", 2)).toBeNull();
    expect(parseAmount("1.234,56", 2)).toBeNull();
    expect(parseAmount(",5", 2)).toBeNull();
    expect(parseAmount("1,234,", 2)).toBeNull();
    expect(parseAmount("1 234", 2)).toBeNull();
  });

  test("keeps valid en-US forms", () => {
    expect(parseAmount("1,234,567.89", 2)).toBe(123456789n);
    expect(parseAmount("42.", 2)).toBe(4200n);
    expect(parseAmount("  7 ", 2)).toBe(700n);
  });

  test("reads decimal commas in es-UY", () => {
    expect(parseAmount("12,50", 2, "es-UY")).toBe(1250n);
    expect(parseAmount("1.234,56", 2, "es-UY")).toBe(123456n);
    expect(parseAmount("1.234", 2, "es-UY")).toBe(123400n);
    expect(parseAmount(",5", 2, "es-UY")).toBe(50n);
    expect(parseAmount("12.50", 2, "es-UY")).toBeNull();
    expect(parseAmount("1.2.3", 2, "es-UY")).toBeNull();
    expect(parseAmount("1,2,3", 2, "es-UY")).toBeNull();
  });

  test("accepts each locale's own grouping", () => {
    expect(parseAmount("1'234.50", 2, "de-CH")).toBe(123450n);
    expect(parseAmount("1’234.50", 2, "de-CH")).toBe(123450n);
    expect(parseAmount("1 234,50", 2, "fr-FR")).toBe(123450n);
    expect(parseAmount("1 234,50", 2, "fr-FR")).toBe(123450n);
    expect(parseAmount("12,34,567.89", 2, "en-IN")).toBe(1234567_89n);
    expect(parseAmount("1,234", 0, "en-IN")).toBe(1234n);
    expect(parseAmount("1,234,567", 0, "en-IN")).toBeNull();
  });
});

describe("numberSeparators", () => {
  test("reads separators from Intl", () => {
    expect(numberSeparators()).toEqual({ decimal: ".", group: ",", lakh: false });
    expect(numberSeparators("es-UY")).toMatchObject({ decimal: ",", group: "." });
    expect(numberSeparators("en-IN").lakh).toBe(true);
  });
});

describe("formatAmountInput", () => {
  test("writes the locale's decimal separator and round-trips", () => {
    expect(formatAmountInput(123456n, 2)).toBe("1234.56");
    expect(formatAmountInput(123456n, 2, "es-UY")).toBe("1234,56");
    expect(formatAmountInput(null, 2, "es-UY")).toBe("");
    expect(parseAmount(formatAmountInput(1234n, 3, "es-UY"), 3, "es-UY")).toBe(1234n);
  });
});

describe("formatMoney", () => {
  test("formats like the app", () => {
    expect(formatMoney(123456n, "USD", 2, { sign: "always" })).toBe("+1,234.56 USD");
    expect(formatMoney(-4205n, "USD", 2)).toBe("−42.05 USD");
    expect(formatMoney(0n, "USD", 2, { sign: "always" })).toBe("0.00 USD");
    expect(formatMoney(-470000n, "UYU", 2, { code: false })).toBe("−4,700.00");
  });

  test("keeps precision for large amounts", () => {
    expect(formatMoney(900719925474099312n, "USD", 2)).toBe("9,007,199,254,740,993.12 USD");
  });
});

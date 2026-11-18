---
"@franco_roura/module-01": minor
---

Parse amounts and rates by locale. `money.parseAmount`, `fx.parseRate` and `money.formatAmountInput` take an optional `locale` (default en-US), and so do `FxCurrencies` and `FxConverter`, so `12,50` reads as 12.50 in es-UY. Group separators must now sit where the locale puts them: `12,50` and `1,2,3` in en-US return null instead of silently becoming 1,250 and 123. Adds `money.numberSeparators`, `money.splitDecimal` and `money.localizeDecimal`.

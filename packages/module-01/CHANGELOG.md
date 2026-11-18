# @franco_roura/module-01

## 1.2.0

### Minor Changes

- [#6](https://github.com/franco-roura/module-01/pull/6) [`778260e`](https://github.com/franco-roura/module-01/commit/778260ee70375c356b2356470ef1297d84b6751a) Thanks [@franco-roura](https://github.com/franco-roura)! - Parse amounts and rates by locale. `money.parseAmount`, `fx.parseRate` and `money.formatAmountInput` take an optional `locale` (default en-US), and so do `FxCurrencies` and `FxConverter`, so `12,50` reads as 12.50 in es-UY. Group separators must now sit where the locale puts them: `12,50` and `1,2,3` in en-US return null instead of silently becoming 1,250 and 123. Adds `money.numberSeparators`, `money.splitDecimal` and `money.localizeDecimal`.

## 1.1.0

### Minor Changes

- [#3](https://github.com/franco-roura/module-01/pull/3) [`3a59e07`](https://github.com/franco-roura/module-01/commit/3a59e0706fd48ad6e6953788619f54274feba6ac) Thanks [@franco-roura](https://github.com/franco-roura)! - Add `Accordion`, `Message` (with `Bubble`) and `ShareBar` to the kit, and `CompareList` to the site entry. `NavBar` takes `mobileMenu`, which folds its links into a sheet on phones, and `Tag` takes `wrap` for short taglines that would otherwise overflow.
  
  `CtaBanner` takes `children`, set full width under the text for a signup form, with fields restyled to read on signal. `Hero` takes `imageShape="wide"` (and `HeroFrame` a `shape`) for a 16:10 screenshot frame.

## 1.0.1

### Patch Changes

- [#1](https://github.com/franco-roura/module-01/pull/1) [`2049a17`](https://github.com/franco-roura/module-01/commit/2049a17e97b64d19c3331ae1495810c8daf7893d) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update `lucide-react` to 1.70.0, and build the precompiled `styles.css` with Tailwind CSS 4.3.5.

## 1.0.0

Initial public release of Module/01 as a package: the React components of a design system of glossy white parts, signal orange trim and HUD markings.

- The generic kit at `@franco_roura/module-01`: Panel, SectionHeader, the HUD markings, NavBar, Button, Badge, Field with fault feedback, Input, Select, Combobox, MultiCombobox, DatePicker, Dialog, Sheet, AlertDialog, Popover, Tooltip, DropdownMenu, Command, Tabs, Toggle and Toaster.
- Finance parts at `/finance`: Amount, MoneyInput, FxConverter, BudgetMeter, CategoryIcon, the icon and color pickers, and the money and FX helpers they use.
- Charts at `/charts`: BalanceChart, FlowChart and DonutChart on Recharts, an optional peer dependency.
- Site sections at `/site`: Hero, TimelineEntry, MediaCard, CtaBanner, Footer, SpecReadout, Terminal, Tag and SplitFlap.
- Colors as four palettes of ten steps (`graphite`, `signal`, `green`, `red`), with the named tokens (`ink`, `shell`, `signal`, `danger`…) pointing at the steps, so overriding a step rethemes everything that uses it.
- Styles two ways: `theme.css`, a Tailwind v4 preset that makes the tokens utilities and shares one stylesheet with your app, and `styles.css`, precompiled for apps without Tailwind. `tokens.css` and `tokens.json` carry the tokens on their own.
- One ESM file per component with types, so apps tree-shake down to what they import. Interactive components keep their `"use client"` directive for React Server Components.
- Forms flow on their own: dialogs and sheets open on their first field, and Select, Combobox and DatePicker move focus to the next field after a pick.

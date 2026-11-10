# @franco_roura/module-01

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

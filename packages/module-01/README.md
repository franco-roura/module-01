# Module/01

React components for a design system of glossy white parts, signal orange trim, soft corners with
one hard notch, and HUD markings. A component kit for any app or website.

**[Docs, live examples and playground →](https://franco-roura.github.io/module-01/)**

## Install

```bash
npm install @franco_roura/module-01
```

It needs React 19. With Tailwind v4, import the theme after Tailwind:

```css
@import "tailwindcss";
@import "@franco_roura/module-01/theme.css";
```

Without Tailwind, import the precompiled stylesheet once:

```ts
import "@franco_roura/module-01/styles.css";
```

Then load the fonts (Michroma, Manrope, Space Mono) as described in
[Get started](https://franco-roura.github.io/module-01/getting-started/).

## Use

```tsx
import { Button, Field, Input, Panel, SectionHeader } from "@franco_roura/module-01";

export function NewWallet() {
  return (
    <Panel serial="W-01 · NEW" cross>
      <SectionHeader as="h2" code="S-01" label="Wallets" title="Add wallet" />
      <Field label="Name" htmlFor="wallet-name">
        <Input id="wallet-name" placeholder="Savings" />
      </Field>
      <Button arrow>Save</Button>
    </Panel>
  );
}
```

## Entry points

| Import                            | What's in it                                                     |
| --------------------------------- | ---------------------------------------------------------------- |
| `@franco_roura/module-01`         | Panels, HUD markings, buttons, forms, pickers, dialogs and menus |
| `@franco_roura/module-01/finance` | Amounts, money input, FX converter, budget meter, category icons |
| `@franco_roura/module-01/charts`  | Balance, cash flow and donut charts (needs `recharts`)           |
| `@franco_roura/module-01/site`    | Hero, experience timeline, project cards, contact block, footer  |

Styles: `theme.css` (Tailwind v4 preset), `styles.css` (precompiled), `tokens.css` (custom
properties only) and `tokens.json` (the source, with a usage note per token).

The `guidelines/` folder in this package has the brand book and a guideline per component, as
Markdown.

## License

MIT OR Apache-2.0.

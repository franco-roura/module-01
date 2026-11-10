# Module/01

The React components of the Module/01 design system, published to npm as
`@franco_roura/module-01`, with a docs site on GitHub Pages.

## Layout

- `packages/module-01` — the published package
  - `src/components`, `src/lib` — components and shared helpers
  - `src/{index,finance,charts,site}.ts` — the four entry points
  - `src/styles` — `kit.css` (utilities, fault animation), `base.css`; `tokens.generated.css` is
    built from the tokens and not committed
  - `tokens/tokens.json` — the source of every token, with a usage note each
  - `guidelines/` — one guideline per component (shown in the docs as "Usage"), and `README.md`,
    the brand book: instructions for agents designing with the kit, never shown in the docs
  - `scripts/` — `build-tokens.ts`, `build-css.ts`
- `apps/docs` — the docs site (Vite+, prerendered): `src/examples`, `src/registry.ts`, `src/pages`

## Commands

Run from the repository root. The toolchain is Vite+ (`vp`); Bun is the package manager.

- `bun run dev` — build the package, then start the docs site
- `bun run build` — build the package and the docs
- `bun run check` / `bun run format` — format, lint and type-check (`vp check`), or fix
- `bun run test` — unit and render tests (`vp test`)
- `bun run --cwd packages/module-01 build` — tokens → `vp pack` → CSS, into `dist/`
- `bun run --cwd packages/module-01 size` — bundle size budgets
- `bun x changeset` — describe a change for the next release

The docs import the built package, so rebuild it after changing a component.

## Rules

- **Styling only through tokens** (Tailwind theme and CSS variables generated from
  `tokens/tokens.json`). No raw hex values in components. Icons: Lucide, `strokeWidth={1.25}`. Light
  theme only. Text on `signal` orange is always `ink`, never white.
- **One notch per part**, top-right, never on a stadium. Shadows on notched parts are drop-shadow
  filters (`drop-float`), because `clip-path` clips `box-shadow`.
- **Forms flow by themselves** when built from kit parts: `Dialog` and `Sheet` focus the first field
  on open (and open it if it is an empty `Combobox`); `Select`, `Combobox` and `DatePicker` move
  focus to the next field after a pick (`MultiCombobox` stays open while toggling); Tab follows DOM
  order. Don't add `autoFocus` inside dialogs. Validate with `fault(id)` plus the Field's `error`.
  Helpers: `src/lib/form-flow.ts`, `src/lib/fault.ts`.
- **Keep input text at 16px or more**, or mobile browsers zoom in on focus.
- **Keep `"use client"`** on any component that uses state, effects, refs or Radix. The build
  preserves it per file.
- **Keep heavy dependencies out of the main entry.** Anything large goes in its own entry point or
  becomes an optional peer dependency, and `.size-limit.json` holds the budgets.
- **Money is integer minor units** (`bigint`) plus an ISO 4217 code. Never floats.
- **Copy is English, sentence case, plain words.** HUD codes (`W-01`, `S-02`) are decoration, not
  headings.
- **Examples, tests and docs use made-up data.**

## A new component needs

1. The component, exported from the right entry point.
2. `guidelines/<Name>.md`.
3. Examples in `apps/docs/src/examples`, a page and a category in `apps/docs/src/registry.ts`, and a
   gallery picture in `apps/docs/src/previews.tsx`.
4. A changeset.

## Releases

Never bump versions or edit `CHANGELOG.md` by hand. Changesets collects pending changes into a
"Version packages" PR; merging it publishes to npm (trusted publishing), tags `vX.Y.Z` and creates
the GitHub release. Semver: major when a consumer must change code, minor for additions, patch for
fixes ([CONTRIBUTING.md](CONTRIBUTING.md#versioning-and-changesets)).

Commit subjects are imperative, sentence case, with no prefix and no trailing period.

## Design system

The Module/01 design system is also documented in a design-system artifact. This repository is the
source of truth for the components; when a token or guideline changes here, the artifact is updated
from it (maintainers only).

## Docs site

- The landing page sells the kit: a headline, a live showcase built from real components, and
  short sections. It is not a setup guide and carries no brand-book prose.
- `/components` is a gallery: every page has a small live picture in `apps/docs/src/previews.tsx`
  and a category in `categories` (`registry.ts`). A new component needs both.
- `/colors` is generated from `tokens.json`: palettes, named tokens, measured contrast.

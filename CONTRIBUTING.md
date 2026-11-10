# Contributing

Thanks for helping out. Bug reports, fixes and new components are all welcome.

## Getting started

You need [Bun](https://bun.sh) and Node.js 24 or newer. The toolchain is
[Vite+](https://viteplus.dev) (`vp`), which is installed with the dependencies.

```bash
bun install
```

```bash
bun run dev
```

`bun run dev` builds the package and starts the docs site, which doubles as the playground. The
docs import the built package, as an app would, so rerun `bun run --cwd packages/module-01 build`
after changing a component (or keep `bun x vp pack --watch` running in `packages/module-01`).

## Layout

- `packages/module-01` is the published package:
  - `src/components` and `src/lib` hold the components and the helpers they share;
  - `src/index.ts`, `finance.ts`, `charts.ts` and `site.ts` are the four entry points;
  - `tokens/tokens.json` is the source of every design token;
  - `guidelines/` has the brand book (`README.md`) and a guideline per component.
- `apps/docs` is the docs site: `src/examples` holds the live examples, and `src/registry.ts` lists
  the pages.

## Before you open a pull request

- Run `bun run check` (format, lint and types) and `bun run test`. `bun run format` fixes what it
  can.
- Run `bun run build`, then `bun run --cwd packages/module-01 size`. CI fails when an entry point
  outgrows its budget in `.size-limit.json`. If the growth is worth it, raise the budget in the same
  pull request and say why.
- Add a changeset (see below). CI fails when a change to the package has none.
- Keep each pull request to one change, and say what changed and why.

## Adding or changing a component

1. Put it under `packages/module-01/src/components`, styled with tokens, and export it from the
   entry point it belongs to. A new heavy dependency means a new entry point, or an optional peer.
2. Write `guidelines/<Name>.md`: a title, one paragraph that says what it is, one that says what to
   provide, then the rules as bullets.
3. Add examples to `apps/docs/src/examples` and a page to `apps/docs/src/registry.ts`. Each exported
   function in an example file is one live example, and its source is shown as written.
4. Add a changeset.

To change a token, edit `tokens/tokens.json`, keeping its usage note true. The CSS is generated
from it on every build.

## Versioning and changesets

Module/01 follows [semantic versioning](https://semver.org). A version number tells someone who
installs the package what an upgrade involves:

- **Major:** upgrading needs a change in your code. Examples: a removed or renamed export, prop,
  token or utility class; a changed default that alters how a component looks or behaves; a new
  required peer dependency.
- **Minor:** something new. A component, a prop, a token, an entry point. Upgrading is a plain
  install.
- **Patch:** fixes, including visual fixes that bring a component back in line with its guideline.

Describe your change with `bun x changeset`. Choose the bump and write one or two sentences for the
release notes, addressed to someone who uses the kit. For changes nobody would notice (tests,
refactors, docs, CI), use `bun x changeset --empty`.

You don't edit versions or changelogs by hand. The Release workflow collects pending changesets into
a "Version packages" pull request. Merging it bumps the version, updates the changelog, publishes to
npm, tags `vX.Y.Z` and creates the GitHub release.

## Ground rules

- **Style only through tokens.** No raw hex values in components. Icons are Lucide at
  `strokeWidth={1.25}`.
- **Light theme only.** Module/01 is lit like a white studio.
- **Text on `signal` is always `ink`, never white.**
- **One notch per part**, and never on a stadium.
- **Copy is English, in sentence case, in plain words.** HUD codes (`S-02`, `W-01`) are decoration,
  never the only label.
- **Examples, tests and docs use made-up data:** people, companies and amounts.

[CLAUDE.md](CLAUDE.md) has the full set of rules. It doubles as the guide for coding agents.

## Bugs and security issues

Open an issue for bugs, with the steps to reproduce them. For anything security-related, follow
[SECURITY.md](SECURITY.md) instead of opening an issue.

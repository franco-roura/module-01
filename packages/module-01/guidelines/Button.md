# Button

Stadium-shaped molded button: signal orange for the main action, white shell for the second, and quieter variants for everything else.

Provide `children` (label, sentence case, 1–3 words) and `onClick`. For a link, pass `asChild` and put an `<a>` (or your router link) inside. Optional `variant`, `size` and `arrow` (adds a mono →).

- `default`: `signal` fill, `ink` label, `shadow-mold`. The main action of a block: "Start free trial", "Save changes". Never white text on signal.
- `secondary`: `shell` fill with `shadow-mold`, for the second action, and the only button on a signal block.
- `outline`: `shell` with a `seam` border, for form triggers and toolbar actions.
- `ghost`: no fill until hover, for icon buttons and row actions.
- `destructive`: `danger` fill with `shell` text. Only for the action that deletes.
- `link`: `signal-ink` text with an underline on hover.
- `bracket`: text wrapped in `signal-ink` mono brackets, `[ GitHub ]`. Inline links on cards and in the footer.
- Pressed: moves down 1px and swaps to `shadow-press`. Focus: a `signal-ink` ring.
- Height `control-height` (44px) by default, `radius-full`, `label` style. Sizes `xs`, `sm`, `lg` and the square `icon` sizes are for dense toolbars.
- Icons are Lucide at `strokeWidth={1.25}`, before the label.

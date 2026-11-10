# Input

The plain text well: `shell-recess` fill, `shadow-press`, `radius-md`, `control-height`.

Takes every native `<input>` prop. Wrap it in a Field and pass the same `id` as the Field's `htmlFor`.

- Text is `body-md` (16px), so phones don't zoom in on focus.
- Focus adds a `signal-ink` ring. `aria-invalid` tints the well `danger-tint`.
- Placeholders are examples ("Write a note"), in `ink-soft`. They never replace the label.

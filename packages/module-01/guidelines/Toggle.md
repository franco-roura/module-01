# Toggle

A button that stays pressed, on Radix Toggle. `ToggleGroup` holds a set of them.

`Toggle` takes `pressed`, `onPressedChange`, `variant` (`default`, `outline`) and `size`. `ToggleGroup` takes `type` (`single` or `multiple`), `value`, `onValueChange`, and `ToggleGroupItem`s.

- Pressed is a sunken state: `shell-recess` with `shadow-press`.
- For view options that apply at once (a chart mode, bold). An option saved with a form is a Checkbox.
- Give icon-only toggles an `aria-label`.

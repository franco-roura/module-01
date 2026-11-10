# Tag

Small stadium chip in mono uppercase for skills, stacks and status.

Provide `children` (one or two words). Optional `tone` (`signal`, `tint`, `outline`; recessed by default), `led` (adds a green LED dot, for "Live"), and `interactive` with `pressed` and `onClick` to render a keycap button.

- Default: `shell-recess` fill, like a slot molded into the part. `outline` on shell cards; `signal` for the one tag that matters most; `tint` for in-progress states.
- Text is always uppercase `hud` at 12px.
- In an app, use Badge; Tag adds the LED and the keycap for sites.

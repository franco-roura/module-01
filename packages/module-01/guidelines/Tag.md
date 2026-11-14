# Tag

Small stadium chip in mono uppercase for skills, stacks and status.

Provide `children` (one or two words). Optional `tone` (`signal`, `tint`, `outline`; recessed by default), `led` (adds a green LED dot, for "Live"), `wrap`, and `interactive` with `pressed` and `onClick` to render a keycap button.

- Default: `shell-recess` fill, like a slot molded into the part. `outline` on shell cards; `signal` for the one tag that matters most; `tint` for in-progress states.
- Text is always uppercase `hud` at 12px.
- Tags don't wrap. For a short tagline in tag style (a few words over a heading), set `wrap`: on narrow screens it breaks onto more lines and rounds into a capsule instead of overflowing.
- In an app, use Badge; Tag adds the LED, the keycap and wrapping for sites.

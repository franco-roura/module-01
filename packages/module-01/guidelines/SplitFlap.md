# SplitFlap

Text whose characters flip through random glyphs before landing, like a station departure board.

Provide `text`. Optional `start` (hold the first flap until true, e.g. when scrolled into view).

- Use it on HUD microprint: a status line, a clock, a code. Never on headings or body text.
- It flaps again whenever `text` changes; unchanged characters stay still.
- Screen readers get the final text only. Reduced motion skips the flipping.

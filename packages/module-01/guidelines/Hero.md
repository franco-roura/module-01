# Hero

The opening shell: the page title or product name in Michroma, a subtitle and intro, actions, a spec row, and a studio image frame with grill and coordinates.

Provide `title`. Optional `subtitle` (mono, `signal-ink`), `lead` (one or two sentences), `actions` (Buttons), `specs` (SpecReadout items), `image` (an `<img>`: a product shot, a screenshot, a portrait), `imageLabel`, `imageShape`, `serial`, `coords` (microprint), or `media` to replace the image frame with your own.

- `shell` part with `radius-xl` and a `notch-lg` cut, a `signal` hinge tab on its top edge, a signal crosshair bottom-right.
- Title in `display-xl` (`display-lg` on phones); lead in `body-lg` `ink-soft`. The image sits on a `studio` backdrop; no image shows a crosshair placeholder.
- `imageShape` sets the frame: `portrait` (200 × 240, the default) for a person or an object, `wide` (16:10, up to 416px) for a screenshot. A wide frame sits under the text until the hero itself is 1024px wide.
- One per page. It renders the page `h1`.

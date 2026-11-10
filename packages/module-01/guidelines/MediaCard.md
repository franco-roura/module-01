# MediaCard

A card shot like a product: studio media frame with crosshairs and a code, kind and status, title, description, tags and bracket links, with an orange hinge tab. Use it for products, features, case studies, articles or projects.

Provide `title`, and optional `code` (`C-01`), `image`, `imageAlt`, `kind` ("Product", "Case study"), `status` ("Live" gets a green LED; others a tint tag), `description` (1–2 sentences), `tags`, `links` (`[{label, href}]`), `hingeLeft`.

- A Panel at `notch-md` with 14px inset; media on `studio` at `radius-md`.
- Lay out two or three across with `space-8` gaps; vary `hingeLeft` so tabs don't line up.

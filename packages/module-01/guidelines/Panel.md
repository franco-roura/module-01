# Panel

The molded white part: a rounded shell with one hard notched corner, a serial in microprint and a corner crosshair.

Provide `children`. Optional `serial` (microprint top-left, e.g. `W-01 · USD`), `notch` (`md` default, `sm`, `lg`, or `false`), `recess` (sunken `shell-recess` fill), `cross` (corner crosshair), `hinge` (left offset of a signal hinge tab) and `bodyClassName` (padding and layout of the inner part).

- `shell` fill, `radius-lg`, padding `space-8`, lifted by `shadow-float` (as a drop-shadow so the notch keeps it). The notch sits top-right.
- One notch per part, one hinge per part. Vary the hinge position from card to card.
- Lists live in one Panel with `bodyClassName="p-0"`; summary tiles are small Panels with `notch="sm"`.
- `HingeTab` is the tab on its own, for custom parts.

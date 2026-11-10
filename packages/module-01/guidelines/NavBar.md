# NavBar

Floating frosted stadium bar: brand on the left, numbered links, and an end slot.

Provide `brand` and `links` (`[{label, href, active}]`, 3–5). Optional `serial` (microprint under the brand), `end` (a StatusLed, a Button or a user menu) and `renderLink` to render links with your router.

- `glass` with blur and `shadow-glass`, `radius-full`, `nav-height` (64px). Float it `space-4` from the top, sticky.
- Links get mono numbers `01` `02`… on wide screens; the active one turns `signal-ink`.
- Mark a link `desktopOnly` when the end slot offers it on phones.
- It needs color or content scrolling behind it to read as glass.

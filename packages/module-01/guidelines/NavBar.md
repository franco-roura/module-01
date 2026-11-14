# NavBar

Floating frosted stadium bar: brand on the left, numbered links, and an end slot.

Provide `brand` and `links` (`[{label, href, active}]`, 3–5). Optional `serial` (microprint under the brand), `end` (a StatusLed, a Button or a user menu), `mobileMenu` and `renderLink` to render links with your router.

- `glass` with blur and `shadow-glass`, `radius-full`, `nav-height` (64px). Float it `space-4` from the top, sticky.
- Links get mono numbers `01` `02`… on wide screens; the active one turns `signal-ink`.
- On phones, set `mobileMenu`: the links give way to a menu key (a `ghost` icon Button) that opens them in a sheet from the right, numbered, in `display-sm`. The sheet closes when a link is followed. `menuLabel` names the key and the sheet ("Menu").
- Without `mobileMenu`, mark a link `desktopOnly` when the end slot offers it on phones; the links otherwise stay inline and need to fit.
- It needs color or content scrolling behind it to read as glass.

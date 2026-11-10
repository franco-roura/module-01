# TimelineEntry

One entry on a timeline track: a job, a release, a milestone. Date range and code, title, subtitle, bullet points and tags.

Provide `title`, `start`, and optional `subtitle` (a company, team or product), `end` (defaults to "Now"), `current` (orange node; past entries get a hollow node), `code` (`R-03`), `detail` (a place or a version), `points` (2–4 short bullets), `tags`.

- Dates in `hud-num`; title in `display-sm`; subtitle in `body-sm` `ink-soft`; bullets in `body-md` with `signal-ink` markers.
- Stack entries newest first; the track line runs between them in `seam`.

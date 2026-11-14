# ShareBar

Parts of one whole on one track, each named in a legend with its percentage: an 80/20 split, where each dollar goes, time by activity.

Provide `parts` (`[{share, label, tone}]`, two to five, in reading order) and `label`, the accessible name for the whole. Optional `percent` (on by default), `size` (`sm`, `md`, `lg`).

- A sunken `shell-recess` stadium with `shadow-press`, filled with stadium segments in `signal`, `ink`, `signal-tint` and `seam` (that order by default), each a hairline apart.
- `share` can be in any unit; parts are drawn relative to their sum and the legend shows rounded percentages in `hud-num`.
- The legend names every part, so color is never the only cue. Put the largest or most important part first, in `signal`.
- For one share of a budget, with a today tick, use BudgetMeter.

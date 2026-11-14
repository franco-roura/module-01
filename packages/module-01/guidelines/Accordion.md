# Accordion

Sections that open in place: questions and answers, settings groups, details under a summary.

Compose `Accordion` > `AccordionItem` (`value`) > `AccordionTrigger` + `AccordionContent`. Set `type="single"` (add `collapsible` to let the open one close) or `type="multiple"`. Optional `code` on a trigger adds microprint before the label (`01`, `Q-02`).

- Items are divided by `seam` lines, with no fill of their own: put the accordion in a Panel, or straight on `canvas` on a site.
- The trigger is a `body-md` semibold row with a plus keycap on the right: `shell-recess` with `shadow-press` when closed; it lights `signal` and turns 45° into a close mark when open.
- Content is `body-md` `ink-soft`, and opens with a short height animation (none with reduced motion).
- Triggers are buttons inside an `h3` heading, so a page's outline lists the questions. Keep labels short and plain; the answer goes in the content.
- For two to five views of the same thing, use Tabs instead. For a hint, use Tooltip or Popover.

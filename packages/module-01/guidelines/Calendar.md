# Calendar

The month grid on its own, on react-day-picker. DatePicker wraps it in a field.

Takes react-day-picker props: `mode` (`single`, `multiple`, `range`), `selected`, `onSelect`, `month`, `onMonthChange`, `disabled`. Weeks start on Monday and outside days show by default.

- The caption is `hud` ("OCTOBER 2026"), weekdays are `hud-sm` in `ink-soft`.
- Days are 36px stadiums in tabular mono. Selected: `signal` fill with `ink` text. Today: a `signal-ink` ring.

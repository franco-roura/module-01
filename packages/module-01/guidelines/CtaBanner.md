# CtaBanner

The big signal orange call to action at the foot of the page: a headline, a line of text, a grill and one shell button.

Provide `title` and `action` (a `secondary` Button), optional `text` and `code` (microprint). For a signup, pass the form as `children` instead of `action`: it sits full width under the text.

- `signal` fill, `ink` text, `radius-xl` with a `notch-lg` cut, grill slots in `signal-shade`.
- Fields in the banner get `shell` wells, and their labels and help turn `ink`, since `ink-soft` is too faint on `signal`. A faulted label stays `ink` with its fault LED. Lay the fields and a `secondary` submit Button out in one row on wide screens, stacked on phones.
- Once per page, before the footer. It's the largest orange surface; let it be.

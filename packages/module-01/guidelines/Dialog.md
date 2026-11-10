# Dialog

A centered modal part over an `overlay` scrim, on Radix Dialog.

Compose `Dialog`, `DialogTrigger` and `DialogContent` with a `DialogHeader` (`DialogTitle`, `DialogDescription`) and a `DialogFooter`. `showCloseButton={false}` on the content drops the corner close button.

- For short, focused tasks: a confirmation with a field or two. Longer editors open in a Sheet.
- It opens with focus on its first field, not the close button. Don't add `autoFocus` inside.
- The title names the task in plain words; the main action sits last in the footer.

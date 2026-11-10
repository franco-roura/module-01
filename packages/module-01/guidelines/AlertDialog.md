# AlertDialog

A modal that interrupts to confirm something that can't be undone, on Radix AlertDialog.

Compose `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent` (`size`: `default` or `sm`), a header with `AlertDialogTitle` and `AlertDialogDescription`, and a footer with `AlertDialogCancel` and `AlertDialogAction`.

- Only for destructive or irreversible actions. Everything else is a Dialog or needs no confirmation.
- The title asks the question ("Delete this project?"); the description says what is lost.
- The action repeats the verb ("Delete project") with `variant="destructive"`. Never "OK".

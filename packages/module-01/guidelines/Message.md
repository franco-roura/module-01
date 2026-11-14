# Message

A message in a conversation: a chat with an assistant, support replies, a short exchange shown on a landing page.

Compose `Message` > `MessageAvatar` + `MessageContent` > `MessageHeader`, `Bubble`, `MessageFooter`. Set `align="end"` on the reader's own messages. Wrap consecutive messages from one sender in `MessageGroup`, and leave `MessageAvatar` empty on all but the last so they line up.

- `Message` lays out the row; `Bubble` is the surface. Without a `tone`, a bubble on the start side is a `shell` part with `shadow-mold`, and one on the end side is `signal-tint`. Set `tone` to `recess` for asides or `visor` for code and machine output.
- Bubbles are `radius-md` with the corner nearest the speaker tucked in to `radius-xs`. No notch: a conversation is a field of bubbles.
- `MessageAvatar` takes an `<img>`, or `fallback` initials on a recessed disc.
- `MessageHeader` holds the sender's name and `MessageFooter` a status or a time, both in `hud-sm` `ink-soft`. Actions in the footer are `ghost` `icon-xs` Buttons, each with an `aria-label`.
- Text in a bubble is `body-md` `ink`; links in it are `signal-ink`.
- Put a live conversation in an element with `role="log"`, so new messages are announced.

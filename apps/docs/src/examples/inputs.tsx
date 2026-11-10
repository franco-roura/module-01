import { Checkbox, Field, Input, Label, Textarea } from "@franco_roura/module-01";

export function TextInput() {
  return (
    <div className="grid max-w-xl gap-4 sm:grid-cols-2">
      <Field label="Name" htmlFor="input-name">
        <Input id="input-name" placeholder="Write a name" />
      </Field>
      <Field label="Disabled" htmlFor="input-disabled">
        <Input id="input-disabled" disabled defaultValue="Read only" />
      </Field>
      <Field label="Invalid" htmlFor="input-invalid" error="Use up to 2 decimals">
        <Input id="input-invalid" aria-invalid defaultValue="1.234" />
      </Field>
    </div>
  );
}

export function MultiLine() {
  return (
    <Field label="Note (optional)" htmlFor="input-note" className="max-w-md">
      <Textarea id="input-note" placeholder="What was this for?" />
    </Field>
  );
}

export function CheckboxWithLabel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="input-keep" defaultChecked />
        <Label htmlFor="input-keep">Keep open to add more</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="input-repeat" />
        <Label htmlFor="input-repeat">Repeat every month</Label>
      </div>
    </div>
  );
}

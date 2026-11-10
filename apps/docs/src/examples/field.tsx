import { Button, fault, Field, Input } from "@franco_roura/module-01";
import { useState } from "react";

export function Basic() {
  return (
    <div className="grid max-w-xl gap-4 sm:grid-cols-2">
      <Field label="Wallet name" htmlFor="field-name">
        <Input id="field-name" placeholder="Savings" />
      </Field>
      <Field label="Note (optional)" htmlFor="field-note" help="Shown on the wallet card.">
        <Input id="field-note" placeholder="Rainy day fund" />
      </Field>
    </div>
  );
}

export function FaultFeedback() {
  const [value, setValue] = useState("1.234");
  const [error, setError] = useState<string>();

  const submit = () => {
    if (/^\d+(\.\d{1,2})?$/.test(value)) return setError(undefined);
    // The control jitters and pings, focus moves to it, and the label turns danger.
    fault("field-amount");
    setError("Use up to 2 decimals");
  };

  return (
    <div className="flex max-w-xs flex-col gap-4">
      <Field label="Amount" htmlFor="field-amount" error={error}>
        <Input
          id="field-amount"
          inputMode="decimal"
          aria-invalid={error !== undefined}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(undefined);
          }}
        />
      </Field>
      <Button onClick={submit}>Save</Button>
    </div>
  );
}

import { Field, MultiCombobox } from "@franco_roura/module-01";
import { useState } from "react";

const wallets = [
  { id: "w-01", name: "Checking", currency: "USD" },
  { id: "w-02", name: "Savings", currency: "USD" },
  { id: "w-03", name: "Cash", currency: "UYU" },
  { id: "w-04", name: "Travel card", currency: "EUR" },
];

export function Filter() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <Field label="Wallets" htmlFor="multi-wallets" className="max-w-xs">
      <MultiCombobox
        id="multi-wallets"
        value={selected}
        onChange={setSelected}
        options={wallets}
        getKey={(wallet) => wallet.id}
        getSearchText={(wallet) => wallet.name}
        renderOption={(wallet) => (
          <span className="flex w-full items-center justify-between gap-3">
            {wallet.name}
            <span className="hud-sm text-ink-soft">{wallet.currency}</span>
          </span>
        )}
        allLabel="All wallets"
        noun="wallets"
      />
    </Field>
  );
}

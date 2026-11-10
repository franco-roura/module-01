import { Combobox, Field, Input } from "@franco_roura/module-01";
import { CategoryIcon } from "@franco_roura/module-01/finance";
import { useState } from "react";

type Category = { id: string; name: string; icon: string; color: string };

const spending: Category[] = [
  { id: "groceries", name: "Groceries", icon: "shopping-cart", color: "cat-green" },
  { id: "eating-out", name: "Eating out", icon: "utensils", color: "cat-amber" },
  { id: "transport", name: "Transport", icon: "bus", color: "cat-sky" },
  { id: "home", name: "Home", icon: "building-2", color: "cat-violet" },
];
const income: Category[] = [
  { id: "salary", name: "Salary", icon: "briefcase", color: "cat-teal" },
  { id: "gifts", name: "Gifts", icon: "banknote", color: "cat-pink" },
];

const row = (category: Category) => (
  <span className="flex items-center gap-2">
    <CategoryIcon icon={category.icon} color={category.color} size="sm" />
    {category.name}
  </span>
);

export function Grouped() {
  const [category, setCategory] = useState("");
  return (
    <div className="grid max-w-xl gap-4 sm:grid-cols-2">
      <Field label="Category" htmlFor="combobox-category">
        <Combobox
          id="combobox-category"
          value={category}
          onChange={setCategory}
          groups={[
            { heading: "Spending", options: spending },
            { heading: "Income", options: income },
          ]}
          getKey={(option) => option.id}
          getSearchText={(option) => option.name}
          renderOption={row}
          placeholder="Choose a category"
          searchPlaceholder="Search categories…"
        />
      </Field>
      {/* Picking a category moves focus here. */}
      <Field label="Note" htmlFor="combobox-note">
        <Input id="combobox-note" placeholder="Focus lands here after a pick" />
      </Field>
    </div>
  );
}

export function FlatList() {
  const [currency, setCurrency] = useState("USD");
  return (
    <Field label="Currency" htmlFor="combobox-currency" className="max-w-xs">
      <Combobox
        id="combobox-currency"
        value={currency}
        onChange={setCurrency}
        options={["USD", "EUR", "UYU", "ARS", "BRL", "GBP", "JPY"]}
        getKey={(code) => code}
        renderOption={(code) => <span className="tabular">{code}</span>}
        footer={<span className="hud-sm text-signal-ink">Edit currencies →</span>}
      />
    </Field>
  );
}

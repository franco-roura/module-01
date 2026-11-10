import { Field } from "@franco_roura/module-01";
import {
  Amount,
  BudgetMeter,
  CategoryIcon,
  categoryColors,
  ColorDot,
  ColorPicker,
  type FxState,
  FxConverter,
  IconPicker,
  initialFxState,
  MoneyInput,
} from "@franco_roura/module-01/finance";
import { useState } from "react";

export function Amounts() {
  return (
    <div className="flex flex-wrap items-baseline gap-6">
      <Amount minor={123456n} currency="USD" minorUnits={2} size="xl" />
      <Amount minor={-248015n} currency="USD" minorUnits={2} size="lg" />
      <Amount minor={-1076n} currency="USD" minorUnits={2} code={false} />
      <Amount minor={0n} currency="UYU" minorUnits={2} />
      <Amount minor={1866n} currency="JPY" minorUnits={0} tone="muted" />
    </div>
  );
}

export function AmountField() {
  return (
    <Field label="Amount" htmlFor="finance-amount" className="max-w-xs">
      <MoneyInput id="finance-amount" currency="USD" />
    </Field>
  );
}

export function Converter() {
  const [fx, setFx] = useState<FxState>(initialFxState());
  return (
    <div className="flex flex-col gap-3">
      {/* Enter any two of the three; the third is worked out. */}
      <FxConverter
        className="max-w-3xl"
        from={{ code: "USD", minorUnits: 2 }}
        to={{ code: "UYU", minorUnits: 2 }}
        value={fx}
        onChange={setFx}
      />
      <p className="hud-sm text-ink-soft">Last edited: {fx.order.join(" → ") || "nothing yet"}</p>
    </div>
  );
}

export function Budgets() {
  return (
    <div className="flex max-w-md flex-col gap-6">
      <BudgetMeter spent={32000n} budget={60000n} elapsed={0.6} label="Groceries" />
      <BudgetMeter spent={71500n} budget={60000n} elapsed={0.6} label="Eating out" />
      <BudgetMeter spent={12000n} budget={60000n} label="Transport" size="sm" />
    </div>
  );
}

export function Categories() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <CategoryIcon icon="shopping-cart" color="cat-green" size="lg" label="Groceries" />
        <CategoryIcon icon="utensils" color="cat-amber" label="Eating out" />
        <CategoryIcon icon="bus" color="cat-sky" size="sm" label="Transport" />
        <CategoryIcon icon="arrow-left-right" color="cat-slate" label="Transfer" />
      </div>
      <div className="flex flex-wrap gap-3 text-body-sm">
        {categoryColors.slice(0, 6).map((color) => (
          <span key={color} className="flex items-center gap-1.5">
            <ColorDot color={color} /> {color.replace("cat-", "")}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Pickers() {
  const [icon, setIcon] = useState("shopping-cart");
  const [color, setColor] = useState("cat-green");
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex items-center gap-3">
        <CategoryIcon icon={icon} color={color} size="lg" />
        <span className="font-display text-display-sm">Groceries</span>
      </div>
      <IconPicker value={icon} onChange={setIcon} />
      <ColorPicker value={color} onChange={setColor} />
    </div>
  );
}

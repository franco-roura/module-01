import { Panel } from "@franco_roura/module-01";
import { BalanceChart, DonutChart, FlowChart } from "@franco_roura/module-01/charts";

const usd = { currency: "USD", minorUnits: 2 };
const weeks = ["Oct 5", "Oct 12", "Oct 19", "Oct 26", "Nov 2", "Nov 9"];

export function Balance() {
  const balances = [412000n, 398500n, 441200n, 429900n, 468300n, 455100n];
  return (
    <Panel serial="C-01 · BALANCE">
      <BalanceChart
        money={usd}
        points={weeks.map((label, index) => ({
          label,
          tooltipLabel: `Week of ${label}`,
          balance: balances[index] ?? 0n,
        }))}
      />
    </Panel>
  );
}

export function CashFlow() {
  const income = [120000n, 0n, 210000n, 15000n, 120000n, 0n];
  const expense = [64000n, 81500n, 47200n, 98300n, 52100n, 33400n];
  return (
    <Panel serial="C-02 · CASH FLOW">
      <FlowChart
        money={usd}
        points={weeks.map((label, index) => ({
          label,
          tooltipLabel: `Week of ${label}`,
          income: income[index] ?? 0n,
          expense: expense[index] ?? 0n,
        }))}
      />
    </Panel>
  );
}

export function ByCategory() {
  return (
    <Panel serial="C-03 · SPENDING" className="max-w-xl">
      <DonutChart
        money={usd}
        centerLabel="Spent"
        slices={[
          {
            key: "groceries",
            label: "Groceries",
            color: "cat-green",
            amount: 86400n,
            icon: "shopping-cart",
          },
          {
            key: "eating-out",
            label: "Eating out",
            color: "cat-amber",
            amount: 51200n,
            icon: "utensils",
          },
          { key: "transport", label: "Transport", color: "cat-sky", amount: 23800n, icon: "bus" },
          { key: "home", label: "Home", color: "cat-violet", amount: 142000n, icon: "building-2" },
        ]}
      />
    </Panel>
  );
}

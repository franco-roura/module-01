import { Button, NavBar, StatusLed } from "@franco_roura/module-01";

export function Site() {
  return (
    <div className="rounded-lg bg-studio p-4">
      <NavBar
        brand="Northwind"
        serial="UNIT-01 · REV.2026"
        links={[
          { label: "Product", href: "#product", active: true },
          { label: "Pricing", href: "#pricing" },
          { label: "Docs", href: "#docs" },
        ]}
        end={<Button size="sm">Sign up</Button>}
      />
    </div>
  );
}

export function App() {
  return (
    <div className="rounded-lg bg-studio p-4">
      <NavBar
        brand="Atlas/01"
        links={[
          { label: "Dashboard", href: "#dashboard", active: true },
          { label: "Transactions", href: "#transactions" },
          { label: "Budgets", href: "#budgets", desktopOnly: true },
        ]}
        end={<StatusLed className="px-3 max-sm:hidden">Synced</StatusLed>}
      />
    </div>
  );
}

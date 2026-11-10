import { GlassPanel, Grill, Panel } from "@franco_roura/module-01";

export function Parts() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Panel serial="PNL-01 · REV.B" hinge="32px" cross>
        <p>A panel with a serial, a hinge tab and a corner crosshair.</p>
      </Panel>
      <Panel recess notch="sm">
        <p>A recessed panel with a small notch.</p>
      </Panel>
    </div>
  );
}

export function SummaryTiles() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        ["Income", "+4,200.00"],
        ["Expenses", "−2,480.15"],
        ["Net", "+1,719.85"],
      ].map(([label, figure]) => (
        <Panel key={label} notch="sm" bodyClassName="p-5 sm:p-5">
          <p className="hud-sm text-ink-soft">{label}</p>
          <p className="tabular mt-2 text-amount-lg">{figure}</p>
        </Panel>
      ))}
    </div>
  );
}

export function Glass() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-studio p-8">
      <Grill count={12} tone="signal" className="absolute top-10 left-6 w-64" />
      <GlassPanel className="relative ml-auto max-w-xs">
        <p>Glass needs color behind it to read.</p>
      </GlassPanel>
    </div>
  );
}

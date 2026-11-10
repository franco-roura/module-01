import { Crosshair, Grill, HudLabel, StatusLed, TickRuler } from "@franco_roura/module-01";

export function Labels() {
  return (
    <div className="flex flex-col gap-4">
      <HudLabel code="S-02" end="02/04">
        Experience
      </HudLabel>
      <HudLabel code="W-01">Wallets</HudLabel>
      <HudLabel rule={false}>No code, no rule</HudLabel>
    </div>
  );
}

export function Rulers() {
  return (
    <div className="flex flex-col gap-6">
      <TickRuler />
      <TickRuler labels={["0", "10", "20", "30", "40"]} />
    </div>
  );
}

export function Leds() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <StatusLed>Online</StatusLed>
      <StatusLed tone="signal">Pending</StatusLed>
      <StatusLed tone="off">Offline</StatusLed>
    </div>
  );
}

export function Grills() {
  return (
    <div className="flex flex-col gap-6">
      <Grill />
      <Grill count={4} slotWidth={28} gap="8px" tone="signal" />
      <div className="rounded-md bg-signal p-4">
        <Grill tone="on-signal" />
      </div>
    </div>
  );
}

export function Crosshairs() {
  return (
    <div className="relative h-32 rounded-md bg-studio">
      <Crosshair className="absolute top-3 left-3 text-ink/45" />
      <Crosshair className="absolute right-3 bottom-3 text-ink/45" />
      <div className="flex h-full items-center justify-center gap-4">
        <Crosshair />
        <Crosshair tone="signal" />
      </div>
    </div>
  );
}

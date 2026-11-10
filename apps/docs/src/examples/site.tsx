import { Button, StatusLed } from "@franco_roura/module-01";
import {
  CtaBanner,
  Footer,
  Hero,
  MediaCard,
  SpecReadout,
  SplitFlap,
  Tag,
  Terminal,
  TimelineEntry,
} from "@franco_roura/module-01/site";
import { useState } from "react";

export function Opening() {
  return (
    <Hero
      serial="UNIT-01 · REV.2026"
      title="Northwind Atlas"
      subtitle="Field data platform"
      lead="Collect readings from any sensor, even offline, and see them on one map."
      actions={
        <>
          <Button arrow>Start free trial</Button>
          <Button variant="secondary">Book a demo</Button>
          <StatusLed>All systems normal</StatusLed>
        </>
      }
      specs={[
        { label: "Uptime", value: "99.9%" },
        { label: "Regions", value: "12" },
        { label: "Setup", value: "5 min" },
      ]}
      imageLabel="FIG. 01"
      coords="REV.2026"
    />
  );
}

export function Timeline() {
  return (
    <div>
      <TimelineEntry
        current
        code="R-02"
        title="Version 2.0"
        subtitle="Northwind Atlas"
        start="2026.04"
        detail="Stable"
        points={[
          "Added offline sync, so readings upload when the device is back online.",
          "Cut map load time by half on large projects.",
        ]}
        tags={["Sync", "Maps"]}
      />
      <TimelineEntry
        code="R-01"
        title="Version 1.0"
        subtitle="Northwind Atlas"
        start="2025.02"
        end="2026.03"
        points={["Shipped the first public release with CSV export."]}
        tags={["Export"]}
      />
    </div>
  );
}

export function Cards() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <MediaCard
        code="C-01"
        kind="Product"
        status="Live"
        title="Signal Weather"
        description="A tiny weather station on a microcontroller, with an e-ink face."
        tags={["Hardware", "ESP32"]}
        links={[
          { label: "Details", href: "#details" },
          { label: "Docs", href: "#docs" },
        ]}
      />
      <MediaCard
        code="C-02"
        kind="Case study"
        status="New"
        hingeLeft="60%"
        title="Lumen Farms"
        description="How a group of farms tracks soil moisture across 40 fields."
        tags={["Agriculture", "Sensors"]}
        links={[{ label: "Read", href: "#read" }]}
      />
    </div>
  );
}

export function CallToAction() {
  return (
    <CtaBanner
      code="S-05 · START"
      title="Start building"
      text="Set up your first project in five minutes. No card needed."
      action={
        <Button variant="secondary" arrow>
          Talk to us
        </Button>
      }
    />
  );
}

export function PageFoot() {
  return (
    <Footer
      left="BUILD 2026.11"
      right="REV.2026"
      rulerLabels={["0", "20", "40", "60", "80"]}
      links={[
        { label: "GitHub", href: "#github" },
        { label: "Docs", href: "#docs" },
        { label: "Email", href: "#email" },
      ]}
    />
  );
}

export function Specs() {
  return (
    <SpecReadout
      items={[
        { label: "Uptime", value: "99.9%" },
        { label: "Regions", value: "12" },
        { label: "Setup", value: "5 min" },
        { label: "Languages", value: "ES · EN" },
      ]}
    />
  );
}

export function Snippet() {
  return (
    <Terminal
      className="max-w-md"
      title="INSTALL"
      lines={["bun add @franco_roura/module-01", "bun run dev"]}
    />
  );
}

export function Tags() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag>TypeScript</Tag>
      <Tag tone="signal">React</Tag>
      <Tag tone="tint">Beta</Tag>
      <Tag tone="outline">Figma</Tag>
      <Tag led>Live</Tag>
      <Tag interactive pressed={pressed} onClick={() => setPressed(!pressed)}>
        Keycap
      </Tag>
    </div>
  );
}

export function DepartureBoard() {
  const words = ["ALL SYSTEMS NORMAL", "NOW IN 12 REGIONS", "VERSION 2.0 IS OUT"];
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SplitFlap className="hud text-ink" text={words[index % words.length] ?? ""} />
      <Button variant="outline" size="sm" onClick={() => setIndex(index + 1)}>
        Next
      </Button>
    </div>
  );
}

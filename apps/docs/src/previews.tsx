import {
  Badge,
  Button,
  Calendar,
  Checkbox,
  Combobox,
  Crosshair,
  Field,
  Grill,
  HudLabel,
  Input,
  Label,
  MultiCombobox,
  NavBar,
  Panel,
  SectionHeader,
  Select,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  StatusLed,
  Tabs,
  TabsList,
  TabsTrigger,
  TickRuler,
  ToggleGroup,
  ToggleGroupItem,
} from "@franco_roura/module-01";
import { BalanceChart } from "@franco_roura/module-01/charts";
import {
  Amount,
  BudgetMeter,
  CategoryIcon,
  FxConverter,
  MoneyInput,
} from "@franco_roura/module-01/finance";
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
import {
  ChartColumn,
  ChartLine,
  CircleCheck,
  Copy,
  Info,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";
import type * as React from "react";

// A small picture of each component for the gallery. They are the real components, shrunk
// where needed; overlays that only exist while open are drawn in their open state.

/** Renders children at their natural width, then scales the result down to fit a card. */
function Scaled({
  width,
  scale,
  children,
}: {
  width: number;
  scale: number;
  children: React.ReactNode;
}) {
  return (
    <div className="shrink-0" style={{ width, zoom: scale }}>
      {children}
    </div>
  );
}

const noop = () => {};

/** A floating shell card, as dialogs and popovers look while open. */
const Floating = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`rounded-lg bg-shell shadow-float ${className ?? ""}`}>{children}</div>
);

const MenuRow = ({
  icon,
  children,
  danger,
  active,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  danger?: boolean;
  active?: boolean;
}) => (
  <div
    className={`flex items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm [&_svg]:size-4 ${
      danger ? "text-danger" : "text-ink"
    } ${active ? "bg-shell-recess" : ""}`}
  >
    {icon}
    {children}
  </div>
);

const weeks = ["Oct 5", "Oct 12", "Oct 19", "Oct 26", "Nov 2", "Nov 9"];
const balances = [412000n, 398500n, 441200n, 429900n, 468300n, 455100n];

export const previews: Record<string, () => React.ReactNode> = {
  panel: () => (
    <Panel
      serial="PNL-01"
      hinge="20px"
      cross
      notch="sm"
      className="w-48"
      bodyClassName="px-4 pb-6 sm:px-4 sm:pb-6"
    >
      <Skeleton className="h-2.5 w-28 animate-none" />
      <Skeleton className="mt-2 h-2.5 w-20 animate-none" />
    </Panel>
  ),
  "section-header": () => (
    <Scaled width={420} scale={0.6}>
      <SectionHeader as="h3" code="S-02" label="Work" title="Experience" ruler />
    </Scaled>
  ),
  "hud-markings": () => (
    <div className="flex w-52 flex-col gap-3">
      <HudLabel code="S-02" end="02/04">
        Signal
      </HudLabel>
      <TickRuler />
      <div className="flex items-center justify-between">
        <StatusLed>Live</StatusLed>
        <Crosshair tone="signal" />
      </div>
      <Grill count={5} slotWidth={28} gap="8px" />
    </div>
  ),
  "nav-bar": () => (
    <Scaled width={520} scale={0.5}>
      <NavBar
        brand="Northwind"
        serial="UNIT-01"
        links={[
          { label: "Product", href: "#a", active: true },
          { label: "Pricing", href: "#b" },
          { label: "Docs", href: "#c" },
        ]}
        end={<Button size="sm">Sign up</Button>}
      />
    </Scaled>
  ),
  separator: () => (
    <div className="w-40 text-body-sm text-ink">
      <p>Checking</p>
      <Separator className="my-2.5" />
      <p>Savings</p>
      <Separator className="my-2.5" />
      <p>Cash</p>
    </div>
  ),
  button: () => (
    <div className="flex flex-col items-center gap-2.5">
      <Button arrow>Add wallet</Button>
      <Button variant="secondary">Get in touch</Button>
    </div>
  ),
  badge: () => (
    <div className="flex max-w-48 flex-wrap justify-center gap-2">
      <Badge variant="signal">Signal</Badge>
      <Badge variant="tint">In progress</Badge>
      <Badge>Default</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  "dropdown-menu": () => (
    <Floating className="w-40 rounded-md p-1.5">
      <MenuRow icon={<Pencil strokeWidth={1.25} />} active>
        Rename
      </MenuRow>
      <MenuRow icon={<Copy strokeWidth={1.25} />}>Duplicate</MenuRow>
      <div className="my-1 h-px bg-seam" />
      <MenuRow icon={<Trash2 strokeWidth={1.25} />} danger>
        Delete
      </MenuRow>
    </Floating>
  ),
  command: () => (
    <Floating className="w-48 rounded-md">
      <div className="flex items-center gap-2 border-b border-seam px-3 py-2 text-body-sm text-ink-soft">
        <Search className="size-4" strokeWidth={1.25} /> Type a command…
      </div>
      <div className="p-1.5">
        <p className="hud-sm px-2 py-1 text-ink-soft">Add</p>
        <MenuRow icon={<span className="font-mono">+</span>} active>
          New transaction
        </MenuRow>
        <MenuRow icon={<span className="font-mono">⇄</span>}>New transfer</MenuRow>
      </div>
    </Floating>
  ),
  toggle: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="line" aria-label="Chart type">
      <ToggleGroupItem value="line" aria-label="Line">
        <ChartLine strokeWidth={1.25} />
      </ToggleGroupItem>
      <ToggleGroupItem value="bars" aria-label="Bars">
        <ChartColumn strokeWidth={1.25} />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  tabs: () => (
    <Scaled width={300} scale={0.75}>
      <Tabs defaultValue="expense">
        <TabsList className="w-full">
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
        </TabsList>
      </Tabs>
    </Scaled>
  ),
  field: () => (
    <Field label="Amount" error="Use up to 2 decimals" className="w-44">
      <Input aria-invalid defaultValue="1.234" />
    </Field>
  ),
  input: () => <Input className="w-44" defaultValue="Rainy day fund" />,
  checkbox: () => (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <Checkbox defaultChecked aria-label="Keep open" />
        <Label>Keep open</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox aria-label="Repeat monthly" />
        <Label>Repeat monthly</Label>
      </div>
    </div>
  ),
  select: () => (
    <Select defaultValue="month">
      <SelectTrigger className="w-44" aria-label="Period">
        <SelectValue>This month</SelectValue>
      </SelectTrigger>
    </Select>
  ),
  combobox: () => (
    <Combobox
      className="w-48"
      value="groceries"
      onChange={noop}
      options={[{ id: "groceries", name: "Groceries" }]}
      getKey={(option) => option.id}
      renderOption={(option) => (
        <span className="flex items-center gap-2">
          <CategoryIcon icon="shopping-cart" color="cat-green" size="sm" />
          {option.name}
        </span>
      )}
    />
  ),
  "multi-combobox": () => (
    <MultiCombobox
      className="w-48"
      value={["a", "b", "c"]}
      onChange={noop}
      options={["a", "b", "c", "d"]}
      getKey={(option) => option}
      renderOption={(option) => option}
      allLabel="All wallets"
      noun="wallets"
    />
  ),
  "date-picker": () => (
    <Scaled width={280} scale={0.55}>
      <Floating className="p-3">
        <Calendar
          mode="single"
          selected={new Date(2026, 9, 20)}
          defaultMonth={new Date(2026, 9, 1)}
        />
      </Floating>
    </Scaled>
  ),
  dialog: () => (
    <div className="flex size-full items-center justify-center bg-overlay">
      <Floating className="w-48 p-4">
        <div className="flex items-start justify-between">
          <p className="text-label text-ink">Rename wallet</p>
          <X className="size-3.5 text-ink-soft" strokeWidth={1.25} />
        </div>
        <div className="mt-3 h-7 rounded-sm bg-shell-recess shadow-press" />
        <div className="mt-3 flex justify-end gap-2">
          <span className="h-6 w-12 rounded-full bg-shell-recess" />
          <span className="h-6 w-12 rounded-full bg-signal shadow-mold" />
        </div>
      </Floating>
    </div>
  ),
  sheet: () => (
    <div className="flex size-full justify-end bg-overlay">
      <div className="flex h-full w-32 flex-col gap-3 bg-shell p-4 shadow-float">
        <p className="text-label text-ink">New transaction</p>
        <div className="h-6 rounded-sm bg-shell-recess shadow-press" />
        <div className="h-6 rounded-sm bg-shell-recess shadow-press" />
        <span className="mt-auto h-6 rounded-full bg-signal shadow-mold" />
      </div>
    </div>
  ),
  "alert-dialog": () => (
    <div className="flex size-full items-center justify-center bg-overlay">
      <Floating className="w-48 p-4">
        <p className="text-label text-ink">Delete this wallet?</p>
        <p className="mt-1 text-[12px] leading-snug text-ink-soft">You can't undo this.</p>
        <div className="mt-3 flex justify-end gap-2">
          <span className="h-6 w-12 rounded-full bg-shell-recess" />
          <span className="h-6 w-14 rounded-full bg-danger shadow-mold" />
        </div>
      </Floating>
    </div>
  ),
  popover: () => (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline" size="sm">
        Exchange rate
      </Button>
      <Floating className="w-44 p-3">
        <p className="text-label text-ink">1 USD = 39.85 UYU</p>
        <p className="mt-1 text-[12px] leading-snug text-ink-soft">From your last transfer.</p>
      </Floating>
    </div>
  ),
  tooltip: () => (
    <div className="flex flex-col items-center gap-1.5">
      <span className="rounded-sm bg-ink px-2.5 py-1 text-[12px] text-shell">About budgets</span>
      <Button variant="ghost" size="icon" aria-label="About budgets" className="bg-shell-recess">
        <Info strokeWidth={1.25} />
      </Button>
    </div>
  ),
  toaster: () => (
    <Floating className="flex w-48 items-center gap-2.5 rounded-md px-3.5 py-3 text-body-sm text-ink">
      <CircleCheck className="size-4 text-income-ink" strokeWidth={1.25} />
      Wallet saved
    </Floating>
  ),
  skeleton: () => (
    <div className="flex w-48 items-center gap-3">
      <Skeleton className="size-9 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  ),
  amount: () => (
    <div className="flex flex-col items-center gap-1">
      <Amount minor={123456n} currency="USD" minorUnits={2} size="lg" />
      <Amount minor={-24815n} currency="USD" minorUnits={2} />
    </div>
  ),
  "money-input": () => <MoneyInput className="w-44" currency="USD" defaultValue="1,234.56" />,
  "fx-converter": () => (
    <Scaled width={640} scale={0.42}>
      <FxConverter
        from={{ code: "USD", minorUnits: 2 }}
        to={{ code: "UYU", minorUnits: 2 }}
        value={{ from: "100.00", to: "3,985.00", rate: "39.85", ratePrecise: "39.85", order: [] }}
        onChange={noop}
      />
    </Scaled>
  ),
  "budget-meter": () => (
    <div className="flex w-48 flex-col gap-4">
      <BudgetMeter spent={32000n} budget={60000n} elapsed={0.6} label="Groceries" />
      <BudgetMeter spent={71500n} budget={60000n} elapsed={0.6} label="Eating out" size="sm" />
    </div>
  ),
  "category-icon": () => (
    <div className="flex items-center gap-2.5">
      <CategoryIcon icon="shopping-cart" color="cat-green" size="lg" />
      <CategoryIcon icon="utensils" color="cat-amber" />
      <CategoryIcon icon="bus" color="cat-sky" />
      <CategoryIcon icon="house" color="cat-violet" size="sm" />
    </div>
  ),
  charts: () => (
    <Scaled width={460} scale={0.5}>
      <BalanceChart
        money={{ currency: "USD", minorUnits: 2 }}
        points={weeks.map((label, index) => ({
          label,
          tooltipLabel: label,
          balance: balances[index] ?? 0n,
        }))}
      />
    </Scaled>
  ),
  hero: () => (
    <Scaled width={900} scale={0.28}>
      <Hero
        serial="UNIT-01 · REV.2026"
        title="Northwind Atlas"
        subtitle="Field data platform"
        lead="Collect readings from any sensor, even offline, and see them on one map."
        actions={
          <>
            <Button arrow>Start free trial</Button>
            <Button variant="secondary">Book a demo</Button>
          </>
        }
        imageLabel="FIG. 01"
      />
    </Scaled>
  ),
  "timeline-entry": () => (
    <Scaled width={620} scale={0.42}>
      <TimelineEntry
        current
        code="R-02"
        title="Version 2.0"
        subtitle="Northwind Atlas"
        start="2026.04"
        points={["Added offline sync for field devices."]}
        tags={["Sync", "Maps"]}
      />
    </Scaled>
  ),
  "media-card": () => (
    <Scaled width={300} scale={0.42}>
      <MediaCard
        code="C-01"
        kind="Product"
        status="Live"
        title="Signal Weather"
        description="A tiny weather station with an e-ink face."
        tags={["Hardware", "ESP32"]}
      />
    </Scaled>
  ),
  "cta-banner": () => (
    <Scaled width={680} scale={0.36}>
      <CtaBanner
        code="S-05 · START"
        title="Start building"
        text="Set up your first project in five minutes."
        action={<Button variant="secondary">Talk to us</Button>}
      />
    </Scaled>
  ),
  footer: () => (
    <Scaled width={600} scale={0.42}>
      <Footer
        left="BUILD 2026.11"
        right="REV.2026"
        rulerLabels={["0", "20", "40", "60"]}
        links={[
          { label: "GitHub", href: "#g" },
          { label: "Email", href: "#e" },
        ]}
      />
    </Scaled>
  ),
  "spec-readout": () => (
    <Scaled width={440} scale={0.55}>
      <SpecReadout
        items={[
          { label: "Uptime", value: "99.9%" },
          { label: "Regions", value: "12" },
          { label: "Setup", value: "5 min" },
        ]}
      />
    </Scaled>
  ),
  terminal: () => (
    <Scaled width={300} scale={0.7}>
      <Terminal title="INSTALL" lines={["bun add module-01", "bun run dev"]} />
    </Scaled>
  ),
  tag: () => (
    <div className="flex max-w-48 flex-wrap justify-center gap-2">
      <Tag led>Live</Tag>
      <Tag tone="signal">React</Tag>
      <Tag tone="outline">Figma</Tag>
    </div>
  ),
  "split-flap": () => <SplitFlap className="hud text-ink" text="ALL SYSTEMS NORMAL" />,
};

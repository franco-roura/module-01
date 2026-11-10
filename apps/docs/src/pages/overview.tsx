import {
  Badge,
  Button,
  Combobox,
  DatePicker,
  Field,
  HudLabel,
  Panel,
  SectionHeader,
  StatusLed,
  Tabs,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  ToggleGroupItem,
  fault,
} from "@franco_roura/module-01";
import { BalanceChart, DonutChart } from "@franco_roura/module-01/charts";
import { Amount, BudgetMeter, CategoryIcon, MoneyInput } from "@franco_roura/module-01/finance";
import { CtaBanner, MediaCard } from "@franco_roura/module-01/site";
import { Bell, Check, Copy } from "lucide-react";
import { useState } from "react";
import type * as React from "react";
import { toast } from "sonner";
import { REPO, data } from "../data";
import { previews } from "../previews";
import { docBySlug, docs } from "../registry";
import { Link } from "../router";
import { PALETTES, palette } from "../tokens";
import { ComponentCard } from "./component";

const usd = { currency: "USD", minorUnits: 2 };

const Arrow = () => (
  <span aria-hidden className="font-mono">
    →
  </span>
);

/** The install command as a pill you can copy. */
function InstallChip() {
  const [copied, setCopied] = useState(false);
  const command = `bun add ${data.name}`;
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(command);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }}
      className="group inline-flex h-control-height max-w-full cursor-pointer items-center gap-3 rounded-full bg-visor pr-4 pl-5 font-mono text-[13px] text-shell outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60"
    >
      <span aria-hidden className="text-signal select-none">
        $
      </span>
      <span className="truncate">{command}</span>
      <span className="sr-only">{copied ? "Copied" : "Copy the install command"}</span>
      {copied ? (
        <Check aria-hidden className="size-4 shrink-0 text-visor-mark" strokeWidth={1.25} />
      ) : (
        <Copy
          aria-hidden
          className="size-4 shrink-0 text-visor-mark group-hover:text-shell"
          strokeWidth={1.25}
        />
      )}
    </button>
  );
}

// --- The showcase: real, working parts arranged as a product would use them -----------------

type Category = { id: string; name: string; icon: string; color: string };
const categoriesList: Category[] = [
  { id: "groceries", name: "Groceries", icon: "shopping-cart", color: "cat-green" },
  { id: "eating-out", name: "Eating out", icon: "utensils", color: "cat-amber" },
  { id: "transport", name: "Transport", icon: "bus", color: "cat-sky" },
  { id: "home", name: "Home", icon: "house", color: "cat-violet" },
];

function TransactionForm() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("2026-11-09");
  const [error, setError] = useState<string>();

  const save = () => {
    if (!/^\d+([.,]\d{1,2})?$/.test(amount.trim())) {
      fault("home-amount");
      setError("Enter an amount");
      return;
    }
    toast.success("Transaction saved");
    setAmount("");
    setCategory("");
  };

  return (
    <Panel serial="T-01 · NEW" cross className="h-full" bodyClassName="flex flex-col gap-4">
      <Tabs defaultValue="expense">
        <TabsList className="w-full">
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
        </TabsList>
      </Tabs>
      <Field label="Amount" htmlFor="home-amount" error={error}>
        <MoneyInput
          id="home-amount"
          currency="USD"
          value={amount}
          aria-invalid={error !== undefined}
          onChange={(event) => {
            setAmount(event.target.value);
            setError(undefined);
          }}
        />
      </Field>
      <Field label="Category" htmlFor="home-category">
        <Combobox
          id="home-category"
          value={category}
          onChange={setCategory}
          options={categoriesList}
          getKey={(option) => option.id}
          getSearchText={(option) => option.name}
          placeholder="Choose a category"
          renderOption={(option) => (
            <span className="flex items-center gap-2">
              <CategoryIcon icon={option.icon} color={option.color} size="sm" />
              {option.name}
            </span>
          )}
        />
      </Field>
      <Field label="Date" htmlFor="home-date">
        <DatePicker id="home-date" value={date} onChange={setDate} />
      </Field>
      <Button arrow className="mt-auto" onClick={save}>
        Save transaction
      </Button>
    </Panel>
  );
}

const weeks = ["Oct 5", "Oct 12", "Oct 19", "Oct 26", "Nov 2", "Nov 9"];
const balances = [412000n, 398500n, 441200n, 429900n, 468300n, 455100n];

const rows: [Category, string, bigint][] = [
  [categoriesList[0]!, "Corner market", -4215n],
  [categoriesList[1]!, "Lunch with Sam", -1890n],
  [{ id: "salary", name: "Salary", icon: "briefcase", color: "cat-teal" }, "November", 420000n],
  [categoriesList[2]!, "Bus pass", -3600n],
];

const budgets: [string, bigint, bigint][] = [
  ["Groceries", 32000n, 60000n],
  ["Eating out", 71500n, 60000n],
  ["Transport", 12000n, 40000n],
];

function Showcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-12 [&>*]:min-w-0">
      <Panel
        serial="W-01 · USD"
        hinge="32px"
        className="lg:col-span-7"
        bodyClassName="flex h-full flex-col gap-4"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="hud-sm text-ink-soft">Balance</p>
            <Amount minor={455100n} currency="USD" minorUnits={2} size="xl" sign="never" />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="tint">+5.9% this month</Badge>
            <StatusLed>Synced</StatusLed>
          </div>
        </div>
        <BalanceChart
          money={usd}
          points={weeks.map((label, index) => ({
            label,
            tooltipLabel: `Week of ${label}`,
            balance: balances[index] ?? 0n,
          }))}
        />
      </Panel>

      <div className="lg:col-span-5">
        <TransactionForm />
      </div>

      <Panel notch="sm" className="lg:col-span-5" bodyClassName="p-0 sm:p-0 overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="hud-sm text-ink-soft">Mon, Nov 9</span>
          <Amount minor={410295n} currency="USD" minorUnits={2} size="sm" code={false} />
        </div>
        {rows.map(([category, note, minor]) => (
          <div
            key={note}
            className="flex items-center gap-3 border-t border-seam px-5 py-2.5 hover:bg-shell-recess"
          >
            <CategoryIcon icon={category.icon} color={category.color} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-label text-ink">{category.name}</p>
              <p className="truncate text-[13px] text-ink-soft">{note}</p>
            </div>
            <Amount minor={minor} currency="USD" minorUnits={2} code={false} />
          </div>
        ))}
      </Panel>

      <Panel
        serial="B-01 · NOVEMBER"
        notch="sm"
        className="lg:col-span-4"
        bodyClassName="flex h-full flex-col justify-center gap-4"
      >
        {budgets.map(([name, spent, budget]) => (
          <div key={name} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-label text-ink">{name}</span>
              <span className="tabular text-[13px] text-ink-soft">
                {Number(spent / 100n)} of {Number(budget / 100n)}
              </span>
            </div>
            <BudgetMeter spent={spent} budget={budget} elapsed={0.3} label={name} size="sm" />
          </div>
        ))}
      </Panel>

      <Panel
        serial="K-01 · CONTROLS"
        notch="sm"
        cross
        className="lg:col-span-3"
        bodyClassName="flex h-full flex-col items-start justify-center gap-4"
      >
        <ToggleGroup type="single" variant="outline" defaultValue="month" aria-label="Period">
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="year">Year</ToggleGroupItem>
        </ToggleGroup>
        <div className="flex flex-wrap gap-2">
          <Badge variant="signal">New</Badge>
          <Badge>Draft</Badge>
          <Badge variant="outline">Archived</Badge>
        </div>
        <Button variant="secondary" onClick={() => toast("3 transactions imported")}>
          <Bell strokeWidth={1.25} /> Show a toast
        </Button>
      </Panel>
    </div>
  );
}

// --- Sections --------------------------------------------------------------------------------

function Stat({ figure, label }: { figure: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 border-seam px-1 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-1">
      <span className="tabular text-amount-xl text-ink">{figure}</span>
      <span className="hud-sm text-ink-soft">{label}</span>
    </div>
  );
}

const reasons: [string, string][] = [
  [
    "A look of its own",
    "Molded shells, one notched corner per part, hinge tabs, tick rulers and crosshairs.",
  ],
  [
    "Small where it counts",
    "One file per component and four entry points. A Button and a Panel cost about 10 kB.",
  ],
  ["Tailwind v4 native", "Import one stylesheet and the tokens are utilities in your own markup."],
  [
    "Forms that flow",
    "Dialogs open on their first field, and a pick in a picker moves on to the next.",
  ],
  [
    "Faults you can feel",
    "A rejected input jitters like a servo and pings once. Try saving the form above empty.",
  ],
  [
    "Accessible underneath",
    "Radix handles focus, keyboard and screen readers. Text pairs are measured at 4.5:1.",
  ],
];

function Surface({
  code,
  title,
  text,
  to,
  label,
  children,
}: {
  code: string;
  title: string;
  text: string;
  to: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Panel serial={code} cross className="h-full" bodyClassName="flex h-full flex-col gap-5">
      <div
        aria-hidden
        inert
        className="pointer-events-none flex h-64 items-center justify-center overflow-hidden rounded-md bg-studio select-none"
      >
        {children}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-display-md text-ink">{title}</h3>
        <p className="text-ink-soft">{text}</p>
      </div>
      <Button variant="secondary" asChild className="mt-auto self-start">
        <Link to={to}>
          {label}
          <Arrow />
        </Link>
      </Button>
    </Panel>
  );
}

const featured = [
  "button",
  "combobox",
  "date-picker",
  "dialog",
  "charts",
  "fx-converter",
  "hero",
  "hud-markings",
];

export function OverviewPage() {
  const HeroPreview = previews.hero;
  return (
    <div className="flex flex-col gap-28">
      <section className="flex flex-col gap-14">
        <div className="flex flex-col items-start gap-7 pt-6 md:pt-12">
          <Badge variant="secondary" asChild>
            <Link to="/changelog">
              <span aria-hidden className="size-1.5 rounded-full bg-signal" />v{data.version} · Read
              the changelog
            </Link>
          </Badge>
          <h1 className="max-w-[18ch] font-display text-display-lg text-ink md:text-display-xl">
            Components with a look of their own
          </h1>
          <p className="max-w-[58ch] text-body-lg text-ink-soft">
            Module/01 is a React kit of glossy white parts, signal orange trim and HUD markings.{" "}
            {docs.length} components for any app or website, built on Radix and Tailwind v4.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link to="/getting-started">
                Get started
                <Arrow />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/components">Browse components</Link>
            </Button>
            <InstallChip />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <HudLabel code="LIVE" end="01/01">
            Everything below is the real kit. Use it.
          </HudLabel>
          <Showcase />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
        <Stat figure={String(docs.length)} label="Components" />
        <Stat figure="4" label="Entry points" />
        <Stat figure="10 kB" label="Button + Panel, brotli" />
        <Stat figure="4.5:1" label="Text contrast, or better" />
      </section>

      <section className="flex flex-col gap-12">
        <SectionHeader as="h2" code="S-01" label="Range" title="One kit, apps and websites" ruler />
        <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
          <Surface
            code="A-01 · APPS"
            title="Apps"
            text="Dashboards, tools and admin screens: forms that pass focus along, dialogs and sheets, charts, and money as signed, tabular figures."
            to="/components/amount"
            label="See the data parts"
          >
            <div className="w-72" style={{ zoom: 0.8 }}>
              <Panel notch="sm" serial="C-03 · SPENDING">
                <DonutChart
                  money={usd}
                  centerLabel="Spent"
                  slices={[
                    { key: "g", label: "Groceries", color: "cat-green", amount: 86400n },
                    { key: "e", label: "Eating out", color: "cat-amber", amount: 51200n },
                    { key: "t", label: "Transport", color: "cat-sky", amount: 23800n },
                    { key: "h", label: "Home", color: "cat-violet", amount: 142000n },
                  ]}
                />
              </Panel>
            </div>
          </Surface>
          <Surface
            code="A-02 · SITES"
            title="Websites"
            text="Landing, product and docs pages: a hero in Michroma, a timeline, media cards on a studio backdrop, and one loud call to action."
            to="/components/hero"
            label="See the site sections"
          >
            <div className="flex items-center gap-4">
              {HeroPreview ? <HeroPreview /> : null}
              <div className="w-72 shrink-0" style={{ zoom: 0.5 }}>
                <MediaCard
                  code="C-01"
                  kind="Product"
                  status="Live"
                  title="Signal Weather"
                  description="A tiny weather station with an e-ink face."
                  tags={["C", "ESP32"]}
                />
              </div>
            </div>
          </Surface>
        </div>
      </section>

      <section className="flex flex-col gap-12">
        <SectionHeader
          as="h2"
          code="S-02"
          label="Gallery"
          title={`${docs.length} components, all live`}
          ruler
          aside={
            <Button variant="secondary" asChild>
              <Link to="/components">
                See all components
                <Arrow />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured
            .map((slug) => docBySlug.get(slug))
            .filter((doc) => doc !== undefined)
            .map((doc) => (
              <ComponentCard key={doc.slug} doc={doc} />
            ))}
        </div>
      </section>

      <section className="flex flex-col gap-12">
        <SectionHeader as="h2" code="S-03" label="Why" title="Built to be picked up" ruler />
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(([title, text], index) => (
            <div key={title} className="flex flex-col gap-2 border-t border-seam pt-4">
              <span className="hud-sm text-signal-ink">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-display-sm text-ink">{title}</h3>
              <p className="text-body-sm text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid items-center gap-10 lg:grid-cols-2 [&>*]:min-w-0">
        <div className="flex flex-col items-start gap-5">
          <HudLabel code="S-04" className="w-full">
            Foundations
          </HudLabel>
          <h2 className="font-display text-display-md text-ink sm:text-display-lg">
            Four palettes, named for what they do
          </h2>
          <p className="max-w-[52ch] text-ink-soft">
            Graphite, signal, green and red, ten steps each. Components use named tokens that point
            into them, so retheming is a matter of overriding a few custom properties.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link to="/colors">
                Colors
                <Arrow />
              </Link>
            </Button>
            <Button variant="bracket" asChild>
              <Link to="/tokens">Type, spacing and depth</Link>
            </Button>
          </div>
        </div>
        <Panel notch="md" bodyClassName="flex flex-col gap-3">
          {PALETTES.map((name) => (
            <div key={name} className="flex items-center gap-3">
              <span className="hud-sm w-16 shrink-0 text-ink-soft">{name}</span>
              <div className="flex h-9 flex-1 overflow-hidden rounded-full shadow-press">
                {palette(name).map((step) => (
                  <span key={step.name} className="flex-1" style={{ background: step.resolved }} />
                ))}
              </div>
            </div>
          ))}
        </Panel>
      </section>

      <CtaBanner
        code={`${data.name.toUpperCase()} · V${data.version}`}
        title="Put it on your desk"
        text="Install the package, import one stylesheet, and build your first screen."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/getting-started">
                Get started
                <Arrow />
              </Link>
            </Button>
            <Button variant="bracket" asChild>
              <a href={REPO}>GitHub</a>
            </Button>
          </div>
        }
      />
    </div>
  );
}

import type { ComponentType } from "react";
import * as badge from "./examples/badge";
import * as button from "./examples/button";
import * as charts from "./examples/charts";
import * as combobox from "./examples/combobox";
import * as datePicker from "./examples/date-picker";
import * as feedback from "./examples/feedback";
import * as field from "./examples/field";
import * as finance from "./examples/finance";
import * as hud from "./examples/hud";
import * as inputs from "./examples/inputs";
import * as menus from "./examples/menus";
import * as multiCombobox from "./examples/multi-combobox";
import * as navBar from "./examples/nav-bar";
import * as overlays from "./examples/overlays";
import * as panel from "./examples/panel";
import * as sectionHeader from "./examples/section-header";
import * as select from "./examples/select";
import * as site from "./examples/site";
import * as switching from "./examples/switching";

// Example files by name. The same name keys their extracted source in generated/data.json.
const modules: Record<string, Record<string, ComponentType>> = {
  badge,
  button,
  charts,
  combobox,
  "date-picker": datePicker,
  feedback,
  field,
  finance,
  hud,
  inputs,
  menus,
  "multi-combobox": multiCombobox,
  "nav-bar": navBar,
  overlays,
  panel,
  "section-header": sectionHeader,
  select,
  site,
  switching,
};

export type Entry = "core" | "finance" | "charts" | "site";

export const entries: Record<Entry, { title: string; code: string; importPath: string }> = {
  core: { title: "Kit", code: "K", importPath: "@franco_roura/module-01" },
  finance: { title: "Finance", code: "F", importPath: "@franco_roura/module-01/finance" },
  charts: { title: "Charts", code: "C", importPath: "@franco_roura/module-01/charts" },
  site: { title: "Site", code: "S", importPath: "@franco_roura/module-01/site" },
};

export type Doc = {
  slug: string;
  name: string;
  entry: Entry;
  /** Guideline files (packages/module-01/guidelines/<name>.md); the first one gives the summary. */
  guidelines: string[];
  /** Exported components whose props tables are shown. */
  components: string[];
  /** "file.Function" references into src/examples. */
  examples: string[];
  /** What the component is built on, linked under the props table. */
  base?: { label: string; href: string };
};

const radix = (name: string, slug: string) => ({
  label: `Radix ${name}`,
  href: `https://www.radix-ui.com/primitives/docs/components/${slug}`,
});

export const docs: Doc[] = [
  // --- Kit: parts and markings
  {
    slug: "panel",
    name: "Panel",
    entry: "core",
    guidelines: ["Panel", "GlassPanel"],
    components: ["Panel", "GlassPanel", "HingeTab"],
    examples: ["panel.Parts", "panel.SummaryTiles", "panel.Glass"],
  },
  {
    slug: "section-header",
    name: "SectionHeader",
    entry: "core",
    guidelines: ["SectionHeader"],
    components: ["SectionHeader"],
    examples: ["section-header.WithRuler", "section-header.WithAside"],
  },
  {
    slug: "hud-markings",
    name: "HUD markings",
    entry: "core",
    guidelines: ["HudLabel", "TickRuler", "StatusLed", "Grill", "Crosshair"],
    components: ["HudLabel", "TickRuler", "StatusLed", "Grill", "Crosshair"],
    examples: ["hud.Labels", "hud.Rulers", "hud.Leds", "hud.Grills", "hud.Crosshairs"],
  },
  {
    slug: "nav-bar",
    name: "NavBar",
    entry: "core",
    guidelines: ["NavBar"],
    components: ["NavBar"],
    examples: ["nav-bar.Site", "nav-bar.App"],
  },
  // --- Kit: actions
  {
    slug: "button",
    name: "Button",
    entry: "core",
    guidelines: ["Button"],
    components: ["Button"],
    examples: ["button.Variants", "button.IconsAndArrow", "button.Sizes", "button.AsLink"],
  },
  {
    slug: "badge",
    name: "Badge",
    entry: "core",
    guidelines: ["Badge"],
    components: ["Badge"],
    examples: ["badge.Variants"],
  },
  {
    slug: "dropdown-menu",
    name: "DropdownMenu",
    entry: "core",
    guidelines: ["DropdownMenu"],
    components: ["DropdownMenuItem"],
    examples: ["menus.RowActions"],
    base: radix("Dropdown Menu", "dropdown-menu"),
  },
  {
    slug: "command",
    name: "Command",
    entry: "core",
    guidelines: ["Command"],
    components: ["CommandDialog"],
    examples: ["menus.Palette"],
    base: { label: "cmdk", href: "https://cmdk.paco.me" },
  },
  // --- Kit: forms
  {
    slug: "field",
    name: "Field",
    entry: "core",
    guidelines: ["Field"],
    components: ["Field", "FieldLabel", "FieldError"],
    examples: ["field.Basic", "field.FaultFeedback"],
  },
  {
    slug: "input",
    name: "Input",
    entry: "core",
    guidelines: ["Input", "Textarea"],
    components: [],
    examples: ["inputs.TextInput", "inputs.MultiLine"],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    entry: "core",
    guidelines: ["Checkbox", "Label"],
    components: [],
    examples: ["inputs.CheckboxWithLabel"],
    base: radix("Checkbox", "checkbox"),
  },
  {
    slug: "select",
    name: "Select",
    entry: "core",
    guidelines: ["Select"],
    components: ["SelectTrigger"],
    examples: ["select.Basic", "select.Grouped"],
    base: radix("Select", "select"),
  },
  {
    slug: "combobox",
    name: "Combobox",
    entry: "core",
    guidelines: ["Combobox"],
    components: ["Combobox"],
    examples: ["combobox.Grouped", "combobox.FlatList"],
  },
  {
    slug: "multi-combobox",
    name: "MultiCombobox",
    entry: "core",
    guidelines: ["MultiCombobox"],
    components: ["MultiCombobox"],
    examples: ["multi-combobox.Filter"],
  },
  {
    slug: "date-picker",
    name: "DatePicker",
    entry: "core",
    guidelines: ["DatePicker", "Calendar"],
    components: ["DatePicker"],
    examples: ["date-picker.InAField", "date-picker.MonthGrid"],
    base: { label: "react-day-picker", href: "https://daypicker.dev" },
  },
  {
    slug: "tabs",
    name: "Tabs",
    entry: "core",
    guidelines: ["Tabs"],
    components: ["TabsList"],
    examples: ["switching.KindTabs"],
    base: radix("Tabs", "tabs"),
  },
  {
    slug: "toggle",
    name: "Toggle",
    entry: "core",
    guidelines: ["Toggle"],
    components: ["Toggle", "ToggleGroup"],
    examples: ["switching.PinToggle", "switching.ChartMode"],
    base: radix("Toggle Group", "toggle-group"),
  },
  // --- Kit: overlays and feedback
  {
    slug: "dialog",
    name: "Dialog",
    entry: "core",
    guidelines: ["Dialog"],
    components: ["DialogContent", "DialogFooter"],
    examples: ["overlays.RenameDialog"],
    base: radix("Dialog", "dialog"),
  },
  {
    slug: "sheet",
    name: "Sheet",
    entry: "core",
    guidelines: ["Sheet"],
    components: ["SheetContent"],
    examples: ["overlays.EditorSheet"],
    base: radix("Dialog", "dialog"),
  },
  {
    slug: "alert-dialog",
    name: "AlertDialog",
    entry: "core",
    guidelines: ["AlertDialog"],
    components: ["AlertDialogContent"],
    examples: ["overlays.ConfirmDelete"],
    base: radix("Alert Dialog", "alert-dialog"),
  },
  {
    slug: "popover",
    name: "Popover",
    entry: "core",
    guidelines: ["Popover"],
    components: [],
    examples: ["overlays.InfoPopover"],
    base: radix("Popover", "popover"),
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    entry: "core",
    guidelines: ["Tooltip"],
    components: [],
    examples: ["overlays.IconTooltip"],
    base: radix("Tooltip", "tooltip"),
  },
  {
    slug: "toaster",
    name: "Toaster",
    entry: "core",
    guidelines: ["Toaster"],
    components: [],
    examples: ["feedback.Toasts"],
    base: { label: "sonner", href: "https://sonner.emilkowal.ski" },
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    entry: "core",
    guidelines: ["Skeleton"],
    components: [],
    examples: ["feedback.LoadingRow"],
  },
  {
    slug: "separator",
    name: "Separator",
    entry: "core",
    guidelines: ["Separator"],
    components: [],
    examples: ["feedback.Seams"],
    base: radix("Separator", "separator"),
  },
  // --- Finance
  {
    slug: "amount",
    name: "Amount",
    entry: "finance",
    guidelines: ["Amount"],
    components: ["Amount"],
    examples: ["finance.Amounts"],
  },
  {
    slug: "money-input",
    name: "MoneyInput",
    entry: "finance",
    guidelines: ["MoneyInput"],
    components: ["MoneyInput"],
    examples: ["finance.AmountField"],
  },
  {
    slug: "fx-converter",
    name: "FxConverter",
    entry: "finance",
    guidelines: ["FxConverter"],
    components: ["FxConverter"],
    examples: ["finance.Converter"],
  },
  {
    slug: "budget-meter",
    name: "BudgetMeter",
    entry: "finance",
    guidelines: ["BudgetMeter"],
    components: ["BudgetMeter"],
    examples: ["finance.Budgets"],
  },
  {
    slug: "category-icon",
    name: "CategoryIcon",
    entry: "finance",
    guidelines: ["CategoryIcon", "AppearancePickers"],
    components: ["CategoryIcon", "ColorDot", "IconPicker", "ColorPicker"],
    examples: ["finance.Categories", "finance.Pickers"],
  },
  // --- Charts
  {
    slug: "charts",
    name: "Charts",
    entry: "charts",
    guidelines: ["Charts"],
    components: ["BalanceChart", "FlowChart", "DonutChart"],
    examples: ["charts.Balance", "charts.CashFlow", "charts.ByCategory"],
    base: { label: "Recharts", href: "https://recharts.org" },
  },
  // --- Site
  {
    slug: "hero",
    name: "Hero",
    entry: "site",
    guidelines: ["Hero"],
    components: ["Hero", "HeroFrame"],
    examples: ["site.Opening"],
  },
  {
    slug: "timeline-entry",
    name: "TimelineEntry",
    entry: "site",
    guidelines: ["TimelineEntry"],
    components: ["TimelineEntry"],
    examples: ["site.Timeline"],
  },
  {
    slug: "media-card",
    name: "MediaCard",
    entry: "site",
    guidelines: ["MediaCard"],
    components: ["MediaCard"],
    examples: ["site.Cards"],
  },
  {
    slug: "cta-banner",
    name: "CtaBanner",
    entry: "site",
    guidelines: ["CtaBanner"],
    components: ["CtaBanner"],
    examples: ["site.CallToAction"],
  },
  {
    slug: "footer",
    name: "Footer",
    entry: "site",
    guidelines: ["Footer"],
    components: ["Footer"],
    examples: ["site.PageFoot"],
  },
  {
    slug: "spec-readout",
    name: "SpecReadout",
    entry: "site",
    guidelines: ["SpecReadout"],
    components: ["SpecReadout"],
    examples: ["site.Specs"],
  },
  {
    slug: "terminal",
    name: "Terminal",
    entry: "site",
    guidelines: ["Terminal"],
    components: ["Terminal"],
    examples: ["site.Snippet"],
  },
  {
    slug: "tag",
    name: "Tag",
    entry: "site",
    guidelines: ["Tag"],
    components: ["Tag"],
    examples: ["site.Tags"],
  },
  {
    slug: "split-flap",
    name: "SplitFlap",
    entry: "site",
    guidelines: ["SplitFlap"],
    components: ["SplitFlap"],
    examples: ["site.DepartureBoard"],
  },
];

export const docBySlug = new Map(docs.map((doc) => [doc.slug, doc]));

/** "panel.SummaryTiles" -> the component, its file and function names, and a readable title. */
export function example(ref: string) {
  const [file = "", fn = ""] = ref.split(".");
  const Component = modules[file]?.[fn];
  if (!Component) throw new Error(`Unknown example ${ref}`);
  const words = fn.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return { Component, file, fn, title: words.charAt(0).toUpperCase() + words.slice(1) };
}

/** Every page of the site, in menu order. The prerenderer walks this list. */
export const staticRoutes = [
  "/",
  "/getting-started",
  "/components",
  "/colors",
  "/tokens",
  "/playground",
  "/changelog",
];
export const allRoutes = [...staticRoutes, ...docs.map((doc) => `/components/${doc.slug}`)];

/** How the gallery and the sidebar group the pages: by what a component is for. */
export const categories: { id: string; title: string; note: string; slugs: string[] }[] = [
  {
    id: "structure",
    title: "Structure and markings",
    note: "The molded parts a screen is built from, and the HUD details that sit on them.",
    slugs: ["panel", "section-header", "hud-markings", "nav-bar", "separator"],
  },
  {
    id: "actions",
    title: "Actions",
    note: "Things you press, and the chips that label them.",
    slugs: ["button", "badge", "dropdown-menu", "command", "tabs", "toggle"],
  },
  {
    id: "forms",
    title: "Forms",
    note: "Sunken wells and pickers that pass focus along as they are filled in.",
    slugs: ["field", "input", "checkbox", "select", "combobox", "multi-combobox", "date-picker"],
  },
  {
    id: "overlays",
    title: "Overlays and feedback",
    note: "Parts that float above the page, and the ways the kit answers back.",
    slugs: ["dialog", "sheet", "alert-dialog", "popover", "tooltip", "toaster", "skeleton"],
  },
  {
    id: "finance",
    title: "Finance",
    note: "Money as signed, tabular figures, with the inputs and meters around it.",
    slugs: ["amount", "money-input", "fx-converter", "budget-meter", "category-icon"],
  },
  {
    id: "charts",
    title: "Charts",
    note: "Recharts in Module/01 marks.",
    slugs: ["charts"],
  },
  {
    id: "site",
    title: "Site",
    note: "Sections for any website, from the hero to the footer.",
    slugs: [
      "hero",
      "timeline-entry",
      "media-card",
      "cta-banner",
      "footer",
      "spec-readout",
      "terminal",
      "tag",
      "split-flap",
    ],
  },
];

export const categoryDocs = (id: string): Doc[] =>
  (categories.find((category) => category.id === id)?.slugs ?? [])
    .map((slug) => docBySlug.get(slug))
    .filter((doc) => doc !== undefined);

/** Every page in gallery order: the order of the sidebar and of the previous and next links. */
export const orderedDocs: Doc[] = categories.flatMap((category) => categoryDocs(category.id));

import {
  Badge,
  Button,
  Combobox,
  HudLabel,
  Input,
  Panel,
  SectionHeader,
  cn,
} from "@franco_roura/module-01";
import { Search } from "lucide-react";
import { useState } from "react";
import { CodeBlock } from "../components/code-block";
import { ExampleFrame } from "../components/example-frame";
import { Prose } from "../components/prose";
import { PropsTable } from "../components/props-table";
import { data } from "../data";
import { previews } from "../previews";
import { type Doc, categories, categoryDocs, docs, entries, orderedDocs } from "../registry";
import { Link, useNavigate } from "../router";

/** "K-05": the entry point's letter and the component's place in it. */
export const docCode = (doc: Doc) => {
  const siblings = docs.filter((other) => other.entry === doc.entry);
  return `${entries[doc.entry].code}-${String(siblings.indexOf(doc) + 1).padStart(2, "0")}`;
};

/** The first sentence of a component's guideline, as plain text. */
const summaryText = (doc: Doc) =>
  (data.guidelines[doc.guidelines[0] ?? ""]?.summary ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();

function Sidebar({ current }: { current: Doc }) {
  return (
    <Panel
      notch="sm"
      bodyClassName="p-4 sm:p-4"
      className="sticky top-24 hidden w-56 shrink-0 self-start lg:block"
    >
      <nav
        aria-label="Components"
        className="-mr-2 flex max-h-[calc(100dvh-9rem)] flex-col gap-4 overflow-y-auto pr-2"
      >
        <Link
          to="/components"
          className="rounded-full px-2.5 py-1 text-body-sm font-bold text-ink hover:bg-shell-recess"
        >
          All components
        </Link>
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-0.5">
            <span className="hud-sm px-2.5 pb-1 text-ink-soft">{category.title}</span>
            {categoryDocs(category.id).map((doc) => (
              <Link
                key={doc.slug}
                to={`/components/${doc.slug}`}
                aria-current={doc === current ? "page" : undefined}
                className={cn(
                  "rounded-full px-2.5 py-1 text-body-sm text-ink hover:bg-shell-recess",
                  doc === current && "bg-shell-recess font-bold text-signal-ink",
                )}
              >
                {doc.name}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </Panel>
  );
}

/** On phones the sidebar becomes the kit's own Combobox. */
function Jump({ current }: { current: Doc }) {
  const go = useNavigate();
  return (
    <div className="lg:hidden">
      <Combobox
        value={current.slug}
        onChange={(slug) => go(`/components/${slug}`)}
        groups={categories.map((category) => ({
          heading: category.title,
          options: categoryDocs(category.id),
        }))}
        getKey={(doc) => doc.slug}
        getSearchText={(doc) => doc.name}
        renderOption={(doc) => doc.name}
        searchPlaceholder="Search components…"
        className="w-full"
      />
    </div>
  );
}

export function ComponentPage({ doc }: { doc: Doc }) {
  const entry = entries[doc.entry];
  const code = docCode(doc);
  const [first, ...others] = doc.guidelines.map((name) => ({ name, ...data.guidelines[name] }));
  const tables = doc.components.filter((name) => (data.props[name]?.length ?? 0) > 0);
  const index = orderedDocs.indexOf(doc);
  const previous = orderedDocs[index - 1];
  const next = orderedDocs[index + 1];
  const names = doc.components.length > 0 ? doc.components.join(", ") : doc.name;

  return (
    <div className="flex gap-8">
      <Sidebar current={doc} />
      <article className="flex min-w-0 flex-1 flex-col gap-12">
        <Jump current={doc} />
        <header className="flex flex-col gap-6">
          <SectionHeader code={code} label={entry.title} title={doc.name} ruler />
          {first?.summary && <Prose html={first.summary} className="text-body-lg text-ink-soft" />}
          <CodeBlock code={`import { ${names} } from "${entry.importPath}";`} />
        </header>

        <section className="flex flex-col gap-10">
          {doc.examples.map((reference, i) => (
            <ExampleFrame
              key={reference}
              reference={reference}
              code={`${code}.${String.fromCharCode(65 + i)}`}
            />
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <HudLabel code="API">Props</HudLabel>
          {tables.map((name) => (
            <PropsTable key={name} name={name} props={data.props[name] ?? []} />
          ))}
          {doc.base ? (
            <p className="text-body-sm text-ink-soft">
              {tables.length > 0 ? "Each part also takes" : "The parts take"} every prop of{" "}
              <a
                className="text-signal-ink underline underline-offset-4"
                href={doc.base.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {doc.base.label}
              </a>
              , plus <code className="font-mono">className</code>.
            </p>
          ) : (
            <p className="text-body-sm text-ink-soft">
              {tables.length > 0
                ? "Parts that render a native element also take that element's props."
                : "It takes the props of the native element it renders, plus className."}
            </p>
          )}
        </section>

        <section className="flex flex-col gap-6">
          <HudLabel code="USE">Usage</HudLabel>
          {first?.html && <Prose html={first.html} compact />}
          {others.map((guideline) => (
            <div key={guideline.name} className="flex flex-col gap-3">
              <h3 className="font-display text-display-sm text-ink">{guideline.name}</h3>
              <Prose html={`${guideline.summary ?? ""}${guideline.html ?? ""}`} compact />
            </div>
          ))}
        </section>

        <nav aria-label="More components" className="flex flex-wrap justify-between gap-3">
          {previous ? (
            <Button variant="secondary" asChild>
              <Link to={`/components/${previous.slug}`}>
                <span aria-hidden className="font-mono">
                  ←
                </span>
                {previous.name}
              </Link>
            </Button>
          ) : (
            <span />
          )}
          {next && (
            <Button variant="secondary" asChild>
              <Link to={`/components/${next.slug}`}>
                {next.name}
                <span aria-hidden className="font-mono">
                  →
                </span>
              </Link>
            </Button>
          )}
        </nav>
      </article>
    </div>
  );
}

/** A gallery card: a picture of the component, its name and one line about it. */
export function ComponentCard({ doc, className }: { doc: Doc; className?: string }) {
  const Preview = previews[doc.slug];
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg bg-shell shadow-mold transition-[box-shadow,translate] duration-150 focus-within:ring-[3px] focus-within:ring-ring/60 hover:-translate-y-0.5 hover:shadow-float",
        className,
      )}
    >
      {/* The picture is decoration: the card's link is its name. */}
      <div
        aria-hidden
        inert
        className="pointer-events-none flex h-44 items-center justify-center overflow-hidden border-b border-seam bg-canvas select-none"
      >
        {Preview ? <Preview /> : null}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-display-sm text-ink">
            <Link
              to={`/components/${doc.slug}`}
              className="outline-none after:absolute after:inset-0 group-hover:text-signal-ink"
            >
              {doc.name}
            </Link>
          </h3>
          <span className="hud-sm shrink-0 text-hud-mark">{docCode(doc)}</span>
        </div>
        <p className="line-clamp-2 text-body-sm text-ink-soft">{summaryText(doc)}</p>
      </div>
    </article>
  );
}

/** /components: every component as a picture, grouped by what it is for, with a filter. */
export function ComponentsIndex() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const matches = (doc: Doc) =>
    !needle ||
    doc.name.toLowerCase().includes(needle) ||
    doc.components.some((name) => name.toLowerCase().includes(needle)) ||
    summaryText(doc).toLowerCase().includes(needle);
  const groups = categories
    .map((category) => ({ category, items: categoryDocs(category.id).filter(matches) }))
    .filter((group) => group.items.length > 0);
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-6">
        <SectionHeader code="S-01" label="Reference" title="Components" ruler />
        <p className="max-w-[70ch] text-body-lg text-ink-soft">
          {docs.length} component pages across four entry points. Every one has live examples, a
          props table and usage notes.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search
              aria-hidden
              strokeWidth={1.25}
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft"
            />
            <Input
              type="search"
              aria-label="Filter components"
              placeholder="Filter components"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2 max-sm:hidden">
            {categories.map((category) => (
              <Badge key={category.id} variant="secondary" asChild>
                <a href={`#${category.id}`}>{category.title}</a>
              </Badge>
            ))}
          </div>
        </div>
        <p aria-live="polite" className="sr-only">
          {total} components shown
        </p>
      </header>

      {groups.map(({ category, items }) => (
        <section key={category.id} id={category.id} className="flex scroll-mt-28 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <HudLabel end={String(items.length).padStart(2, "0")}>{category.title}</HudLabel>
            <p className="text-body-sm text-ink-soft">{category.note}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((doc) => (
              <ComponentCard key={doc.slug} doc={doc} />
            ))}
          </div>
        </section>
      ))}

      {groups.length === 0 && (
        <Panel recess notch="sm" className="max-w-md">
          <p className="text-ink">No component matches "{query}".</p>
          <Button variant="link" className="mt-2 h-auto" onClick={() => setQuery("")}>
            Clear the filter
          </Button>
        </Panel>
      )}
    </div>
  );
}

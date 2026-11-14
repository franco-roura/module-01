import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vite-plus/test";
import { BalanceChart } from "../src/charts";
import { Amount, CategoryIcon } from "../src/finance";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Bubble,
  Button,
  Field,
  Input,
  Message,
  MessageContent,
  NavBar,
  Panel,
  SectionHeader,
  ShareBar,
} from "../src/index";
import { CompareList, Hero, MediaCard, Tag, Terminal } from "../src/site";

// One render per entry point: catches a broken import graph or a component that throws.
describe("entry points render", () => {
  test("core", () => {
    render(
      <Panel serial="P-01" cross>
        <SectionHeader title="Wallets" code="S-01" label="Overview" ruler />
        <Field label="Name" htmlFor="name" help="Shown on the wallet card.">
          <Input id="name" defaultValue="Savings" />
        </Field>
        <Button arrow>Save</Button>
      </Panel>,
    );
    expect(screen.getByRole("heading", { name: "Wallets" })).toBeTruthy();
    expect(screen.getByLabelText("Name")).toHaveProperty("value", "Savings");
    expect(screen.getByRole("button").textContent).toBe("Save→");
  });

  test("finance", () => {
    render(
      <>
        <Amount minor={-1076n} currency="USD" minorUnits={2} />
        <CategoryIcon icon="utensils" color="cat-amber" label="Food" />
      </>,
    );
    expect(document.body.textContent).toContain("10.76");
  });

  test("charts", () => {
    const { container } = render(
      <BalanceChart
        money={{ currency: "USD", minorUnits: 2 }}
        points={[
          { label: "Mon", tooltipLabel: "Monday", balance: 1000n },
          { label: "Tue", tooltipLabel: "Tuesday", balance: 2500n },
        ]}
      />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  test("site", () => {
    render(
      <>
        <Hero
          title="Northwind Atlas"
          subtitle="Field data platform"
          lead="Collect readings anywhere."
        />
        <MediaCard title="Signal Weather" code="P-01" status="Live" tags={["C", "ESP32"]} />
        <Terminal lines={["npm run build"]} />
      </>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Northwind Atlas" })).toBeTruthy();
    expect(screen.getByText("Live")).toBeTruthy();
  });

  test("content parts", () => {
    render(
      <>
        <Accordion type="single" defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>Does it work offline?</AccordionTrigger>
            <AccordionContent>Yes.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Message align="end">
          <MessageContent>
            <Bubble>Hello there</Bubble>
          </MessageContent>
        </Message>
        <ShareBar
          label="Split"
          parts={[
            { share: 3, label: "Models" },
            { share: 1, label: "Us" },
          ]}
        />
        <CompareList items={[{ instead: "By hand", get: "On its own" }]} />
        <Tag wrap>A short tagline</Tag>
        <NavBar mobileMenu brand="Northwind" links={[{ label: "Docs", href: "#docs" }]} />
      </>,
    );
    expect(
      screen.getByRole("button", { name: "Does it work offline?" }).getAttribute("aria-expanded"),
    ).toBe("true");
    expect(screen.getByRole("group", { name: "Split" }).textContent).toContain("75%Models");
    expect(screen.getByText("Instead of:", { exact: false })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Menu" })).toBeTruthy();
  });
});

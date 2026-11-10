import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@franco_roura/module-01";
import { ChartColumn, ChartLine, Pin } from "lucide-react";

export function KindTabs() {
  return (
    <Tabs defaultValue="expense" className="max-w-md">
      <TabsList className="w-full">
        <TabsTrigger value="expense">Expense</TabsTrigger>
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
      </TabsList>
      <TabsContent value="expense" className="text-ink-soft">
        Money leaving a wallet.
      </TabsContent>
      <TabsContent value="income" className="text-ink-soft">
        Money arriving in a wallet.
      </TabsContent>
      <TabsContent value="transfer" className="text-ink-soft">
        Money moving between two of your wallets.
      </TabsContent>
    </Tabs>
  );
}

export function PinToggle() {
  return (
    <Toggle variant="outline" aria-label="Pin to dashboard">
      <Pin strokeWidth={1.25} /> Pinned
    </Toggle>
  );
}

export function ChartMode() {
  return (
    <ToggleGroup type="single" variant="outline" defaultValue="line" aria-label="Chart type">
      <ToggleGroupItem value="line" aria-label="Line">
        <ChartLine strokeWidth={1.25} />
      </ToggleGroupItem>
      <ToggleGroupItem value="bars" aria-label="Bars">
        <ChartColumn strokeWidth={1.25} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

import { Button, SectionHeader } from "@franco_roura/module-01";
import { Plus } from "lucide-react";

export function WithRuler() {
  return <SectionHeader as="h2" code="S-02" label="Work" title="Experience" ruler />;
}

export function WithAside() {
  return (
    <SectionHeader
      as="h2"
      code="S-01"
      label="Overview"
      title="Wallets"
      aside={
        <Button size="sm">
          <Plus strokeWidth={1.25} /> Add wallet
        </Button>
      }
    />
  );
}

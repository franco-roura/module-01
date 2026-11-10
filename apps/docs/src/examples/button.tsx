import { Button } from "@franco_roura/module-01";
import { Download, Plus, Trash2 } from "lucide-react";

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Add wallet</Button>
      <Button variant="secondary">Get in touch</Button>
      <Button variant="outline">Filter</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Learn more</Button>
      <Button variant="bracket">GitHub</Button>
    </div>
  );
}

export function IconsAndArrow() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Plus strokeWidth={1.25} /> New transaction
      </Button>
      <Button arrow>Start free trial</Button>
      <Button variant="secondary">
        <Download strokeWidth={1.25} /> Export
      </Button>
      <Button variant="ghost" size="icon" aria-label="Delete">
        <Trash2 strokeWidth={1.25} />
      </Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function AsLink() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild>
        <a href="https://github.com/franco-roura/module-01">View the source</a>
      </Button>
      <Button variant="bracket" asChild>
        <a href="https://www.npmjs.com/package/@franco_roura/module-01">npm</a>
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}

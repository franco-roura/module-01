import { Badge } from "@franco_roura/module-01";

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="signal">Signal</Badge>
      <Badge variant="tint">In progress</Badge>
      <Badge variant="secondary">Raised</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Overdue</Badge>
    </div>
  );
}

import { Button, Separator, Skeleton } from "@franco_roura/module-01";
import { toast } from "sonner";

export function Toasts() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast.success("Wallet saved")}>Save</Button>
      <Button variant="secondary" onClick={() => toast("3 transactions imported")}>
        Import
      </Button>
      <Button variant="outline" onClick={() => toast.error("Amounts don't match the rate")}>
        Fail
      </Button>
    </div>
  );
}

export function LoadingRow() {
  return (
    <div className="flex max-w-sm items-center gap-3">
      <Skeleton className="size-9 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

export function Seams() {
  return (
    <div className="max-w-sm">
      <p>Checking</p>
      <Separator className="my-3" />
      <p>Savings</p>
      <div className="mt-4 flex h-5 items-center gap-3 text-body-sm text-ink-soft">
        <span>USD</span>
        <Separator orientation="vertical" />
        <span>2 wallets</span>
      </div>
    </div>
  );
}

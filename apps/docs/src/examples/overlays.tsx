import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@franco_roura/module-01";
import { MoneyInput } from "@franco_roura/module-01/finance";
import { Info } from "lucide-react";

export function RenameDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Rename wallet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename wallet</DialogTitle>
          <DialogDescription>The new name shows everywhere this wallet appears.</DialogDescription>
        </DialogHeader>
        {/* The dialog opens with focus on this field. */}
        <Field label="Name" htmlFor="dialog-name">
          <Input id="dialog-name" defaultValue="Savings" />
        </Field>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditorSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>New transaction</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New transaction</SheetTitle>
          <SheetDescription>It counts toward this month as soon as you save it.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <Field label="Amount" htmlFor="sheet-amount">
            <MoneyInput id="sheet-amount" currency="USD" />
          </Field>
          <Field label="Note (optional)" htmlFor="sheet-note">
            <Input id="sheet-note" placeholder="What was this for?" />
          </Field>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function ConfirmDelete() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete wallet</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this wallet?</AlertDialogTitle>
          <AlertDialogDescription>
            Its 42 transactions are deleted with it. You can't undo this.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep wallet</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete wallet</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function InfoPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Exchange rate</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>1 USD = 39.85 UYU</PopoverTitle>
          <PopoverDescription>The rate you entered on your last transfer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export function IconTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="About budgets">
          <Info strokeWidth={1.25} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>About budgets</TooltipContent>
    </Tooltip>
  );
}

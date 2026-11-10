import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@franco_roura/module-01";
import { ArrowLeftRight, Copy, Ellipsis, Pencil, Plus, Trash2, Wallet } from "lucide-react";

export function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Wallet actions">
          <Ellipsis strokeWidth={1.25} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Savings</DropdownMenuLabel>
        <DropdownMenuItem>
          <Pencil strokeWidth={1.25} /> Rename
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy strokeWidth={1.25} /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 strokeWidth={1.25} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Palette() {
  return (
    <Command className="max-w-sm rounded-lg shadow-float">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>Nothing found.</CommandEmpty>
        <CommandGroup heading="Add">
          <CommandItem>
            <Plus strokeWidth={1.25} /> New transaction
          </CommandItem>
          <CommandItem>
            <ArrowLeftRight strokeWidth={1.25} /> New transfer
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Go to">
          <CommandItem>
            <Wallet strokeWidth={1.25} /> Wallets
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

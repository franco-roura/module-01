import {
  Field,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@franco_roura/module-01";

export function Basic() {
  return (
    <Field label="Period" htmlFor="select-period" className="max-w-xs">
      <Select defaultValue="month">
        <SelectTrigger id="select-period" className="w-full">
          <SelectValue placeholder="Choose a period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">This week</SelectItem>
          <SelectItem value="month">This month</SelectItem>
          <SelectItem value="year">This year</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  );
}

export function Grouped() {
  return (
    <Field label="Repeat" htmlFor="select-repeat" className="max-w-xs">
      <Select>
        <SelectTrigger id="select-repeat" className="w-full">
          <SelectValue placeholder="Does not repeat" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Often</SelectLabel>
            <SelectItem value="daily">Every day</SelectItem>
            <SelectItem value="weekly">Every week</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Rarely</SelectLabel>
            <SelectItem value="monthly">Every month</SelectItem>
            <SelectItem value="yearly">Every year</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}

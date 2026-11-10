import { Calendar, DatePicker, Field } from "@franco_roura/module-01";
import { useState } from "react";

export function InAField() {
  const [date, setDate] = useState("2026-10-29");
  return (
    <div className="flex max-w-xs flex-col gap-2">
      <Field label="Date" htmlFor="date-picker-date">
        <DatePicker id="date-picker-date" value={date} onChange={setDate} />
      </Field>
      <p className="hud-sm text-ink-soft">Value: {date || "empty"}</p>
    </div>
  );
}

export function MonthGrid() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 20));
  return (
    <div className="w-fit rounded-lg bg-shell p-3 shadow-float">
      <Calendar
        mode="single"
        selected={day}
        onSelect={setDay}
        defaultMonth={new Date(2026, 9, 1)}
      />
    </div>
  );
}

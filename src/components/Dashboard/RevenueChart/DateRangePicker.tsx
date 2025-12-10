import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({
  dateRange,
  setDateRange,
}: DateRangePickerProps) {
  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      className="rounded-lg border shadow-sm"
    />
  );
}

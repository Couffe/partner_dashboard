import { useMemo } from "react";
import { type Transaction } from "@/types/transaction";
import { type DateRange } from "react-day-picker";

// Helpers for date manipulation (No external libraries needed)
const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) to 6 (Sat)
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday start
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getStartOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const useRevenueChartData = (
  transactions: Transaction[],
  dateRange: DateRange | undefined
) => {
  return useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return [];

    const start = new Date(dateRange.from);
    const end = new Date(dateRange.to);
    const durationDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

    // 1. Determine Granularity
    let granularity: "day" | "week" | "month" = "day";
    if (durationDays > 90) granularity = "month";
    else if (durationDays > 14) granularity = "week"; // > 2 weeks switches to weekly

    // 2. Initialize Map
    const revenueMap = new Map<string, number>();

    // Helper to get the key for a specific date based on granularity
    const getKey = (date: Date) => {
      const d = new Date(date);
      if (granularity === "month") {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}`; // YYYY-MM
      } else if (granularity === "week") {
        const monday = getStartOfWeek(d);
        return monday.toISOString().split("T")[0]; // YYYY-MM-DD (Monday)
      }
      return d.toISOString().split("T")[0]; // YYYY-MM-DD
    };

    // 3. Pre-fill the map with 0s (The "Skeleton" of the chart)
    let cursor = new Date(start);

    // Adjust cursor start based on granularity (e.g., start at beginning of month)
    if (granularity === "month") cursor = getStartOfMonth(cursor);
    if (granularity === "week") cursor = getStartOfWeek(cursor);

    while (cursor <= end) {
      revenueMap.set(getKey(cursor), 0);

      // Increment cursor
      if (granularity === "month") {
        cursor.setMonth(cursor.getMonth() + 1);
      } else if (granularity === "week") {
        cursor.setDate(cursor.getDate() + 7);
      } else {
        cursor.setDate(cursor.getDate() + 1);
      }
    }

    // 4. Aggregate Data
    transactions.forEach((t) => {
      const tDate = new Date(t.createdAtUtc);

      // Only count if it falls within the rough range (simple filter)
      if (tDate >= start && tDate <= end) {
        const key = getKey(tDate);

        // We use 'has' to ensure we stick to the strict buckets defined above
        // (e.g., if a transaction is slightly out of the 'week' bucket bounds)
        if (!revenueMap.has(key)) {
          // Optional: dynamically expand map if needed, but usually strictly
          // filtering to the generated keys is safer for charts.
          return;
        }

        const rate = t.partnerRate ?? 0;
        const revenue = (t.cost * rate) / 100 / 100;
        revenueMap.set(key, (revenueMap.get(key) || 0) + revenue);
      }
    });

    // 5. Format for Recharts
    return Array.from(revenueMap.entries()).map(([key, value]) => {
      const dateObj = new Date(
        granularity === "month" ? `${key}-01T00:00:00` : `${key}T00:00:00`
      );

      let label = "";
      if (granularity === "month") {
        label = dateObj.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }); // "Nov 24"
      } else if (granularity === "week") {
        label = `Wk ${dateObj.toLocaleDateString("en-US", {
          day: "numeric",
          month: "numeric",
        })}`; // "Wk 11/17"
      } else {
        label = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }); // "Nov 19"
      }

      return {
        date: key,
        revenue: value,
        label,
      };
    });
  }, [transactions, dateRange]);
};

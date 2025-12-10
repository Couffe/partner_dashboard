import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";
import { useRevenueChartData } from "@/hooks/UseRevenueChartData";
import type { Transaction } from "@/types/transaction";
import type { DateRange } from "react-day-picker";
import { DateRangePicker } from "./DateRangePicker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currencyFormatter } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export interface RevenueChartData {
  date: string;
  revenue: number;
  label: string;
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface RevenueChartProps {
  transactions: Transaction[];
  isLoading?: boolean;
  className?: string;
}

const RevenueChart = ({
  transactions,
  isLoading,
  className,
}: RevenueChartProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const from = new Date();
    from.setDate(from.getDate() - 7);

    return {
      from: from,
      to: new Date(),
    };
  });

  const chartData = useRevenueChartData(transactions, dateRange);

  const totalRevenue = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.revenue, 0);
  }, [chartData]);

  return (
    <Card className={`${className} flex flex-col `}>
      <CardHeader>
        <div className="w-full flex flex-row items-center justify-between">
          <div>
            <p className="text-muted-foreground">Revenue</p>
            <h3 className="font-bold text-2xl">
              {currencyFormatter.format(Number(totalRevenue))}
            </h3>
            <p className="text-muted-foreground">
              Total revenue from {dateRange?.from?.toLocaleDateString()} -{" "}
              {dateRange?.to?.toLocaleDateString()}
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Choose Dates</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 overflow-auto">
              <DateRangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] max-h-[500px] h-full w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />

                <YAxis
                  dataKey="revenue"
                  tickFormatter={(value) =>
                    currencyFormatter.format(Number(value))
                  }
                />

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        currencyFormatter.format(Number(value))
                      }
                    />
                  }
                />

                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

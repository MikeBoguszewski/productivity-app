"use client";

import { Bar, BarChart, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { useState, useEffect } from "react";
import { fetchDailyStats } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { ChartBar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const chartConfig = {
  minutesFocused: {
    label: "Minutes",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export type ChartData = {
  date: string;
  minutesFocused: number;
};

export function FocusChart({ className }: { className?: string }) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { userLoading } = useAuth();
  const [chartDataLoading, setChartDataLoading] = useState(true);
  useEffect(() => {
    if (userLoading) return;
    async function fetchData() {
      const data = await fetchDailyStats();
      console.log(data);
      setChartData(data);
      setChartDataLoading(false);
    }
    fetchData();
  }, [userLoading]);

  if (userLoading || chartDataLoading) return <Skeleton className={cn("", className)}></Skeleton>;
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex justify-between flex-row">
        <div className="flex flex-col justify-between gap-2">
          <CardTitle className="text-xl">Minutes Focused</CardTitle>
          <CardDescription>Total focused time tracked over the last 7 days.</CardDescription>
        </div>
        <ChartBar className="size-6" />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value + "T00:00:00Z");
                date.setHours(date.getHours());
                return date.toLocaleDateString(undefined, {
                  weekday: "short",
                });
              }}
            />
            <Bar dataKey="minutesFocused" stackId="a" fill="var(--color-minutesFocused)" radius={4} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value + "T00:00:00Z");
                    date.setHours(date.getHours());
                    return date.toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

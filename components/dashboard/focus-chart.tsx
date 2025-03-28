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
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>Minutes Focused</CardTitle>
          <ChartBar className="size-6" />
        </div>

        <CardDescription>Total focused time tracked over the last 7 days.</CardDescription>
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
                date.setHours(date.getHours() + 24);
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
                    const date = new Date(value + "T00:00:00Z"); // Ensure UTC date
                    date.setHours(date.getHours() + 24); // Add one hour to adjust for time zone shift
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

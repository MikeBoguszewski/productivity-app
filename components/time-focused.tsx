"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock4 } from "lucide-react";
import { fetchTotalFocusTime } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function TimeFocused({ className }: { className?: string }) {
  const [timeFocused, setTimeFocused] = useState<number | null>(null);
  const { userLoading } = useAuth();
  useEffect(() => {
    if (userLoading) return;
    async function fetchData() {
      const data = await fetchTotalFocusTime();
      console.log(data);
      setTimeFocused(data);
    }
    fetchData();
  }, [userLoading]);
  const formattedTimeFocused = timeFocused !== null 
    ? (timeFocused > 1 ? `${timeFocused} Minutes` : `${timeFocused} Minute`) 
    : "No data";
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Total Time Focused</CardTitle>
        <Clock4 className="size-6" />
      </CardHeader>
      <CardContent className="font-bold text-4xl">{formattedTimeFocused}</CardContent>
    </Card>
  );
}

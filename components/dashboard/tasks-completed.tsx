"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { fetchTasksCompleted } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function TasksCompleted({ className }: { className?: string }) {
  const [tasksCompleted, setTasksCompleted] = useState<number | null>(null);
  const { userLoading } = useAuth();
  const [tasksCompletedLoading, setTasksCompletedLoading] = useState(true);
  useEffect(() => {
    if (userLoading) return;
    async function fetchData() {
      const data = await fetchTasksCompleted();
      console.log(data);
      setTasksCompleted(data);
      setTasksCompletedLoading(false);
    }
    fetchData();
  }, [userLoading]);
    if (userLoading || tasksCompletedLoading) return <Skeleton className={cn(className)}></Skeleton>;
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Tasks Completed</CardTitle>
        <CheckCircle className="size-6" />
      </CardHeader>
      <CardContent className="font-bold text-4xl">{tasksCompleted} Tasks</CardContent>
    </Card>
  );
}

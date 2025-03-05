import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export default function TasksCompleted({ className }: { className?: string }) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Completed</CardTitle>
        <CheckCircle className="size-6" />
      </CardHeader>
      <CardContent className="font-bold text-4xl">10 Tasks</CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
export default function RecentTasks({ className }: { className?: string }) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Tasks</CardTitle>
        <ClipboardList className="size-6" />
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-2xl">
          <li>Task 1</li>
          <li>Task 2</li>
          <li>Task 3</li>
          <li>Task 4</li>
        </ul>
      </CardContent>
    </Card>
  );
}

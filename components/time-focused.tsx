import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock4 } from "lucide-react";

export default function TimeFocused({ className }: { className?: string }) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Time Focused</CardTitle>
        <Clock4 className="size-6" />
      </CardHeader>
      <CardContent className="font-bold text-4xl">2h 52m</CardContent>
    </Card>
  );
}

"use client";

import { TasksTable } from "@/components/tasks/tasks-table";
import { Card } from "@/components/ui/card";


export default function TasksPage() {
 return (
   <Card className="container mx-auto p-10 h-full flex flex-col">
     <TasksTable />
   </Card>
 );
}

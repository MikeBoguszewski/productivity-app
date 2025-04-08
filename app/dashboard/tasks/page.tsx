"use client";

import { TasksTable } from "@/components/tasks/tasks-table";
import { Card } from "@/components/ui/card";


export default function TasksPage() {
 return (
   <div className="p-4 h-full w-full">
     <Card className="container p-10 h-full flex flex-col">
       <TasksTable />
     </Card>
   </div>
 );
}

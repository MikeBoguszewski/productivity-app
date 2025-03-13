"use client";

import { Task, columns } from "@/components/tasks/columns";
import { DataTable } from "@/components/tasks/data-table";
import { listenForTasks } from "@/lib/firebase";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function TasksPage() {
  const { userLoading } = useAuth();
  const [data, setData] = useState<Task[]>([]);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (userLoading) return
    const { success,  unsubscribe } = listenForTasks((tasks) => {
      setData(tasks);
    });
    unsubscribeRef.current = unsubscribe;
    if (success) {
      setData(data);
    }
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [userLoading, data]);
  return <DataTable columns={columns} data={data} />;
}

"use client";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { fetchRecentTasks } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

export type Task = {
  id: string;
  task: string;
};

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "task",
    header: "Task",
  },
];


export default function RecentTasks() {
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const { userLoading } = useAuth();
  useEffect(() => {
    if (userLoading) return;
    async function fetchData() {
      const data = await fetchRecentTasks();
      console.log(data);
      setRecentTasks(data);
    }
    fetchData();
  }, [userLoading]);

  const table = useReactTable({
    data: recentTasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Card className="p-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Tasks</CardTitle>
        <ClipboardList className="size-6" />
      </CardHeader>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

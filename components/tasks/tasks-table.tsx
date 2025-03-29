"use client";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns, Task } from "@/components/tasks/columns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { listenForTasks } from "@/lib/firebase";
import { useEffect, useState, useRef } from "react";
import AddTask from "@/components/tasks/add-task";
import DeleteTask from "@/components/tasks/delete-task";
import { CardTitle } from "@/components/ui/card";

export function TasksTable() {
  const [data, setData] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const { userLoading } = useAuth();
  useEffect(() => {
    if (userLoading) return;
    const { success, unsubscribe } = listenForTasks((tasks) => {
      setData(tasks);
      setTasksLoading(false);
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
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });
  const selectedData = table.getSelectedRowModel().rows.map((row) => row.original);
  return (
    <>
      <div className="flex justify-between mb-5 flex-col lg:flex-row items-start lg:items-center">
        <CardTitle className="text-3xl w-full">To-Do List</CardTitle>
        <div className="flex items-center">
          <AddTask />
          <DeleteTask isDisabled={table.getSelectedRowModel().rows.length === 0} selectedTasks={selectedData} />
        </div>
      </div>
      {userLoading || tasksLoading ? (
        <Skeleton className="w-full flex-1">
        </Skeleton>
      ) : (
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
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-64 text-center">
                    No tasks.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

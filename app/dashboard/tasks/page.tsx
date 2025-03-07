import { Task, columns } from "@/components/tasks/columns";
import { DataTable } from "@/components/tasks/data-table";

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      task: "Homework",
      priority: "High",
    },
    {
      id: "728ed52f",
      task: "Homework",
      priority: "Low",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
      <DataTable columns={columns} initialData={data} />
  );
}

import { Button } from "@/components/ui/button";
import { deleteTasks } from "@/lib/firebase";
import { toast } from "sonner";

interface Task {
  id: string;
}

interface DeleteTaskProps<TData extends Task> {
  isDisabled: boolean;
  selectedTasks: TData[];
}


export default function DeleteTask<TData extends Task>({ isDisabled, selectedTasks }: DeleteTaskProps<TData>) {
  const selectedIds = selectedTasks.map((task) => task.id);
  const handleDelete = async () => {
    const result = await deleteTasks(selectedIds)
    if (result.success) {
      toast.success("Tasks deleted successfully.");
    } else {
      toast.error(result.message);
    }
  };
  return (
    <Button className="m-5" onClick={handleDelete} disabled={isDisabled}>
      Delete Selected
    </Button>
  );
}

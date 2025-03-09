import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addTask } from "@/lib/firebase";
import { toast } from "sonner";
export default function AddTask() {
  const [task, setTask] = useState("");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addTask(task);
    if (result.success) {
      toast.success("Task added successfully");
      setTask("")
    } else {
      toast.error(result.message);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };
  return (
    <form onSubmit={onSubmit} className="flex gap-6">
      <Input className="w-32" id="task" type="text" placeholder="New Task" aria-label="Task" value={task} onChange={onChange}></Input>
      <Button type="submit">Add</Button>
    </form>
  );
}

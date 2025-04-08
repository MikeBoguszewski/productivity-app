import WelcomePanel from "@/components/dashboard/welcome-panel";
import TimeFocused from "@/components/dashboard/time-focused";
import RecentTasks from "@/components/dashboard/recent-tasks";
import TasksCompleted from "@/components/dashboard/tasks-completed";
import { FocusChart } from "@/components/dashboard/focus-chart";

export default function DashboardPage() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 lg:grid-rows-2 grid-rows-4 gap-5 min-h-full p-4">
      <WelcomePanel className="lg:col-span-3 lg:min-h-0 min-h-96" />
      <div className="flex flex-col gap-4 min-h-44">
        <TimeFocused className="flex-1" />
        <TasksCompleted className="flex-1" />
      </div>
      <RecentTasks />
      <FocusChart />
    </div>
  );
}

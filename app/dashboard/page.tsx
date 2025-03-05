import WelcomePanel from "@/components/welcome-panel";
import TimeFocused from "@/components/time-focused";
import RecentTasks from "@/components/recent-tasks";
import TasksCompleted from "@/components/tasks-completed";
import { HoursChart } from "@/components/hours-chart";

export default function DashboardPage() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 grid-rows-2 gap-5">
      <WelcomePanel className="lg:col-span-3" />
      <div className="flex flex-col grid-rows-3 gap-4">
        <TimeFocused className="flex-1" />
        <TasksCompleted className="flex-1" />
      </div>
      <RecentTasks />
      <HoursChart />
    </div>
  );
}

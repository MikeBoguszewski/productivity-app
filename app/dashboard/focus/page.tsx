import FocusGoal from "@/components/focus-goal";
import Timer from "@/components/timer";
export default function FocusPage() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Timer />
      <FocusGoal />
    </div>
  );

}

import Timer from "@/components/timer";
import { Card } from "@/components/ui/card";

export default function FocusPage() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("/focus-background-2.jpg")' }}>
        <div className="absolute inset-0 bg-white-900/40" />
      </div>

      <div className="relative z-10 flex flex-col w-full h-full justify-center items-center px-4">
        <Card className="p-16 bg-accent w-full sm:max-w-md md:max-w-xl">
          <Timer />
        </Card>
      </div>
    </div>
  );
}

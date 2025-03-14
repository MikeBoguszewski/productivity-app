"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTimer } from "react-timer-hook";

export default function Timer() {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1800);
  const { totalSeconds, milliseconds, seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({ expiryTimestamp, onExpire: () => console.warn("onExpire called"), interval: 20 });

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <Card className="flex items-center justify-center w-full max-w-96 h-96 flex-col">
      <span className="text-6xl font-bold mb-16">{formattedTime}</span>
      <div className="flex gap-4 justify-between">
        <Button className="h-12" onClick={start}>
          Start
        </Button>
        <Button className="h-12" onClick={pause}>
          Pause
        </Button>
        <Button className="h-12" onClick={resume}>
          Resume
        </Button>
        <Button
          className="h-12"
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 1800);
            restart(time);
          }}
        >
          Restart
        </Button>
      </div>
    </Card>
  );
}

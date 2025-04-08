"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTimer } from "react-timer-hook";
import { Play, Pause, Ellipsis, TimerReset } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { incrementFocusTime } from "@/lib/firebase";

export default function Timer() {
  const [minutesInput, setMinutesInput] = useState("30");
  const [expiryTimestamp, setExpiryTimestamp] = useState(new Date());
  const { seconds, minutes, hours, isRunning, pause, resume, restart } = useTimer({ expiryTimestamp, onExpire: () => console.warn("onExpire called"), interval: 20, autoStart: false });

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (/^\d*$/.test(e.target.value) && (e.target.value === "" || (parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 999))) {
      setMinutesInput(e.target.value);
    }
  };

  useEffect(() => {
    if (!isRunning) {
      return;
    } else {
      const intervalId = setInterval(() => {
        const result = incrementFocusTime();
        console.log(result);
      }, 60000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  useEffect(() => {
    const updatedExpiry = new Date();
    updatedExpiry.setSeconds(updatedExpiry.getSeconds() + 60 * parseInt(minutesInput));
    setExpiryTimestamp(updatedExpiry);
    restart(updatedExpiry);
    pause();
  }, [minutesInput, restart, pause]);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <DropdownMenu>
        <div className="flex flex-row items-center justify-center mb-16 gap-4">
          <span className="text-7xl sm:text-8xl font-bold">{formattedTime}</span>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent>
          <DropdownMenuLabel>Set Time</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-2 p-2">
            <Label htmlFor="minutes">Minutes</Label>
            <Input id="minutes" type="number" min="0" max="999" value={minutesInput} onChange={handleMinutesChange} />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex gap-4 justify-between">
        {isRunning ? (
          <Button className="h-12" onClick={pause}>
            <Pause className="" />
          </Button>
        ) : (
          <Button className="h-12" onClick={resume}>
            <Play />
          </Button>
        )}
        <Button
          className="h-12"
          onClick={() => {
            const updatedExpiry = new Date();
            updatedExpiry.setSeconds(updatedExpiry.getSeconds() + 60 * parseInt(minutesInput));
            restart(updatedExpiry);
          }}
        >
          <TimerReset size={10} />
        </Button>
      </div>
    </div>
  );
}

"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pencil } from "lucide-react";
export default function FocusGoal() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleBlur = (value: string) => {
    if (value === "") {
      setFocused(true);
    } else {
      setFocused(false);
    }
      
  }

  return (
    <div className="flex flex-col items-center mb-3 h-auto text-center w-auto">
      <div className="flex items-center justify-center gap-3 mt-12 mb-5">
        <h1 className="text-3xl font-bold w-full underline">Focus Goal</h1>
        <Button onClick={() => setFocused(!focused)} className="h-8 w-8">
          <Pencil />
        </Button>
      </div>
      {focused ? <Input className="w-96" value={value} onChange={handleChange} onBlur={(e) => handleBlur(e.target.value)} /> : <span className="flex-auto text-xl font-bold line-clamp-1">{value}</span>}
    </div>
  );
}
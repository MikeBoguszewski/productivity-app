"use client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function WelcomePanel() {
  const { user, loading } = useAuth();
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState({ q: "", a: "" });
  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch("/api/quote");
      const data = await response.json();
      console.log(data);
      setQuote(data[0]);
    }
    fetchQuote();

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hours = time.getHours();
    if (hours < 12) {
      return "Good morning";
    }
    if (hours < 18) {
      return "Good afternoon";
    }
    return "Good evening";

  }
    return (
      <Card className="rounded-md overflow-hidden">
        <CardContent className="p-0 md:flex-col md:items-start">
          <div className="flex items-center justify-around p-6 flex-col md:flex-row">
            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-6" />
                <span className="text-xl">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <h1 className="text-4xl font-bold">
                {getGreeting()}, {user?.displayName}!
              </h1>
            </div>
            <Separator orientation="horizontal" className="md:hidden" />
            <Separator orientation="vertical" className="hidden md:block h-32 self-center" />
            <div className="p-6 text-muted-foreground text-xl">
              {quote ? (
                <blockquote className="">
                  &quot;{quote.q}&quot;
                  <footer>– {quote.a}</footer>
                </blockquote>
              ) : (
                <blockquote className="">
                  &quot;The only way to do great work is to love what you do.&quot;
                  <footer>– Steve Jobs</footer>
                </blockquote>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
}

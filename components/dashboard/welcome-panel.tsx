"use client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function WelcomePanel({ className }: { className?: string }) {
  const { user, userLoading } = useAuth();
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState({ q: "", a: "" });
  const [quoteLoading, setQuoteLoading] = useState(true);
  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch("/api/quote");
      const data = await response.json();
      console.log(data);
      setQuote(data[0]);
      setQuoteLoading(false);
    };
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
  };

  if (userLoading || quoteLoading) return <Skeleton className={cn(className)}></Skeleton>;

  return (
    <Card className={cn("rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex p-6 flex-col", className)}>
      <CardHeader className="w-full flex flex-col justify-start">
        <div className="flex items-center gap-2 pb-2">
          <Clock className="size-6" />
          <span className="text-xl">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <h1 className="text-4xl font-bold h-full line-clamp-3">
          {getGreeting()}
          {user?.displayName ? `, ${user.displayName}` : ""}
        </h1>
      </CardHeader>
      <Separator orientation="horizontal" />
      <div className="max-w-full h-full flex-1 flex justify-center flex-col pt-3">
        <CardContent>
          <div className="text-xl p-3 flex items-center h-full">
            {quote ? (
              <blockquote className="line-clamp-4">
                &quot;{quote.q}&quot;
                <footer>– {quote.a}</footer>
              </blockquote>
            ) : (
              <blockquote className="line-clamp-4">
                &quot;The only way to do great work is to love what you do.&quot;
                <footer>– Steve Jobs</footer>
              </blockquote>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="italic text-base">
            Inspirational quotes provided by{" "}
            <a className="underline" href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">
              ZenQuotes API
            </a>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

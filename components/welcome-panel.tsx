"use client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function WelcomePanel() {
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

  if (userLoading || quoteLoading) return <Skeleton className="h-[50vh] lg:h-[25vh]"></Skeleton>;

  return (
    <Card className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white lg:items-start max-h-[50vh] lg:max-h-[25vh] flex p-6 flex-col lg:flex-row flex-1 w-full">
      <CardHeader className="lg:w-1/2 lg:h-full h-1/2 w-full flex-1 flex flex-col justify-start">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="size-6" />
          <span className="text-xl">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <h1 className="text-4xl font-bold h-full line-clamp-3">
          {getGreeting()} {"," + user?.displayName || ""}
        </h1>
      </CardHeader>
      <Separator orientation="horizontal" className="lg:hidden" />
      <Separator orientation="vertical" className="hidden lg:block" />
      <div className="p-0 max-w-full lg:w-1/2 h-1/2 flex-1">
        <CardContent>
          <div className="text-xl p-3">
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

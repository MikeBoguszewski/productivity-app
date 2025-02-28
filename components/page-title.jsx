"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function PageTitle() {
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const currentPage = pathname.split("/").pop() || "";
    setTitle(currentPage.charAt(0).toUpperCase() + currentPage.slice(1));
  }, [pathname]);

  return <h1 className="font-semibold">{title}</h1>;
}

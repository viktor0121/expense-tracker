"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import useLoadingContext from "@/context/loading/useLoadingContext";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isLoading } = useLoadingContext();

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen w-full bg-muted/40">
        <Navbar />
        <main>
          {/*TODO: Implement a loading spinner  */}
          {isLoading ? <p>Loading...</p> : children}
        </main>
      </div>

      <Toaster />
    </TooltipProvider>
  );
}

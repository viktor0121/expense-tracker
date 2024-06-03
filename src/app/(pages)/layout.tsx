"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import useLoadingContext from "@/context/loading/useLoadingContext";
import SignOutAlertDialog from "@/components/sign-out-alert-dialog";
import AddNewSheet from "@/components/add-new-sheet";
import NavTrailProvider from "@/context/nav-trail/provider";
import { useSearchParams } from "next/navigation";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isLoading } = useLoadingContext();
  const searchParams = useSearchParams();

  return (
    <TooltipProvider>
      <NavTrailProvider searchParams={searchParams}>
        <div className="flex flex-col min-h-screen w-full bg-muted/40">
          <Navbar />
          <main>
            {/*TODO: Implement a loading spinner  */}
            {isLoading ? <p>Loading...</p> : children}
          </main>
        </div>

        <SignOutAlertDialog />

        <AddNewSheet />

        <Toaster />
      </NavTrailProvider>
    </TooltipProvider>
  );
}

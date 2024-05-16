"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/theme/context";
import { AuthProvider } from "@/context/auth/context";
import { NavTrailProvider } from "@/context/nav-trail/context";
import { INavTrail } from "@/lib/types";
import auth from "@/lib/appwrite/auth";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [navTrails, setNavTrails] = useState<INavTrail[]>([]);

  useEffect(() => {
    // Check if user is logged in
    auth
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      <NavTrailProvider value={{ navTrails, setNavTrails }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex flex-col sm:gap-4 sm:py-4 min-h-screen w-full bg-muted/40">
              <Navbar />
              <main className="sm:pl-14">
                {/*TODO: Implement a loading spinner  */}
                {isLoading ? <p>Loading...</p> : children}
              </main>
            </div>

            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </NavTrailProvider>
    </AuthProvider>
  );
}

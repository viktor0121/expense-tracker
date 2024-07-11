"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/store/useAuth";
import auth from "@/lib/appwrite/auth";
import { ETheme } from "@/lib/enums";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ProviderChildWrapper>{children}</ProviderChildWrapper>
    </NextThemesProvider>
  );
}

// A separate wrapper component to handle theme preference changes
// This is needed because we can call useTheme() only in the child wrapped by NextThemesProvider
function ProviderChildWrapper({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuth();
  const { theme, setTheme } = useTheme();

  // Get theme preference from the user account if user is authenticated
  useEffect(() => {
    (async function () {
      try {
        const themePref = await auth.getPreference<ETheme>("theme");
        if (themePref) setTheme(themePref);
      } catch (error: any) {}
    })();
  }, []);

  // Set theme preference in the user account if user is authenticated
  useEffect(() => {
    (async function () {
      try {
        if (authStatus) {
          const newTheme = theme === ETheme.Light || theme === ETheme.Dark ? theme : ETheme.System;
          await auth.updatePreference<ETheme>("theme", newTheme);
        }
      } catch (error: any) {
        if (authStatus) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    })();
  }, [theme]);

  return <>{children}</>;
}

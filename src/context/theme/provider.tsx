"use client";

import React, { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import useAuthContext from "@/context/auth/useAuthContext";
import { ETheme } from "@/lib/enums";
import auth from "@/lib/appwrite/auth";

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProviderChildWrapper>{children}</ProviderChildWrapper>
    </NextThemesProvider>
  );
}

// A separate wrapper component to handle theme preference changes
// This is needed because we can call useTheme() only in the child wrapped by NextThemesProvider
function ProviderChildWrapper({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuthContext();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    (async function () {
      try {
        const themePref = await auth.getThemePref();
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
          await auth.updateThemePref({ theme: newTheme });
        }
      } catch (error: any) {}
    })();
  }, [theme]);

  return <>{children}</>;
}

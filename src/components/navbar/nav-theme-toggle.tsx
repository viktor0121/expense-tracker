"use client";

import * as React from "react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/context/auth/useAuth";
import { ETheme } from "@/lib/enums";
import auth from "@/lib/appwrite/auth";

export default function NavThemeToggle() {
  const { authStatus } = useAuth();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    (async function () {
      try {
        const themePref = await auth.getThemePref();
        if (themePref) setTheme(themePref);
      } catch (error: any) {}
    })();
  }, []);

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

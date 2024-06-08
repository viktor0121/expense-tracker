"use client";

import React, { Suspense, useState } from "react";
import { CreditCard, DollarSign, Home, LogIn, Settings, Target } from "lucide-react";
import useAuthContext from "@/context/auth/useAuthContext";
import NavBurgerMenu from "@/components/navbar/nav-burger-menu";
import NavTrail from "@/components/navbar/nav-trail";
import CommandPallet from "@/components/command-pallet";
import NavThemeToggle from "@/components/navbar/nav-theme-toggle";
import NavDropdownMenu from "@/components/navbar/nav-dropdown-menu";
import { INavItem } from "@/lib/types";

export default function Navbar() {
  const { authStatus, setAuthStatus } = useAuthContext();
  const navItems: INavItem[] = (function () {
    const items: { [key: string]: INavItem } = {
      home: {
        title: "Home",
        Icon: Home,
        url: "/",
      },
      signin: {
        title: "SignIn",
        Icon: LogIn,
        url: "/auth",
      },
      overview: {
        title: "Overview",
        Icon: Target,
        url: "/dashboard?tab=overview",
      },
      expense: {
        title: "Expenses",
        Icon: CreditCard,
        url: "/dashboard?tab=expenses",
      },
      savings: {
        title: "Savings",
        Icon: DollarSign,
        url: "/dashboard?tab=savings",
      },
      settings: {
        title: "Settings",
        Icon: Settings,
        url: "/settings",
        posBottom: true,
      },
    };

    const result: INavItem[] = [];
    if (authStatus) {
      result.push(items.overview);
      result.push(items.expense);
      result.push(items.savings);
      result.push(items.settings);
    } else {
      result.push(items.home);
      result.push(items.signin);
    }

    return result;
  })();

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-14 sm:px-6">
        <NavBurgerMenu navItems={navItems} />

        <div className="hidden md:flex">
          <Suspense fallback={<NavTrailFallBack />}>
            <NavTrail />
          </Suspense>
        </div>

        <CommandPallet />
        <NavThemeToggle />

        {authStatus ? <NavDropdownMenu /> : null}
      </header>
    </>
  );
}

function NavTrailFallBack() {
  return (
    <div className="animate-pulse w-52 grid grid-cols-9 gap-1">
      <div className="h-2 bg-accent rounded col-span-2"></div>
      <div className="h-2 bg-accent rounded col-span-1"></div>
      <div className="h-2 bg-accent rounded col-span-2"></div>
      <div className="h-2 bg-accent rounded col-span-1"></div>
      <div className="h-2 bg-accent rounded col-span-3"></div>
    </div>
  );
}

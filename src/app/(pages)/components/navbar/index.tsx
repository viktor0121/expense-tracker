"use client";

import React, { Suspense, useState } from "react";
import { CreditCard, DollarSign, Home, LogIn, Settings, Target } from "lucide-react";
import useAuthContext from "@/context/auth/useAuthContext";
import NavBurgerMenu from "@/app/(pages)/components/navbar/nav-burger-menu";
import NavTrail from "@/app/(pages)/components/navbar/nav-trail";
import CommandPallet from "@/components/command-pallet";
import NavThemeToggle from "@/app/(pages)/components/navbar/nav-theme-toggle";
import NavDropdownMenu from "@/app/(pages)/components/navbar/nav-dropdown-menu";
import { INavItem } from "@/lib/types";
import { navigations } from "@/lib/constants";

export default function Navbar() {
  const { authStatus, isAuthLoading } = useAuthContext();

  const authNavItems = [
    navigations.overview,
    navigations.expense,
    navigations.earnings,
    navigations.settings,
  ];
  const nonAuthNavItems = [navigations.home, navigations.signin];
  const navItems: INavItem[] = authStatus ? authNavItems : nonAuthNavItems;

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

        {isAuthLoading ? <NavDropdownFallBack /> : authStatus ? <NavDropdownMenu /> : null}
      </header>
    </>
  );
}

function NavDropdownFallBack() {
  return <div className="animate-pulse rounded-full bg-accent h-10 w-10"></div>;
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

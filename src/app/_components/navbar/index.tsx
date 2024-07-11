"use client";

import React, { Suspense } from "react";
import { CommandPallet } from "@/components/command-pallet";
import { useAuth } from "@/store/useAuth";
import { navigations } from "@/lib/constants";
import { INavItem } from "@/lib/types";
import { NavBurgerMenu } from "./nav-burger-menu";
import { NavDropdownMenu } from "./nav-dropdown-menu";
import { NavThemeToggle } from "./nav-theme-toggle";
import { NavTrail } from "./nav-trail";

export function Navbar() {
  const { authStatus, isAuthLoading } = useAuth();

  const authNavItems = [navigations.analytics, navigations.expense, navigations.earnings, navigations.settings];
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
  return <div className="h-10 w-10 animate-pulse rounded-full bg-accent"></div>;
}

function NavTrailFallBack() {
  return (
    <div className="grid w-52 animate-pulse grid-cols-9 gap-1">
      <div className="col-span-2 h-2 rounded bg-accent"></div>
      <div className="col-span-1 h-2 rounded bg-accent"></div>
      <div className="col-span-2 h-2 rounded bg-accent"></div>
      <div className="col-span-1 h-2 rounded bg-accent"></div>
      <div className="col-span-3 h-2 rounded bg-accent"></div>
    </div>
  );
}

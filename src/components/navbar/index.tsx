"use client";

import React from "react";
import { Home, Settings } from "lucide-react";
import useAuth from "@/context/auth/useAuth";
import useNavTrail from "@/context/nav-trail/useNavTrail";
import useAuthContext from "@/context/auth/useAuthContext";
import useNavTrailContext from "@/context/nav-trail/useNavTrailContext";
import NavSidebar from "@/components/navbar/nav-sidebar";
import NavBurgerMenu from "@/components/navbar/nav-burger-menu";
import NavTrail from "@/components/navbar/nav-trail";
import CommandPallet from "@/components/command-pallet";
import NavDropdownMenu from "@/components/navbar/nav-dropdown-menu";
import NavThemeToggle from "@/components/navbar/nav-theme-toggle";
import auth from "@/lib/appwrite/auth";
import { INavItem } from "@/lib/types";

export default function Navbar() {
  const { authStatus, setAuthStatus } = useAuth();
  const { navTrails } = useNavTrail();
  const navItems: INavItem[] = [
    {
      title: "Home",
      Icon: Home,
      url: "/",
    },
    {
  const { authStatus, setAuthStatus } = useAuthContext();
  const navItems: INavItem[] = (function () {
    const items: INavItem[] = [];

    if (authStatus) {
      items.push({
        title: "Dashboard",
        Icon: Home,
        url: "/dashboard",
      });
    } else {
      items.push({
        title: "SignIn",
        Icon: LogIn,
        url: "/auth",
      });
    }

    items.push({
      title: "Settings",
      Icon: Settings,
      url: "/settings",
      posBottom: true,
    },
  ];

  const handleSignOut = async () => {
    await auth.signOut();
    setAuthStatus(false);
  };

  return (
    <>
      <NavSidebar navItems={navItems} />

      <header className="sm:ml-14 sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <NavBurgerMenu navItems={navItems} />
        <NavTrail navTrails={navTrails} />
        <CommandPallet />
        <NavThemeToggle />
        {authStatus ? <NavDropdownMenu handleSignOut={handleSignOut} /> : null}
      </header>
    </>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Home, LucideProps, Package2, PanelLeft, Search, Settings, User2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useActivePath from "@/hooks/useActivePath";
import { useRouter } from "next/navigation";

interface NavLogoProps {
  isLarge?: boolean;
}

interface NavItemProps {
  url: string;
  title: string;
  Icon: React.FC<LucideProps>;
  isExpanded: boolean;
  posBottom?: boolean;
}

type NavItem = Omit<NavItemProps, "isExpanded">;

export default function Navbar() {
  const router = useRouter();

  const navItems: NavItem[] = [
    {
      title: "Home",
      Icon: Home,
      url: "/",
    },
    {
      title: "Settings",
      Icon: Settings,
      url: "/settings",
      posBottom: true,
    },
  ];

  const handleSignOut = async () => {
    await auth.signOut();
    router.replace("/auth");
  };

  return (
    <>
      {/*SideBar*/}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col h-full items-center gap-4 px-2 sm:py-5">
          <NavLogo />
          {navItems.map((navItem) => (
            <NavItem
              key={navItem.url}
              isExpanded={false}
              url={navItem.url}
              title={navItem.title}
              Icon={navItem.Icon}
              posBottom={navItem.posBottom}
            />
          ))}
        </nav>
      </aside>

      {/*Navbar*/}
      <header className="sm:ml-14 sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/*Mobile Menu*/}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="h-full flex flex-col gap-6 text-lg font-medium">
              <NavLogo isLarge={true} />
              {navItems.map((navItem) => (
                <NavItem
                  key={navItem.url}
                  isExpanded={true}
                  url={navItem.url}
                  title={navItem.title}
                  Icon={navItem.Icon}
                  posBottom={navItem.posBottom}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <User2 className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button onClick={handleSignOut} className="w-full">
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {authStatus ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <User2 className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <button onClick={handleSignOut} className="w-full">
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </header>
    </>
  );
}

const NavLogo = ({ isLarge }: NavLogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "group flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base",
        isLarge ? "h-10 w-10" : "h-9 w-9 md:h-8 md:w-8",
      )}
    >
      <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
      <span className="sr-only">Acme Inc</span>
    </Link>
  );
};

const NavItem = ({ url, title, Icon, isExpanded, posBottom }: NavItemProps) => {
  const { isActive } = useActivePath(url);

  if (isExpanded) {
    return (
      <Link
        href={url}
        className={cn(
          "flex items-center gap-4 px-2.5",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          posBottom ? "mt-auto" : "",
        )}
      >
        <Icon className="h-5 w-5" />
        {title}
      </Link>
    );
  } else {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={url}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
              isActive ? "bg-accent text-accent-foreground" : " text-muted-foreground",
              posBottom ? "mt-auto" : "",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    );
  }
};

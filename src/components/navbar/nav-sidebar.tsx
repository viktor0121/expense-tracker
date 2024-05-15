import React from "react";
import Link from "next/link";
import NavLogo from "@/components/navbar/nav-logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useActivePath from "@/hooks/useActivePath";
import { cn } from "@/lib/utils";
import { INavItem } from "@/lib/types";

interface SidebarProps {
  navItems: INavItem[];
}

const NavItem = ({ url, title, Icon, posBottom }: INavItem) => {
  const isActive = useActivePath(url);

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
};

export default function NavSidebar({ navItems }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col h-full items-center gap-4 px-2 sm:py-5">
        <NavLogo />

        {navItems.map((navItem) => (
          <NavItem
            key={navItem.url}
            url={navItem.url}
            title={navItem.title}
            Icon={navItem.Icon}
            posBottom={navItem.posBottom}
          />
        ))}
      </nav>
    </aside>
  );
}

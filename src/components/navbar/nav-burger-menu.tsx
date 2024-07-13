import React, { useState } from "react";
import Link from "next/link";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useActivePath } from "@/hooks/useActivePath";
import { INavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NavLogo } from "./nav-logo";

interface MobileNavProps {
  navItems: INavItem[];
  className?: string;
}

const NavItem = ({ url, title, Icon }: INavItem) => {
  const { isActive } = useActivePath(url);
  return (
    <Link
      href={url}
      className={cn(
        "flex items-center gap-4 px-2.5",
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-5 w-5" />
      {title}
    </Link>
  );
};

export function NavBurgerMenu({ navItems, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="flex h-full flex-col gap-6 text-lg font-medium">
            <NavLogo />

            {navItems.map((navItem) => (
              <div key={navItem.url} onClick={() => setOpen(false)} className={cn(navItem.posBottom ? "mt-auto" : "")}>
                <NavItem {...navItem} />
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

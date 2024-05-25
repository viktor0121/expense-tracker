import React from "react";
import Link from "next/link";
import { LucideProps, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavLogo from "@/components/navbar/nav-logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useActivePath from "@/hooks/useActivePath";
import { cn } from "@/lib/utils";
import { INavItem } from "@/lib/types";

interface MobileNavProps {
  navItems: INavItem[];
  className?: string;
}

const NavItem = ({ url, title, Icon, posBottom }: INavItem) => {
  const { isActive } = useActivePath(url);
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
};

export default function NavBurgerMenu({ navItems, className }: MobileNavProps) {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
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
                url={navItem.url}
                title={navItem.title}
                Icon={navItem.Icon}
                posBottom={navItem.posBottom}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

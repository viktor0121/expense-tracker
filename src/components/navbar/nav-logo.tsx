import React from "react";
import Link from "next/link";
import { Package2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLogoProps {
  isLarge?: boolean;
  className?: string;
}

export default function NavLogo({ isLarge, className }: NavLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base",
        isLarge ? "h-10 w-10" : "h-9 w-9 md:h-8 md:w-8",
        className,
      )}
    >
      <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
      <span className="sr-only">Expense Tracker</span>
    </Link>
  );
}

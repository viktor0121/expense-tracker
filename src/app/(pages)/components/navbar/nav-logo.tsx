import React from "react";
import Link from "next/link";
import { Package2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLogoProps {
  className?: string;
}

export default function NavLogo({ className }: NavLogoProps) {
  return (
    <Link
      href="/public"
      className={cn(
        "group flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base h-10 w-10",
        className,
      )}
    >
      <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
      <span className="sr-only">Expense Tracker</span>
    </Link>
  );
}

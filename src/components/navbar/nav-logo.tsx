import React from "react";
import Link from "next/link";
import { DollarSignIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLogoProps {
  className?: string;
}

export function NavLogo({ className }: NavLogoProps) {
  return (
    <Link
      href="/public"
      className={cn(
        "group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base",
        className,
      )}
    >
      <DollarSignIcon className="size-[60%] transition-all group-hover:scale-110" />
      <span className="sr-only">Expense Tracker</span>
    </Link>
  );
}

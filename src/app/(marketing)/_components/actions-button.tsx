"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/store/useAuth";
import { EAuthTabs } from "@/lib/enums";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  containerClasses?: string;
}

export function ActionButtons({ containerClasses }: ActionButtonProps) {
  const { authStatus, isAuthLoading } = useAuth();

  return (
    <div className={cn("flex", containerClasses)}>
      {isAuthLoading ? (
        <>
          <Skeleton className="h-10 w-52" />
        </>
      ) : authStatus ? (
        <Link href="/dashboard" className="relative p-[3px]">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-cyan-500 to-indigo-500" />
          <div className="group relative rounded-[6px] bg-background px-6 py-2 font-bold text-primary transition duration-200 hover:bg-transparent">
            Go To Dashboard
          </div>
        </Link>
      ) : (
        <div className="flex space-x-2">
          <Button asChild>
            <Link href={`/auth?tab=${EAuthTabs.Login}`}>Sign In</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href={`/auth?tab=${EAuthTabs.Register}`}>Create an account</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

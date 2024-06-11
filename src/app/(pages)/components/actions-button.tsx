"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import useAuthContext from "@/context/auth/useAuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { EAuthTabs } from "@/lib/enums";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  containerClasses?: string;
}

export default function ActionButtons({ containerClasses }: ActionButtonProps) {
  const { authStatus, isAuthLoading } = useAuthContext();

  return (
    <div className={cn("flex", containerClasses)}>
      {isAuthLoading ? (
        <>
          <Skeleton className="h-10 w-52" />
        </>
      ) : authStatus ? (
        <Link href="/dashboard" className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-indigo-500 rounded-lg" />
          <div className="font-bold px-6 py-2 bg-background rounded-[6px] relative group transition duration-200 text-primary hover:bg-transparent">
            Go To Dashboard
          </div>
        </Link>
      ) : (
        <div className="space-x-2 flex">
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

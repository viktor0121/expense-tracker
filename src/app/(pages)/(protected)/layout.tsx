"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/auth/useAuth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { authStatus } = useAuth();

  if (!authStatus) {
    router.replace("/auth");
    return <></>;
  }

  return children;
}

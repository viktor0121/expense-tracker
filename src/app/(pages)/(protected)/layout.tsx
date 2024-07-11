"use client";

import React from "react";
import { Redirect } from "@/components/redirect";
import useAuthContext from "@/context/auth/useAuthContext";
import { LoadingScreen } from "@/app/(pages)/(protected)/components/loading-screen";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { authStatus, isAuthLoading } = useAuthContext();
  return isAuthLoading ? (
    <LoadingScreen />
  ) : authStatus ? (
    <div className="pt-3 sm:pt-6">{children}</div>
  ) : (
    <Redirect pathname="/auth" />
  );
}

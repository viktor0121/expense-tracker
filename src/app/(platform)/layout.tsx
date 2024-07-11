"use client";

import React from "react";
import { Redirect } from "@/components/redirect";
import { LoadingScreen } from "./_components/loading-screen";
import { useAuth } from "@/store/useAuth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { authStatus, isAuthLoading } = useAuth();
  return isAuthLoading ? (
    <LoadingScreen />
  ) : authStatus ? (
    <div className="pt-3 sm:pt-6">{children}</div>
  ) : (
    <Redirect pathname="/auth" />
  );
}

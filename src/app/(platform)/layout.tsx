"use client";

import React from "react";
import { Redirect } from "@/components/redirect";
import { useAuth } from "@/store/useAuth";
import { LoadingScreen } from "./_components/loading-screen";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { authStatus, isAuthLoading } = useAuth();
  return isAuthLoading ? <LoadingScreen /> : authStatus ? children : <Redirect pathname="/auth" />;
}

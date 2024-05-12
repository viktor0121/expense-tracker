"use client";

import React from "react";
import useAuth from "@/context/auth/useAuth";
import RedirectToAuth from "@/components/redirect-to-auth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuth();
  if (!authStatus) return <RedirectToAuth />;
  return children;
}

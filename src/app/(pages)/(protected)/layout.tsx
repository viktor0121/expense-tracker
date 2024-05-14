"use client";

import React from "react";
import useAuth from "@/context/auth/useAuth";
import Redirect from "@/components/redirect";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuth();
  if (!authStatus) return <Redirect pathname="/auth" />;
  return children;
}

"use client";

import React from "react";
import Redirect from "@/components/redirect";
import useAuth from "@/context/auth/useAuth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuth();
  return authStatus ? children : <Redirect pathname="/auth" />;
}

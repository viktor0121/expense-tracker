"use client";

import React from "react";
import Redirect from "@/components/redirect";
import useAuthContext from "@/context/auth/useAuthContext";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuthContext();
  return authStatus ? children : <Redirect pathname="/auth" />;
}

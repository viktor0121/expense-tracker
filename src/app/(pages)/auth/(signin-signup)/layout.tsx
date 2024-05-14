"use client";

import React from "react";
import Redirect from "@/components/redirect";
import useAuth from "@/context/auth/useAuth";

export default function SignInSignUpLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { authStatus } = useAuth();
  if (authStatus) return <Redirect pathname="/" />;
  return children;
}

"use client";

import React from "react";
import { Redirect } from "@/components/redirect";
import { useAuth } from "@/store/useAuth";

export default function SignInSignUpLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { authStatus } = useAuth();
  return authStatus ? <Redirect pathname="/dashboard" /> : children;
}

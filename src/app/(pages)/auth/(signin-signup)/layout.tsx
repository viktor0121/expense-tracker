"use client";

import React from "react";
import {Redirect} from "@/components/redirect";
import useAuthContext from "@/context/auth/useAuthContext";

export default function SignInSignUpLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { authStatus } = useAuthContext();
  return authStatus ? <Redirect pathname="/dashboard" /> : children;
}

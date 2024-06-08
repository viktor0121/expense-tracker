"use client";

import React, { useEffect, useState } from "react";
import AuthContext from "@/context/auth/context";
import auth from "@/lib/appwrite/auth";

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Check if the user is logged in on page load
  useEffect(() => {
    setIsAuthLoading(true);
    auth
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setIsAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus, isAuthLoading, setIsAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

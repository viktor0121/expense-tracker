"use client";

import React, { useEffect, useState } from "react";
import AuthContext from "@/context/auth/context";
import useLoadingContext from "@/context/loading/useLoadingContext";
import auth from "@/lib/appwrite/auth";

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const { setIsLoading } = useLoadingContext();

  // Check if the user is logged in on page load
  useEffect(() => {
    auth
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>{children}</AuthContext.Provider>
  );
}

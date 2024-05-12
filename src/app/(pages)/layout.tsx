"use client";

import React, { useEffect, useState } from "react";
import authService from "@/lib/appwrite/auth";
import { AuthProvider } from "@/context/auth/context";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in
    authService
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {/*TODO: Implement a loading spinner  */}
      {isLoading ? <p>Loading...</p> : <div className="">{children}</div>}
    </AuthProvider>
  );
}

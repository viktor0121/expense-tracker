"use client";

import { useEffect } from "react";
import auth from "@/lib/appwrite/auth";
import { useAuth } from "@/store/useAuth";

export function AuthProvider() {
  const { setIsAuthLoading, setAuthStatus } = useAuth();

  // Check if the user is logged in on page load
  useEffect(() => {
    setIsAuthLoading(true);
    auth
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setIsAuthLoading(false));
  }, []);

  return null;
}

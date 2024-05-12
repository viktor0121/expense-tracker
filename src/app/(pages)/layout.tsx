"use client";

import React, { useEffect, useState } from "react";
import { AuthProvider } from "@/context/auth/context";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {/*TODO: Implement a loading spinner  */}
      {isLoading ? <p>Loading...</p> : <div className="">{children}</div>}
    </AuthProvider>
  );
}

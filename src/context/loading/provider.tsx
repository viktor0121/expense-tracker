"use client";

import React, { useState } from "react";
import LoadingContext from "@/context/loading/context";

export default function LoadingProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

"use client";

import React from "react";
import OverlaysContext from "@/context/overlays/context";

export default function OverlaysProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <OverlaysContext.Provider value={{}}>{children}</OverlaysContext.Provider>;
}

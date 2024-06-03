"use client";

import React, { useState } from "react";
import OverlaysContext from "@/context/overlays/context";

export default function OverlaysProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [signOutDialogOpen, setSignOutDialogOpen] = useState<boolean>(false);

  return (
    <OverlaysContext.Provider value={{ signOutDialogOpen, setSignOutDialogOpen }}>
      {children}
    </OverlaysContext.Provider>
  );
}

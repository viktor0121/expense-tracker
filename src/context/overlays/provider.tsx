"use client";

import React, { useState } from "react";
import OverlaysContext from "@/context/overlays/context";
import { EAddSheetTabs } from "@/lib/enums";
import { IAddNewSheetState } from "@/lib/types";

export default function OverlaysProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [signOutDialogOpen, setSignOutDialogOpen] = useState<boolean>(false);
  const [addNewSideSheetOpen, setAddNewSideSheetOpen] = useState<IAddNewSheetState>({
    open: false,
    defaultTab: EAddSheetTabs.Expense,
  });

  return (
    <OverlaysContext.Provider
      value={{
        signOutDialogOpen,
        setSignOutDialogOpen,
        addNewSideSheetOpen,
        setAddNewSideSheetOpen,
      }}
    >
      {children}
    </OverlaysContext.Provider>
  );
}

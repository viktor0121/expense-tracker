"use client";

import React, { useState } from "react";
import OverlaysContext from "@/context/overlays/context";
import { EAddSheetTabs } from "@/lib/enums";
import { IAddNewSheetState } from "@/lib/types";

export default function OverlaysProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [signOutDialog, setSignOutDialog] = useState<boolean>(false);
  const [addNewSideSheet, setAddNewSideSheet] = useState<IAddNewSheetState>({
    open: false,
    defaultTab: EAddSheetTabs.Expense,
  });

  return (
    <OverlaysContext.Provider
      value={{
        signOutDialog: signOutDialog,
        setSignOutDialog: setSignOutDialog,
        addNewSideSheet: addNewSideSheet,
        setAddNewSideSheet: setAddNewSideSheet,
      }}
    >
      {children}
    </OverlaysContext.Provider>
  );
}

"use client";

import React, { useState } from "react";
import OverlaysContext from "@/context/overlays/context";
import { EAddSheetTabs } from "@/lib/enums";
import { IAddNewSheetState, IDeleteRecordDialogState } from "@/lib/types";

export default function OverlaysProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [signOutDialog, setSignOutDialog] = useState<boolean>(false);
  const [addNewSideSheet, setAddNewSideSheet] = useState<IAddNewSheetState>({
    open: false,
    defaultTab: EAddSheetTabs.Expense,
  });
  const [deleteRecordDialog, setDeleteRecordDialog] = useState<IDeleteRecordDialogState>({
    open: false,
  });

  return (
    <OverlaysContext.Provider
      value={{
        signOutDialog,
        setSignOutDialog,
        addNewSideSheet,
        setAddNewSideSheet,
        deleteRecordDialog,
        setDeleteRecordDialog,
      }}
    >
      {children}
    </OverlaysContext.Provider>
  );
}

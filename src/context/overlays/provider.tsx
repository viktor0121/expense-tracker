"use client";

import React, { useState } from "react";
import OverlaysContext from "@/context/overlays/context";
import { EAddSheetTabs } from "@/lib/enums";
import { IAddNewSheetState, IRecordDialogState } from "@/lib/types";

export default function OverlaysProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [addNewSideSheet, setAddNewSideSheet] = useState<IAddNewSheetState>({
    open: false,
    defaultTab: EAddSheetTabs.Expense,
  });
  const [deleteRecordDialog, setDeleteRecordDialog] = useState<IRecordDialogState>({
    open: false,
  });
  const [updateRecordDialog, setUpdateRecordDialog] = useState<IRecordDialogState>({
    open: false,
  });

  return (
    <OverlaysContext.Provider
      value={{
        addNewSideSheet,
        setAddNewSideSheet,

        deleteRecordDialog,
        setDeleteRecordDialog,

        updateRecordDialog,
        setUpdateRecordDialog,
      }}
    >
      {children}
    </OverlaysContext.Provider>
  );
}

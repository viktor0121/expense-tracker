"use client";

import React, { useState } from "react";
import OverlaysContext from "@/context/overlays/context";
import { EAddSheetTabs } from "@/lib/enums";
import { IAddNewSheetState, IRecordDialogState } from "@/lib/types";

export default function OverlaysProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [updateRecordDialog, setUpdateRecordDialog] = useState<IRecordDialogState>({
    open: false,
  });

  return (
    <OverlaysContext.Provider
      value={{

        updateRecordDialog,
        setUpdateRecordDialog,
      }}
    >
      {children}
    </OverlaysContext.Provider>
  );
}

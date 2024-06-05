import React, { createContext } from "react";
import { IAddNewSheetState, IDeleteRecordDialogState } from "@/lib/types";
import { EAddSheetTabs } from "@/lib/enums";

interface OverlaysContextValues {
  signOutDialog: boolean;
  setSignOutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  addNewSideSheet: IAddNewSheetState;
  setAddNewSideSheet: React.Dispatch<React.SetStateAction<IAddNewSheetState>>;
  deleteRecordDialog: IDeleteRecordDialogState;
  setDeleteRecordDialog: React.Dispatch<React.SetStateAction<IDeleteRecordDialogState>>;
}

const OverlaysContext = createContext<OverlaysContextValues>({
  signOutDialog: false,
  setSignOutDialog: () => {},

  addNewSideSheet: {
    open: false,
    defaultTab: EAddSheetTabs.Expense,
  },
  setAddNewSideSheet: () => {},

  deleteRecordDialog: {
    open: false,
  },
  setDeleteRecordDialog: () => {},
});

export default OverlaysContext;

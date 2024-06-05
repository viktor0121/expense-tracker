import React, { createContext } from "react";
import { IAddNewSheetState, IRecordDialogState } from "@/lib/types";
import { EAddSheetTabs } from "@/lib/enums";

interface OverlaysContextValues {
  signOutDialog: boolean;
  setSignOutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  addNewSideSheet: IAddNewSheetState;
  setAddNewSideSheet: React.Dispatch<React.SetStateAction<IAddNewSheetState>>;
  deleteRecordDialog: IRecordDialogState;
  setDeleteRecordDialog: React.Dispatch<React.SetStateAction<IRecordDialogState>>;
  updateRecordDialog: IRecordDialogState;
  setUpdateRecordDialog: React.Dispatch<React.SetStateAction<IRecordDialogState>>;
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

  updateRecordDialog: {
    open: false,
  },
  setUpdateRecordDialog: () => {},
});

export default OverlaysContext;

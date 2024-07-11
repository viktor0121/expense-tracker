import React, { createContext } from "react";
import { IAddNewSheetState, IRecordDialogState } from "@/lib/types";
import { EAddSheetTabs } from "@/lib/enums";

interface OverlaysContextValues {
  addNewSideSheet: IAddNewSheetState;
  setAddNewSideSheet: React.Dispatch<React.SetStateAction<IAddNewSheetState>>;
  deleteRecordDialog: IRecordDialogState;
  setDeleteRecordDialog: React.Dispatch<React.SetStateAction<IRecordDialogState>>;
  updateRecordDialog: IRecordDialogState;
  setUpdateRecordDialog: React.Dispatch<React.SetStateAction<IRecordDialogState>>;
}

const OverlaysContext = createContext<OverlaysContextValues>({
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

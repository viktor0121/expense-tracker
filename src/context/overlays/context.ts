import React, { createContext } from "react";
import { IAddNewSheetState, IRecordDialogState } from "@/lib/types";
import { EAddSheetTabs } from "@/lib/enums";

interface OverlaysContextValues {
  deleteRecordDialog: IRecordDialogState;
  setDeleteRecordDialog: React.Dispatch<React.SetStateAction<IRecordDialogState>>;
  updateRecordDialog: IRecordDialogState;
  setUpdateRecordDialog: React.Dispatch<React.SetStateAction<IRecordDialogState>>;
}

const OverlaysContext = createContext<OverlaysContextValues>({
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

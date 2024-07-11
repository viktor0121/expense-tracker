import React, { createContext } from "react";
import { IAddNewSheetState, IRecordDialogState } from "@/lib/types";
import { EAddSheetTabs } from "@/lib/enums";

interface OverlaysContextValues {
  updateRecordDialog: IRecordDialogState;
  setUpdateRecordDialog: React.Dispatch<React.SetStateAction<IRecordDialogState>>;
}

const OverlaysContext = createContext<OverlaysContextValues>({
  updateRecordDialog: {
    open: false,
  },
  setUpdateRecordDialog: () => {},
});

export default OverlaysContext;

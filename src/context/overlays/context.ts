import React, { createContext } from "react";
import { IAddNewSheetState } from "@/lib/types";
import { EAddSheetTabs } from "@/lib/enums";

interface OverlaysContextValues {
  signOutDialog: boolean;
  setSignOutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  addNewSideSheet: IAddNewSheetState;
  setAddNewSideSheet: React.Dispatch<React.SetStateAction<IAddNewSheetState>>;
}

const OverlaysContext = createContext<OverlaysContextValues>({
  signOutDialog: false,
  setSignOutDialog: () => {},
  addNewSideSheet: {
    open: false,
    defaultTab: EAddSheetTabs.Expense,
  },
  setAddNewSideSheet: () => {},
});

export default OverlaysContext;

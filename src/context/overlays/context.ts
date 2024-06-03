import React, { createContext } from "react";
import { IAddNewSheetState } from "@/lib/types";
import { EAddSheetTabs } from "@/lib/enums";

interface OverlaysContextValues {
  signOutDialogOpen: boolean;
  setSignOutDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNewSideSheetOpen: IAddNewSheetState;
  setAddNewSideSheetOpen: React.Dispatch<React.SetStateAction<IAddNewSheetState>>;
}

const OverlaysContext = createContext<OverlaysContextValues>({
  signOutDialogOpen: false,
  setSignOutDialogOpen: () => {},
  addNewSideSheetOpen: {
    open: false,
    defaultTab: EAddSheetTabs.Expense,
  },
  setAddNewSideSheetOpen: () => {},
});

export default OverlaysContext;

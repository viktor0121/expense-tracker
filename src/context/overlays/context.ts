import React, { createContext } from "react";
import { IExpense } from "@/lib/types";

interface OverlaysContextValues {
  signOutDialogOpen: boolean;
  setSignOutDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverlaysContext = createContext<OverlaysContextValues>({
  signOutDialogOpen: false,
  setSignOutDialogOpen: () => {},
});

export default OverlaysContext;

import { create } from "zustand";
import { EAddSheetTabs } from "@/lib/enums";

interface AddNewRecordSheetStore {
  isOpen: boolean;
  tab: EAddSheetTabs;
  openExpense: () => void;
  openEarning: () => void;
  close: () => void;
}

export const useCreateRecordSheet = create<AddNewRecordSheetStore>((set) => ({
  isOpen: false,
  tab: EAddSheetTabs.Expense,
  openExpense: () => set({ tab: EAddSheetTabs.Expense, isOpen: true }),
  openEarning: () => set({ tab: EAddSheetTabs.Earning, isOpen: true }),
  close: () => set({ isOpen: false }),
}));

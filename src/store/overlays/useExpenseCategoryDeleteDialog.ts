import { create } from "zustand";
import { IExpenseCategory } from "@/lib/types";

interface ExpenseCategoryDeleteDialog {
  isOpen: boolean;
  category: IExpenseCategory | null;
  open: (category: IExpenseCategory) => void;
  close: () => void;
}

export const useExpenseCategoryDeleteDialog = create<ExpenseCategoryDeleteDialog>((set) => ({
  isOpen: false,
  category: null,
  open: (category) => set({ isOpen: true, category }),
  close: () => set({ isOpen: false, category: null }),
}));

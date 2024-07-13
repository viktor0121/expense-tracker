import { create } from "zustand";

interface ExpenseCategoryCreateDialog {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useExpenseCategoryCreateDialog = create<ExpenseCategoryCreateDialog>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

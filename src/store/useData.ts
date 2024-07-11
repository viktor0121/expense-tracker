import { create } from "zustand";
import { IEarning, IExpense, IExpenseCategory } from "@/lib/types";

interface DataStore {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
  earnings: IEarning[];
  setEarnings: (earnings: IEarning[]) => void;
  expenseCategories: IExpenseCategory[];
  setExpenseCategories: (expenseCategories: IExpenseCategory[]) => void;
}

export const useData = create<DataStore>((set) => ({
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),
  earnings: [],
  setEarnings: (earnings) => set({ earnings }),
  expenseCategories: [],
  setExpenseCategories: (expenseCategories) => set({ expenseCategories }),
}));

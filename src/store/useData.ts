import { create } from "zustand";
import { IEarning, IExpense, IExpenseCategory } from "@/lib/types";

interface DataStore {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => (expenses: IExpense[]) => void;
  earnings: IEarning[];
  setEarnings: (earnings: IEarning[]) => (earnings: IEarning[]) => void;
  expenseCategories: IExpenseCategory[];
  setExpenseCategories: (expenseCategories: IExpenseCategory[]) => (expenseCategories: IExpenseCategory[]) => void;
}

export const useData = create<DataStore>((set) => ({
  expenses: [],
  setExpenses: (expenses) => (expenses) => set({ expenses }),
  earnings: [],
  setEarnings: (earnings) => (earnings) => set({ earnings }),
  expenseCategories: [],
  setExpenseCategories: (expenseCategories) => (expenseCategories) => set({ expenseCategories }),
}));

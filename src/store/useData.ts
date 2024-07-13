import { create } from "zustand";
import { IEarning, IExpense, IExpenseCategory, IGoal, IGoalList } from "@/lib/types";

interface DataStore {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
  earnings: IEarning[];
  setEarnings: (earnings: IEarning[]) => void;
  expenseCategories: IExpenseCategory[];
  setExpenseCategories: (expenseCategories: IExpenseCategory[]) => void;
  goals: IGoal[];
  setGoals: (goals: IGoal[]) => void;
  goalLists: IGoalList[];
  setGoalLists: (goalLists: IGoalList[]) => void;
}

export const useData = create<DataStore>((set) => ({
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),
  earnings: [],
  setEarnings: (earnings) => set({ earnings }),
  expenseCategories: [],
  setExpenseCategories: (expenseCategories) => set({ expenseCategories }),
  goals: [],
  setGoals: (goals) => set({ goals }),
  goalLists: [],
  setGoalLists: (goalLists) => set({ goalLists }),
}));

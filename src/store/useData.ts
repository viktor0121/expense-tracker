import { create } from "zustand";
import { IEarning, IExpense, IExpenseCategory, IGoal, IGoalList } from "@/lib/types";

interface DataStore {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
  earnings: IEarning[];
  setEarnings: (earnings: IEarning[]) => void;
  expenseCategories: IExpenseCategory[];
  setExpenseCategories: (expenseCategories: IExpenseCategory[]) => void;
  finishedGoals: IGoal[];
  setFinishedGoals: (finishedGoals: IGoal[]) => void;
  unfinishedGoals: IGoal[];
  setUnfinishedGoals: (unfinishedGoals: IGoal[]) => void;
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
  finishedGoals: [],
  setFinishedGoals: (finishedGoals) => set({ finishedGoals }),
  unfinishedGoals: [],
  setUnfinishedGoals: (unfinishedGoals) => set({ unfinishedGoals }),
  goalLists: [],
  setGoalLists: (goalLists) => set({ goalLists }),
}));

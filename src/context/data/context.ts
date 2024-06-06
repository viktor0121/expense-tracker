import React, { createContext } from "react";
import { ICurrency, IExpense, IExpenseCategory, IIncome, IOverallStats } from "@/lib/types";

interface DataContextValues {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  savings: IIncome[];
  setSavings: React.Dispatch<React.SetStateAction<IIncome[]>>;
  expenseCategories: IExpenseCategory[];
  setExpenseCategories: React.Dispatch<React.SetStateAction<IExpenseCategory[]>>;
  overAllStats: IOverallStats;
  setOverAllStats: React.Dispatch<React.SetStateAction<IOverallStats>>;
}

const DataContext = createContext<DataContextValues>({
  expenses: [],
  setExpenses: () => {},

  savings: [],
  setSavings: () => {},

  expenseCategories: [],
  setExpenseCategories: () => {},

  overAllStats: {
    totalSavings: 0,
    totalIncome: 0,
    totalNeeds: 0,
    totalWants: 0,
  },
  setOverAllStats: () => {},
});

export default DataContext;

import React, { createContext } from "react";
import { IExpense, IExpenseCategory, IIncome } from "@/lib/types";

interface DataContextValues {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  savings: IIncome[];
  setSavings: React.Dispatch<React.SetStateAction<IIncome[]>>;
  expenseCategories: IExpenseCategory[];
  setExpenseCategories: React.Dispatch<React.SetStateAction<IExpenseCategory[]>>;
}

const DataContext = createContext<DataContextValues>({
  expenses: [],
  setExpenses: () => {},
  savings: [],
  setSavings: () => {},
  expenseCategories: [],
  setExpenseCategories: () => {},
});

export default DataContext;

import React, { createContext } from "react";
import { ICurrency, IExpense, IExpenseCategory, IIncome } from "@/lib/types";

interface DataContextValues {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  savings: IIncome[];
  setSavings: React.Dispatch<React.SetStateAction<IIncome[]>>;
  expenseCategories: IExpenseCategory[];
  setExpenseCategories: React.Dispatch<React.SetStateAction<IExpenseCategory[]>>;
  currency: ICurrency;
  setCurrency: React.Dispatch<React.SetStateAction<ICurrency>>;
}

const DataContext = createContext<DataContextValues>({
  expenses: [],
  setExpenses: () => {},
  savings: [],
  setSavings: () => {},
  expenseCategories: [],
  setExpenseCategories: () => {},
  currency: {} as ICurrency,
  setCurrency: () => {},
});

export default DataContext;

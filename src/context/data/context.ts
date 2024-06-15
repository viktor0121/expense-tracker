import React, { createContext } from "react";
import { IExpense, IExpenseCategory, IEarning } from "@/lib/types";

interface DataContextValues {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  earnings: IEarning[];
  setEarnings: React.Dispatch<React.SetStateAction<IEarning[]>>;
  expenseCategories: IExpenseCategory[];
  setExpenseCategories: React.Dispatch<React.SetStateAction<IExpenseCategory[]>>;
}

const DataContext = createContext<DataContextValues>({
  expenses: [],
  setExpenses: () => {},

  earnings: [],
  setEarnings: () => {},

  expenseCategories: [],
  setExpenseCategories: () => {},
});

export default DataContext;

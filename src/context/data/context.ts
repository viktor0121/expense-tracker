import React, { createContext } from "react";
import { IExpense, IExpenseCategory, IEarnings } from "@/lib/types";

interface DataContextValues {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  earnings: IEarnings[];
  setEarnings: React.Dispatch<React.SetStateAction<IEarnings[]>>;
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

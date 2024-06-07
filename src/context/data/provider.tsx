"use client";

import React, { useState } from "react";
import DataContext from "@/context/data/context";
import { IExpense, IExpenseCategory, IIncome, IOverallStats } from "@/lib/types";

export default function DataProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [savings, setSavings] = useState<IIncome[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<IExpenseCategory[]>([]);

  return (
    <DataContext.Provider
      value={{
        savings,
        setSavings,
        expenses,
        setExpenses,
        expenseCategories,
        setExpenseCategories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

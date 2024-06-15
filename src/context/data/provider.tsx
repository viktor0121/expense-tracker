"use client";

import React, { useState } from "react";
import DataContext from "@/context/data/context";
import { IExpense, IExpenseCategory, IEarning, IOverallStats } from "@/lib/types";

export default function DataProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [earnings, setEarnings] = useState<IEarning[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<IExpenseCategory[]>([]);

  return (
    <DataContext.Provider
      value={{
        earnings,
        setEarnings,
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

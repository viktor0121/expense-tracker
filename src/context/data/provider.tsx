"use client";

import React, { useState } from "react";
import DataContext from "@/context/data/context";
import { IExpense, IExpenseCategory, IIncome, IOverallStats } from "@/lib/types";

export default function DataProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [savings, setSavings] = useState<IIncome[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<IExpenseCategory[]>([]);
  const [overAllStats, setOverAllStats] = useState<IOverallStats>({
    totalSavings: 0,
    totalIncome: 0,
    totalNeeds: 0,
    totalWants: 0,
  });

  return (
    <DataContext.Provider
      value={{
        savings,
        setSavings,
        expenses,
        setExpenses,
        expenseCategories,
        setExpenseCategories,
        overAllStats,
        setOverAllStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

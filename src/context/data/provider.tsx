"use client";

import React, { useEffect, useState } from "react";
import DataContext from "@/context/data/context";
import { ICurrency, IExpense, IExpenseCategory, IIncome } from "@/lib/types";
import locale from "@/lib/appwrite/locale";

const initialCurrency: ICurrency = {
  symbol: "$",
  name: "US Dollar",
  symbolNative: "$",
  decimalDigits: 2,
  rounding: 0,
  code: "USD",
  namePlural: "US dollars",
};

export default function DataProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [currency, setCurrency] = useState<ICurrency>(initialCurrency);
  const [savings, setSavings] = useState<IIncome[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<IExpenseCategory[]>([]);

  useEffect(() => {
    (async function () {
      // Check if currency is stored in local storage
      const storedCurrency = localStorage.getItem("currency");
      if (storedCurrency) {
        setCurrency(JSON.parse(storedCurrency));
        return;
      }

      try {
        // Fetch currency from locale service
        const currency = await locale.getLocalCurrency();
        if (!currency) return;

        // Store fetched currency in local storage
        localStorage.setItem("currency", JSON.stringify(currency));
        setCurrency(currency);
      } catch (error: any) {}
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{
        savings,
        setSavings,
        expenses,
        setExpenses,
        expenseCategories,
        setExpenseCategories,
        currency,
        setCurrency,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

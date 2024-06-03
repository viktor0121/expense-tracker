"use client";

import React, { useEffect, useState } from "react";
import CurrencyContext from "@/context/currency/context";
import locale from "@/lib/appwrite/locale";
import { ICurrency } from "@/lib/types";

const initialCurrency: ICurrency = {
  symbol: "$",
  name: "US Dollar",
  symbolNative: "$",
  decimalDigits: 2,
  rounding: 0,
  code: "USD",
  namePlural: "US dollars",
};

export default function CurrencyProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [currency, setCurrency] = useState<ICurrency>(initialCurrency);

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
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

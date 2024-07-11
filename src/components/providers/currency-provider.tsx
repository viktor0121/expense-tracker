"use client";

import React, { useEffect } from "react";
import locale from "@/lib/appwrite/locale";
import { useCurrency } from "@/store/useCurrency";

export function CurrencyProvider() {
  const { setCurrency } = useCurrency();

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

  return null;
}

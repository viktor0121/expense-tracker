import { create } from "zustand";
import { ICurrency } from "@/lib/types";

interface CurrencyStore {
  currency: ICurrency;
  setCurrency: (currency: ICurrency) => void;
}

const initialCurrency: ICurrency = {
  symbol: "$",
  name: "US Dollar",
  symbolNative: "$",
  decimalDigits: 2,
  rounding: 0,
  code: "USD",
  namePlural: "US dollars",
};

export const useCurrency = create<CurrencyStore>((set) => ({
  currency: initialCurrency,
  setCurrency: (currency) => set({ currency }),
}));

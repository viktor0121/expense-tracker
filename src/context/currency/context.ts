import React, { createContext } from "react";
import { ICurrency } from "@/lib/types";

interface CurrencyContextValues {
  currency: ICurrency;
  setCurrency: React.Dispatch<React.SetStateAction<ICurrency>>;
}

const CurrencyContext = createContext<CurrencyContextValues>({
  currency: {} as ICurrency,
  setCurrency: () => {},
});

export default CurrencyContext;

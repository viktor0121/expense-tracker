import { useContext } from "react";
import CurrencyContext from "@/context/currency/context";

const useCurrencyContext = () => useContext(CurrencyContext);
export default useCurrencyContext;

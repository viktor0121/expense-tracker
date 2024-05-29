import { useContext } from "react";
import DataContext from "@/context/data/context";

const useDataContext = () => useContext(DataContext);
export default useDataContext;

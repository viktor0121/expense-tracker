import { useContext } from "react";
import LoadingContext from "@/context/loading/context";

const useLoadingContext = () => useContext(LoadingContext);
export default useLoadingContext;

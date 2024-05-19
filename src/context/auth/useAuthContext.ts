import { useContext } from "react";
import AuthContext from "./context";

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;

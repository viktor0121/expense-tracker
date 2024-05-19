import { useContext } from "react";
import NavTrailContext from "@/context/nav-trail/context";

const useNavTrailContext = () => useContext(NavTrailContext);
export default useNavTrailContext;

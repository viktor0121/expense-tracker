import { useContext } from "react";
import { NavTrailContext } from "@/context/nav-trail/context";

const useNavTrail = () => useContext(NavTrailContext);
export default useNavTrail;

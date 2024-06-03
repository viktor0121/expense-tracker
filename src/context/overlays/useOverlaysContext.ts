import { useContext } from "react";
import OverlaysContext from "@/context/overlays/context";

const useOverlaysContext = () => useContext(OverlaysContext);
export default useOverlaysContext;

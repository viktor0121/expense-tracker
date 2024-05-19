import { createContext } from "react";
import { INavTrail } from "@/lib/types";

interface NavTrailContextValues {
  navTrails: INavTrail[];
  setNavTrails: (navTrail: INavTrail[]) => void;
}

const NavTrailContext = createContext<NavTrailContextValues>({
  navTrails: [],
  setNavTrails: () => {},
});

export default NavTrailContext;

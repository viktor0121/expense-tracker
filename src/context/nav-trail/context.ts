import { createContext } from "react";
import { INavTrail } from "@/lib/types";

interface NavTrailContextValues {
  navTrails: INavTrail[];
  setNavTrails: (navTrail: INavTrail[]) => void;
}

export const NavTrailContext = createContext<NavTrailContextValues>({
  navTrails: [],
  setNavTrails: () => {},
});

export const NavTrailProvider = NavTrailContext.Provider;

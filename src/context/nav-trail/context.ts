import { createContext } from "react";
import { NavTrail } from "@/lib/types";

interface NavTrailContextValues {
  navTrails: NavTrail[];
  setNavTrails: (navTrail: NavTrail[]) => void;
}

export const NavTrailContext = createContext<NavTrailContextValues>({
  navTrails: [],
  setNavTrails: () => {},
});

export const NavTrailProvider = NavTrailContext.Provider;

"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavTrailContext from "@/context/nav-trail/context";
import { INavTrail } from "@/lib/types";
import { trails } from "@/lib/constants";

export default function NavTrailProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [navTrails, setNavTrails] = useState<INavTrail[]>([]);

  // Set the nav trails based on the current pathname
  useEffect(() => {
    const trail = trails[pathname];
    if (!trail) console.log("No trail found: ", pathname);
    setNavTrails(trail || []);
  }, [pathname]);

  return (
    <NavTrailContext.Provider value={{ navTrails, setNavTrails }}>
      {children}
    </NavTrailContext.Provider>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import NavTrailContext from "@/context/nav-trail/context";
import { INavTrail } from "@/lib/types";
import { trails } from "@/lib/constants";

export default function NavTrailProvider({
  children,
  searchParams,
}: Readonly<{ children: React.ReactNode; searchParams: ReadonlyURLSearchParams }>) {
  const pathname = usePathname();
  const [navTrails, setNavTrails] = useState<INavTrail[]>([]);

  // Set the nav trails based on the current pathname
  useEffect(() => {
    const tabParam = searchParams.get("tab");

    let trail = trails[pathname] || [];
    if (!trail) console.log("No trail found: ", pathname);
    if (tabParam) trail = [...trail, { title: tabParam, href: "" }] as INavTrail[];

    setNavTrails(trail);
  }, [pathname, searchParams]);

  return (
    <NavTrailContext.Provider value={{ navTrails, setNavTrails }}>
      {children}
    </NavTrailContext.Provider>
  );
}

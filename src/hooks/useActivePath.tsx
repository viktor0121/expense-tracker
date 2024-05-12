"use client";

import { usePathname } from "next/navigation";

interface UseActivePath {
  isActive: boolean;
}

export default function useActivePath(path: string): UseActivePath {
  const pathname = usePathname();
  if (path === "/" && pathname !== path) return { isActive: false };
  return { isActive: pathname.startsWith(path) };
}

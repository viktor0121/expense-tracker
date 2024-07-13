import React from "react";
import { BgGridContainer } from "@/components/bg-grid-container";

export default function GoalsLayout({ children }: { children: React.ReactNode }) {
  return (
    <BgGridContainer className="h-screen">
      <div className="px-2 pt-4 sm:px-4 sm:pt-6 md:pt-12">{children}</div>
    </BgGridContainer>
  );
}

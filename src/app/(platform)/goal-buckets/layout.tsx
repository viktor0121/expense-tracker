import React from "react";
import { BgGridContainer } from "@/components/bg-grid-container";

export default function GoalsLayout({ children }: { children: React.ReactNode }) {
  return (
    <BgGridContainer className="h-screen">
      <main className="relative mx-auto max-w-screen-2xl px-2 pt-4 sm:px-4 sm:pt-6">{children}</main>
    </BgGridContainer>
  );
}

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

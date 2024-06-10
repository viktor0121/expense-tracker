import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "AdisMoney - Dashboard",
  description: "See your expenditure overview. Manage savings, expenses and goals.",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

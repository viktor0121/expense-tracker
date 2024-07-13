import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "See your expenditure overview. Manage earnings, expenses and goals.",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="px-3 pt-3 sm:px-6 sm:pt-6">{children}</main>;
}

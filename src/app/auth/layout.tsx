import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Login/Register to AdisMoney",
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="mx-auto mt-16 w-full max-w-[500px] px-4 sm:px-6">{children}</main>;
}

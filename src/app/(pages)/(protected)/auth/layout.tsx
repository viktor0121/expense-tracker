import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdisMoney - Reset Password",
  description: "Reset your password on AdisMoney",
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="max-w-[500px] px-4 sm:px-6 mt-16 mx-auto">{children}</div>;
}

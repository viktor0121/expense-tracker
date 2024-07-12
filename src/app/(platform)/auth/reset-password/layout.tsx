import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdisMoney - Reset Password",
  description: "Reset your password on AdisMoney",
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="mx-auto mt-16 w-full max-w-[500px]">{children}</main>;
}

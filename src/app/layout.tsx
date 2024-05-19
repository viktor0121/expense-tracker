import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/auth/provider";
import NavTrailProvider from "@/context/nav-trail/provider";
import ThemeProvider from "@/context/theme/provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CoinTrack",
  description: "Web app to keep your expense track",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        {children}
          <AuthProvider>
            <NavTrailProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </NavTrailProvider>
          </AuthProvider>
      </body>
    </html>
  );
}

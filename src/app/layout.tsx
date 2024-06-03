import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavTrailProvider from "@/context/nav-trail/provider";
import CurrencyProvider from "@/context/currency/provider";
import LoadingProvider from "@/context/loading/provider";
import ThemeProvider from "@/context/theme/provider";
import AuthProvider from "@/context/auth/provider";
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
        <LoadingProvider>
          <AuthProvider>
            <NavTrailProvider>
              <ThemeProvider>
                <CurrencyProvider>{children}</CurrencyProvider>
              </ThemeProvider>
            </NavTrailProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}

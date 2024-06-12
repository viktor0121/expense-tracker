import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import OverlaysProvider from "@/context/overlays/provider";
import CurrencyProvider from "@/context/currency/provider";
import ThemeProvider from "@/context/theme/provider";
import AuthProvider from "@/context/auth/provider";
import DataProvider from "@/context/data/provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "AdisMoney",
  description: "AdisMoney is a personal finance app that helps you track your expenses and income.",
};

export const viewport: Viewport = {
  themeColor: "#141417",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <AuthProvider>
          <OverlaysProvider>
            <ThemeProvider>
              <CurrencyProvider>
                <DataProvider>
                  <TooltipProvider>{children}</TooltipProvider>
                </DataProvider>
              </CurrencyProvider>
            </ThemeProvider>
          </OverlaysProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

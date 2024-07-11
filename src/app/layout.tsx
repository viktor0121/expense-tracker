import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OverlaysProvider } from "@/components/providers/overlays-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import AuthProvider from "@/context/auth/provider";
import CurrencyProvider from "@/context/currency/provider";
import { Navbar } from "./_components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    default: "AdisMoney",
    template: `%s - AdisMoney`,
  },
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
          <ThemeProvider>
            <CurrencyProvider>
              <TooltipProvider>
                <div className="flex min-h-screen w-full flex-col bg-muted/40">
                  <Navbar />
                  <main>{children}</main>
                </div>

                <OverlaysProvider />

                <Toaster />
              </TooltipProvider>
            </CurrencyProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import CurrencyProvider from "@/context/currency/provider";
import ThemeProvider from "@/components/providers/theme-provider";
import AuthProvider from "@/context/auth/provider";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Navbar } from "./_components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { OverlaysProvider } from "@/components/providers/overlays-provider";

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
                <div className="flex flex-col min-h-screen w-full bg-muted/40">
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

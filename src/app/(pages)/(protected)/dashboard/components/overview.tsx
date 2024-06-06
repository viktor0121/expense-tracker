"use client";

import React from "react";
import {
  CreditCardIcon,
  DollarSignIcon,
  HandCoinsIcon,
  LucideIcon,
  WalletIcon,
} from "lucide-react";
import useCurrencyContext from "@/context/currency/useCurrencyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDataContext from "@/context/data/useDataContext";

interface IStatCard {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

export default function Overview() {
  const { currency } = useCurrencyContext();
  const { overAllStats } = useDataContext();

  const statCards: IStatCard[] = [
    {
      title: "Savings",
      value: `${currency.symbolNative}${overAllStats.totalSavings}`,
      icon: WalletIcon,
      description: "Total savings over time",
    },
    {
      title: "Income",
      value: `${currency.symbolNative}${overAllStats.totalIncome}`,
      icon: DollarSignIcon,
      description: "Total income",
    },
    {
      title: "Needs",
      value: `${currency.symbolNative}${overAllStats.totalNeeds}`,
      icon: CreditCardIcon,
      description: "Total amount spend on needs",
    },
    {
      title: "Wants",
      value: `${currency.symbolNative}${overAllStats.totalWants}`,
      icon: HandCoinsIcon,
      description: "Total amount spend on wants",
    },
  ];

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

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
import { ICategoryStats, IOverallStats } from "@/lib/types";

interface IStatCard {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

interface OverviewProps {
  overAllStats: IOverallStats;
  categoryStats: ICategoryStats;
}

export default function Overview({ overAllStats, categoryStats }: OverviewProps) {
  const { currency } = useCurrencyContext();
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
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ title, value, icon: Icon, description }: IStatCard) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

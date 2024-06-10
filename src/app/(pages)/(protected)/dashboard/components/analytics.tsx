"use client";

import React from "react";
import { Query } from "appwrite";
import {
  CreditCardIcon,
  DollarSignIcon,
  HandCoinsIcon,
  LucideIcon,
  WalletIcon,
} from "lucide-react";
import useCurrencyContext from "@/context/currency/useCurrencyContext";
import useAppwriteFetch from "@/hooks/useAppwriteFetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EExpenseType } from "@/lib/enums";
import { ICategoryStats, IExpenseCategory } from "@/lib/types";
import database from "@/lib/appwrite/database";

interface IStatCard {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

interface OverviewProps {}

export default function Analytics({}: OverviewProps) {
  const { currency } = useCurrencyContext();

  const { data, isLoading: isExpenseIncomesLoading } = useAppwriteFetch(async () => {
    return await Promise.all([
      database.getExpenses([Query.select(["type", "amount", "category.*"]), Query.limit(5000)]),
      database.getIncomes([Query.select(["amount"]), Query.limit(5000)]),
    ]);
  });
  const [expenses, incomes] = data || [[], []];

  const totalNeeds: number = expenses
    .filter((expense) => expense.type === EExpenseType.Need)
    .reduce((acc, expense) => acc + expense.amount, 0);
  const totalWants: number = expenses
    .filter((expense) => expense.type === EExpenseType.Want)
    .reduce((acc, expense) => acc + expense.amount, 0);
  const totalIncome: number = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalSavings: number = totalIncome - totalNeeds - totalWants;

  const categoryStats = expenses.reduce((acc: ICategoryStats, expense) => {
    const category = (expense.category as IExpenseCategory).title;
    const amount = expense.amount;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const statCards: IStatCard[] = [
    {
      title: "Savings",
      value: `${currency.symbolNative}${totalSavings}`,
      icon: WalletIcon,
      description: "Total savings over time",
    },
    {
      title: "Income",
      value: `${currency.symbolNative}${totalIncome}`,
      icon: DollarSignIcon,
      description: "Total income",
    },
    {
      title: "Needs",
      value: `${currency.symbolNative}${totalNeeds}`,
      icon: CreditCardIcon,
      description: "Total amount spend on needs",
    },
    {
      title: "Wants",
      value: `${currency.symbolNative}${totalWants}`,
      icon: HandCoinsIcon,
      description: "Total amount spend on wants",
    },
  ];

  return (
    <section>
      <div className="grid gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <StatCard key={index} isLoading={isExpenseIncomesLoading} {...stat} />
        ))}
      </div>
    </section>
  );
}

interface IStatCardProps extends IStatCard {
  isLoading: boolean;
}

function StatCard({ title, value, icon: Icon, description, isLoading }: IStatCardProps) {
  return (
    <Card>
      <CardHeader className="px-4 pt-4 sm:px-5 sm:pt-5 flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
        {isLoading ? (
          <Skeleton className="h-5 sm:h-6 mt-1 mb-1 sm:mb-2 w-1/4" />
        ) : (
          <div className="text-xl sm:text-2xl font-bold">{value}</div>
        )}
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

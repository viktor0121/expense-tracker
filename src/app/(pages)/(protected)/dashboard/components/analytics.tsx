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
import KeyValuePieChart from "@/app/(pages)/(protected)/dashboard/components/charts/key-value-pie-chart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import useCurrencyContext from "@/context/currency/useCurrencyContext";
import useAppwriteFetch from "@/hooks/useAppwriteFetch";
import { EExpenseType } from "@/lib/enums";
import { IExpenseCategory } from "@/lib/types";
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
  const totalEarnings: number = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalSavings: number = totalEarnings - totalNeeds - totalWants;

  const categoryStats = expenses.reduce((acc: Record<string, number>, expense) => {
    const category = (expense.category as IExpenseCategory).title;
    const amount = expense.amount;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});
  const expenseStats = {
    need: totalNeeds,
    want: totalWants,
  };
  const expenseStat = [
    {
      name: "need",
      value: totalNeeds,
    },
    {
      name: "want",
      value: totalWants,
    },
  ];
  const categoryStats = Object.values(
    expenses.reduce((acc: Record<string, { name: string; value: number }>, expense) => {
      const category: string = (expense.category as IExpenseCategory).title;
      const amount: number = expense.amount;

      if (!acc[category]) acc[category] = { name: category, value: 0 };
      acc[category].value += amount;

      return acc;
    }, {}),
  );

  const statCards: IStatCard[] = [
    {
      title: "Savings",
      value: `${currency.symbolNative}${totalSavings}`,
      icon: WalletIcon,
      description: "Total savings ",
    },
    {
      title: "Earnings",
      value: `${currency.symbolNative}${totalEarnings}`,
      icon: DollarSignIcon,
      description: "Total earnings",
    },
    {
      title: "Needs",
      value: `${currency.symbolNative}${totalNeeds}`,
      icon: CreditCardIcon,
      description: "Expense on needs",
    },
    {
      title: "Wants",
      value: `${currency.symbolNative}${totalWants}`,
      icon: HandCoinsIcon,
      description: "Expense on wants",
    },
  ];

  return (
    <>
      <section className="grid gap-3 sm:gap-5">
        <div className="grid gap-2 sm:gap-4 grid-cols-2 md:grid-cols-4">
          {statCards.map((stat, index) => (
            <StatCard key={index} isLoading={isExpenseIncomesLoading} {...stat} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-12 gap-2 sm:gap-4">
        <div className="col-span-12 sm:col-span-6 md:col-span-7 xl:col-span-8"> </div>

        <Tabs
          defaultValue={"category"}
          className="overflow-auto col-span-12 sm:col-span-6 md:col-span-5 xl:col-span-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={"category"} className="capitalize">
              Category
            </TabsTrigger>
            <TabsTrigger value={"expense"} className="capitalize">
              Expense
            </TabsTrigger>
          </TabsList>

          <TabsContent value={"category"}>
            <PieChartCard
              data={categoryStats}
              isLoading={isExpenseIncomesLoading}
              name="Category Stats"
            />
          </TabsContent>
          <TabsContent value={"expense"}>
            <PieChartCard
              data={expenseStats}
              isLoading={isExpenseIncomesLoading}
              name="Expense Stats"
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

interface PieChartCardProps {
  data: Record<string, number>;
  name: string;
  isLoading: boolean;
}

function PieChartCard({ data, name, isLoading }: PieChartCardProps) {
  return (
    <Card className="size-full overflow-auto">
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] grid place-items-center">
            <Skeleton className="rounded-full size-[250px] mx-auto" />
          </div>
        ) : (
          <KeyValuePieChart data={data} />
        )}
      </CardContent>
      <CardFooter className="pt-0 grid place-items-center">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardFooter>
    </Card>
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

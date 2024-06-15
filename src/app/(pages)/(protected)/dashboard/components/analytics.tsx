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
import { IEarnings, IExpense, IExpenseCategory } from "@/lib/types";
import database from "@/lib/appwrite/database";
import XYComparisonBarChart from "@/app/(pages)/(protected)/dashboard/components/charts/x-y-comparison-bar-chart";
import { format } from "date-fns";

enum RightChartTabs {
  Category = "category",
  Expense = "expense",
}

enum LeftChartTabs {
  Expense = "expense",
}

type IFetchedExpense = Pick<IExpense, "type" | " amount" | "date" | "category">;

type IFetchedEarning = Pick<IEarnings, "amount">;

interface IExpenseStat {
  name: "Need" | "Want";
  value: number;
}

interface ICategoryStat {
  name: string;
  value: number;
}

interface IExpenseMonthlyStat {
  name: string;
  values: {
    x: {
      name: "Need";
      value: number;
    };
    y: {
      name: "Want";
      value: number;
    };
  };
}

interface IStatCard {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

interface OverviewProps {}

const initialExpenseMonthlyStats: IExpenseMonthlyStat[] = [
  {
    name: "Jan",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Feb",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Mar",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Apr",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "May",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Jun",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Jul",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Aug",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Sep",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Oct",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Nov",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
  {
    name: "Dec",
    values: {
      x: { name: "Need", value: 0 },
      y: { name: "Want", value: 0 },
    },
  },
];

export default function Analytics({}: OverviewProps) {
  const { currency } = useCurrencyContext();
  const { data, isLoading: isExpenseIncomesLoading } = useAppwriteFetch(async () => {
    return await Promise.all([
      database.getExpenses([
        Query.select(["type", "amount", "category.*", "date"]),
        Query.limit(5000),
      ]),
      database.getIncomes([Query.select(["amount"]), Query.limit(5000)]),
    ]);
  });

  const [expenses, earnings]: [IFetchedExpense[], IFetchedEarning[]] = data || [[], []];

  const totalNeeds: number = expenses
    .filter((expense) => expense.type === EExpenseType.Need)
    .reduce((acc, expense) => acc + expense.amount, 0);
  const totalWants: number = expenses
    .filter((expense) => expense.type === EExpenseType.Want)
    .reduce((acc, expense) => acc + expense.amount, 0);

  const totalEarnings: number = earnings.reduce((acc, income) => acc + income.amount, 0);
  const totalSavings: number = totalEarnings - totalNeeds - totalWants;

  const expenseStats: IExpenseStat[] = [
    {
      name: "Need",
      value: totalNeeds,
    },
    {
      name: "Want",
      value: totalWants,
    },
  ];
  const categoryStats: ICategoryStat[] = Object.values(
    expenses.reduce((acc: Record<string, { name: string; value: number }>, expense) => {
      const category: string = (expense.category as IExpenseCategory).title;
      const amount: number = expense.amount;

      if (!acc[category]) acc[category] = { name: category, value: 0 };
      acc[category].value += amount;

      return acc;
    }, {}),
  );
  const expensesMonthlyStats = expenses.reduce((acc: IExpenseMonthlyStat[], expense) => {
    const month = format(expense.date, "MMM"); // Use date-fns for month name
    const existingStatIndex = acc.findIndex((stat) => stat.name === month);

    if (existingStatIndex !== -1) {
      const updatedStat = {
        ...acc[existingStatIndex], // Create a copy of the existing stat
        values: {
          ...acc[existingStatIndex].values, // Create a copy of the values object
          x: {
            ...acc[existingStatIndex].values.x, // Copy x object
            value:
              expense.type === "need"
                ? acc[existingStatIndex].values.x.value + expense.amount
                : acc[existingStatIndex].values.x.value, // Update x.value
          },
          y: {
            ...acc[existingStatIndex].values.y, // Copy y object
            value:
              expense.type === "want"
                ? acc[existingStatIndex].values.y.value + expense.amount
                : acc[existingStatIndex].values.y.value, // Update y.value
          },
        },
      };

      return [...acc.slice(0, existingStatIndex), updatedStat, ...acc.slice(existingStatIndex + 1)];
    } else {
      return [
        ...acc,
        {
          name: month,
          values: {
            x: { name: "Need", value: expense.type === "need" ? expense.amount : 0 },
            y: { name: "Want", value: expense.type === "want" ? expense.amount : 0 },
          },
        },
      ];
    }
  }, []);

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
        <Tabs
          defaultValue={LeftChartTabs.Expense}
          className="overflow-auto col-span-12 lg:col-span-8 h-full flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={LeftChartTabs.Expense} className="capitalize">
              Expense
            </TabsTrigger>
          </TabsList>

          <TabsContent value={LeftChartTabs.Expense} className="flex-1">
            <CharCard>
              {isExpenseIncomesLoading ? (
                <Skeleton className="size-16" />
              ) : (
                <XYComparisonBarChart data={expensesMonthlyStats} />
              )}
            </CharCard>
          </TabsContent>
        </Tabs>

        <Tabs
          defaultValue={RightChartTabs.Category}
          className="overflow-auto col-span-12 lg:col-span-4 h-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={RightChartTabs.Category} className="capitalize">
              Category
            </TabsTrigger>
            <TabsTrigger value={RightChartTabs.Expense} className="capitalize">
              Expense
            </TabsTrigger>
          </TabsList>

          <TabsContent value={RightChartTabs.Category}>
            <CharCard name="Category Stats">
              {isExpenseIncomesLoading ? (
                <div className="h-[300px] grid place-items-center">
                  <Skeleton className="rounded-full size-[250px] mx-auto" />
                </div>
              ) : (
                <KeyValuePieChart data={categoryStats} />
              )}
            </CharCard>
          </TabsContent>
          <TabsContent value={RightChartTabs.Expense}>
            <CharCard name="Expense Stats">
              {isExpenseIncomesLoading ? (
                <div className="h-[300px] grid place-items-center">
                  <Skeleton className="rounded-full size-[250px] mx-auto" />
                </div>
              ) : (
                <KeyValuePieChart data={expenseStats} />
              )}
            </CharCard>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

interface ChartCardProps {
  name?: string;
  children: React.ReactNode;
}

interface StatCardProps extends IStatCard {
  isLoading: boolean;
}

function CharCard({ name, children }: ChartCardProps) {
  return (
    <Card className="size-full overflow-auto h-full">
      <CardContent className="pt-6 h-full">{children}</CardContent>

      {name ? (
        <CardFooter className="pt-0 grid place-items-center">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        </CardFooter>
      ) : null}
    </Card>
  );
}

function StatCard({ title, value, icon: Icon, description, isLoading }: StatCardProps) {
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

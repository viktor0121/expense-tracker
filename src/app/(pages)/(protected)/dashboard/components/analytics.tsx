"use client";

import React from "react";
import { Query } from "appwrite";
import { format } from "date-fns";
import {
  CreditCardIcon,
  DollarSignIcon,
  HandCoinsIcon,
  LucideIcon,
  WalletIcon,
} from "lucide-react";
import { XYComparisonBarChart } from "@/app/(pages)/(protected)/dashboard/components/charts/x-y-comparison-bar-chart";
import { KeyValuePieChart } from "@/app/(pages)/(protected)/dashboard/components/charts/key-value-pie-chart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import useCurrencyContext from "@/context/currency/useCurrencyContext";
import useAppwriteFetch from "@/hooks/useAppwriteFetch";
import { IEarning, IExpense, IExpenseCategory } from "@/lib/types";
import { EExpenseType } from "@/lib/enums";
import { MONTHS_MMM } from "@/lib/constants";
import database from "@/lib/appwrite/database";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

enum RightChartTabs {
  Category = "category stats",
  Expense = "expense stats",
}

enum LeftChartTabs {
  Expense = "monthly expense",
}

type IFetchedExpense = Pick<IExpense, "type" | "amount" | "date" | "category">;

type IFetchedEarning = Pick<IEarning, "amount">;

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

interface AnalyticsProps {}

const fillExpenseMonthlyStats = (monthlyStat: IExpenseMonthlyStat[]): IExpenseMonthlyStat[] => {
  return MONTHS_MMM.reduce((acc, month) => {
    const existingStat = acc.find((stat) => stat.name === month);

    return [
      ...acc.filter((stat) => stat.name !== month),
      existingStat
        ? existingStat
        : {
            name: month,
            values: {
              x: { name: "Need", value: 0 },
              y: { name: "Want", value: 0 },
            },
          },
    ];
  }, monthlyStat);
};

export function Analytics({}: AnalyticsProps) {
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
  const categoryStats: ICategoryStat[] = expenses.reduce(
    (acc: ICategoryStat[], expense: IFetchedExpense) => {
      const category: string = (expense.category as IExpenseCategory).title;
      const existingStat = acc.find((stat) => stat.name === category);

      return [
        ...acc.filter((stat) => stat.name !== category),
        existingStat
          ? { ...existingStat, value: existingStat.value + expense.amount }
          : { name: category, value: expense.amount },
      ] as ICategoryStat[];
    },
    [] as ICategoryStat[],
  );
  const expensesMonthlyStats: IExpenseMonthlyStat[] = expenses.reduce(
    (acc: IExpenseMonthlyStat[], expense: IFetchedExpense) => {
      const month = format(expense.date, "MMM");
      const existingStat = acc.find((stat) => stat.name === month);

      return [
        ...acc.filter((stat) => stat.name !== month),
        existingStat
          ? {
              ...existingStat,
              values: {
                x: {
                  ...existingStat.values.x,
                  value:
                    expense.type === "need"
                      ? existingStat.values.x.value + expense.amount
                      : existingStat.values.x.value,
                },
                y: {
                  ...existingStat.values.y,
                  value:
                    expense.type === "want"
                      ? existingStat.values.y.value + expense.amount
                      : existingStat.values.y.value,
                },
              },
            }
          : {
              name: month,
              values: {
                x: { name: "Need", value: expense.type === "need" ? expense.amount : 0 },
                y: { name: "Want", value: expense.type === "want" ? expense.amount : 0 },
              },
            },
      ] as IExpenseMonthlyStat[];
    },
    [] as IExpenseMonthlyStat[],
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
      <section className="grid gap-2 sm:gap-3 grid-cols-2 md:grid-cols-4">
        {statCards.map((stat, index) => (
          <StatCard key={index} isLoading={isExpenseIncomesLoading} {...stat} />
        ))}
      </section>

      <section className="pt-1 grid grid-cols-12 gap-2 sm:gap-3">
        {/*<h2 className="col-span-12 text-xl font-bold">Statistics</h2>*/}

        <ChartCard title="Category Statistics" containerClasses="col-span-12 md:col-span-6">
          <KeyValuePieChart data={categoryStats} isLoading={isExpenseIncomesLoading} />
        </ChartCard>

        <ChartCard title="Expense Statistics" containerClasses="col-span-12 md:col-span-6">
          <KeyValuePieChart data={expenseStats} isLoading={isExpenseIncomesLoading} />
        </ChartCard>

        <ChartCard title="Monthly Expense Statistics" containerClasses="col-span-12">
          <XYComparisonBarChart
            data={fillExpenseMonthlyStats(expensesMonthlyStats)}
            isLoading={isExpenseIncomesLoading}
          />
        </ChartCard>
      </section>
    </>
  );
}

interface ChartCardProps {
  children: React.ReactNode;
  title?: string;
  containerClasses?: string;
}

interface StatCardProps extends IStatCard {
  isLoading: boolean;
}

function ChartCard({ title, children, containerClasses }: ChartCardProps) {
  return (
    <Card
      className={cn(
        "size-full overflow-x-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-muted h-fit",
        containerClasses,
      )}
    >
      {title ? (
        <>
          <CardHeader className="bg-secondary mx-auto py-2">
            <CardTitle className="text-base text-center text-secondary-foreground">
              {title}
            </CardTitle>
          </CardHeader>
          <Separator />
        </>
      ) : null}
      <CardContent className={cn("h-full", title ? "pt-3" : "pt-6")}>{children}</CardContent>
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

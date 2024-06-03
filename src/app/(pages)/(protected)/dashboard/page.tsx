"use client";

import React, { useEffect } from "react";
import { formatDate } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import {
  CreditCardIcon,
  DollarSignIcon,
  HandCoinsIcon,
  LucideIcon,
  WalletIcon,
} from "lucide-react";
import { SortHeader } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTableCard from "@/app/(pages)/(protected)/dashboard/components/data-table-card";
import useTab from "@/hooks/useTab";
import useAppwriteFetch from "@/hooks/useAppwriteFetch";
import useDataContext from "@/context/data/useDataContext";
import useCurrencyContext from "@/context/currency/useCurrencyContext";
import { EDashboardTabs } from "@/lib/enums";
import { IExpense, IIncome } from "@/lib/types";
import database from "@/lib/appwrite/database";

interface IStat {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

enum ESavingColumnIds {
  Amount = "amount",
  Title = "title",
  Date = "date",
}
enum EExpenseColumnIds {
  Amount = "amount",
  Title = "title",
  Date = "date",
  Category = "category",
  Type = "type",
}

export default function DashboardPage() {
  const { tab, onTabChange } = useTab<EDashboardTabs>({
    defaultTab: EDashboardTabs.Overview,
    tabs: [EDashboardTabs.Overview, EDashboardTabs.Expenses, EDashboardTabs.Savings],
  });
  const { savings, setSavings, expenses, setExpenses } = useDataContext();
  const { currency } = useCurrencyContext();

  const { data: expensesData } = useAppwriteFetch(() => database.getExpenses());
  const { data: incomesData } = useAppwriteFetch(() => database.getIncomes());

  const expenseColumns: ColumnDef<IExpense>[] = [
    {
      id: EExpenseColumnIds.Amount,
      accessorKey: "amount",
      header: ({ column }) => {
        return <SortHeader column={column} title="Amount" />;
      },
      cell: ({ row, column }) => {
        return `${currency.symbolNative} ${row.getValue(column.id)}`;
      },
    },
    {
      id: EExpenseColumnIds.Title,
      accessorKey: "title",
      header: "Title",
    },
    {
      id: EExpenseColumnIds.Date,
      accessorKey: "date",
      header: ({ column }) => {
        return <SortHeader column={column} title="Date" />;
      },
      cell: ({ row, column }) => {
        return formatDate(row.getValue(column.id), "dd MMM yyyy");
      },
    },
    {
      id: EExpenseColumnIds.Category,
      accessorKey: "category.title",
      header: "Category",
    },
    {
      id: EExpenseColumnIds.Type,
      accessorKey: "type",
      header: "Type",
      cell: ({ row, column }) => {
        return <p className="capitalize">{row.getValue(column.id)}</p>;
      },
    },
  ];
  const savingColumns: ColumnDef<IIncome>[] = [
    {
      id: ESavingColumnIds.Amount,
      accessorKey: "amount",
      header: ({ column }) => {
        return <SortHeader column={column} title="Amount" />;
      },
      cell: ({ row, column }) => {
        return `${currency.symbolNative} ${row.getValue(column.id)}`;
      },
    },
    {
      id: ESavingColumnIds.Title,
      accessorKey: "title",
      header: "Title",
    },
    {
      id: ESavingColumnIds.Date,
      accessorKey: "date",
      header: ({ column }) => {
        return <SortHeader column={column} title="Date" className="ml-auto" />;
      },
      cell: ({ row, column }) => {
        return formatDate(row.getValue(column.id), "dd MMM yyyy");
      },
    },
  ];

  const amounts = {
    totalLifeTimeSavings: 45_231.89,
    totalSavings: 12_345.67,
    totalNeeds: 12_234.56,
    totalWants: 1_234.56,
  };
  const increasePercentages = {
    savings: 20.1,
    needs: 10.5,
    wants: -5,
  };

  const stats: IStat[] = [
    {
      title: "Total Savings",
      value: `${currency.symbolNative}${amounts.totalLifeTimeSavings}`,
      icon: WalletIcon,
      description: "Total savings from all your income",
    },
    {
      title: "Savings",
      value: `${currency.symbolNative}${amounts.totalSavings}`,
      icon: DollarSignIcon,
      description: `${increasePercentages.savings}% from last 30 days`,
    },
    {
      title: "Needs",
      value: `${currency.symbolNative}${amounts.totalNeeds}`,
      icon: CreditCardIcon,
      description: `${increasePercentages.needs}% from last 30 days`,
    },
    {
      title: "Wants",
      value: `${currency.symbolNative}${amounts.totalWants}`,
      icon: HandCoinsIcon,
      description: `${increasePercentages.wants}% from last 30 days`,
    },
  ];

  useEffect(() => {
    setExpenses(expensesData);
    setSavings(incomesData);
  }, [expensesData, incomesData]);

  // NOTE: TabsContent Height is manually set to 100vh - 8rem for desktop and 100vh - 5rem for mobile
  return (
    <Tabs
      value={tab}
      onValueChange={onTabChange}
      className="max-h-screen flex-col flex px-3 sm:px-6 space-y-4"
    >
      <TabsList className="w-fit">
        <TabsTrigger value={EDashboardTabs.Overview}>Overview</TabsTrigger>
        <TabsTrigger value={EDashboardTabs.Expenses}>Expenses</TabsTrigger>
        <TabsTrigger value={EDashboardTabs.Savings}>Savings</TabsTrigger>
      </TabsList>

      <TabsContent
        value={EDashboardTabs.Overview}
        className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-5rem)] pb-3 sm:pb-6 space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
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
      </TabsContent>

      <TabsContent
        value={EDashboardTabs.Expenses}
        className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-5rem)] pb-3 sm:pb-6 space-y-4"
      >
        <DataTableCard
          filter={{
            placeholder: "Search Expenses",
            columnId: EExpenseColumnIds.Title,
          }}
          title="expense"
          columns={expenseColumns}
          data={expenses}
        />
      </TabsContent>

      <TabsContent
        value={EDashboardTabs.Savings}
        className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-5rem)] pb-3 sm:pb-6 space-y-4"
      >
        <DataTableCard
          filter={{
            placeholder: "Search Savings",
            columnId: ESavingColumnIds.Title,
          }}
          title="saving"
          columns={savingColumns}
          data={savings}
        />
      </TabsContent>
    </Tabs>
  );
}

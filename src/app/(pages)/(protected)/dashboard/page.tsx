"use client";

import React, { useEffect } from "react";
import { formatDate } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { SortHeader } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTab from "@/hooks/useTab";
import useDataContext from "@/context/data/useDataContext";
import useAppwriteFetch from "@/hooks/useAppwriteFetch";
import DataTableCard from "@/app/(pages)/(protected)/dashboard/components/data-table-card";
import { EDashboardTabs } from "@/lib/enums";
import { IExpense, IIncome } from "@/lib/types";
import database from "@/lib/appwrite/database";

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
  const { currency, savings, setSavings, expenses, setExpenses } = useDataContext();

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
        const formatted = formatDate(row.getValue(column.id), "dd MMM yyyy");
        return formatted;
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
        const formatted = formatDate(row.getValue(column.id), "dd MMM yyyy");
        return formatted;
      },
    },
  ];

  const stats: IStat[] = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: DollarSignIcon,
      description: "+20.1% from last month",
    },
    {
      title: "Subscriptions",
      value: "+2350",
      icon: UsersIcon,
      description: "+20.1% from last month",
    },
    {
      title: "Sales",
      value: "+12,234",
      icon: CreditCardIcon,
      description: "+20.1% from last month",
    },
    {
      title: "Active Now",
      value: "+573",
      icon: DollarSignIcon,
      description: "+20.1% from last month",
    },
  ];

  useEffect(() => {
    setExpenses(expensesData);
    setSavings(incomesData);
  }, [expensesData, setExpenses]);

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
        Overview
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

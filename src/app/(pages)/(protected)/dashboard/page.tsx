"use client";

import React, { useEffect } from "react";
import useTab from "@/hooks/useTab";
import { formatDate } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { SortHeader } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDataContext from "@/context/data/useDataContext";
import useAppwriteFetch from "@/hooks/useAppwriteFetch";
import DataTableCard from "@/app/(pages)/(protected)/dashboard/components/data-table-card";
import { EDashboardTabs } from "@/lib/enums";
import { IExpense, IIncome } from "@/lib/types";
import database from "@/lib/appwrite/database";

const expenseColumns: ColumnDef<IExpense>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <SortHeader column={column} title="Amount" />;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <SortHeader column={column} title="Date" />;
    },
    cell: ({ row, column }) => {
      const formatted = formatDate(row.getValue(column.id), "dd MMM yyyy");
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "category.title",
    header: "Category",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row, column }) => {
      return <p className="capitalize">{row.getValue(column.id)}</p>;
    },
  },
];
const savingColumns: ColumnDef<IIncome>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <SortHeader column={column} title="Amount" />;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <SortHeader column={column} title="Date" className="ml-auto" />;
    },
    cell: ({ row, column }) => {
      const formatted = formatDate(row.getValue(column.id), "dd MMM yyyy");
      return <div className="text-right">{formatted}</div>;
    },
  },
];

export default function DashboardPage() {
  const { savings, setSavings, expenses, setExpenses } = useDataContext();
  const { data: expensesData } = useAppwriteFetch(() => database.getExpenses());
  const { data: incomesData } = useAppwriteFetch(() => database.getIncomes());
  const { tab, onTabChange } = useTab<EDashboardTabs>({
    defaultTab: EDashboardTabs.Overview,
    tabs: [EDashboardTabs.Overview, EDashboardTabs.Expenses, EDashboardTabs.Savings],
  });

  useEffect(() => {
    setExpenses(expensesData);
    setSavings(incomesData);
  }, [expensesData, setExpenses]);

  // NOTE: TabsContent Height is manually set to 100vh - 8rem for desktop and 100vh - 5rem for mobile
  return (
    <Tabs
      value={tab}
      onValueChange={onTabChange}
      className="max-h-screen flex-col flex px-3 sm:px-6 pt-3 sm:pt-6 space-y-4"
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
        <DataTableCard title="expense" columns={expenseColumns} data={expenses} />
      </TabsContent>

      <TabsContent
        value={EDashboardTabs.Savings}
        className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-5rem)] pb-3 sm:pb-6 space-y-4"
      >
        <DataTableCard title="saving" columns={savingColumns} data={savings} />
      </TabsContent>
    </Tabs>
  );
}

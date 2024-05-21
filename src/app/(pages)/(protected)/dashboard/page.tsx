"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import useTab from "@/hooks/useTab";
import { SortHeader } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTableCard from "@/app/(pages)/(protected)/dashboard/components/data-table-card";
import { EDashboardTabs } from "@/lib/enums";

type Expense = {};
const expenses: Expense[] = [];
const expenseColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <SortHeader column={column} title="Date" />;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <SortHeader column={column} title="Amount" />;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
];

type Saving = {};
const savings: Saving[] = [];
const savingColumns: ColumnDef<Saving>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <SortHeader column={column} title="Date" />;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <SortHeader column={column} title="Amount" />;
    },
  },
];

export default function DashboardPage() {
  const { tab, onTabChange } = useTab<EDashboardTabs>({
    defaultTab: EDashboardTabs.Overview,
    tabs: [EDashboardTabs.Overview, EDashboardTabs.Expenses, EDashboardTabs.Savings],
  });

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

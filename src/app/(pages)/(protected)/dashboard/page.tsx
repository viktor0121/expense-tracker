"use client";

import React, { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { Query } from "appwrite";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/components/ui/use-toast";
import { SortHeader } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Analytics from "@/app/(pages)/(protected)/dashboard/components/analytics";
import DataTableCard from "@/app/(pages)/(protected)/dashboard/components/data-table-card";
import ActionsDropdown from "@/app/(pages)/(protected)/dashboard/components/action-dropdown";
import useTab from "@/hooks/useTab";
import useAppwriteFetch from "@/hooks/useAppwriteFetch";
import useDataContext from "@/context/data/useDataContext";
import useOverlaysContext from "@/context/overlays/useOverlaysContext";
import useCurrencyContext from "@/context/currency/useCurrencyContext";
import { EDashboardTabs, EExpenseType } from "@/lib/enums";
import { ICategoryStats, IExpense, IExpenseCategory, IEarnings, IOverallStats } from "@/lib/types";
import database from "@/lib/appwrite/database";

enum EEarningsColumnIds {
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
    tabs: [EDashboardTabs.Overview, EDashboardTabs.Expenses, EDashboardTabs.Earnings],
  });
  const { currency } = useCurrencyContext();
  const { earnings, setEarnings, expenses, setExpenses } = useDataContext();
  const { setDeleteRecordDialog, setUpdateRecordDialog } = useOverlaysContext();

  const { data, isLoading } = useAppwriteFetch(async () => {
    return await Promise.all([database.getExpenses(), database.getIncomes()]);
  });

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
      cell: ({ row, column }) => {
        return <div className="capitalize">{row.getValue(column.id)}</div>;
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
        return <div className="capitalize">{row.getValue(column.id)}</div>;
      },
    },
    {
      id: EExpenseColumnIds.Date,
      accessorKey: "date",
      header: ({ column }) => {
        return <SortHeader column={column} title="Date" className="ml-auto" />;
      },
      cell: ({ row, column }) => {
        return (
          <div className="text-right">{formatDate(row.getValue(column.id), "dd MMM yyyy")}</div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <ActionsDropdown
            deleteRecord={() => {
              setDeleteRecordDialog((prev) => ({
                open: true,
                recordType: "expense",
                record: row.original,
              }));
            }}
            updateRecord={() => {
              setUpdateRecordDialog((prev) => ({
                open: true,
                recordType: "expense",
                record: row.original,
              }));
            }}
          />
        );
      },
    },
  ];
  const earningsColumns: ColumnDef<IEarnings>[] = [
    {
      id: EEarningsColumnIds.Amount,
      accessorKey: "amount",
      header: ({ column }) => {
        return <SortHeader column={column} title="Amount" />;
      },
      cell: ({ row, column }) => {
        return `${currency.symbolNative} ${row.getValue(column.id)}`;
      },
    },
    {
      id: EEarningsColumnIds.Title,
      accessorKey: "title",
      header: "Title",
      cell: ({ row, column }) => {
        return <div className="capitalize">{row.getValue(column.id)}</div>;
      },
    },
    {
      id: EEarningsColumnIds.Date,
      accessorKey: "date",
      header: ({ column }) => {
        return <SortHeader column={column} title="Date" className="ml-auto" />;
      },
      cell: ({ row, column }) => {
        return (
          <div className="text-right">{formatDate(row.getValue(column.id), "dd MMM yyyy")}</div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <ActionsDropdown
            deleteRecord={() => {
              setDeleteRecordDialog(() => ({
                open: true,
                recordType: "earning",
                record: row.original,
              }));
            }}
            updateRecord={() => {
              setUpdateRecordDialog((prev) => ({
                open: true,
                recordType: "earning",
                record: row.original,
              }));
            }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    setExpenses(data ? data[0] : []);
    setEarnings(data ? data[1] : []);
  }, [data]);

  // NOTE: TabsContent Height is manually set to 100vh - 8rem for desktop and 100vh - 5rem for mobile
  return (
    <Tabs
      value={tab}
      onValueChange={onTabChange}
      className="max-h-screen flex-col flex px-3 sm:px-6 space-y-4"
    >
      <TabsList className="w-fit">
        <TabsTrigger value={EDashboardTabs.Overview} className="capitalize">{EDashboardTabs.Overview}</TabsTrigger>
        <TabsTrigger value={EDashboardTabs.Expenses} className="capitalize">{EDashboardTabs.Expenses}</TabsTrigger>
        <TabsTrigger value={EDashboardTabs.Earnings} className="capitalize">{EDashboardTabs.Earnings}</TabsTrigger>
      </TabsList>

      <TabsContent
        value={EDashboardTabs.Overview}
        className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-5rem)] pb-3 sm:pb-6 space-y-4"
      >
        <Analytics />
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
          isLoading={isLoading}
        />
      </TabsContent>

      <TabsContent
        value={EDashboardTabs.Earnings}
        className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-5rem)] pb-3 sm:pb-6 space-y-4"
      >
        <DataTableCard
          filter={{
            placeholder: "Search Earnings",
            columnId: EEarningsColumnIds.Title,
          }}
          title="earning"
          columns={earningsColumns}
          data={earnings}
          isLoading={isLoading}
        />
      </TabsContent>
    </Tabs>
  );
}

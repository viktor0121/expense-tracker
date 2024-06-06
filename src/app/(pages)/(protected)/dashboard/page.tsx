"use client";

import React, { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { SortHeader } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "@/app/(pages)/(protected)/dashboard/components/overview";
import DataTableCard from "@/app/(pages)/(protected)/dashboard/components/data-table-card";
import ActionsDropdown from "@/app/(pages)/(protected)/dashboard/components/action-dropdown";
import useTab from "@/hooks/useTab";
import useAppwriteFetch from "@/hooks/useAppwriteFetch";
import useDataContext from "@/context/data/useDataContext";
import useOverlaysContext from "@/context/overlays/useOverlaysContext";
import useCurrencyContext from "@/context/currency/useCurrencyContext";
import { EDashboardTabs } from "@/lib/enums";
import { IExpense, IIncome, IOverallStats } from "@/lib/types";
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

  const { currency } = useCurrencyContext();
  const { savings, setSavings, expenses, setExpenses, setOverAllStats } = useDataContext();
  const { setDeleteRecordDialog, setUpdateRecordDialog } = useOverlaysContext();

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
      cell: ({ row, column }) => {
        return <div className="capitalize">{row.getValue(column.id)}</div>;
      },
    },
    {
      id: ESavingColumnIds.Date,
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
                recordType: "saving",
                record: row.original,
              }));
            }}
            updateRecord={() => {
              setUpdateRecordDialog((prev) => ({
                open: true,
                recordType: "saving",
                record: row.original,
              }));
            }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    setExpenses(expensesData);
    setSavings(incomesData);
  }, [expensesData, incomesData]);

  useEffect(() => {
    (async function () {
      const data = await database.getStatistics();
      setOverAllStats(data);
    })();
  }, []);

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
        <Overview />
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

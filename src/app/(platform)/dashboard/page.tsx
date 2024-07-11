"use client";

import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useTab } from "@/hooks/useTab";
import { useDeleteRecordDialog } from "@/store/overlays/useDeleteRecordDialog";
import { useUpdateRecordDialog } from "@/store/overlays/useUpdateRecordDialog";
import { useCurrency } from "@/store/useCurrency";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { EDashboardTabs } from "@/lib/enums";
import { IEarning, IExpense } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ActionsDropdown } from "./_components/action-dropdown";
import { Analytics } from "./_components/analytics";
import { SortHeader } from "./_components/data-table";
import { DataTableCard } from "./_components/data-table-card";

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
    defaultTab: EDashboardTabs.Analytics,
    tabs: [EDashboardTabs.Analytics, EDashboardTabs.Expenses, EDashboardTabs.Earnings],
  });
  const { currency } = useCurrency();
  const { earnings, setEarnings, expenses, setExpenses } = useData();

  const deleteDialog = useDeleteRecordDialog();
  const updateDialog = useUpdateRecordDialog();

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
        return <div className="text-right">{formatDate(row.getValue(column.id), "dd MMM yyyy")}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <ActionsDropdown
            deleteRecord={() => deleteDialog.openExpense(row.original)}
            updateRecord={() => updateDialog.openExpense(row.original)}
          />
        );
      },
    },
  ];
  const earningsColumns: ColumnDef<IEarning>[] = [
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
        return <div className="text-right">{formatDate(row.getValue(column.id), "dd MMM yyyy")}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <ActionsDropdown
            deleteRecord={() => deleteDialog.openEarning(row.original)}
            updateRecord={() => updateDialog.openEarning(row.original)}
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
      className={cn(
        "space-y-4 px-3 sm:px-6",
        tab === EDashboardTabs.Expenses || tab === EDashboardTabs.Earnings ? "max-h-screen" : "min-h-screen",
      )}
    >
      <TabsList className="w-fit">
        <TabsTrigger value={EDashboardTabs.Analytics} className="capitalize">
          {EDashboardTabs.Analytics}
        </TabsTrigger>
        <TabsTrigger value={EDashboardTabs.Expenses} className="capitalize">
          {EDashboardTabs.Expenses}
        </TabsTrigger>
        <TabsTrigger value={EDashboardTabs.Earnings} className="capitalize">
          {EDashboardTabs.Earnings}
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value={EDashboardTabs.Analytics}
        className="min-h-[calc(100vh-8rem)] space-y-4 pb-3 sm:min-h-[calc(100vh-5rem)] sm:pb-6"
      >
        <Analytics />
      </TabsContent>

      <div>
        <TabsContent
          value={EDashboardTabs.Expenses}
          className="h-[calc(100vh-8rem)] space-y-4 pb-3 sm:h-[calc(100vh-5rem)] sm:pb-6"
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
          className="h-[calc(100vh-8rem)] space-y-4 pb-3 sm:h-[calc(100vh-5rem)] sm:pb-6"
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
      </div>
    </Tabs>
  );
}

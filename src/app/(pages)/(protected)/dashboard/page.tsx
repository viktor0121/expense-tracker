"use client";

import React, { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { Query } from "appwrite";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/components/ui/use-toast";
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
import { EDashboardTabs, EExpenseType } from "@/lib/enums";
import { ICategoryStats, IExpense, IExpenseCategory, IIncome, IOverallStats } from "@/lib/types";
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
  const { savings, setSavings, expenses, setExpenses } = useDataContext();
  const { setDeleteRecordDialog, setUpdateRecordDialog } = useOverlaysContext();

  const { data, isLoading } = useAppwriteFetch(async () => {
    return await Promise.all([database.getExpenses(), database.getIncomes()]);
  });

  const [overAllStats, setOverAllStats] = useState<IOverallStats>({
    totalSavings: 0,
    totalIncome: 0,
    totalNeeds: 0,
    totalWants: 0,
  });
  const [categoryStats, setCategoryStats] = useState<ICategoryStats>({});

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
    setExpenses(data ? data[0] : []);
    setSavings(data ? data[1] : []);
  }, [data]);

  useEffect(() => {
    (async function () {
      try {
        // Fetching all expenses and incomes to calculate the overall stats
        const expenses = await database.getExpenses([
          Query.select(["type", "amount", "category.*"]),
          Query.limit(5000),
        ]);
        const incomes: IIncome[] = await database.getIncomes([
          Query.select(["amount"]),
          Query.limit(5000),
        ]);

        setOverAllStats(() => {
          const totalNeeds = expenses
            .filter((expense) => expense.type === EExpenseType.Need)
            .reduce((acc, expense) => acc + expense.amount, 0);
          const totalWants = expenses
            .filter((expense) => expense.type === EExpenseType.Want)
            .reduce((acc, expense) => acc + expense.amount, 0);
          const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
          const totalSavings = totalIncome - totalNeeds - totalWants;

          return { totalSavings, totalIncome, totalNeeds, totalWants };
        });

        setCategoryStats(() => {
          return expenses.reduce((acc: ICategoryStats, expense) => {
            const category = (expense.category as IExpenseCategory).title;
            const amount = expense.amount;
            acc[category] = (acc[category] || 0) + amount;
            return acc;
          }, {});
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Unable to get Statistics",
          variant: "destructive",
        });
      }
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
        <Overview overAllStats={overAllStats} categoryStats={categoryStats} />
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
          isLoading={isLoading}
        />
      </TabsContent>
    </Tabs>
  );
}

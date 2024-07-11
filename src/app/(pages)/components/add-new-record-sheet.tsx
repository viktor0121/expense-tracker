import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseForm } from "@/app/(pages)/(protected)/dashboard/components/expense-form";
import { IncomeForm } from "@/app/(pages)/(protected)/dashboard/components/income-form";
import useOverlaysContext from "@/context/overlays/useOverlaysContext";
import { EAddSheetTabs, EDashboardTabs } from "@/lib/enums";

interface AddNewSheetProps {}

export function AddNewRecordSheet({}: AddNewSheetProps) {
  const { addNewSideSheet, setAddNewSideSheet } = useOverlaysContext();
  const closeSheet = () => setAddNewSideSheet((prev) => ({ ...prev, open: false }));

  return (
    <Sheet
      open={addNewSideSheet.open}
      onOpenChange={(open) => setAddNewSideSheet((prev) => ({ ...prev, open }))}
    >
      <SheetContent className="slim-scrollbar overflow-auto py-5 px-1 sm:px-5 w-full sm:min-w-fit">
        <SheetHeader>
          <SheetTitle className="mb-4">Add New Record</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue={addNewSideSheet.defaultTab} className="sm:w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={EAddSheetTabs.Expense} className="capitalize">
              {EDashboardTabs.Expenses}
            </TabsTrigger>
            <TabsTrigger value={EAddSheetTabs.Earning} className="capitalize">
              {EDashboardTabs.Earnings}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={EAddSheetTabs.Expense}>
            <SheetCardWrapper title="Add New Expense">
              <ExpenseForm recordType="add" runAfterSubmit={closeSheet} />
            </SheetCardWrapper>
          </TabsContent>

          <TabsContent value={EAddSheetTabs.Earning}>
            <SheetCardWrapper title="Add New Earning">
              <IncomeForm recordType="add" runAfterSubmit={closeSheet} />
            </SheetCardWrapper>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

interface SheetCardWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

function SheetCardWrapper({ children, title, description }: SheetCardWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
}

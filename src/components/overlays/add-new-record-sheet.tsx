import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAddNewRecordSheet } from "@/store/overlays/useAddNewRecordSheet";
import { EAddSheetTabs, EDashboardTabs } from "@/lib/enums";
import { ExpenseForm } from "@/components/forms/expense-form";
import { IncomeForm } from "@/components/forms/income-form";

interface AddNewSheetProps {}

export function AddNewRecordSheet({}: AddNewSheetProps) {
  const addNewRecordSheet = useAddNewRecordSheet();

  return (
    <Sheet open={addNewRecordSheet.isOpen} onOpenChange={addNewRecordSheet.close}>
      <SheetContent className="slim-scrollbar w-full overflow-auto px-1 py-5 sm:min-w-fit sm:px-5">
        <SheetHeader>
          <SheetTitle className="mb-4">Add New Record</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue={addNewRecordSheet.tab} className="sm:w-[400px]">
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
              <ExpenseForm recordType="add" runAfterSubmit={addNewRecordSheet.close} />
            </SheetCardWrapper>
          </TabsContent>

          <TabsContent value={EAddSheetTabs.Earning}>
            <SheetCardWrapper title="Add New Earning">
              <IncomeForm recordType="add" runAfterSubmit={addNewRecordSheet.close} />
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

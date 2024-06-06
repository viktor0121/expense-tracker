import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseForm from "@/app/(pages)/(protected)/dashboard/components/expense-form";
import SavingForm from "@/app/(pages)/(protected)/dashboard/components/saving-form";
import useOverlaysContext from "@/context/overlays/useOverlaysContext";
import { EAddSheetTabs } from "@/lib/enums";
import database from "@/lib/appwrite/database";

interface AddNewSheetProps {}

export default function AddNewSheet({}: AddNewSheetProps) {
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
            <TabsTrigger value={EAddSheetTabs.Expense}>Expense</TabsTrigger>
            <TabsTrigger value={EAddSheetTabs.Saving}>Saving</TabsTrigger>
          </TabsList>

          <TabsContent value={EAddSheetTabs.Expense}>
            <SheetCardWrapper title="Add New Expense">
              <ExpenseForm runAfterSubmit={closeSheet} />
            </SheetCardWrapper>
          </TabsContent>

          <TabsContent value={EAddSheetTabs.Saving}>
            <SheetCardWrapper title="Add New Saving">
              <SavingForm type="add" runAfterSubmit={closeSheet} />
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

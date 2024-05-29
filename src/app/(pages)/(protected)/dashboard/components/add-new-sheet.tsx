import React, { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseForm from "@/app/(pages)/(protected)/dashboard/components/expense-form";
import SavingForm from "@/app/(pages)/(protected)/dashboard/components/saving-form";
import { EAddSheetTabs } from "@/lib/enums";

interface AddNewSheetProps {
  triggerText: string;
  triggerIcon: LucideIcon;
  defaultTab?: EAddSheetTabs;
}

export default function AddNewSheet({
  triggerText,
  triggerIcon: Icon,
  defaultTab,
}: AddNewSheetProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="space-x-1">
          <Icon className="size-5" />
          <span>{triggerText}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="slim-scrollbar overflow-auto py-5 px-1 sm:px-5 w-full sm:min-w-fit">
        <SheetHeader>
          <SheetTitle className="mb-4">Add New Record</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue={defaultTab || EAddSheetTabs.Expense} className="sm:w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={EAddSheetTabs.Expense}>Expense</TabsTrigger>
            <TabsTrigger value={EAddSheetTabs.Saving}>Saving</TabsTrigger>
          </TabsList>

          <TabsContent value={EAddSheetTabs.Expense}>
            <SheetCardWrapper title="Add New Expense">
              <ExpenseForm runAfterSubmit={() => setOpen(false)} />
            </SheetCardWrapper>
          </TabsContent>

          <TabsContent value={EAddSheetTabs.Saving}>
            <SheetCardWrapper title="Add New Saving">
              <SavingForm runAfterSubmit={() => setOpen(false)} />
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

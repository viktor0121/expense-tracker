import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, IDataTableFilter } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import AddNewSheet from "@/app/(pages)/(protected)/dashboard/components/add-new-sheet";
import { PlusIcon } from "lucide-react";
import { EAddSheetTabs } from "@/lib/enums";

interface DataTableCardProps<T> {
  title: "expense" | "saving";
  description?: string;
  columns: ColumnDef<T>[];
  data: T[];
  filter?: IDataTableFilter;
}

export default function DataTableCard<T>({
  title,
  description,
  columns,
  filter,
  data,
}: DataTableCardProps<T>) {
  return (
    <Card className="h-full min-h-96 flex flex-col">
      <CardHeader className="border-border border-b flex-row items-center justify-between px-6 py-4">
        {/*Title & Description*/}
        <div className="space-y-1.5 justify-evenly">
          <CardTitle className="capitalize">{title}s</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>

        {/*Side Sheet to add new Record*/}
        <AddNewSheet
          triggerText="Add New"
          triggerIcon={PlusIcon}
          defaultTab={title === "saving" ? EAddSheetTabs.Saving : EAddSheetTabs.Expense}
        />
      </CardHeader>

      <div className="w-[inherit] h-[inherit] scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-foreground overflow-auto">
        <CardContent className="h-[inherit] w-[inherit] min-w-fit space-y-2">
          <DataTable filter={filter} addVisibilityToggle columns={columns} data={data} />
        </CardContent>
      </div>
    </Card>
  );
}

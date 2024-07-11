import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, IDataTableFilter } from "./data-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { EAddSheetTabs } from "@/lib/enums";
import { useAddNewRecordSheet } from "@/store/overlays/useAddNewRecordSheet";

interface DataTableCardProps<T> {
  title: "expense" | "earning";
  description?: string;
  columns: ColumnDef<T>[];
  data: T[];
  filter?: IDataTableFilter;
  isLoading?: boolean;
}

export function DataTableCard<T>({
  title,
  description,
  columns,
  filter,
  data,
  isLoading,
}: DataTableCardProps<T>) {
  const addNewRecordSheet = useAddNewRecordSheet();

  return (
    <Card className="h-full min-h-96 flex flex-col">
      <CardHeader className="border-border border-b flex-row items-center justify-between px-6 py-4">
        {/*Title & Description*/}
        <div className="space-y-1.5 justify-evenly">
          <CardTitle className="capitalize">
            {title}
            {"s"}
          </CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>

        {/*Open Side Sheet to add new Record*/}
        <Button
          variant="outline"
          className="space-x-1"
          onClick={title === "earning" ? addNewRecordSheet.openEarning : addNewRecordSheet.openExpense}
        >
          <PlusIcon className="size-5" />
          <span>Add New</span>
        </Button>
      </CardHeader>

      <div className="w-[inherit] h-[inherit] scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-foreground overflow-auto">
        <CardContent className="h-[inherit] w-[inherit] min-w-fit space-y-2">
          <DataTable
            filter={filter}
            addVisibilityToggle
            columns={columns}
            data={data}
            isLoading={isLoading}
          />
        </CardContent>
      </div>
    </Card>
  );
}

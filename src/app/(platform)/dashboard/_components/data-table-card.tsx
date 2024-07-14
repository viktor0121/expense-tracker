import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateRecordSheet } from "@/store/overlays/useCreateRecordSheet";
import { DataTable, IDataTableFilter } from "./data-table";

interface DataTableCardProps<T> {
  title: "expense" | "earning";
  description?: string;
  columns: ColumnDef<T>[];
  data: T[];
  filter?: IDataTableFilter;
  isLoading?: boolean;
}

export function DataTableCard<T>({ title, description, columns, filter, data, isLoading }: DataTableCardProps<T>) {
  const createRecordSheet = useCreateRecordSheet();

  return (
    <Card className="flex h-full min-h-96 flex-col">
      <CardHeader className="flex-row items-center justify-between border-b border-border px-6 py-4">
        {/*Title & Description*/}
        <div className="justify-evenly space-y-1.5">
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
          onClick={title === "earning" ? createRecordSheet.openEarning : createRecordSheet.openExpense}
        >
          <PlusIcon className="size-5" />
          <span>Add New</span>
        </Button>
      </CardHeader>

      <div className="h-[inherit] w-[inherit] overflow-auto scrollbar-thin scrollbar-track-primary-foreground scrollbar-thumb-primary">
        <CardContent className="h-[inherit] w-[inherit] min-w-fit space-y-2">
          <DataTable filter={filter} addVisibilityToggle columns={columns} data={data} isLoading={isLoading} />
        </CardContent>
      </div>
    </Card>
  );
}

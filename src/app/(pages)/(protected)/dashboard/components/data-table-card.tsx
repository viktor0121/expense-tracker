import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import AddNewSheet from "@/app/(pages)/(protected)/dashboard/components/add-new-sheet";
import { PlusIcon } from "lucide-react";
import { EAddSheetTabs } from "@/lib/enums";

  title: string;
interface DataTableCardProps<T> {
  description?: string;
  columns: ColumnDef<T>[];
  data: T[];
}

export default function DataTableCard<T>({
  title,
  description,
  columns,
  data,
}: DataTableCardProps<T>) {
  return (
    <Card className="h-full min-h-96 flex flex-col">
      <CardHeader className="border-border border-b">
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>

      <div className="w-[inherit] h-[inherit] scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-foreground overflow-auto">
        <CardContent className="h-[inherit] w-[inherit] min-w-fit space-y-2">
          <DataTable columns={columns} data={data} />
        </CardContent>
      </div>
    </Card>
  );
}

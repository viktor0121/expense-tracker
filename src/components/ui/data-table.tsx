"use client";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  InitialTableState,
  SortingState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { ChangeEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, SearchIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { className } from "postcss-selector-parser";
import { Input } from "@/components/ui/input";
// import SearchBar from "@/components/ui/search-bar";

export interface IDataTableFilter {
  placeholder: string;
  columnId: string;
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filter?: IDataTableFilter;
  initialState?: InitialTableState;
  addVisibilityToggle?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  initialState,
  filter,
  addVisibilityToggle,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: initialState,
    state: {
      sorting,
      columnFilters,
    },
  });

  const filterColumn = filter?.columnId ? table.getColumn(filter.columnId) : null;

  return (
    <div>
      {filter || addVisibilityToggle ? (
        <div className="flex flex-col min-[300px]:flex-row py-4 gap-2">
          {/*Table Search*/}
          {filter && filter.columnId && filter.placeholder && filterColumn && (
            <SearchBar
              placeholder={filter.placeholder}
              value={(filterColumn.getFilterValue() as string) ?? ""}
              setValue={filterColumn.setFilterValue}
            />
          )}

          {/*Column Visibility*/}
          {addVisibilityToggle ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Columns</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null}
        </div>
      ) : null}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead
                    className={cn(
                      "whitespace-nowrap",
                      headerGroup.headers.length > 1 &&
                        headerGroup.headers.length - 1 === index &&
                        "text-right",
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      row.getVisibleCells().length > 1 &&
                        row.getVisibleCells().length - 1 === index &&
                        "text-right",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nothing to show.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

interface SortButtonProps {
  column: Column<any, any>;
  title: string;
  className?: string;
}

export function SortHeader({ column, title, className }: SortButtonProps) {
  return (
    <div className={cn("flex", className)}>
      <Button
        variant="ghost"
        className={cn("p-0.5", className)}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

interface SearchBarProps {
  placeholder: string;
  value: string;
  setValue: (updater: Updater<any>) => void;
  className?: string;
}

function SearchBar({ placeholder, value, setValue, className }: SearchBarProps) {
  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const clearBtnClickHandle = () => setValue("");

  return (
    <div className="relative w-full">
      <SearchIcon className="w-5 left-2 absolute top-0 bottom-0 my-auto text-gray-500" />

      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandle}
        className={cn("px-9", className)}
      />

      {value && (
        <Button
          variant="ghost"
          onClick={clearBtnClickHandle}
          className="inset-y-1 right-1 h-auto aspect-square p-0 absolute my-auto text-gray-500 hover:bg-opacity-10"
        >
          <XIcon className="size-5" />
          <span className="sr-only">Clear Search</span>
        </Button>
      )}
    </div>
  );
}

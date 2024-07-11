"use client";

import React, { ChangeEvent } from "react";
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
import { ArrowUpDown, SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell as TableCellPrimitive,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
  isLoading?: boolean;
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

export function DataTable<TData, TValue>({
  columns,
  data,
  initialState,
  filter,
  isLoading,
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
    <>
      <div>
        {filter || addVisibilityToggle ? (
          <div className="flex flex-col gap-2 py-4 min-[300px]:flex-row">
            {/*Table Search*/}
            {filter && filter.columnId && filter.placeholder && filterColumn ? (
              <SearchBar
                placeholder={filter.placeholder}
                value={(filterColumn.getFilterValue() as string) ?? ""}
                setValue={filterColumn.setFilterValue}
              />
            ) : null}

            {/*Column Visibility*/}
            {addVisibilityToggle ? (
              <VisibilityDropdown columns={table.getAllColumns().filter((column) => column.getCanHide())} />
            ) : null}
          </div>
        ) : null}
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableCell
                  key={header.id}
                  type="head"
                  cellIndex={index}
                  totalCells={headerGroup.headers.length}
                  className="whitespace-nowrap"
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array(10)
              .fill(null)
              .map((_, key) => (
                <TableRow key={key}>
                  {Array(columns.length)
                    .fill(null)
                    .map((_, index) => (
                      <TableCell
                        key={index}
                        cellIndex={index}
                        totalCells={columns.length}
                        className="whitespace-nowrap"
                      >
                        <Skeleton className="col-span-1 my-2 h-3" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : !table.getRowModel().rows?.length ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nothing to show.
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={cell.id} cellIndex={index} totalCells={row.getVisibleCells().length}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}

interface SearchBarProps {
  placeholder: string;
  value: string;
  setValue: (updater: Updater<any>) => void;
  className?: string;
}

interface TableCellProps {
  type?: "cell" | "head";
  totalCells?: number;
  cellIndex?: number;
  className?: string;
  colSpan?: number;
  children: React.ReactNode;
}

interface VisibilityDropdownProps<TData> {
  columns: Column<TData>[];
}

function SearchBar({ placeholder, value, setValue, className }: SearchBarProps) {
  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const clearBtnClickHandle = () => setValue("");

  return (
    <div className="relative w-full">
      <SearchIcon className="absolute bottom-0 left-2 top-0 my-auto w-5 text-gray-500" />

      <Input placeholder={placeholder} value={value} onChange={onChangeHandle} className={cn("px-9", className)} />

      {value && (
        <Button
          variant="ghost"
          onClick={clearBtnClickHandle}
          className="absolute inset-y-1 right-1 my-auto aspect-square h-auto p-0 text-gray-500 hover:bg-opacity-10"
        >
          <XIcon className="size-5" />
          <span className="sr-only">Clear Search</span>
        </Button>
      )}
    </div>
  );
}

function TableCell({ type = "cell", totalCells, cellIndex, className, colSpan, children }: TableCellProps) {
  const Cell = type === "cell" ? TableCellPrimitive : TableHead;

  return (
    <Cell
      colSpan={colSpan}
      className={cn(
        totalCells !== undefined &&
          cellIndex !== undefined &&
          totalCells > 1 &&
          totalCells - 1 === cellIndex &&
          "text-right",
        className,
      )}
    >
      {children}
    </Cell>
  );
}

function VisibilityDropdown<TData>({ columns }: VisibilityDropdownProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className="capitalize"
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(value)}
          >
            {column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

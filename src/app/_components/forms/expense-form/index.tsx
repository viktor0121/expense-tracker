"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverClose } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { FormDateField } from "@/components/form-date-field";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useData } from "@/store/useData";
import database from "@/lib/appwrite/database";
import { EExpenseType } from "@/lib/enums";
import { IExpense, IExpenseCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CategoryCreateDialog } from "./category-create-dialog";
import { CategoryDeleteDialog } from "./category-delete-dialog";

type AddUpdateTypes =
  | {
      recordType: "add";
      record?: undefined;
    }
  | {
      recordType: "update";
      record: IExpense;
    };

type ExpenseFormProps = AddUpdateTypes & {
  runAfterSubmit?: () => void;
};

const formSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  title: z.string().trim().min(1, "Title is required").max(250, "Title must be at most 100 characters"),
  amount: z
    .string()
    .trim()
    .min(1, "Amount must not be empty")
    .refine((str) => /^[0-9.-]+$/.test(str), "Amount must contain only numbers")
    .refine((str) => parseFloat(str) >= 0, "Amount must be a positive number")
    .refine((str) => parseFloat(str) >= 0.01, "Amount must be at least 0.01")
    .refine((str) => parseFloat(str) < 10_00_00_000, "Amount must be at most 10,00,00,000"),
  type: z.nativeEnum(EExpenseType, {
    required_error: "Please select an expense type.",
  }),
  category: z.string().min(1, "Category is required"),
});

export function ExpenseForm({ recordType, record, runAfterSubmit }: ExpenseFormProps) {
  const { toast } = useToast();
  const categoryTriggerButtonRef = useRef<HTMLButtonElement>(null);
  const [comboBoxWidth, setComboBoxWidth] = useState<Number>(-1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      recordType === "add"
        ? {
            // @ts-ignore
            amount: "",
            title: "",
            category: "",
          }
        : {
            // @ts-ignore
            amount: `${record?.amount}`,
            title: record?.title,
            date: typeof record?.date === "string" ? new Date(record?.date) : record?.date,
            type: record?.type,
            category:
              typeof record?.category === "string" ? record?.category : (record?.category as IExpenseCategory).$id,
          },
  });
  const { isSubmitting, isValid, dirtyFields, isDirty } = form.formState;
  const { expenses, setExpenses, expenseCategories, setExpenseCategories } = useData();
  const { data: categoriesData } = useAppwriteFetch(() => database.getExpenseCategories());

  const submit = form.handleSubmit(async ({ date, amount, title, type, category }) => {
    try {
      if (recordType === "add") {
        const newExpense = await database.addUpdateExpense({
          actionType: "add",
          title,
          amount: Number(amount),
          date,
          type,
          category,
        });
        setExpenses([newExpense, ...expenses]);
      } else {
        const updatedExpense = await database.addUpdateExpense({
          actionType: "update",
          id: record.$id,
          ...(dirtyFields.title ? { title } : {}),
          ...(dirtyFields.amount ? { amount: Number(amount) } : {}),
          ...(dirtyFields.date ? { date } : {}),
          ...(dirtyFields.type ? { type } : {}),
          ...(dirtyFields.category ? { category } : {}),
        });
        setExpenses(expenses.map((item) => (item.$id === updatedExpense.$id ? updatedExpense : item)));
      }

      toast({
        title: "Success!",
        description: `Your expense has been ${recordType === "add" ? "added" : "updated"} successfully.`,
      });

      form.reset();

      // Some extra function passed from parent component
      runAfterSubmit && runAfterSubmit();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    setExpenseCategories(categoriesData || []);
  }, [categoriesData]);

  useEffect(() => {
    // Set ComboBox Width
    const updateComboBoxWidth = () => {
      if (categoryTriggerButtonRef.current) setComboBoxWidth(categoryTriggerButtonRef.current.offsetWidth);
    };
    updateComboBoxWidth();
    window.addEventListener("resize", updateComboBoxWidth);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", updateComboBoxWidth);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={submit} className="grid gap-3">
        {/*Name Input*/}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormDateField name="date" label="Date" placeholder="Pick a date" control={form.control} />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      ref={categoryTriggerButtonRef}
                      variant="outline"
                      role="combobox"
                      className={cn("justify-between capitalize", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? expenseCategories.find((category) => category.$id === field.value)?.title
                        : "Select Category"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  // This will prevent AddNewCategory buttons tooltip auto open
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  className="p-0"
                  style={{ width: `${comboBoxWidth}px` }}
                >
                  <Command>
                    <div className="relative">
                      <CategoryCreateDialog />
                      <CommandInput placeholder="Search Category" className="pr-8" />
                    </div>

                    <CommandEmpty>No category found.</CommandEmpty>

                    <CommandList>
                      <CommandGroup>
                        {expenseCategories.map((category, index) => (
                          <div key={index} className="group flex rounded-md hover:bg-accent">
                            <PopoverClose className="flex-1">
                              <CommandItem
                                value={category.title}
                                key={category.$id}
                                className="flex-1"
                                onSelect={() => field.onChange(category.$id)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 size-4",
                                    category.$id === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {category.title}
                              </CommandItem>
                            </PopoverClose>

                            <CategoryDeleteDialog category={category} />
                          </div>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(EExpenseType).map((type, index) => (
                    <SelectItem key={index} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*Submit Button*/}
        <ButtonWithSpinner
          isLoading={isSubmitting}
          disabled={!isValid || !isDirty}
          type="submit"
          className="mt-2 w-full"
          btnText={`${recordType} Record`}
        />
      </form>
    </Form>
  );
}

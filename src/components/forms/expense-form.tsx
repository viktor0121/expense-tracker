"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2 } from "lucide-react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { FormDateField } from "@/components/form-date-field";
import { FormSelectRelatedField } from "@/components/form-select-related-field";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useCreateExpenseCategoryDialog } from "@/store/overlays/useCreateExpenseCategoryDialog";
import { useDeleteExpenseCategoryDialog } from "@/store/overlays/useDeleteExpenseCategoryDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { EExpenseType } from "@/lib/enums";
import { IExpense, IExpenseCategory } from "@/lib/types";
import { truncateString } from "@/lib/utils";

type AddUpdateTypes =
  | {
      action: "add";
      record?: undefined;
    }
  | {
      action: "update";
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

export function ExpenseForm({ action, record, runAfterSubmit }: ExpenseFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      action === "add"
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

  const createExpenseCategoryDialog = useCreateExpenseCategoryDialog();
  const deleteExpenseCategoryDialog = useDeleteExpenseCategoryDialog();

  const submit = form.handleSubmit(async ({ date, amount, title, type, category }) => {
    try {
      if (action === "add") {
        const newExpense = await database.createExpense({
          title,
          amount: Number(amount),
          date,
          type,
          category,
        });
        setExpenses([newExpense, ...expenses]);
        toast({
          title: "Success!",
          description: (
            <p>
              New expense <b>{truncateString(title, 20)}</b> has been created successfully.
            </p>
          ),
        });
      } else {
        const updatedExpense = await database.updateExpense({
          id: record.$id,
          ...(dirtyFields.title ? { title } : {}),
          ...(dirtyFields.amount ? { amount: Number(amount) } : {}),
          ...(dirtyFields.date ? { date } : {}),
          ...(dirtyFields.type ? { type } : {}),
          ...(dirtyFields.category ? { category } : {}),
        });
        setExpenses(expenses.map((item) => (item.$id === updatedExpense.$id ? updatedExpense : item)));
        toast({
          title: "Success!",
          description: (
            <p>
              Expense <b>{truncateString(title, 20)}</b> has been updated successfully.
            </p>
          ),
        });
      }

      // Reset form & Run extra function passed from parent component if any
      form.reset();
      runAfterSubmit && runAfterSubmit();
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    setExpenseCategories(categoriesData || []);
  }, [categoriesData]);

  return (
    <>
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

          <FormSelectRelatedField
            name="category"
            label="Category"
            placeholder="Select Category"
            control={form.control}
            relatedData={expenseCategories}
            valueKey="$id"
            displayKey="title"
            commandEmptyText="No category found."
            commandInputPlaceholder="Search Category"
            mainButton={{
              tooltip: "New category",
              icon: PlusIcon,
              onClick: createExpenseCategoryDialog.open,
            }}
            actionButton={{
              icon: Trash2,
              onClick: (category) => deleteExpenseCategoryDialog.open(category),
              iconClassName: "hover:text-destructive",
            }}
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
            btnText={`${action} Record`}
          />
        </form>
      </Form>
    </>
  );
}

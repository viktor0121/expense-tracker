"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {FormDateField} from "@/components/form-date-field";
import {ButtonWithSpinner} from "@/components/button-with-spinner";
import database from "@/lib/appwrite/database";
import useDataContext from "@/context/data/useDataContext";
import { IEarning } from "@/lib/types";

type AddUpdateTypes =
  | {
      recordType: "add";
      record?: undefined;
    }
  | {
      recordType: "update";
      record: IEarning;
    };

type IncomeFormProps = AddUpdateTypes & {
  runAfterSubmit?: () => void;
};

const formSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(250, "Title must be at most 100 characters"),
  amount: z
    .string()
    .trim()
    .min(1, "Amount must not be empty")
    .refine((str) => /^[0-9.-]+$/.test(str), "Amount must contain only numbers")
    .refine((str) => parseFloat(str) >= 0, "Amount must be a positive number")
    .refine((str) => parseFloat(str) >= 0.01, "Amount must be at least 0.01")
    .refine((str) => parseFloat(str) < 10_00_00_000, "Amount must be at most 10,00,00,000"),
});

export function IncomeForm({ recordType, record, runAfterSubmit }: IncomeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      recordType === "add"
        ? {
            title: "",
            // @ts-ignore
            amount: "",
          }
        : {
            title: record?.title,
            date: typeof record?.date === "string" ? new Date(record?.date) : record?.date,
            // @ts-ignore
            amount: `${record?.amount}`,
          },
  });
  const { isSubmitting, isValid, isDirty, dirtyFields } = form.formState;

  const { toast } = useToast();
  const { setEarnings } = useDataContext();

  const submit = form.handleSubmit(async ({ date, amount, title }) => {
    try {
      if (recordType === "add") {
        const newIncome = await database.addUpdateIncome({
          actionType: "add",
          title,
          amount: Number(amount),
          date,
        });
        setEarnings((prev) => [newIncome, ...prev]);
      } else {
        const updatedIncome = await database.addUpdateIncome({
          actionType: "update",
          id: record.$id,
          ...(dirtyFields.title ? { title } : {}),
          ...(dirtyFields.amount ? { amount: Number(amount) } : {}),
          ...(dirtyFields.date ? { date } : {}),
        });
        setEarnings((prev) =>
          prev.map((item) => (item.$id === updatedIncome.$id ? updatedIncome : item)),
        );
      }

      toast({
        title: "Success!",
        description: `Your income have been ${recordType === "add" ? "added" : "updated"} successfully.`,
      });

      form.reset();

      // Some extra function passed from parent component if any
      runAfterSubmit && runAfterSubmit();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  });

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

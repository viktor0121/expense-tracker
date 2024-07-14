"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { FormDateField } from "@/components/form-date-field";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { IEarning } from "@/lib/types";

type AddUpdateTypes =
  | {
      action: "add";
      record?: undefined;
    }
  | {
      action: "update";
      record: IEarning;
    };

type IncomeFormProps = AddUpdateTypes & {
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
});

export function EarningForm({ action, record, runAfterSubmit }: IncomeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      action === "add"
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
  const { setEarnings, earnings } = useData();

  const submit = form.handleSubmit(async ({ date, amount, title }) => {
    try {
      if (action === "add") {
        const newIncome = await database.createIncome({
          title,
          amount: Number(amount),
          date,
        });
        setEarnings([newIncome, ...earnings]);
      } else {
        const updatedIncome = await database.updateIncome({
          id: record.$id,
          ...(dirtyFields.title ? { title } : {}),
          ...(dirtyFields.amount ? { amount: Number(amount) } : {}),
          ...(dirtyFields.date ? { date } : {}),
        });
        setEarnings(earnings.map((item) => (item.$id === updatedIncome.$id ? updatedIncome : item)));
      }

      toast({
        title: "Success!",
        description: `Your income have been ${action === "add" ? "added" : "updated"} successfully.`,
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
          btnText={`${action} Record`}
        />
      </form>
    </Form>
  );
}

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
import FormDateField from "@/components/form-date-field";
import ButtonWithSpinner from "@/components/button-with-spinner";
import database from "@/lib/appwrite/database";

interface SavingFormProps {
  runAfterSubmit?: () => void;
}

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

export default function SavingForm({ runAfterSubmit }: SavingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      // TODO: Handle TS Error
      // @ts-ignore
      amount: "",
    },
  });

  const { toast } = useToast();
  const { isSubmitting, isValid } = form.formState;

  const submit = form.handleSubmit(async ({ date, amount, title }) => {
    try {
      await database.createIncome({
        title,
        amount: Number(amount),
        date,
      });
      toast({
        title: "Success!",
        description: "Your savings have been added successfully.",
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
          disabled={!isValid}
          type="submit"
          className="mt-2 w-full"
          btnText="Add Record"
        />
      </form>
    </Form>
  );
}

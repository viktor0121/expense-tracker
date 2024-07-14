"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { FormSelectRelatedField } from "@/components/form-select-related-field";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";

interface GoalFormProps {
  runAfterSubmit?: () => void;
}

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(250, "Title must be at most 100 characters"),
  target: z
    .string()
    .trim()
    .min(1, "Amount must not be empty")
    .refine((str) => /^[0-9.-]+$/.test(str), "Amount must contain only numbers")
    .refine((str) => parseFloat(str) >= 0, "Amount must be a positive number")
    .refine((str) => parseFloat(str) >= 0.01, "Amount must be at least 0.01")
    .refine((str) => parseFloat(str) < 10_00_00_000, "Amount must be at most 10,00,00,000"),
  collection: z.string().min(1, "Collection is required"),
});

export function GoalForm({ runAfterSubmit }: GoalFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // @ts-ignore
      target: "",
      title: "",
      collection: "",
    },
  });
  const { isSubmitting, isValid, dirtyFields, isDirty } = form.formState;

  const { goals, setGoals, goalLists, setGoalLists } = useData();
  const { data: goalListsData } = useAppwriteFetch(() => database.getGoalLists());

  const submit = form.handleSubmit(async ({ title, target, collection }) => {
    try {
      const newGoal = await database.createGoal({
        title,
        target: Number(target),
        goalList: collection,
      });
      setGoals([newGoal, ...goals]);
      toast({
        title: "Success!",
        description: `New goal added successfully.`,
      });

      form.reset();

      // Some extra function passed from parent component if any
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
    setGoalLists(goalListsData || []);
  }, [goalListsData]);

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
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSelectRelatedField
          name="collection"
          label="Collection"
          placeholder="Select Collection"
          control={form.control}
          relatedData={goalLists}
          valueKey="$id"
          displayKey="title"
          commandEmptyText="No collection found."
          commandInputPlaceholder="Search Collection"
        />

        {/*Submit Button*/}
        <ButtonWithSpinner
          isLoading={isSubmitting}
          disabled={!isValid || !isDirty}
          type="submit"
          className="mt-2 w-full"
          btnText="Create Goal"
        />
      </form>
    </Form>
  );
}

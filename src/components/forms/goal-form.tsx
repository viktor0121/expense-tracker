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
import { storage } from "@/lib/appwrite/storage";
import { SUPPORTED_IMAGE_FORMATS } from "@/lib/constants";
import { truncateString } from "@/lib/utils";

interface GoalFormProps {
  runAfterSubmit?: () => void;
}

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(250, "Title must be at most 100 characters"),
  image: z.instanceof(FileList).optional(),
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

  const fetcher = () => database.getGoalLists([Query.select(["title", "$id"])]);
  const { data: goalListsData } = useAppwriteFetch(fetcher);

  const submit = form.handleSubmit(async ({ title, target, collection, image: imageFileList }) => {
    try {
      // As form image value is provided in a file list extract the first and only image form list
      const image = imageFileList?.[0];

      // If image is provided, upload it to storage and get the image id
      let imageId: string | undefined;
      if (image) imageId = await storage.createGoalPhoto({ file: image });

      // Create new goal and add it to the list
      const newGoal = await database.createGoal({
        title,
        target: Number(target),
        goalList: collection,
        imageId,
      });
      setGoals([...goals, newGoal]);

      // Show success toast
      toast({
        title: "Success!",
        description: (
          <p>
            New goal <b>{truncateString(title, 20)}</b> has been added successfully.
          </p>
        ),
      });

      // Reset Form & Run some extra function passed from parent component if any
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
    setGoalLists(goalListsData || []);
  }, [goalListsData]);

  return (
    <Form {...form}>
      <form onSubmit={submit} className="grid gap-3">
        {/*Title Input*/}
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

        {/*Target Amount*/}
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

        {/*Collection Select*/}
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

        {/*Goal Image*/}
        <FormField
          name="image"
          control={form.control}
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Goal Image (Optional)</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept={SUPPORTED_IMAGE_FORMATS.join()}
                  onChange={(event) => {
                    const files = event.target.files;
                    onChange(files);
                  }}
                  {...rest}
                />
              </FormControl>
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
          btnText="Create Goal"
        />
      </form>
    </Form>
  );
}

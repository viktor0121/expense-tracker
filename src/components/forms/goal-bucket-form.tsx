import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { IGoalList } from "@/lib/types";
import { truncateString } from "@/lib/utils";

type AddUpdateTypes =
  | {
      action: "add";
      bucket?: undefined;
    }
  | {
      action: "update";
      bucket: IGoalList;
    };

type GoalBucketFormProps = AddUpdateTypes & {
  runAfterSubmit?: () => void;
};

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(250, "Title must be at most 250 characters"),
});

export function GoalBucketForm({ action, bucket, runAfterSubmit }: GoalBucketFormProps) {
  const addActionDefaultValues = {
    title: "",
  };
  const updateActionDefaultValues = {
    title: bucket?.title,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: action === "add" ? addActionDefaultValues : updateActionDefaultValues,
  });

  const { isSubmitting, isValid, isDirty } = form.formState;
  const { setGoalLists, goalLists } = useData();

  const submit = form.handleSubmit(async ({ title }) => {
    try {
      if (action === "add") {
        const newGoalList = await database.createGoalList({ title });
        setGoalLists([newGoalList, ...goalLists]);
        toast({
          title: "Success!",
          description: `New bucket ${truncateString(title, 10)} created successfully.`,
        });
      } else {
        const updatedGoalList = await database.updateGoalList({
          id: bucket.$id,
          ...(title !== bucket?.title ? { title } : {}),
        });
        setGoalLists(goalLists.map((item) => (item.$id === updatedGoalList.$id ? updatedGoalList : item)));
        toast({
          title: "Success!",
          description: `Bucket ${truncateString(title, 10)} updated successfully.`,
        });
      }

      // Reset form & run extra function passed from parent component
      form.reset();
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

        <ButtonWithSpinner
          isLoading={isSubmitting}
          disabled={!isValid || !isDirty}
          type="submit"
          className="mt-2 w-full"
          btnText={`${action} Collection`}
        />
      </form>
    </Form>
  );
}

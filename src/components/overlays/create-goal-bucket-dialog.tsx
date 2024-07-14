import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { useCreateGoalBucketDialog } from "@/store/overlays/useCreateGoalBucketDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(250, "Title must be at most 250 characters"),
});

export function CreateGoalBucketDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid, isDirty } = form.formState;

  const createGoalBucketDialog = useCreateGoalBucketDialog();
  const { setGoalLists, goalLists } = useData();

  const submit = form.handleSubmit(async ({ title }) => {
    try {
      const newGoalList = await database.createGoalList({ title });
      setGoalLists([newGoalList, ...goalLists]);
      toast({
        title: "Success!",
        description: `New goals collection created successfully.`,
      });
      createGoalBucketDialog.close();
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  });

  return (
    <Dialog open={createGoalBucketDialog.isOpen} onOpenChange={createGoalBucketDialog.close}>
      <DialogContent className="space-y-1 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create goals collection</DialogTitle>
          <DialogDescription>
            Create a new collection to group your goals. You can add goals to this collection later
          </DialogDescription>
        </DialogHeader>

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
              btnText="Create Collection"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

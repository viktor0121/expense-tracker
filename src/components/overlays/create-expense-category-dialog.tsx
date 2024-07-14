import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { useExpenseCategoryCreateDialog } from "@/store/overlays/useExpenseCategoryCreateDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";

interface NewCategoryDialogProps {}

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(250, "Title must be at most 100 characters"),
});

export function CreateExpenseCategoryDialog({}: NewCategoryDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const { setExpenseCategories, expenseCategories } = useData();
  const { isOpen, close } = useExpenseCategoryCreateDialog();

  const submit = form.handleSubmit(async ({ title }) => {
    try {
      const newCategory = await database.createExpenseCategory({ title });
      setExpenseCategories([...expenseCategories, newCategory]);
      toast({
        title: "Success!",
        description: "New category has been added successfully.",
      });
      form.reset();
      close();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>Create your own categories</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Shopping" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <ButtonWithSpinner isLoading={isSubmitting} disabled={!isValid} onClick={submit} btnText="Add Category" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

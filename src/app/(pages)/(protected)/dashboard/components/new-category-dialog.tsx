import React, { useState } from "react";
import { z } from "zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ButtonWithSpinner from "@/components/button-with-spinner";
import useDataContext from "@/context/data/useDataContext";
import database from "@/lib/appwrite/database";

interface NewCategoryDialogProps {}

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(250, "Title must be at most 100 characters"),
});

export default function NewCategoryDialog({}: NewCategoryDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const [open, setOpen] = useState<boolean>(false);
  const { setExpenseCategories } = useDataContext();

  const submit = form.handleSubmit(async ({ title }) => {
    try {
      const newCategory = await database.createExpenseCategory({ title });
      setExpenseCategories((prev) => [...prev, newCategory]);
      toast({
        title: "Success!",
        description: "New category has been added successfully.",
      });
      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 size-9 rounded-sm text-muted-foreground hover:text-white"
            >
              <PlusIcon className="size-[18px]" />
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>
          <p>New category</p>
        </TooltipContent>
      </Tooltip>

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
          <ButtonWithSpinner
            isLoading={isSubmitting}
            disabled={!isValid}
            onClick={submit}
            btnText="Add Category"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

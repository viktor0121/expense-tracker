"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import database from "@/lib/appwrite/database";
import { IExpenseCategory } from "@/lib/types";
import { useData } from "@/store/useData";

interface CategoryDeleteDialogProps {
  category: IExpenseCategory;
}

export function CategoryDeleteDialog({ category }: CategoryDeleteDialogProps) {
  const { setExpenseCategories, expenseCategories } = useData();

  const deleteCategory = async () => {
    try {
      await database.deleteExpenseCategory({ id: category.$id });
      const newExpenseCategories = expenseCategories.filter((item) => item.$id !== category.$id);
      setExpenseCategories(newExpenseCategories);
      toast({
        title: "Category Deleted",
        description: (
          <p>
            Category <b>{category.title}</b> has been deleted.
          </p>
        ),
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hidden pr-2 group-hover:block">
        <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the category <b>{category.title}</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={deleteCategory}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

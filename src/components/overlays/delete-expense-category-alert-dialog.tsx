"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useExpenseCategoryDeleteDialog } from "@/store/overlays/useExpenseCategoryDeleteDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";

export function DeleteExpenseCategoryAlertDialog() {
  const { setExpenseCategories, expenseCategories } = useData();
  const { category, isOpen, close } = useExpenseCategoryDeleteDialog();

  if (!category) return null;

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
    <AlertDialog open={isOpen} onOpenChange={close}>
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

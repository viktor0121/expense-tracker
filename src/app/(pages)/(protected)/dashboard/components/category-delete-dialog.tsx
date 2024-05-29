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
import { IExpenseCategory } from "@/lib/types";
import database from "@/lib/appwrite/database";

interface CategoryDeleteDialogProps {
  category: IExpenseCategory;
  setCategories: React.Dispatch<React.SetStateAction<IExpenseCategory[]>>;
}

export default function CategoryDeleteDialog({
  category,
  setCategories,
}: CategoryDeleteDialogProps) {
  const deleteCategory = async () => {
    try {
      await database.deleteExpenseCategory({ id: category.$id });
      setCategories((prev) => prev.filter((item) => item.$id !== category.$id));
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
      <AlertDialogTrigger className="hidden group-hover:block pr-2">
        <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the category{" "}
            <b>{category.title}</b>.
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

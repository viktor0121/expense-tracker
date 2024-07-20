import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { useDeleteGoalDialog } from "@/store/overlays/useDeleteGoalDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";

export function DeleteGoalAlertDialog() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { goals, setGoals } = useData();
  const { isOpen, goal, close } = useDeleteGoalDialog();

  if (!isOpen || !goal) return null;

  const deleteBtnClick = async () => {
    setIsSubmitting(true);

    try {
      await database.deleteGoal({ id: goal.$id });
      const newGoals = goals.filter((item) => item.$id !== goal.$id);
      setGoals(newGoals);

      // Show success toast and close dialog
      toast({
        title: "Goal deleted",
        description: `Goal ${goal.title} deleted successfully`,
      });
      close();
    } catch (error: any) {
      // Show error toast
      toast({
        variant: "destructive",
        title: "Failed to delete goal",
        description: error.message,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the goal <b>{goal.title}</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <ButtonWithSpinner isLoading={isSubmitting} btnText="Delete" onClick={deleteBtnClick} variant="destructive" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

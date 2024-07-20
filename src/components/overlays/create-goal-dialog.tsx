import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoalForm } from "@/components/forms/goal-form";
import { useCreateGoalDialog } from "@/store/overlays/useCreateGoalDialog";

export function CreateGoalDialog() {
  const { isOpen, close } = useCreateGoalDialog();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Goal</DialogTitle>
          <DialogDescription>Create a new goal</DialogDescription>
        </DialogHeader>

        <GoalForm action="add" runAfterSubmit={close} />
      </DialogContent>
    </Dialog>
  );
}

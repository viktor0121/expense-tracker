import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoalForm } from "@/components/forms/goal-form";
import { useUpdateGoalDialog } from "@/store/overlays/useUpdateGoalDialog";
import { truncateString } from "@/lib/utils";

export function UpdateGoalDialog() {
  const { isOpen, close, goal } = useUpdateGoalDialog();

  if (!goal || !isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="space-y-1 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Update goal</DialogTitle>
          <DialogDescription>Update the goal {truncateString(goal.title, 20)}</DialogDescription>
        </DialogHeader>

        <GoalForm action="update" goal={goal} runAfterSubmit={close} />
      </DialogContent>
    </Dialog>
  );
}

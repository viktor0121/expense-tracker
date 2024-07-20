import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoalBucketForm } from "@/components/forms/goal-bucket-form";
import { useCreateGoalBucketDialog } from "@/store/overlays/useCreateGoalBucketDialog";

export function CreateGoalBucketDialog() {
  const createGoalBucketDialog = useCreateGoalBucketDialog();
  return (
    <Dialog open={createGoalBucketDialog.isOpen} onOpenChange={createGoalBucketDialog.close}>
      <DialogContent className="space-y-1 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create goals collection</DialogTitle>
          <DialogDescription>
            Create a new collection to group your goals. You can add goals to this collection later
          </DialogDescription>
        </DialogHeader>

        <GoalBucketForm runAfterSubmit={createGoalBucketDialog.close} />
      </DialogContent>
    </Dialog>
  );
}

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoalBucketForm } from "@/components/forms/goal-bucket-form";
import { useUpdateGoalBucketDialog } from "@/store/overlays/useUpdateGoalBucketDialog";
import { truncateString } from "@/lib/utils";

export function UpdateGoalBucketDialog() {
  const { isOpen, close, bucket } = useUpdateGoalBucketDialog();

  if (!bucket || !isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="space-y-1 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Update Bucket</DialogTitle>
          <DialogDescription>Update the goal bucket {truncateString(bucket.title, 20)}</DialogDescription>
        </DialogHeader>

        <GoalBucketForm action="update" bucket={bucket} runAfterSubmit={close} />
      </DialogContent>
    </Dialog>
  );
}

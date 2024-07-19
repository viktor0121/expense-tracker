import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useDeleteGoalBucketDialog } from "@/store/overlays/useDeleteGoalBucketDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";

export function DeleteGoalBucketAlertDialog() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { goalLists, setGoalLists } = useData();
  const { isOpen, bucket, close } = useDeleteGoalBucketDialog();
  const router = useRouter();

  // If bucketId is invalid or bucket data is not fetched yet, return null
  if (!isOpen || !bucket) return null;

  const deleteBtnClick = async () => {
    setIsSubmitting(true);

    try {
      await database.deleteGoalList({ id: bucket.$id });
      const newGoalLists = goalLists.filter((item) => item.$id !== bucket.$id);
      setGoalLists(newGoalLists);

      // Show success toast and close dialog
      toast({
        title: "Success!",
        description: `Bucket ${bucket.title} deleted successfully`,
      });

      router.push("/goal-buckets");
      close();
    } catch (error: any) {
      // Show error toast
      toast({
        variant: "destructive",
        title: "Failed to delete goal bucket",
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
            This action cannot be undone. This will permanently delete the goal bucket <b>{bucket.title}</b>.
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

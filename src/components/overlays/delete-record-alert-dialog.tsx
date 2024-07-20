import React, { useState } from "react";
import { formatDate } from "date-fns";
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
import { useDeleteRecordDialog } from "@/store/overlays/useDeleteRecordDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";

export function DeleteRecordAlertDialog() {
  const { expenses, setExpenses, earnings, setEarnings } = useData();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const deleteDialog = useDeleteRecordDialog();

  // Return null if recordType or record is not provided
  if (!deleteDialog.recordType || !deleteDialog.record) return null;

  const deleteBtnClick = async () => {
    setIsSubmitting(true);

    try {
      if (deleteDialog.recordType === "expense") {
        await database.deleteExpense({ id: deleteDialog.record.$id });
        const newExpenses = expenses.filter((item) => item.$id !== deleteDialog.record.$id);
        setExpenses(newExpenses);
      } else if (deleteDialog.recordType === "earning") {
        await database.deleteIncome({ id: deleteDialog.record.$id });
        const newEarnings = earnings.filter((item) => item.$id !== deleteDialog.record.$id);
        setEarnings(newEarnings);
      } else {
        return;
      }

      // Show success toast and close dialog
      toast({
        title: "Success!",
        description: (
          <p>
            The {deleteDialog.recordType} <b>{deleteDialog.record.title}</b> has been deleted successfully
          </p>
        ),
      });
      deleteDialog.close();
    } catch (error: any) {
      // Show error toast
      toast({
        variant: "destructive",
        title: `Failed to delete ${deleteDialog.recordType}`,
        description: error.message,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <AlertDialog open={deleteDialog.isOpen} onOpenChange={deleteDialog.close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {deleteDialog.recordType} record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-1.5 rounded-md bg-primary-foreground p-3 text-sm tracking-wider">
          {[
            {
              key: "Title",
              value: deleteDialog.record.title,
            },
            {
              key: "Amount",
              value: deleteDialog.record.amount,
            },
            {
              key: "Date",
              value: formatDate(new Date(deleteDialog.record.date).toLocaleDateString(), "dd MMM yyyy"),
            },
          ].map(({ key, value }) => (
            <div key={key}>
              <b className="">{key}</b>: {value}
            </div>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <ButtonWithSpinner isLoading={isSubmitting} btnText="Delete" onClick={deleteBtnClick} variant="destructive" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

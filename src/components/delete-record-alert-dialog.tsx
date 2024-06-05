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
import ButtonWithSpinner from "@/components/button-with-spinner";
import useOverlaysContext from "@/context/overlays/useOverlaysContext";
import { toast } from "@/components/ui/use-toast";
import useDataContext from "@/context/data/useDataContext";
import database from "@/lib/appwrite/database";

export default function DeleteRecordAlertDialog() {
  const { setExpenses, setSavings } = useDataContext();
  const { deleteRecordDialog, setDeleteRecordDialog } = useOverlaysContext();
  const { recordType, record } = deleteRecordDialog;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Return null if recordType or record is not provided
  if (!recordType || !record) return null;

  const deleteBtnClick = async () => {
    setIsSubmitting(true);

    try {
      if (recordType === "expense") {
        await database.deleteExpense({ id: record.$id });
        setExpenses((prev) => prev.filter((item) => item.$id !== record.$id));
      } else if (recordType === "saving") {
        await database.deleteIncome({ id: record.$id });
        setSavings((prev) => prev.filter((item) => item.$id !== record.$id));
      } else {
        return;
      }

      // Show success toast and close dialog
      toast({
        title: `${recordType} deleted`,
        description: `${record.title} deleted successfully`,
      });
      setDeleteRecordDialog((prev) => ({
        open: false,
      }));
    } catch (error: any) {
      // Show error toast
      toast({
        variant: "destructive",
        title: `Failed to delete ${recordType}`,
        description: error.message,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <AlertDialog
      open={deleteRecordDialog.open}
      onOpenChange={(open) =>
        setDeleteRecordDialog((prev) => {
          const { record, recordType } = prev;
          if (open && record && recordType) return { ...prev, open: true };
          return { open: false };
        })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {recordType} record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid p-3 gap-1.5 rounded-md bg-primary-foreground tracking-wider text-sm">
          {[
            {
              key: "Title",
              value: record.title,
            },
            {
              key: "Amount",
              value: record.amount,
            },
            {
              key: "Date",
              value: formatDate(new Date(record.date).toLocaleDateString(), "dd MMM yyyy"),
            },
          ].map(({ key, value }) => (
            <div key={key}>
              <b className="">{key}</b>: {value}
            </div>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <ButtonWithSpinner
            isLoading={isSubmitting}
            btnText="Delete"
            onClick={deleteBtnClick}
            variant="destructive"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

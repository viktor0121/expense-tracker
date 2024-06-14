import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useOverlaysContext from "@/context/overlays/useOverlaysContext";
import IncomeForm from "@/app/(pages)/(protected)/dashboard/components/income-form";
import ExpenseForm from "@/app/(pages)/(protected)/dashboard/components/expense-form";

export default function UpdateRecordDialog() {
  const { updateRecordDialog, setUpdateRecordDialog } = useOverlaysContext();
  const { recordType, record } = updateRecordDialog;

  // Return null if recordType or record is not provided
  if (!recordType || !record) return null;

  return (
    <Dialog
      open={updateRecordDialog.open}
      onOpenChange={(open) =>
        setUpdateRecordDialog((prev) => {
          const { record, recordType } = prev;
          if (open && record && recordType) return { ...prev, open: true };
          return { open: false };
        })
      }
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update {recordType} record</DialogTitle>
          <DialogDescription>
            Make changes to your record here. Click update when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {recordType === "earning" ? (
          <IncomeForm
            recordType="update"
            record={record}
            runAfterSubmit={() => {
              setUpdateRecordDialog((prev) => ({
                open: false,
              }));
            }}
          />
        ) : (
          <ExpenseForm
            recordType="update"
            record={record}
            runAfterSubmit={() => {
              setUpdateRecordDialog((prev) => ({
                open: false,
              }));
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

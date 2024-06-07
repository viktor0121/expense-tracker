import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDataContext from "@/context/data/useDataContext";
import useOverlaysContext from "@/context/overlays/useOverlaysContext";
import SavingForm from "@/app/(pages)/(protected)/dashboard/components/saving-form";
import ExpenseForm from "@/app/(pages)/(protected)/dashboard/components/expense-form";

export default function UpdateRecordDialog() {
  const { setExpenses, setSavings } = useDataContext();
  const { updateRecordDialog, setUpdateRecordDialog } = useOverlaysContext();
  const { recordType, record } = updateRecordDialog;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
        {recordType === "saving" ? (
          <SavingForm
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

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateRecordDialog } from "@/store/overlays/useUpdateRecordDialog";
import { ExpenseForm } from "@/components/forms/expense-form";
import { IncomeForm } from "@/components/forms/income-form";

export function UpdateRecordDialog() {
  const updateDialog = useUpdateRecordDialog();

  // Return null if recordType or record is not provided
  if (!updateDialog.recordType || !updateDialog.record) return null;

  return (
    <Dialog open={updateDialog.isOpen} onOpenChange={updateDialog.close}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update {updateDialog.recordType} record</DialogTitle>
          <DialogDescription>Make changes to your record here. Click update when you&apos;re done.</DialogDescription>
        </DialogHeader>
        {updateDialog.recordType === "earning" ? (
          <IncomeForm recordType="update" record={updateDialog.record} runAfterSubmit={updateDialog.close} />
        ) : (
          <ExpenseForm recordType="update" record={updateDialog.record} runAfterSubmit={updateDialog.close} />
        )}
      </DialogContent>
    </Dialog>
  );
}

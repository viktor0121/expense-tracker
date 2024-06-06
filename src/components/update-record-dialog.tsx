import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { formatDate } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonWithSpinner from "@/components/button-with-spinner";
import useDataContext from "@/context/data/useDataContext";
import useOverlaysContext from "@/context/overlays/useOverlaysContext";
import database from "@/lib/appwrite/database";
import SavingForm from "@/app/(pages)/(protected)/dashboard/components/saving-form";

export default function UpdateRecordDialog() {
  const { setExpenses, setSavings } = useDataContext();
  const { updateRecordDialog, setUpdateRecordDialog } = useOverlaysContext();
  const { recordType, record } = updateRecordDialog;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Return null if recordType or record is not provided
  if (!recordType || !record) return null;

  const deleteBtnClick = async () => {
    setIsSubmitting(true);

    try {
      if (recordType === "expense") {
        // await database.updateExpense({ });
        // setExpenses((prev) => prev.filter((item) => item.$id !== record.$id));
      } else if (recordType === "saving") {
        // await database.updateIncome({  });
        // setSavings((prev) => prev.filter((item) => item.$id !== record.$id));
      } else {
        return;
      }

      // Show success toast and close dialog
      toast({
        title: `${recordType} updated`,
        description: `${record.title} updated successfully`,
      });
      setUpdateRecordDialog((prev) => ({
        open: false,
      }));
    } catch (error: any) {
      // Show error toast
      toast({
        variant: "destructive",
        title: `Failed to update ${recordType}`,
        description: error.message,
      });
    }
    setIsSubmitting(false);
  };

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
            Make changes to your record here. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
        <SavingForm
          type="update"
          record={record}
          runAfterSubmit={() => {
            setUpdateRecordDialog((prev) => ({
              open: false,
            }));
          }}
        />
        <DialogFooter>
          {/*<ButtonWithSpinner isLoading={isSubmitting} btnText="Update" onClick={deleteBtnClick} />*/}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

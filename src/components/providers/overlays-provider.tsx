"use client";

import React from "react";
import { AddNewRecordSheet } from "@/components/overlays/add-new-record-sheet";
import { DeleteRecordAlertDialog } from "@/components/overlays/delete-record-alert-dialog";
import { SignOutAlertDialog } from "@/components/overlays/sign-out-alert-dialog";
import { UpdateRecordDialog } from "@/components/overlays/update-record-dialog";
import { ExpenseCategoryCreateDialog } from "@/components/overlays/expense-category-create-dialog";
import { ExpenseCategoryDeleteDialog } from "@/components/overlays/expense-category-delete-dialog";

export function OverlaysProvider() {
  return (
    <>
      <SignOutAlertDialog />

      {/*Expense and Earning*/}
      <AddNewRecordSheet />
      <DeleteRecordAlertDialog />
      <UpdateRecordDialog />
      <ExpenseCategoryCreateDialog />
      <ExpenseCategoryDeleteDialog />


      {/*Goal*/}
    </>
  );
}

"use client";

import React from "react";
import { CreateRecordSheet } from "@/components/overlays/create-record-sheet";
import { DeleteRecordAlertDialog } from "@/components/overlays/delete-record-alert-dialog";
import { SignOutAlertDialog } from "@/components/overlays/sign-out-alert-dialog";
import { UpdateRecordDialog } from "@/components/overlays/update-record-dialog";
import { CreateExpenseCategoryDialog } from "@/components/overlays/create-expense-category-dialog";
import { DeleteExpenseCategoryDialog } from "@/components/overlays/delete-expense-category-dialog";

export function OverlaysProvider() {
  return (
    <>
      <SignOutAlertDialog />

      {/*Expense and Earning*/}
      <CreateRecordSheet />
      <DeleteRecordAlertDialog />
      <UpdateRecordDialog />
      <CreateExpenseCategoryDialog />
      <DeleteExpenseCategoryDialog />


      {/*Goal*/}
    </>
  );
}

"use client";

import React from "react";
import { CreateExpenseCategoryDialog } from "@/components/overlays/create-expense-category-dialog";
import { CreateGoalBucketDialog } from "@/components/overlays/create-goal-bucket-dialog";
import { CreateGoalDialog } from "@/components/overlays/create-goal-dialog";
import { CreateRecordSheet } from "@/components/overlays/create-record-sheet";
import { DeleteExpenseCategoryAlertDialog } from "@/components/overlays/delete-expense-category-alert-dialog";
import { DeleteRecordAlertDialog } from "@/components/overlays/delete-record-alert-dialog";
import { SignOutAlertDialog } from "@/components/overlays/sign-out-alert-dialog";
import { UpdateRecordDialog } from "@/components/overlays/update-record-dialog";

export function OverlaysProvider() {
  return (
    <>
      {/*Expense and Earning*/}
      <CreateRecordSheet />
      <UpdateRecordDialog />
      <DeleteRecordAlertDialog />

      {/*Expense Category*/}
      <CreateExpenseCategoryDialog />
      <DeleteExpenseCategoryAlertDialog />

      {/*Goal Bucket*/}
      <CreateGoalBucketDialog />

      {/*Goal*/}
      <CreateGoalDialog />

      {/*Auth*/}
      <SignOutAlertDialog />
    </>
  );
}

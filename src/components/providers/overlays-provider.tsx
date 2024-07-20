"use client";

import React from "react";
import { CreateExpenseCategoryDialog } from "@/components/overlays/create-expense-category-dialog";
import { CreateGoalBucketDialog } from "@/components/overlays/create-goal-bucket-dialog";
import { CreateGoalDialog } from "@/components/overlays/create-goal-dialog";
import { CreateRecordSheet } from "@/components/overlays/create-record-sheet";
import { DeleteExpenseCategoryAlertDialog } from "@/components/overlays/delete-expense-category-alert-dialog";
import { DeleteGoalAlertDialog } from "@/components/overlays/delete-goal-alert-dialog";
import { DeleteGoalBucketAlertDialog } from "@/components/overlays/delete-goal-bucket-alert-dialog";
import { DeleteRecordAlertDialog } from "@/components/overlays/delete-record-alert-dialog";
import { SignOutAlertDialog } from "@/components/overlays/sign-out-alert-dialog";
import { UpdateGoalBucketDialog } from "@/components/overlays/update-goal-bucket-dialog";
import { UpdateGoalDialog } from "@/components/overlays/update-goal-dialog";
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
      <UpdateGoalBucketDialog />
      <DeleteGoalBucketAlertDialog />

      {/*Goal*/}
      <CreateGoalDialog />
      <UpdateGoalDialog />
      <DeleteGoalAlertDialog />

      {/*Auth*/}
      <SignOutAlertDialog />
    </>
  );
}

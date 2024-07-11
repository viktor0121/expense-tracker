"use client";

import { SignOutAlertDialog } from "@/app/(pages)/components/sign-out-alert-dialog";
import { AddNewRecordSheet } from "@/app/(pages)/components/add-new-record-sheet";
import { DeleteRecordAlertDialog } from "@/app/(pages)/components/delete-record-alert-dialog";
import { UpdateRecordDialog } from "@/app/(pages)/components/update-record-dialog";
import React from "react";

export function OverlaysProvider() {
  return (
    <>
      <SignOutAlertDialog />
      <AddNewRecordSheet />
      <DeleteRecordAlertDialog />
      <UpdateRecordDialog />
    </>
  );
}

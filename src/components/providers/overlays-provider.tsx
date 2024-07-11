"use client";

import { SignOutAlertDialog } from "@/app/_components/sign-out-alert-dialog";
import { AddNewRecordSheet } from "@/app/_components/add-new-record-sheet";
import { DeleteRecordAlertDialog } from "@/app/_components/delete-record-alert-dialog";
import { UpdateRecordDialog } from "@/app/_components/update-record-dialog";
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

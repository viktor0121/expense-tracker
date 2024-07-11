"use client";

import React from "react";
import { AddNewRecordSheet } from "@/app/_components/overlays/add-new-record-sheet";
import { DeleteRecordAlertDialog } from "@/app/_components/overlays/delete-record-alert-dialog";
import { SignOutAlertDialog } from "@/app/_components/overlays/sign-out-alert-dialog";
import { UpdateRecordDialog } from "@/app/_components/overlays/update-record-dialog";

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

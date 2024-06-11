"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import useAuthContext from "@/context/auth/useAuthContext";
import Navbar from "@/app/(pages)/components/navbar";
import Loading from "@/app/(pages)/components/loading";
import AddNewRecordSheet from "@/app/(pages)/components/add-new-record-sheet";
import UpdateRecordDialog from "@/app/(pages)/components/update-record-dialog";
import SignOutAlertDialog from "@/app/(pages)/components/sign-out-alert-dialog";
import DeleteRecordAlertDialog from "@/app/(pages)/components/delete-record-alert-dialog";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isAuthLoading } = useAuthContext();

  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-muted/40">
        <Navbar />
        <main>
          {/*TODO: Implement a loading spinner  */}
          {isAuthLoading ? <Loading /> : children}
        </main>
      </div>

      <SignOutAlertDialog />
      <AddNewRecordSheet />
      <DeleteRecordAlertDialog />
      <UpdateRecordDialog />

      <Toaster />
    </>
  );
}

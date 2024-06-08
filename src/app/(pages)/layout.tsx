"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import useAuthContext from "@/context/auth/useAuthContext";
import Navbar from "@/components/navbar";
import AddNewSheet from "@/components/add-new-sheet";
import UpdateRecordDialog from "@/components/update-record-dialog";
import SignOutAlertDialog from "@/components/sign-out-alert-dialog";
import DeleteRecordAlertDialog from "@/components/delete-record-alert-dialog";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isAuthLoading } = useAuthContext();

  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-muted/40">
        <Navbar />
        <main>
          {/*TODO: Implement a loading spinner  */}
          {isAuthLoading ? <p>Loading...</p> : children}
        </main>
      </div>

      <SignOutAlertDialog />
      <AddNewSheet />
      <DeleteRecordAlertDialog />
      <UpdateRecordDialog />

      <Toaster />
    </>
  );
}

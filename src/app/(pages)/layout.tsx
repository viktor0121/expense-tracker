"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import SignOutAlertDialog from "@/components/sign-out-alert-dialog";
import AddNewSheet from "@/components/add-new-sheet";
import DeleteRecordAlertDialog from "@/components/delete-record-alert-dialog";
import UpdateRecordDialog from "@/components/update-record-dialog";
import useAuthContext from "@/context/auth/useAuthContext";

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

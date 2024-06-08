"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import useLoadingContext from "@/context/loading/useLoadingContext";
import SignOutAlertDialog from "@/components/sign-out-alert-dialog";
import AddNewSheet from "@/components/add-new-sheet";
import DeleteRecordAlertDialog from "@/components/delete-record-alert-dialog";
import UpdateRecordDialog from "@/components/update-record-dialog";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isLoading } = useLoadingContext();

  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-muted/40">
        <Navbar />
        <main>
          {/*TODO: Implement a loading spinner  */}
          {isLoading ? <p>Loading...</p> : children}
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

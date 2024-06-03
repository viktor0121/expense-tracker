"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import useAuthContext from "@/context/auth/useAuthContext";
import useOverlaysContext from "@/context/overlays/useOverlaysContext";
import auth from "@/lib/appwrite/auth";

interface SignOutAlertDialogProps {}

export default function SignOutAlertDialog({}: SignOutAlertDialogProps) {
  const { signOutDialog, setSignOutDialog } = useOverlaysContext();
  const { setAuthStatus } = useAuthContext();

  const handleSignOut = async () => {
    await auth.signOut();
    setAuthStatus(false);
  };

  return (
    <AlertDialog open={signOutDialog} onOpenChange={setSignOutDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are about to sign out</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to sign out?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={handleSignOut}
          >
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import React, { useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { useSignOutDialog } from "@/store/overlays/useSignOutDialog";

interface SignOutAlertDialogProps {}

export function SignOutAlertDialog({}: SignOutAlertDialogProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { setAuthStatus } = useAuthContext();
  const signOutDialog = useSignOutDialog();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await auth.signOut();
      setAuthStatus(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setIsSigningOut(false);
      signOutDialog.close();
    }
  };

  return (
    <AlertDialog open={signOutDialog.isOpen} onOpenChange={signOutDialog.close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are about to sign out</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to sign out?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <ButtonWithSpinner
            isLoading={isSigningOut}
            btnText={"Sign out"}
            onClick={handleSignOut}
            variant="destructive"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

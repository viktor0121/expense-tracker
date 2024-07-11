import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOutDialog } from "@/store/overlays/useSignOutDialog";
import auth from "@/lib/appwrite/auth";
import avatars from "@/lib/appwrite/avatars";
import storage from "@/lib/appwrite/storage";

interface NavDropdownMenuProps {}

export function NavDropdownMenu({}: NavDropdownMenuProps) {
  const [avatar, setAvatar] = useState<string>("");
  const signOutDialog = useSignOutDialog();

  useEffect(() => {
    (async function () {
      try {
        // Set the user's avatar if it exists
        const photoId = await auth.getPreference<string>("photoFileId");
        if (photoId) return setAvatar(storage.getProfilePhotoUrl({ photoId }));

        // If the user doesn't have an avatar, set their initials
        const user = await auth.getCurrentUser();
        if (user) setAvatar(String(avatars.avatars.getInitials(user?.name)));
      } catch (error) {
        console.error("NavDropdownMenu :: useEffect() :: ", error);
      }
    })();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
          {avatar ? (
            <Image src={avatar} alt="User avatar" width={40} height={40} className="rounded-full" />
          ) : (
            <User2 className="size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="#">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button onClick={signOutDialog.open} className="w-full">
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

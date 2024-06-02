"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  DollarSign,
  LogOut,
  LucideIcon,
  SunMoon,
  Target,
  Terminal,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { checkIsMobile, getModifierKey } from "@/lib/utils";
import { EModifierKey } from "@/lib/enums";

interface Command {
  title: string;
  Icon: LucideIcon;
  action: () => void;
}

interface CommadPalletProps {
  handleSignOut: () => void;
}

export default function CommandPallet({ handleSignOut }: CommadPalletProps) {
  const [modifierKey, setModifierKey] = useState<EModifierKey>(EModifierKey.Other);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggle = () => setOpen((open) => !open);
  const commandAction = (func: () => void) => {
    func();
    setOpen(false);
  };

  const dashboardCommands: Command[] = [
    {
      title: "Overview",
      Icon: Target,
      action: () => commandAction(() => router.push("/dashboard?tab=overview")),
    },
    {
      title: "Expenses",
      Icon: CreditCard,
      action: () => commandAction(() => router.push("/dashboard?tab=expenses")),
    },
    {
      title: "Savings",
      Icon: DollarSign,
      action: () => commandAction(() => router.push("/dashboard?tab=savings")),
    },
  ];
  const settingsCommands: Command[] = [
    {
      title: "Profile",
      Icon: User,
      action: () => commandAction(() => router.push("/settings/profile")),
    },
    {
      title: "Appearance",
      Icon: SunMoon,
      action: () => commandAction(() => router.push("/settings/appearance")),
    },
  ];
  const otherCommands: Command[] = [
    {
      title: "Logout",
      Icon: LogOut,
      action: () => commandAction(handleSignOut),
    },
  ];

  useEffect(() => {
    setIsMobile(checkIsMobile());
    setModifierKey(getModifierKey());

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        onClick={toggle}
        variant="outline"
        className="ml-auto gap-2 text-muted-foreground hover:text-accent-foreground "
      >
        <div className="flex items-center">
          <Terminal className="h-4" />
          <span>Command</span>
        </div>

        {!isMobile ? (
          //TODO: Check if any font size mismatch is there in mac device
          <kbd className="pointer-events-none hidden text-xs select-none items-center gap-1 rounded border bg-muted h-5 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span>{modifierKey}</span>
            {"K"}
          </kbd>
        ) : null}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Dashboard">
            {dashboardCommands.map((command, index) => (
              <CommandItem key={index} onSelect={command.action}>
                <command.Icon className="mr-2 h-4 w-4" />
                <span>{command.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            {settingsCommands.map((command, index) => (
              <CommandItem key={index} onSelect={command.action}>
                <command.Icon className="mr-2 h-4 w-4" />
                <span>{command.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Others">
            {otherCommands.map((command, index) => (
              <CommandItem key={index} onSelect={command.action}>
                <command.Icon className="mr-2 h-4 w-4" />
                <span>{command.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

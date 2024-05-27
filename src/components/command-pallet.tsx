"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LucideIcon, CreditCard, DollarSign, SunMoon, Target, Terminal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface Command {
  title: string;
  Icon: LucideIcon;
  action: () => void;
}

export default function CommandPallet() {
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
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
      <Button onClick={toggle} variant="outline" className="ml-auto ">
        <div className="flex items-center">
          <Terminal className="h-4" />
          <span>Command</span>
        </div>

        <Separator orientation="vertical" className="hidden sm:block mx-2" />

        <kbd className="hidden sm:inline-flex pointer-events-none h-5 select-none items-center justify-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
          <span className="text-[0.6rem]">⌘</span>K
        </kbd>
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
        </CommandList>
      </CommandDialog>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  LucideIcon,
  CreditCard,
  DollarSign,
  LogIn,
  LogOut,
  PlusIcon,
  SunMoon,
  Target,
  Terminal,
  User,
  UserPlus,
  BarChart,
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
import { useAddNewRecordSheet } from "@/store/overlays/useAddNewRecordSheet";
import { useSignOutDialog } from "@/store/overlays/useSignOutDialog";
import { useAuth } from "@/store/useAuth";
import { EAuthTabs, EDashboardTabs, EModifierKey, ETheme } from "@/lib/enums";

interface Command {
  title: string;
  Icon: LucideIcon;
  action: () => void;
}

interface CommandPalletProps {}

export function CommandPallet({}: CommandPalletProps) {
  const [open, setOpen] = useState<boolean>(false);

  const signOutDialog = useSignOutDialog();
  const addNewRecordSheet = useAddNewRecordSheet();

  const { setTheme, systemTheme, theme } = useTheme();
  const { authStatus } = useAuth();
  const router = useRouter();

  const toggle = () => setOpen((open) => !open);
  const commandAction = (func: () => void) => {
    func();
    setOpen(false);
  };

  const notAuthCommands: Command[] = [
    {
      title: "Sign In",
      Icon: LogIn,
      action: () => commandAction(() => router.push(`/auth?tab=${EAuthTabs.Login}`)),
    },
    {
      title: "Register",
      Icon: UserPlus,
      action: () => commandAction(() => router.push(`/auth?tab=${EAuthTabs.Register}`)),
    },
  ];

  const addNewCommands: Command[] = [
    {
      title: "Add Expense",
      Icon: PlusIcon,
      action: () => commandAction(addNewRecordSheet.openExpense),
    },
    {
      title: "Add Earning",
      Icon: PlusIcon,
      action: () => commandAction(addNewRecordSheet.openEarning),
    },
  ];

  const gotoCommands: Command[] = [
    {
      title: "Analytics",
      Icon: BarChart,
      action: () => commandAction(() => router.push(`/dashboard?tab=${EDashboardTabs.Analytics}`)),
    },
    {
      title: "Expenses",
      Icon: CreditCard,
      action: () => commandAction(() => router.push(`/dashboard?tab=${EDashboardTabs.Expenses}`)),
    },
    {
      title: "Earnings",
      Icon: DollarSign,
      action: () => commandAction(() => router.push(`/dashboard?tab=${EDashboardTabs.Earnings}`)),
    },
    {
      title: "Goals",
      Icon: Target,
      action: () => commandAction(() => router.push("/goals")),
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

  const otherAuthCommands: Command[] = [
    {
      title: "Sign Out",
      Icon: LogOut,
      action: () => commandAction(signOutDialog.open),
    },
  ];

  const otherCommands: Command[] = [
    {
      title: "Toggle Theme",
      Icon: SunMoon,
      action: () =>
        commandAction(() => {
          if (theme === ETheme.Light || systemTheme === "light") setTheme(ETheme.Dark);
          else setTheme(ETheme.Light);
        }),
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
      <Button
        onClick={toggle}
        variant="outline"
        className="ml-auto gap-2 px-2 text-muted-foreground hover:text-accent-foreground"
      >
        <div className="flex items-center">
          <Terminal className="h-4" />
          <span>Command</span>
        </div>

        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-sm">{EModifierKey.Mac}</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="">
          <CommandEmpty>No results found.</CommandEmpty>

          {/*NOT AUTH - AUTHENTICATION COMMANDS*/}
          {!authStatus ? (
            <>
              <CommandGroup heading="Auth">
                {notAuthCommands.map((command, index) => (
                  <CommandItem key={index} onSelect={command.action}>
                    <command.Icon className="mr-2 h-4 w-4" />
                    <span>{command.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          ) : (
            <>
              <CommandGroup heading="Goto">
                {gotoCommands.map((command, index) => (
                  <CommandItem key={index} onSelect={command.action}>
                    <command.Icon className="mr-2 h-4 w-4" />
                    <span>{command.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Add New">
                {addNewCommands.map((command, index) => (
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
            </>
          )}

          <CommandSeparator />

          <CommandGroup heading="Others">
            {/*AUTH - OTHER COMMANDS*/}
            {authStatus ? (
              <>
                {otherAuthCommands.map((command, index) => (
                  <CommandItem key={index} onSelect={command.action}>
                    <command.Icon className="mr-2 h-4 w-4" />
                    <span>{command.title}</span>
                  </CommandItem>
                ))}
              </>
            ) : null}

            {/*OTHER COMMANDS*/}
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

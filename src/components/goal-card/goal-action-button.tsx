import React from "react";
import { Loader2Icon, LoaderCircle, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  isSubmitting?: boolean;
  side: "left" | "right";
  text: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

/*
 * This should be placed in a group container to show the button on group hover
 */
export function GoalActionButton({ side, isSubmitting, text, icon: Icon, onClick, className }: ActionButtonProps) {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={onClick}
      aria-label="Delete goal"
      disabled={isSubmitting}
      className={cn(
        // Translate the button to the left or right
        "gap-2.5 px-2.5",
        side === "right" ? "hover:translate-x-0.5" : "hover:-translate-x-0.5",
        side === "right" ? "translate-x-[calc(100%-1rem-10px-10px)]" : "-translate-x-[calc(100%-1rem-10px-10px)]",

        // Position the button to the left or right
        side === "left" ? "left-0" : "right-0",

        // Makes the icon to be shown in left or right side respectively
        side === "left" ? "flex-row-reverse" : "flex-row",

        // Border radius
        "rounded-sm",
        side === "right" ? "rounded-r-none" : "rounded-l-none",

        "absolute top-1 h-8",
        "hidden group-hover:flex",
        "transition duration-300",
        "filter backdrop-blur-sm",
        "bg-primary-foreground/70 hover:bg-primary-foreground/70",

        // Extra classes passed from the parent
        className,
      )}
    >
      {isSubmitting ? <Loader2Icon className="size-4 animate-spin" /> : <Icon className="size-4" />}
      <span>{text}</span>
    </Button>
  );
}

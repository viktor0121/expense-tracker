"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonWithSpinnerProps = ButtonProps & {
  isLoading: boolean;
  btnText: string;
  loadingText?: string;
};

export function ButtonWithSpinner({
  isLoading,
  children,
  className,
  disabled,
  btnText,
  loadingText = "Please Wait",
  ...props
}: ButtonWithSpinnerProps) {
  return (
    <Button type="submit" disabled={disabled || isLoading} className={cn("capitalize", className)} {...props}>
      {isLoading ? <Loader2 className="mr-1.5 size-[17px] animate-spin" /> : null}
      {isLoading ? loadingText : btnText}
    </Button>
  );
}

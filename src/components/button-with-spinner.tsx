"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonWithSpinnerProps = ButtonProps & {
  isLoading: boolean;
  btnText: string;
};

export function ButtonWithSpinner({
  isLoading,
  children,
  className,
  disabled,
  btnText,
  ...props
}: ButtonWithSpinnerProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className={cn("capitalize", className)}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-1.5 size-[17px] animate-spin" /> : <></>}
      {isLoading ? "Please Wait" : btnText}
    </Button>
  );
}

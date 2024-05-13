"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type ButtonWithSpinnerProps = ButtonProps & {
  isLoading: boolean;
  btnText: string;
};

export default function ButtonWithSpinner({
  isLoading,
  children,
  disabled,
  btnText,
  ...props
}: ButtonWithSpinnerProps) {
  return (
    <Button type="submit" disabled={disabled || isLoading} {...props}>
      {isLoading ? <Loader2 className="mr-1.5 size-[17px] animate-spin" /> : <></>}
      {isLoading ? "Please Wait" : btnText}
    </Button>
  );
}

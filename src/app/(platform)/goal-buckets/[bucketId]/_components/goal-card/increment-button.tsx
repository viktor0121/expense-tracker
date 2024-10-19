import React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IncrementButtonProps {
  increment: () => void;
  value: number;
  maxValue: number;
}

export function IncrementButton({ increment, value, maxValue }: IncrementButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-10 shrink-0"
      onClick={increment}
      disabled={value >= maxValue}
    >
      <PlusIcon className="size-5" />
      <span className="sr-only">Increase</span>
    </Button>
  );
}

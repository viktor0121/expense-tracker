import React from "react";
import { MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DecrementButtonProps {
  decrement: () => void;
  value: number;
  minValue?: number;
}

export function DecrementButton({ decrement, value, minValue = 0 }: DecrementButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-10 shrink-0"
      onClick={decrement}
      disabled={value <= minValue}
    >
      <MinusIcon className="size-5" />
      <span className="sr-only">Decrease</span>
    </Button>
  );
}

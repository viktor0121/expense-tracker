import React from "react";
import { Separator } from "@/components/ui/separator";

interface TargetAccomplishmentTextProps {
  value: number;
  targetValue: number;
}

export function TargetAccomplishmentText({ value, targetValue }: TargetAccomplishmentTextProps) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-4xl font-semibold">{value}</h3>
      <Separator className="mt-0.5 w-16" />
      <span className="text-start text-xs text-primary/75">{targetValue}</span>
    </div>
  );
}

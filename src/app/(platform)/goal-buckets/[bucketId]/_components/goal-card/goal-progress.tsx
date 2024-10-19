import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GoalProgressProps {
  value: number;
}

export function GoalProgress({ value }: GoalProgressProps) {
  const getIndicatorColorClass = (): string => {
    if (value === 100) return "bg-gradient-to-r from-green-400 via-pink-400 to-blue-400";
    else if (value > 90) return "bg-green-300";
    else if (value > 60) return "bg-blue-300";
    else return "bg-primary";
  };

  return <Progress indicatorClassName={cn(getIndicatorColorClass())} value={value} />;
}

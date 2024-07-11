import React from "react";
import { Circle, DollarSign } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-4xl font-bold text-accent-foreground">Adis Money</h1>
      <div className="relative grid place-items-center">
        <Circle strokeWidth={1} className="size-28 animate-pulse" />
        <DollarSign className="absolute size-16" />
      </div>
    </div>
  );
}

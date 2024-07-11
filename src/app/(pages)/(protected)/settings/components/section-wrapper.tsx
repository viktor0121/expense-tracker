import { Separator } from "@/components/ui/separator";
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function SectionWrapper({ children, title, description }: SectionWrapperProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
}

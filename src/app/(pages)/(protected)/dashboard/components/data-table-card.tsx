import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function DataTableCard({ title, description, children }: DataTableCardProps) {
  return (
    <Card className="h-full min-h-96 flex flex-col">
      <CardHeader className="border-border border-b">
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>

      <div className="w-[inherit] h-[inherit] scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-foreground overflow-auto">
        <CardContent className="h-[inherit] w-[inherit] min-w-fit space-y-2">
          {children}
        </CardContent>
      </div>
    </Card>
  );
}

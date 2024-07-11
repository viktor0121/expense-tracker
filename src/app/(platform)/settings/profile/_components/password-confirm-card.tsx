import { ChangeEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PasswordConfirmCardProps {
  title: string;
  description: string;
  value: string;
  error: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordConfirmCard({ title, description, value, onChange, error }: PasswordConfirmCardProps) {
  return (
    <div className="asdspace-y-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold leading-none tracking-tight">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input id="password" type="password" placeholder="Your Password" value={value} onChange={onChange} />
          <p className="text-sm font-medium text-destructive">{error}</p>
        </CardContent>
      </Card>
    </div>
  );
}

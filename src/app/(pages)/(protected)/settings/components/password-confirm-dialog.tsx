import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PasswordConfirmDialogProps {
  title: string;
  description: string;
  triggerBtnText: string;
  submitBtnText: string;
  onSubmit: () => void;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  triggerDisabled?: boolean;
}

export default function PasswordConfirmDialog({
  title,
  description,
  triggerBtnText,
  submitBtnText,
  onSubmit,
  password,
  setPassword,
  triggerDisabled,
}: PasswordConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value == "") {
      setError("Password is required");
      setSubmitDisabled(true);
    } else {
      setError("");
      setSubmitDisabled(false);
    }
    setPassword(value);
  };
  const handleSubmit = () => {
    onSubmit();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={triggerDisabled} variant="default">
          {triggerBtnText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid items-center gap-3 pt-4">
          <Label htmlFor="password" className={cn(error ? "text-destructive" : "")}>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Please enter password to continue"
            value={password}
            onChange={handleOnChange}
          />
          <p className="text-sm font-medium text-destructive">{error}</p>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={submitDisabled} onClick={handleSubmit}>
            {submitBtnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

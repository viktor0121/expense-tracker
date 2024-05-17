"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import ButtonWithSpinner from "@/components/button-with-spinner";
import PasswordConfirmDialog from "@/app/(pages)/(protected)/settings/components/password-confirm-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IUser } from "@/lib/types";
import auth from "@/lib/appwrite/auth";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must not be longer than 30 characters."),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z
    .string()
    .optional() // Makes the field optional
    .transform((val) => val?.trim()) // Trim whitespace if a value is provided
    .refine(
      (val) => val?.length === 10 || val?.length === 0,
      "Phone number must be 10 characters long.",
    ),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface InputResetButtonProps {
  reset: () => void;
}

function InputResetButton({ reset }: InputResetButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          type="button"
          variant="ghost"
          onClick={reset}
          className="absolute right-2 h-6 w-6 p-0"
        >
          <XIcon className="w-4 h-4 text-muted-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete change</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [password, setPassword] = useState<string>("");

  const name = form.watch("name");
  const email = form.watch("email");
  const phone = form.watch("phone");
  const { isValid, isSubmitting } = form.formState;

  const isPasswordNeeded = user?.email !== email || user?.phone !== phone;
  const formValuesChanged = user?.name !== name || user?.email !== email || user?.phone !== phone;

  const onSubmit = form.handleSubmit(async ({ name, email, phone }) => {
    console.log(password);
    try {
      if (user?.name !== name) setUser(await auth.updateName({ name }));
      if (user?.email !== email) setUser(await auth.updateEmail({ email, password }));
      if (user?.phone !== phone && phone) setUser(await auth.updatePhone({ phone, password }));

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong.`,
        description: error.message,
      });
    }
  });

  useEffect(() => {
    (async () => {
      const user = await auth.getCurrentUser();

      // If user is not found, redirect to home page
      if (!user) {
        toast({
          variant: "destructive",
          title: `Uh oh! Something went wrong.`,
          description: "Unable to fetch current user",
        });
        router.push("/");
        return;
      }

      form.setValue("name", user?.name || "");
      form.setValue("email", user?.email || "");
      form.setValue("phone", user?.phone || "");
      setUser(user);
    })();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input className="pr-8" {...field} />
                  {name !== user?.name ? (
                    <InputResetButton reset={() => form.setValue("name", user?.name || "")} />
                  ) : null}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input className="pr-8" type="email" placeholder="Your Email" {...field} />
                  {email !== user?.email ? (
                    <InputResetButton reset={() => form.setValue("email", user?.email || "")} />
                  ) : null}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone No</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input className="pr-8" type="number" placeholder="Your Phone No" {...field} />
                  {phone !== user?.phone ? (
                    <InputResetButton reset={() => form.setValue("phone", user?.phone || "")} />
                  ) : null}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*Submit Button*/}
        {isPasswordNeeded && !isSubmitting ? (
          <PasswordConfirmDialog
            title="Update Profile"
            description="Please enter your password to update your profile."
            triggerBtnText="Proceed"
            triggerDisabled={!formValuesChanged || !isValid}
            submitBtnText="Update Profile"
            onSubmit={onSubmit}
            password={password}
            setPassword={setPassword}
          />
        ) : (
          <ButtonWithSpinner
            type="submit"
            disabled={!formValuesChanged || !isValid}
            isLoading={isSubmitting}
            className="mt-2"
            btnText="Update Profile"
          />
        )}
      </form>
    </Form>
  );
}

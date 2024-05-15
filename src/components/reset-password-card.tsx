"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ButtonWithSpinner from "@/components/button-with-spinner";

interface ResetPasswordCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function ResetPasswordCard({
  title,
  description,
  children,
}: ResetPasswordCardProps) {
  const formSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required")
      .max(100, "Email must be at most 100 characters"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();
  const { isSubmitting } = form.formState;

  const submit = form.handleSubmit(async ({ email }) => {
    try {
      // TODO: Implement reset password feature
      toast({
        title: `Password reset email sent`,
        description: "Check your inbox for a password reset link.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong.`,
        description: error.message,
      });
    }
  });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="me@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonWithSpinner
              isLoading={isSubmitting}
              type="submit"
              className="mt-2 w-full"
              btnText="Reset Password"
            />
          </form>
        </Form>
        {children}
      </CardContent>
    </Card>
  );
}

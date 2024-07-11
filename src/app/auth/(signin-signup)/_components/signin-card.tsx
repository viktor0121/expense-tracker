import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { useAuth } from "@/store/useAuth";
import { auth } from "@/lib/appwrite/auth";

interface SignInCardProps {
  goToSignUp: () => void;
}

export function SignInCard({ goToSignUp }: SignInCardProps) {
  const formSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required")
      .max(100, "Email must be at most 100 characters"),
    password: z.string().min(1, "Password is required").max(100, "Password must be at most 100 characters"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const { setAuthStatus } = useAuth();
  const { isSubmitting } = form.formState;

  const submit = form.handleSubmit(async ({ email, password }) => {
    try {
      await auth.signInWithEmail({ email, password });
      setAuthStatus(true);
      toast({
        title: `Welcome Back`,
        description: "Login successful! Redirecting you to your dashboard.",
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
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={submit} className="grid gap-3">
            {/*Email Input*/}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="me@example.com" autoComplete="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Password Input*/}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input autoComplete="current-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Forgot Password */}
            <Link className="ml-auto inline-block text-xs underline" href="/auth/reset-password">
              Forgot your password?
            </Link>

            {/*Submit Button*/}
            <ButtonWithSpinner
              isLoading={isSubmitting}
              type="submit"
              className="mt-2 w-full"
              btnText="Sign in to account"
            />
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button onClick={goToSignUp} variant="link" className="p-0">
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

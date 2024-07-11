import { useForm } from "react-hook-form";
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

interface SignUpCardProps {
  goToSignIn: () => void;
}

export function SignUpCard({ goToSignIn }: SignUpCardProps) {
  const formSchema = z
    .object({
      firstName: z
        .string()
        .trim()
        .min(1, "First Name is required")
        .max(100, "First Name must be at most 100 characters"),
      lastName: z.string().trim().min(1, "Last Name is required").max(100, "Last Name must be at most 100 characters"),
      email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email is required")
        .max(100, "Email must be at most 100 characters"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password must be at most 100 characters")
        .regex(/[a-z]/, "Password must contain a lowercase letter")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/\d/, "Password must contain a number"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();
  const { setAuthStatus } = useAuth();
  const { isSubmitting } = form.formState;

  const submit = form.handleSubmit(async ({ firstName, lastName, email, password }) => {
    try {
      await auth.createAccount({ name: `${firstName} ${lastName}`, email, password });
      setAuthStatus(true);
      toast({
        title: `Welcome Aboard, ${firstName}!`,
        description: "Your account has been created successfully",
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
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={submit} className="grid gap-3">
            {/*Name Input*/}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" placeholder="Max" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input autoComplete="family-name" placeholder="Robinson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                    <Input autoComplete="new-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Password Confirm*/}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input autoComplete="new-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Submit Button*/}
            <ButtonWithSpinner
              isLoading={isSubmitting}
              type="submit"
              className="mt-2 w-full"
              btnText="Create an account"
            />
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Button onClick={goToSignIn} variant="link" className="p-0">
            Sign in
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

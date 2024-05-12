"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInCard from "@/components/signin-card";
import SignUpCard from "@/components/signup-card";
import { EAuthTabs } from "@/lib/enums";

export default function AuthPage() {
  // Set default tab to search param specified / login
  const searchParams = useSearchParams();
  const defaultTab = searchParams.has("tab", EAuthTabs.Register)
    ? EAuthTabs.Register
    : EAuthTabs.Login;

  return (
    <Tabs defaultValue={defaultTab} className="max-w-[500px] px-4 sm:px-6 mt-16 mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={EAuthTabs.Login}>Login</TabsTrigger>
        <TabsTrigger value={EAuthTabs.Register}>Register</TabsTrigger>
      </TabsList>
      <TabsContent value={EAuthTabs.Login}>
        <SignInCard />
      </TabsContent>
      <TabsContent value={EAuthTabs.Register}>
        <SignUpCard />
      </TabsContent>
    </Tabs>
  );
}

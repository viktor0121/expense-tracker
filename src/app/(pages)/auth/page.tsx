"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useReplaceSearchParam from "@/hooks/useReplaceSearchParam";
import SignInCard from "@/components/signin-card";
import SignUpCard from "@/components/signup-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EAuthTabs } from "@/lib/enums";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const replaceSearchParam = useReplaceSearchParam();
  const [tab, setTab] = useState<EAuthTabs>();

  /**
   * handleTabOnChange function is responsible for handling the tab changes.
   * It updates the URL search param "tab" and the local state "tab".
   * @param {string} newTab - The new tab value.
   */
  const handleTabOnChange = (newTab: string) => {
    replaceSearchParam("tab", newTab);
    setTab(newTab as EAuthTabs);
  };

  /**
   * useEffect hook is responsible for setting the initial tab value based on the URL search param "tab".
   */
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (!tabParam) replaceSearchParam("tab", EAuthTabs.Login);
    else if (tabParam === EAuthTabs.Register) setTab(EAuthTabs.Register);
    else setTab(EAuthTabs.Login);
  }, [searchParams]);

  /**
   * The rendered JSX of the AuthPage component.
   * It includes the Tabs component with two tab triggers for Login and Register.
   * It also includes the SignInCard and SignUpCard components as the content of the tabs.
   */
  return (
    <Tabs
      value={tab}
      onValueChange={handleTabOnChange}
      className="max-w-[500px] px-4 sm:px-6 mt-16 mx-auto"
    >
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

"use client";

import SignInCard from "@/app/(pages)/auth/components/signin-card";
import SignUpCard from "@/app/(pages)/auth/components/signup-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EAuthTabs } from "@/lib/enums";
import useTab from "@/hooks/useTab";
import useReplaceSearchParam from "@/hooks/useReplaceSearchParam";

export default function AuthPage() {
  const replaceSearchParam = useReplaceSearchParam();
  const { tab, onTabChange } = useTab<EAuthTabs>({
    defaultTab: EAuthTabs.Login,
    tabs: [EAuthTabs.Login, EAuthTabs.Register],
  });

  return (
    <Tabs value={tab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={EAuthTabs.Login} className="capitalize">{EAuthTabs.Login}</TabsTrigger>
        <TabsTrigger value={EAuthTabs.Register} className="capitalize">{EAuthTabs.Register}</TabsTrigger>
      </TabsList>
      <TabsContent value={EAuthTabs.Login}>
        <SignInCard goToSignUp={() => replaceSearchParam("tab", EAuthTabs.Register)} />
      </TabsContent>
      <TabsContent value={EAuthTabs.Register}>
        <SignUpCard goToSignIn={() => replaceSearchParam("tab", EAuthTabs.Login)} />
      </TabsContent>
    </Tabs>
  );
}

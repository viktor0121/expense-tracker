"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReplaceSearchParam } from "@/hooks/useReplaceSearchParam";
import { useTab } from "@/hooks/useTab";
import { EAuthTabs } from "@/lib/enums";
import { SignInCard } from "./_components/signin-card";
import { SignUpCard } from "./_components/signup-card";

export default function AuthPage() {
  const replaceSearchParam = useReplaceSearchParam();
  const { tab, onTabChange } = useTab<EAuthTabs>({
    defaultTab: EAuthTabs.Login,
    tabs: [EAuthTabs.Login, EAuthTabs.Register],
  });

  return (
    <Tabs value={tab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={EAuthTabs.Login} className="capitalize">
          {EAuthTabs.Login}
        </TabsTrigger>
        <TabsTrigger value={EAuthTabs.Register} className="capitalize">
          {EAuthTabs.Register}
        </TabsTrigger>
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

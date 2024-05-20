import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useReplaceSearchParam from "@/hooks/useReplaceSearchParam";

export default function useTab<ETabs>({ defaultTab, tabs }: { defaultTab: ETabs; tabs: ETabs[] }) {
  const searchParams = useSearchParams();
  const replaceSearchParam = useReplaceSearchParam();
  const [tab, setTab] = useState<ETabs>(defaultTab);

  const onTabChange = (newTab: string) => {
    replaceSearchParam("tab", newTab);
    setTab(newTab as ETabs);
  };

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.map(String).includes(tabParam)) setTab(tabParam as ETabs);
    else replaceSearchParam("tab", defaultTab as string);
  }, [searchParams]);

  return { tab, onTabChange };
}

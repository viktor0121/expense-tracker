import { redirect } from "next/navigation";
import { EAuthTabs } from "@/lib/enums";

export default function RedirectToAuth({ tab = EAuthTabs.Login }: { tab?: EAuthTabs }) {
  redirect(`/auth?tab=${tab}`);
  return <></>;
}

import { Metadata } from "next";
import {ProfileForm} from "@/app/(pages)/(protected)/settings/components/profile-form";
import {SectionWrapper} from "@/app/(pages)/(protected)/settings/components/section-wrapper";

export const metadata: Metadata = {
  title: "Profile",
  description: "Update your profile information.",
};

export default function ProfilePage() {
  return (
    <SectionWrapper title="Profile" description="This is how others will see you on the site.">
      <ProfileForm />
    </SectionWrapper>
  );
}

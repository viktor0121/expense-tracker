import { Metadata } from "next";
import { ProfileForm } from "./_components/profile-form";
import { SectionWrapper } from "../_components/section-wrapper";

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

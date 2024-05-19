import { Metadata } from "next";
import SectionWrapper from "@/app/(pages)/(protected)/settings/components/section-wrapper";
import AppearanceForm from "@/app/(pages)/(protected)/settings/components/appearance-form";

export const metadata: Metadata = {
  title: "Appearance",
  description: "Update your appearance settings.",
};

export default function AppearancePage() {
  return (
    <SectionWrapper title="Appearance" description="Customize your appearance settings.">
      <AppearanceForm />
    </SectionWrapper>
  );
}

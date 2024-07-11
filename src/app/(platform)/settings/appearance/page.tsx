import { Metadata } from "next";
import { SectionWrapper } from "../_components/section-wrapper";
import { AppearanceForm } from "./_components/appearance-form";

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

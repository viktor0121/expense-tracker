"use client";

import Link from "next/link";
import {ResetPasswordCard} from "@/app/(pages)/auth/components/reset-password-card";
import { EAuthTabs } from "@/lib/enums";

// TODO: Enable Forgot Password functionality
export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center 1h-screen">
      <ResetPasswordCard
        title="Forgot Password"
        description="Enter your email below to reset your password."
      >
        <div className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link className="underline" href={`/auth?tab=${EAuthTabs.Login}`}>
            Sign in
          </Link>
        </div>
      </ResetPasswordCard>
    </div>
  );
}

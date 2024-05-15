"use client";

import { useEffect } from "react";
import Link from "next/link";
import useNavTrail from "@/context/nav-trail/useNavTrail";
import ResetPasswordCard from "@/components/reset-password-card";
import { EAuthTabs } from "@/lib/enums";
import { trails } from "@/lib/constants";

// TODO: Enable Forgot Password functionality
export default function ForgotPasswordPage() {
  const { setNavTrails } = useNavTrail();
  useEffect(() => setNavTrails(trails["/auth/reset-password"]), []);

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

"use client";

import Link from "next/link";
import Image from "next/image";
import { BarChart, DollarSign, Wallet } from "lucide-react";
import Redirect from "@/components/redirect";
import useAuthContext from "@/context/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EAuthTabs } from "@/lib/enums";
import { images } from "@/lib/constants";

export default function Page() {
  const { authStatus } = useAuthContext();
  const features = [
    {
      title: "Manage Expenses",
      description:
        "Easily track and categorize your expenses to gain better control over your spending.",
      icon: Wallet,
    },
    {
      title: "Track Income",
      description: "Monitor your income sources and ensure you're maximizing your earnings.",
      icon: DollarSign,
    },
    {
      title: "View Statistics",
      description:
        "Gain valuable insights into your financial habits with our comprehensive reporting.",
      icon: BarChart,
    },
  ];

  const ActionButtons = () => (
    <div className="space-x-2">
      <Button asChild>
        <Link href={`/auth?tab=${EAuthTabs.Login}`}>Sign In</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href={`/auth?tab=${EAuthTabs.Register}`}>Create an account</Link>
      </Button>
    </div>
  );

  return authStatus ? (
    <Redirect pathname="/dashboard" />
  ) : (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Take Control of Your Finances
                </h1>
                <p className="max-w-[600px] md:text-xl">
                  Effortlessly track your expenses, manage your income, and gain valuable insights
                  with our powerful expense tracking app.
                </p>
              </div>

              <ActionButtons />
            </div>

            <Image
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              height="550"
              src={images.heroImage}
              width="550"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col items-center">
                <CardHeader>
                  <feature.icon className="size-10" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{feature.title}</CardTitle>
                </CardContent>
                <CardFooter className="text-center">{feature.description}</CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Take Control of Your Finances Today
            </h2>
            <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Download our expense tracking app and start managing your money with ease.
            </p>
          </div>

          <ActionButtons />
        </div>
      </section>
    </>
  );
}

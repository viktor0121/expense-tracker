"use client";

import { useState } from "react";
import { BarChart, DollarSign, Target, Wallet } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BgMotionCard } from "@/components/bg-motion-card";

const features = [
  {
    title: "Manage Expenses",
    description: "Easily track and categorize your expenses to gain better control over your spending.",
    icon: Wallet,
  },
  {
    title: "Track Income",
    description: "Monitor your income sources and ensure you're maximizing your earnings.",
    icon: DollarSign,
  },
  {
    title: "View Statistics",
    description: "Gain valuable insights into your financial habits with our comprehensive reporting.",
    icon: BarChart,
  },
  {
    title: "Goal Statistics",
    description: "Set financial goals and track your progress to achieve your dreams.",
    icon: Target,
  },
];

export function FeatureCards() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <BgMotionCard key={index} index={index} activeIndex={hoveredIndex} setActiveIndex={setHoveredIndex}>
          <Card className="relative z-20 flex flex-col items-center">
            <CardHeader className="z-20">
              <feature.icon className="size-10 text-accent-foreground" />
            </CardHeader>
            <CardContent className="z-20">
              <CardTitle className="tracking-wide">{feature.title}</CardTitle>
            </CardContent>
            <CardFooter className="text-center text-[0.95rem] text-secondary-foreground/80">
              {feature.description}
            </CardFooter>
          </Card>
        </BgMotionCard>
      ))}
    </div>
  );
}

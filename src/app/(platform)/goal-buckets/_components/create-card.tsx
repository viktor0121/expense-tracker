import React from "react";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BgHoverDotsContainer } from "@/components/bg-hover-dots-container";
import { BorderGradient } from "@/components/border-gradient";

interface CreateCardProps {
  text: string;
  onClick: () => void;
  showGradientBorder: boolean;
}

export function CreateCard({ text, onClick, showGradientBorder }: CreateCardProps) {
  // Wrap with a special component for border gradient if showGradientBorder === true
  const Wrapper = showGradientBorder ? BorderGradient : React.Fragment;

  return (
    <Wrapper>
      <Card onClick={onClick} className="h-full cursor-pointer">
        <BgHoverDotsContainer>
          <CardContent className="flex h-full min-h-60 items-center justify-center p-6">
            <CardTitle className="flex items-center gap-1 tracking-wide">
              <PlusIcon className="size-8" />
              {text}
            </CardTitle>
          </CardContent>
        </BgHoverDotsContainer>
      </Card>
    </Wrapper>
  );
}

CreateCard.Skeleton = function CreateGoalCardSkeleton() {
  return (
    <div className="p-1.5">
      <Skeleton className="flex h-60 w-full items-center justify-center rounded-md border">
        <Skeleton className="h-10 w-32 bg-opacity-25" />
      </Skeleton>
    </div>
  );
};

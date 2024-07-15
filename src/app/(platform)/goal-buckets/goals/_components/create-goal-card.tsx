import React from "react";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BgHoverDotsContainer } from "@/components/bg-hover-dots-container";
import { BorderGradient } from "@/components/border-gradient";
import { useCreateGoalDialog } from "@/store/overlays/useCreateGoalDialog";
import { useData } from "@/store/useData";

export function CreateGoalCard() {
  const { goals } = useData();
  const createGoalDialog = useCreateGoalDialog();

  // This is the only difference between the two snippets
  const Wrapper = goals.length === 0 ? BorderGradient : React.Fragment;

  return (
    <Wrapper>
      <Card onClick={createGoalDialog.open} className="cursor-pointer">
        <BgHoverDotsContainer>
          <CardContent className="flex min-h-60 items-center justify-center p-6">
            <CardTitle className="flex items-center gap-1 tracking-wide">
              <PlusIcon className="size-8" />
              New Goal
            </CardTitle>
          </CardContent>
        </BgHoverDotsContainer>
      </Card>
    </Wrapper>
  );
}

CreateGoalCard.Skeleton = function CreateGoalCardSkeleton() {
  return (
    <div className="p-1.5">
      <Skeleton className="flex h-60 w-full items-center justify-center rounded-md border">
        <Skeleton className="h-10 w-32 bg-opacity-25" />
      </Skeleton>
    </div>
  );
};

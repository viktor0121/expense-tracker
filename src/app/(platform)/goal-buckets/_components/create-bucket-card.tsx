import React from "react";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BgHoverDotsContainer } from "@/components/bg-hover-dots-container";
import { BorderGradient } from "@/components/border-gradient";
import { useCreateGoalBucketDialog } from "@/store/overlays/useCreateGoalBucketDialog";
import { useData } from "@/store/useData";

export function CreateBucketCard() {
  const { goalLists } = useData();
  const createGoalBucketDialog = useCreateGoalBucketDialog();

  // This is a hack to make the border gradient only if there are 0 cards
  const Wrapper = goalLists.length === 0 ? BorderGradient : React.Fragment;

  return (
    <Wrapper>
      <Card onClick={createGoalBucketDialog.open} className="cursor-pointer">
        <BgHoverDotsContainer>
          <CardContent className="flex min-h-60 items-center justify-center p-6">
            <CardTitle className="flex items-center gap-1 tracking-wide">
              <PlusIcon className="size-8" />
              New Bucket
            </CardTitle>
          </CardContent>
        </BgHoverDotsContainer>
      </Card>
    </Wrapper>
  );
}

CreateBucketCard.Skeleton = function CreateBucketCardSkeleton() {
  return (
    <div className="p-1.5">
      <Skeleton className="flex h-60 w-full items-center justify-center rounded-md border">
        <Skeleton className="h-10 w-32 bg-opacity-25" />
      </Skeleton>
    </div>
  );
};

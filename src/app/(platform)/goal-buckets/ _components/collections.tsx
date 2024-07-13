"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BgHoverDotsContainer } from "@/components/bg-hover-dots-container";
import { BgMotionCard } from "@/components/bg-motion-card";
import { useNewGoalsCollectionDialog } from "@/store/overlays/useNewGoalsCollectionDialog";
import { useData } from "@/store/useData";

export const Collections = () => {
  let [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { goalLists } = useData();
  const newGoalsCollectionDialog = useNewGoalsCollectionDialog();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {goalLists.map((goalList, index) => (
        <BgMotionCard key={index} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          <Link className="bg-red-400" href={`/goals/collection?collectionId=${goalList.$id}`}>
            <Card className="cursor-pointer">
              <CardContent className="flex min-h-60 items-center justify-center p-6">
                <CardTitle className="tracking-wide">{goalList.title}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        </BgMotionCard>
      ))}

      <BgMotionCard index={-1} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
        <Card onClick={newGoalsCollectionDialog.open} className="cursor-pointer">
          <BgHoverDotsContainer>
            <CardContent className="flex min-h-60 items-center justify-center p-6">
              <CardTitle className="flex items-center gap-1 tracking-wide">
                <PlusIcon className="size-8" />
                New
              </CardTitle>
            </CardContent>
          </BgHoverDotsContainer>
        </Card>
      </BgMotionCard>
    </div>
  );
};

Collections.Skeleton = function CollectionsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="p-1.5">
          <Skeleton className="flex h-60 w-full items-center justify-center rounded-md border">
            <Skeleton className="h-10 w-32 bg-opacity-25" />
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import { BgMotionCard } from "@/components/bg-motion-card";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useCreateGoalBucketDialog } from "@/store/overlays/useCreateGoalBucketDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { BucketCard } from "./_components/bucket-card";
import { CreateCard } from "./_components/create-card";

export default function GoalPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { data: goalListsData, isLoading: isGoalListsLoading } = useAppwriteFetch(() => database.getGoalLists());
  const { goalLists, setGoalLists } = useData();
  const createGoalBucketDialog = useCreateGoalBucketDialog();

  useEffect(() => {
    setGoalLists(goalListsData || []);
  }, [goalListsData, setGoalLists]);

  return (
    <>
      <h2 className="mb-3 px-2 text-2xl font-semibold">Goal Buckets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isGoalListsLoading ? (
          <>
            {[...Array(4)].map((_, index) => (
              <BucketCard.Skeleton key={index} />
            ))}
            <CreateCard.Skeleton />
          </>
        ) : (
          <>
            {goalLists.map((goalList, index) => (
              <BgMotionCard key={index} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                <BucketCard id={goalList.$id} title={goalList.title} />
              </BgMotionCard>
            ))}

            <BgMotionCard index={-1} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
              <CreateCard
                showGradientBorder={goalLists.length === 0}
                text="New Bucket"
                onClick={createGoalBucketDialog.open}
              />
            </BgMotionCard>
          </>
        )}
      </div>
    </>
  );
}

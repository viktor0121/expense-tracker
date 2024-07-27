"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Query } from "appwrite";
import { BgMotionCard } from "@/components/bg-motion-card";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useCreateGoalDialog } from "@/store/overlays/useCreateGoalDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { IGoalList } from "@/lib/types";
import { CreateCard } from "../_components/create-card";
import { GoalCard } from "./_components/goal-card";
import { OptionsPopover } from "./_components/options-popover";

interface CollectionPageProps {
  searchParams: {
    bucketId: string;
    bucketTitle: string;
  };
}

export default function BucketPage({ searchParams }: CollectionPageProps) {
  const bucketId = searchParams.bucketId;
  const bucketTitle = searchParams.bucketTitle;
  if (!bucketId || !bucketTitle) notFound();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [bucket, setBucket] = useState<IGoalList | null>(null);
  const { unfinishedGoals, setUnfinishedGoals } = useData();
  const createGoalDialog = useCreateGoalDialog();

  // Fetch goal list data
  const fetcher = () => database.getGoals([Query.equal("completed", false), Query.equal("goalList", bucketId)]);
  const { data: goalsData, isLoading: isGoalListLoading } = useAppwriteFetch(fetcher);

  // Set goals and bucket data when fetched
  useEffect(() => {
    if (goalsData) {
      setBucket(goalsData[0].goalList);
      setUnfinishedGoals(goalsData);
    }
  }, [goalsData, setUnfinishedGoals]);

  // Clear goals when component unmounts
  useEffect(() => setUnfinishedGoals([]), [setUnfinishedGoals]);

  if (!bucket) return null;

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="px-2 text-2xl font-semibold">{bucketTitle}</h2>
        <OptionsPopover bucket={bucket} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isGoalListLoading ? (
          <>
            {[...Array(4)].map((_, index) => (
              <GoalCard.Skeleton key={index} />
            ))}
            <CreateCard.Skeleton />
          </>
        ) : (
          <>
            {unfinishedGoals.map((goal, index) => (
              <BgMotionCard key={index} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                <GoalCard goal={goal} />
              </BgMotionCard>
            ))}

            <BgMotionCard index={-1} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
              <CreateCard
                text="New Goal"
                showGradientBorder={unfinishedGoals.length === 0}
                onClick={createGoalDialog.open}
              />
            </BgMotionCard>
          </>
        )}
      </div>
    </>
  );
}

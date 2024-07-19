"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
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
  const { goals, setGoals } = useData();
  const createGoalDialog = useCreateGoalDialog();

  // Fetch goal list data
  const fetcher = () => database.getGoalList({ id: bucketId });
  const { data: goalListData, isLoading: isGoalListLoading } = useAppwriteFetch(fetcher);

  // Set goals and bucket data when fetched
  useEffect(() => {
    if (goalListData === "invalid_id") notFound();
    if (goalListData) {
      setGoals(goalListData.goals);
      setBucket(goalListData);
    }
  }, [goalListData, setGoals]);

  // Clear goals when component unmounts
  useEffect(() => setGoals([]), [setGoals]);

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
            {goals.map((goal, index) => (
              <BgMotionCard key={index} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                <GoalCard
                  id={goal.$id}
                  title={goal.title}
                  target={goal.target}
                  collected={goal.collected}
                  imageId={goal.imageId}
                />
              </BgMotionCard>
            ))}

            <BgMotionCard index={-1} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
              <CreateCard text="New Goal" showGradientBorder={goals.length === 0} onClick={createGoalDialog.open} />
            </BgMotionCard>
          </>
        )}
      </div>
    </>
  );
}

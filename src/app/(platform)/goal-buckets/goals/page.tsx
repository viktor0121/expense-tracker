"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { BgMotionCard } from "@/components/bg-motion-card";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useCreateGoalDialog } from "@/store/overlays/useCreateGoalDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { CreateCard } from "../_components/create-card";
import { GoalCard } from "./_components/goal-card";

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

  const createGoalDialog = useCreateGoalDialog();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { goals, setGoals } = useData();
  const { data: goalListData, isLoading: isGoalListLoading } = useAppwriteFetch(() =>
    database.getGoalList({
      id: bucketId,
    }),
  );

  useEffect(() => {
    if (goalListData === "invalid_id") notFound();
    if (goalListData) setGoals(goalListData.goals);
  }, [goalListData, setGoals]);

  return (
    <>
      <h2 className="mb-3 px-2 text-2xl font-semibold">{bucketTitle}</h2>

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

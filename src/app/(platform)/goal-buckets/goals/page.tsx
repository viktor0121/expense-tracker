"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Query } from "appwrite";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

  const createGoalDialog = useCreateGoalDialog();
  const onCreate = () => createGoalDialog.open(bucket);

  const { unfinishedGoals, setUnfinishedGoals } = useData();

  // Fetch bucket details
  const fetchBucket = () => database.getGoalList(bucketId, [Query.select(["$id", "title"])]);
  const { data: bucketData, isLoading: isBucketLoading } = useAppwriteFetch(fetchBucket);

  // Fetch goal list data
  const goalsFetch = () => database.getGoals([Query.equal("completed", false), Query.equal("goalList", bucketId)]);
  const { data: goalsData, isLoading: isGoalListLoading } = useAppwriteFetch(goalsFetch);

  // Set goals and bucket data when fetched
  useEffect(() => {
    if (goalsData && bucketData) {
      setBucket(bucketData);
      setUnfinishedGoals(goalsData);
    }
  }, [goalsData, bucketData, setUnfinishedGoals]);

  // Clear goals when component unmounts
  useEffect(() => setUnfinishedGoals([]), [setUnfinishedGoals]);

  // If bucket is not found, show Separate UI
  if (!bucket && !isBucketLoading)
    return (
      <section className="mx-auto mt-10 flex min-h-52 max-w-lg flex-col items-center justify-evenly rounded-2xl bg-background p-4 shadow-lg shadow-primary-foreground sm:mt-20">
        <h1 className="text-center text-2xl font-semibold sm:text-3xl">Bucket Not Found</h1>
        <p className="text-center text-sm">The bucket you are looking for does not exists.</p>

        <div className="mt-4 flex items-center gap-3">
          <Button className="text-base font-semibold">
            <Link href="/goal-buckets">See Buckets</Link>
          </Button>

          <Button asChild className="text-base font-semibold" variant="outline">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </section>
    );

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        {isBucketLoading ? (
          <Skeleton className="h-8 w-36" />
        ) : (
          <h2 className="px-2 text-2xl font-semibold">{bucketTitle}</h2>
        )}

        {!bucket || isBucketLoading ? <OptionsPopover.Skeleton /> : <OptionsPopover bucket={bucket} />}
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
              <CreateCard text="New Goal" showGradientBorder={unfinishedGoals.length === 0} onClick={onCreate} />
            </BgMotionCard>
          </>
        )}
      </div>
    </>
  );
}

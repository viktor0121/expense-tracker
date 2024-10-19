"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Query } from "appwrite";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { IGoalList } from "@/lib/types";
import { CreateCard } from "../_components/create-card";
import { GoalCard } from "./_components/goal-card";
import { OptionsPopover } from "./_components/options-popover";

interface BucketPageProps {
  params: { bucketId: string };
  searchParams: { bucketTitle: string };
}

export default function BucketPage({ params, searchParams }: BucketPageProps) {
  const bucketId = params.bucketId;
  const bucketTitle = searchParams.bucketTitle;

  if (!bucketId || !bucketTitle) notFound();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [bucket, setBucket] = useState<IGoalList | null>(null);

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
        <p className="text-center text-sm">The bucket you are looking for does not exist.</p>
      </section>
    );

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        {isBucketLoading ? (
          <div className="h-8 w-36 animate-pulse bg-gray-200"></div>
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
              <div key={index}>
                <GoalCard goal={goal} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

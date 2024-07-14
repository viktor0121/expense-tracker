"use client";

import React, { useEffect } from "react";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { Collections } from "./ _components/collections";

export default function GoalPage() {
  const { setGoalLists } = useData();
  const { data: goalListsData, isLoading: isGoalListsLoading } = useAppwriteFetch(() => database.getGoalLists());

  useEffect(() => {
    setGoalLists(goalListsData || []);
  }, [goalListsData, setGoalLists]);

  return (
    <>
      <section className="mx-auto max-w-screen-xl">
        <h2 className="mb-3 ml-2 mt-1 text-2xl font-semibold">Goal Buckets</h2>
        {isGoalListsLoading ? <Collections.Skeleton /> : <Collections />}
      </section>
    </>
  );
}

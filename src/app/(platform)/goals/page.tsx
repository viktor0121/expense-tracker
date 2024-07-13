"use client";

import React, { useEffect } from "react";
import { useAppwriteFetch } from "@/hooks/useAppwriteFetch";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { Collections } from "./ _components/collections";
import { NewCollectionDialog } from "./ _components/new-collection-dialog";

export default function GoalPage() {
  const { setGoalLists } = useData();
  const { data: goalListsData, isLoading: isGoalListsLoading } = useAppwriteFetch(() => database.getGoalLists());

  useEffect(() => {
    setGoalLists(goalListsData || []);
  }, [goalListsData, setGoalLists]);

  return (
    <>
      <div className="mx-auto max-w-screen-xl">
        {isGoalListsLoading ? <Collections.Skeleton /> : <Collections />}
        <NewCollectionDialog />
      </div>
    </>
  );
}

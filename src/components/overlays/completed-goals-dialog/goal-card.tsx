import React, { useState } from "react";
import { CheckSquareIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { GoalActionButton } from "@/components/goal-card/goal-action-button";
import { GoalImage } from "@/components/goal-card/goal-image";
import { useCurrency } from "@/store/useCurrency";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { IGoal } from "@/lib/types";
import { cn, truncateString } from "@/lib/utils";

interface BucketCardProps {
  goal: IGoal;
}

export function GoalCard({ goal }: BucketCardProps) {
  const { $id: id, title, target, collected, imageId } = goal;

  const { currency } = useCurrency();
  const { unfinishedGoals, setUnfinishedGoals, finishedGoals, setFinishedGoals } = useData();

  // Variable denoting whether field `completed` is being updated
  const [isCompletedUpdating, setIsCompletedUpdating] = useState(false);

  const updateCompleted = async () => {
    setIsCompletedUpdating(true);

    try {
      // If the goal is already completed, mark it as incomplete
      const updatedGoal = await database.updateGoal({
        id,
        collected: 0,
        completed: false,
      });

      // Update the goals state and also add goalList info to updatedGoal
      setUnfinishedGoals([{ ...updatedGoal, goalList: goal.goalList }, ...unfinishedGoals]);
      setFinishedGoals(finishedGoals.filter((goal) => goal.$id != updatedGoal.$id));
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to mark goal as completed. Try Again!",
        variant: "destructive",
      });
    } finally {
      setIsCompletedUpdating(false);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="group h-full p-2">
        <div className="relative h-full overflow-hidden">
          <GoalImage imageId={imageId} />

          <GoalActionButton
            side="right"
            isSubmitting={isCompletedUpdating}
            text={goal.completed ? "Mark as incomplete" : "Mark as complete"}
            icon={CheckSquareIcon}
            onClick={updateCompleted}
            className={cn("top-1 translate-y-0", goal.completed && "bg-sky-500 hover:bg-sky-500")}
          />

          <div className="relative flex w-full flex-1 flex-col justify-evenly gap-2 px-3 py-4">
            <CardTitle className="text-xl">{truncateString(title, 20)}</CardTitle>
            <CardDescription className="text-md">
              {currency.symbolNative}
              {target}
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

GoalCard.Skeleton = function GoalCardSkeleton() {
  return (
    <div className="p-1.5">
      <Skeleton className="flex h-60 w-full items-center justify-center rounded-md border">
        <Skeleton className="h-10 w-32 bg-opacity-25" />
      </Skeleton>
    </div>
  );
};

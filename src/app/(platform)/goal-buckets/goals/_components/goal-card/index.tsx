import React, { Fragment, useState } from "react";
import { CheckIcon, CheckSquareIcon, CircleCheckBigIcon, CircleCheckIcon, Edit3Icon, Trash2Icon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { BorderGradient } from "@/components/border-gradient";
import { useDeleteGoalDialog } from "@/store/overlays/useDeleteGoalDialog";
import { useUpdateGoalDialog } from "@/store/overlays/useUpdateGoalDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { IGoal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ActionButton } from "@/app/(platform)/goal-buckets/goals/_components/goal-card/action-button";
import { DecrementButton } from "./decrement-button";
import { GoalImage } from "./goal-image";
import { GoalProgress } from "./goal-progress";
import { IncrementButton } from "./increment-button";
import { SaveButton } from "./save-button";
import { TargetAccomplishmentText } from "./target-accomplishment-text";

interface BucketCardProps {
  goal: IGoal;
}

export function GoalCard({ goal }: BucketCardProps) {
  const { $id: id, title, target, collected, imageId } = goal;

  // Variable to temporary store the amount before hitting save
  const [amount, setAmount] = useState(collected);

  // Variable denoting whether the field  `target` is being updated
  const [isCollectedUpdating, setIsCollectedUpdating] = useState(false);

  // Variable denoting whether field `completed` is being updated
  const [isCompletedUpdating, setIsCompletedUpdating] = useState(false);

  const deleteGoalDialog = useDeleteGoalDialog();
  const updateGoalDialog = useUpdateGoalDialog();

  const { unfinishedGoals, setUnfinishedGoals } = useData();
  const progress = (amount / target) * 100;

  const increment = () => setAmount((prev) => Math.min(prev + 10, target));
  const decrement = () => setAmount((prev) => Math.max(prev - 10, 0));

  const updateCollected = async () => {
    if (amount === collected) return;
    if (amount > target || amount < 0) return;

    setIsCollectedUpdating(true);
    try {
      const updatedGoal = await database.updateGoal({ id, collected: amount });

      // Update the goals state and also add goalList info to updatedGoal
      const newGoals = unfinishedGoals.map((goal) =>
        goal.$id === id ? { ...updatedGoal, goalList: goal.goalList } : goal,
      );
      setUnfinishedGoals(newGoals);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to update amount. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsCollectedUpdating(false);
    }
  };
  const updateCompleted = async () => {
    setIsCompletedUpdating(true);

    try {
      // Toggle the completed status
      let updatedGoal;
      if (goal.completed) {
        // If the goal is already completed, mark it as incomplete
        updatedGoal = await database.updateGoal({
          id,
          completed: false,
        });
      } else {
        // If the goal is not completed, mark it as completed
        updatedGoal = await database.updateGoal({
          id,
          completed: true,
          // Make collected amount same as target amount if its already not
          ...(goal.collected !== goal.target && { collected: target }),
        });
      }

      // Ensure that amount is equal to target after completion
      if (goal.target !== amount) setAmount(goal.target);

      // Update the goals state and also add goalList info to updatedGoal
      const newGoals = unfinishedGoals.map((goal) =>
        goal.$id === id ? { ...updatedGoal, goalList: goal.goalList } : goal,
      );

      setUnfinishedGoals(newGoals);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to mark goal as completed. Try Again!",
        variant: "destructive",
      });
    } finally {
      setIsCompletedUpdating(false);
    }
  };

  const Wrapper = goal.completed ? BorderGradient : Fragment;

  return (
    <Wrapper>
      <Card className="h-full">
        <CardContent className="group h-full min-h-60 p-2">
          <div className="relative h-full overflow-hidden">
            <GoalImage imageId={imageId} />

            <ActionButton
              side="right"
              isSubmitting={isCompletedUpdating}
              text={goal.completed ? "Mark as incomplete" : "Mark as complete"}
              icon={CheckSquareIcon}
              onClick={updateCompleted}
              className={cn("top-1 translate-y-0", goal.completed && "bg-sky-500 hover:bg-sky-500")}
            />
            {!goal.completed ? (
              <ActionButton
                side="right"
                text="Update"
                icon={Edit3Icon}
                onClick={() => updateGoalDialog.open(goal)}
                className="top-2 translate-y-full"
              />
            ) : null}
            {!goal.completed ? (
              <ActionButton
                side="right"
                text="Delete"
                icon={Trash2Icon}
                onClick={() => deleteGoalDialog.open(goal)}
                className="top-3 translate-y-[200%] hover:text-red-500"
              />
            ) : null}

            <div className="relative flex min-h-52 w-full flex-1 flex-col items-center justify-evenly gap-5 px-3 py-5">
              <CardTitle className="text-center text-xl tracking-wide">{title}</CardTitle>

              {/*Save button visible when collected amount is changed*/}
              {amount !== collected ? <SaveButton onClick={updateCollected} isLoading={isCollectedUpdating} /> : null}

              {goal.completed ? (
                <div>
                  <h4 className="bg-gradient-to-br from-green-400 via-cyan-400 to-emerald-400 bg-clip-text text-3xl font-semibold uppercase text-green-400 text-transparent">
                    Completed
                  </h4>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between">
                  <DecrementButton decrement={decrement} value={amount} />
                  <TargetAccomplishmentText value={amount} targetValue={target} />
                  <IncrementButton increment={increment} value={amount} maxValue={target} />
                </div>
              )}

              <GoalProgress value={progress} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Wrapper>
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

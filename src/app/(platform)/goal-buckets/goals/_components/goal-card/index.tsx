import React, { useState } from "react";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useDeleteGoalDialog } from "@/store/overlays/useDeleteGoalDialog";
import { useUpdateGoalDialog } from "@/store/overlays/useUpdateGoalDialog";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";
import { IGoal } from "@/lib/types";
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

  const [amount, setAmount] = useState(collected);
  const [isUpdating, setIsUpdating] = useState(false);
  const { goals, setGoals } = useData();

  const deleteGoalDialog = useDeleteGoalDialog();
  const updateGoalDialog = useUpdateGoalDialog();

  const progress = (amount / target) * 100;

  const increment = () => setAmount((prev) => Math.min(prev + 10, target));
  const decrement = () => setAmount((prev) => Math.max(prev - 10, 0));

  const updateCollectedAmount = async () => {
    if (amount === collected) return;
    if (amount > target || amount < 0) return;

    setIsUpdating(true);
    try {
      const updatedGoal = await database.updateGoal({ id, collected: amount });
      const newGoals = goals.map((goal) => (goal.$id === id ? updatedGoal : goal));
      setGoals(newGoals);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to update amount. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="group h-full min-h-60 p-2">
        <div className="relative h-full overflow-hidden">
          <GoalImage imageId={imageId} />

          <ActionButton side="left" text="Update" icon={Edit3Icon} onClick={() => updateGoalDialog.open(goal)} />
          <ActionButton
            side="right"
            text="Delete"
            icon={Trash2Icon}
            onClick={() => deleteGoalDialog.open(goal)}
            className="hover:text-red-500"
          />

          <div className="relative flex min-h-52 w-full flex-1 flex-col items-center justify-evenly gap-5 px-3 py-5">
            <CardTitle className="text-center text-xl tracking-wide">{title}</CardTitle>

            {/*Save button visible when collected amount is changed*/}
            {amount !== collected ? <SaveButton onClick={updateCollectedAmount} isLoading={isUpdating} /> : null}

            <div className="flex w-full items-center justify-between">
              <DecrementButton decrement={decrement} value={amount} />
              <TargetAccomplishmentText value={amount} targetValue={target} />
              <IncrementButton increment={increment} value={amount} maxValue={target} />
            </div>

            <GoalProgress value={progress} />
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

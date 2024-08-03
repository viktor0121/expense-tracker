import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { BgMotionCard } from "@/components/bg-motion-card";
import { GoalCard } from "@/components/overlays/completed-goals-dialog/goal-card";
import { useCompletedGoalsSheet } from "@/store/overlays/useCompletedGoalsSheet";
import { useData } from "@/store/useData";
import { database } from "@/lib/appwrite/database";

export function CompletedGoalsDialog() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isOpen, close, bucket } = useCompletedGoalsSheet();
  const { setFinishedGoals, finishedGoals } = useData();

  useEffect(() => {
    if (isOpen && bucket) {
      setIsLoading(true);

      database
        .getGoals([Query.equal("completed", true), Query.equal("goalList", bucket.$id)])
        .then((data) => setFinishedGoals(data))
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
          });
        })
        .finally(() => setIsLoading(false));
    }

    // Clear goals when component unmounts
    return () => setFinishedGoals([]);
  }, [bucket, isOpen]);

  if (!isOpen || !bucket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-h-[90vh] w-[95%] max-w-screen-xl overflow-y-auto px-2 md:px-4 lg:px-6">
        <DialogHeader>
          <DialogTitle>{bucket.title} - Completed</DialogTitle>
          <DialogDescription>These are the goals from this buckets which you have completed</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <GoalCard.Skeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {finishedGoals.map((goal, index) => (
                <BgMotionCard key={index} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                  <GoalCard goal={goal} />
                </BgMotionCard>
              ))}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

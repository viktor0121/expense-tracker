import React from "react";
import { EllipsisIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useDeleteGoalBucketDialog } from "@/store/overlays/useDeleteGoalBucketDialog";
import { useUpdateGoalBucketDialog } from "@/store/overlays/useUpdateGoalBucketDialog";
import { IGoalList } from "@/lib/types";

interface OptionsPopoverProps {
  bucket: IGoalList;
}

export function OptionsPopover({ bucket }: OptionsPopoverProps) {
  const deleteBucketDialog = useDeleteGoalBucketDialog();
  const updateBucketDialog = useUpdateGoalBucketDialog();

  const onDelete = () => deleteBucketDialog.open(bucket);
  const onUpdate = () => updateBucketDialog.open(bucket);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <EllipsisIcon className="h-6 w-6 cursor-pointer text-gray-500" />
          <span className="sr-only">Open options</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0" side="top" align="end">
        <div className="grid gap-4">
          <h4 className="text-center font-medium leading-none">Bucket Options</h4>
          <Separator />

          <div className="grid">
            <Button
              size="sm"
              onClick={onUpdate}
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 rounded-none text-start"
            >
              Update Bucket
            </Button>
            <Button
              size="sm"
              onClick={onDelete}
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 rounded-none text-start hover:text-red-500"
            >
              Delete Bucket
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

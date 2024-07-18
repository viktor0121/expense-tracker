import React from "react";
import { EllipsisIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { database } from "@/lib/appwrite/database";
import { redirect, useRouter } from "next/navigation";

interface OptionsPopoverProps {
  bucketId: string;
}

export function OptionsPopover({ bucketId }: OptionsPopoverProps) {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await database.deleteGoalList({ id: bucketId });
      toast({
        title: "Success!",
        description: "Bucket deleted successfully.",
      });
      router.push("/goal-buckets")
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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

          <div className="grid gap-2">
            <Button
              size="sm"
              onClick={onDelete}
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 rounded-none text-start"
            >
              Delete Bucket
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BucketCardProps {
  id: string;
  title: string;
}

export function BucketCard({ id, title }: BucketCardProps) {
  return (
    <Link href={`/goal-buckets/goals?bucketId=${id}&bucketTitle=${title}`}>
      <Card className="cursor-pointer">
        <CardContent className="flex min-h-60 items-center justify-center p-6">
          <CardTitle className="tracking-wide">{title}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}

BucketCard.Skeleton = function BucketCardSkeleton() {
  return (
    <div className="p-1.5">
      <Skeleton className="flex h-60 w-full items-center justify-center rounded-md border">
        <Skeleton className="h-10 w-32 bg-opacity-25" />
      </Skeleton>
    </div>
  );
};

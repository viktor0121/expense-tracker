import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export default function useAppwriteFetch<T>(fn: () => Promise<T[]>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);

      try {
        const response = await fn();
        setData(response);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, isLoading };
}

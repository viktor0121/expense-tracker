import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useReplaceSearchParam(): (name: string, value: string) => void {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };
}

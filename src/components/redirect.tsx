import { redirect } from "next/navigation";

interface RedirectProps {
  pathname: string;
  params?: URLSearchParams;
}

export default function Redirect({ pathname, params }: RedirectProps) {
  const paramsString = params ? `?${params.toString()}` : "";
  redirect(pathname + paramsString);
  return <></>;
}

import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { INavTrail } from "@/lib/types";

interface NavTrailProps {
  navTrails: INavTrail[];
}

export default function NavTrail({ navTrails }: NavTrailProps) {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {navTrails.map((trail, index) =>
          index < navTrails.length - 1 ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={trail.href}>{trail.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbPage>{trail.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

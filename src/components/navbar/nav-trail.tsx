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
        {navTrails.map((trail, index) => (
          <React.Fragment key={index}>
            {index !== navTrails.length - 1 ? (
              <>
                <BreadcrumbItem className="capitalize">
                  {trail.href == "" ? (
                    trail.title
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={trail.href}>{trail.title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbItem className="capitalize">
                <BreadcrumbPage>{trail.title}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

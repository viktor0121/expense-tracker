"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem as CrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { trails } from "@/lib/constants";
import { INavTrail } from "@/lib/types";

export function NavTrail() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navTrails, setNavTrails] = useState<INavTrail[]>([]);

  // Set the nav trails based on the current pathname
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const tabTrail = tabParam ? [{ title: tabParam, href: "" }] : [];
    const pathTrail = trails[pathname] || [];
    setNavTrails([...pathTrail, ...tabTrail]);
  }, [pathname, searchParams]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {navTrails.map((trail, index) => (
          <React.Fragment key={index}>
            {index === navTrails.length - 1 ? (
              <>
                <BreadCrumbItem type="active" title={trail.title} />
              </>
            ) : trail.href ? (
              <>
                <BreadCrumbItem type="link" title={trail.title} href={trail.href} />
                <BreadcrumbSeparator />
              </>
            ) : (
              <>
                <BreadCrumbItem title={trail.title} />
                <BreadcrumbSeparator />
              </>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

type BreadCrumbItemProps =
  | {
      type: "link";
      title: string;
      href: string;
    }
  | {
      type: "active";
      title: string;
      href?: undefined;
    }
  | {
      type?: "normal";
      title: string;
      href?: undefined;
    };

const BreadCrumbItem = ({ type, title, href }: BreadCrumbItemProps) => {
  switch (type) {
    case "link":
      return (
        <CrumbItem className="capitalize">
          <BreadcrumbLink asChild>
            <Link href={href}>{title}</Link>
          </BreadcrumbLink>
        </CrumbItem>
      );
    case "active":
      return (
        <CrumbItem className="capitalize">
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </CrumbItem>
      );
    default:
      return <CrumbItem className="capitalize">{title}</CrumbItem>;
  }
};

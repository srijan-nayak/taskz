"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useOrganization from "@/hooks/useOrganization";
import Link from "next/link";

export default function OrgBreadcrumb() {
  const org = useOrganization();

  return (
    <Breadcrumb className="border-l-2 ps-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/home/organizations">Taskz</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {org?.orgName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{org.orgName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

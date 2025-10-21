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
import useProject from "@/hooks/useProject";
import Link from "next/link";

export default function ProjectBreadcrumb() {
  const org = useOrganization();
  const project = useProject();

  return (
    <Breadcrumb className="border-l-2 ps-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/home/organizations">Taskz</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {org && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/organization/${org.orgId}/projects`}>
                  {org.orgName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {project && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

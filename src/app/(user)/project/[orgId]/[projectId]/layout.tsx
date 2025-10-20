import { getUserOrgDetails } from "@/actions/organization";
import { getProjectDetails } from "@/actions/project";
import ProjectSidebar from "@/components/ProjectSidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import OrganizationPromiseProvider from "@/providers/OrganizationPromiseProvider";
import ProjectPromiseProvider from "@/providers/ProjectPromiseProvider";
import { ReactNode } from "react";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ orgId: string; projectId: string }>;
}) {
  const { orgId, projectId } = await params;
  const orgPromise = getUserOrgDetails(orgId);
  const projectPromise = getProjectDetails(orgId, projectId);

  return (
    <OrganizationPromiseProvider promise={orgPromise}>
      <ProjectPromiseProvider promise={projectPromise}>
        <SidebarProvider>
          <ProjectSidebar />
          <SidebarInset>
            <header className="flex h-14 shrink-0 items-center gap-2">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Breadcrumb className="border-l-2 ps-4">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                        Taskz
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main className="px-3">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </ProjectPromiseProvider>
    </OrganizationPromiseProvider>
  );
}

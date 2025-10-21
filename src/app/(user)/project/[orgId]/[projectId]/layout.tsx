import { getUserOrgDetails } from "@/actions/organization";
import { getProjectDetails } from "@/actions/project";
import ProjectBreadcrumb from "@/components/project/ProjectBreadcrumb";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import OrganizationPromiseProvider from "@/providers/OrganizationPromiseProvider";
import ProjectPromiseProvider from "@/providers/ProjectPromiseProvider";
import { ReactNode, Suspense } from "react";

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
                <Suspense fallback={<Skeleton className="w-56 h-4" />}>
                  <ProjectBreadcrumb />
                </Suspense>
              </div>
            </header>
            <main className="px-3">
              <Suspense fallback={<Skeleton className="h-96" />}>
                {children}
              </Suspense>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ProjectPromiseProvider>
    </OrganizationPromiseProvider>
  );
}

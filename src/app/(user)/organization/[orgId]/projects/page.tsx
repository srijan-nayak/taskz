import { getProjects } from "@/actions/project";
import OrgProjectsHeader from "@/components/organization/OrgProjectsHeader";
import ProjectsTable from "@/components/project/ProjectsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  const projectsListPromise = getProjects(orgId);

  return (
    <>
      <OrgProjectsHeader />
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ProjectsTable projectsListPromise={projectsListPromise} />
      </Suspense>
    </>
  );
}

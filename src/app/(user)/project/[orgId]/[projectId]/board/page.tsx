import { getTasks } from "@/actions/task";
import MainHeader from "@/components/common/MainHeader";
import PageTitle from "@/components/common/PageTitle";
import TaskBoard from "@/components/task/TaskBoard";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ orgId: string; projectId: string }>;
}) {
  const { orgId, projectId } = await params;
  const tasksListPromise = getTasks(orgId, projectId, true);

  return (
    <>
      <MainHeader>
        <PageTitle>Project Task Board</PageTitle>
      </MainHeader>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <TaskBoard tasksListPromise={tasksListPromise} />
      </Suspense>
    </>
  );
}

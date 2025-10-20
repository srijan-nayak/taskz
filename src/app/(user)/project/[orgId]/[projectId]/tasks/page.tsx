import { getTasks } from "@/actions/task";
import CreateTask from "@/components/task/CreateTask";
import MainHeader from "@/components/common/MainHeader";
import PageTitle from "@/components/common/PageTitle";
import TasksTable from "@/components/task/TasksTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ projectId: string; orgId: string }>;
}) {
  const { projectId, orgId } = await params;
  const tasksListPromise = getTasks(orgId, projectId);

  return (
    <>
      <MainHeader>
        <PageTitle>Project Tasks</PageTitle>
        <CreateTask />
      </MainHeader>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <TasksTable tasksListPromise={tasksListPromise} />
      </Suspense>
    </>
  );
}

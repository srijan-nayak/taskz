import { getOrgActivity as getActivity } from "@/actions/activity";
import ActivityTable from "@/components/common/ActivityTable";
import MainHeader from "@/components/common/MainHeader";
import PageTitle from "@/components/common/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function OrgActivityPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  const activityListPromise = getActivity(orgId);

  return (
    <>
      <MainHeader>
        <PageTitle>Organization Activity</PageTitle>
      </MainHeader>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ActivityTable activityListPromise={activityListPromise} />
      </Suspense>
    </>
  );
}

import { getMembers } from "@/actions/membership";
import MembersTable from "@/components/MembersTable";
import OrgMembersHeader from "@/components/OrgMembersHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  const membersListPromise = getMembers(orgId);

  return (
    <>
      <OrgMembersHeader />
      <Suspense fallback={<Skeleton className="h-96" />}>
        <MembersTable membersListPromise={membersListPromise} />
      </Suspense>
    </>
  );
}

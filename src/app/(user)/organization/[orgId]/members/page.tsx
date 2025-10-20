import { getMembers } from "@/actions/membership";
import InviteMember from "@/components/InviteMember";
import MainHeader from "@/components/MainHeader";
import MembersTable from "@/components/MembersTable";
import PageTitle from "@/components/PageTitle";
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
      <MainHeader>
        <PageTitle>Organization Members</PageTitle>
        <InviteMember />
      </MainHeader>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <MembersTable membersListPromise={membersListPromise} />
      </Suspense>
    </>
  );
}

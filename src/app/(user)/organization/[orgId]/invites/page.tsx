import { getOrganizationInvitations } from "@/actions/invitations";
import MainHeader from "@/components/common/MainHeader";
import OrgInvitesTable from "@/components/organization/OrgInvitesTable";
import PageTitle from "@/components/common/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function InvitesPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  const orgInvitesListPromise = getOrganizationInvitations(orgId);

  return (
    <>
      <MainHeader>
        <PageTitle>Sent Invites</PageTitle>
      </MainHeader>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <OrgInvitesTable orgInvitesListPromise={orgInvitesListPromise} />
      </Suspense>
    </>
  );
}

import { getOrganizationInvitations } from "@/actions/invitations";
import MainHeader from "@/components/MainHeader";
import OrgInvitesTable from "@/components/OrgInvitesTable";
import PageTitle from "@/components/PageTitle";
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

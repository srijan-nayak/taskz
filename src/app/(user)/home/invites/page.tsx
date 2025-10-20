import { getUserInvitations } from "@/actions/invitations";
import InvitesTable from "@/components/membership/InvitesTable";
import MainHeader from "@/components/common/MainHeader";
import PageTitle from "@/components/common/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function InvitesPage() {
  const invitesListPromise = getUserInvitations();

  return (
    <>
      <MainHeader>
        <PageTitle>Invites</PageTitle>
      </MainHeader>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <InvitesTable invitesListPromise={invitesListPromise} />
      </Suspense>
    </>
  );
}

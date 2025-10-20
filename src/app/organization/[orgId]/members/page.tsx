import InviteMember from "@/components/InviteMember";
import MainHeader from "@/components/MainHeader";
import PageTitle from "@/components/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function MembersPage() {
  return (
    <>
      <MainHeader>
        <PageTitle>Organization Members</PageTitle>
        <InviteMember />
      </MainHeader>
      <Suspense fallback={<Skeleton className="h-96" />}>
        {/* <MembersTable membersListPromise={membersListPromise} /> */}
      </Suspense>
    </>
  );
}

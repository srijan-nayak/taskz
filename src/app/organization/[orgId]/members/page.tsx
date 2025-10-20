import InviteMember from "@/components/InviteMember";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function MembersPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Organization Members</h1>
        <InviteMember />
      </div>
      <Suspense fallback={<Skeleton className="h-96" />}>
        {/* <MembersTable membersListPromise={membersListPromise} /> */}
      </Suspense>
    </>
  );
}

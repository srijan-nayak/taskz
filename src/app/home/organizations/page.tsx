import { getOrganizations } from "@/actions/organization";
import CreateOrg from "@/components/CreateOrg";
import OrgTable from "@/components/OrgTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function OrganizationsPage() {
  const orgsListPromise = getOrganizations();

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Your Organizations</h1>
        <CreateOrg />
      </div>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <OrgTable orgsListPromise={orgsListPromise} />
      </Suspense>
    </>
  );
}

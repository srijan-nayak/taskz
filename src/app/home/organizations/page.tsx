import { getOrganizations } from "@/actions/organization";
import CreateOrg from "@/components/CreateOrg";
import MainHeader from "@/components/MainHeader";
import OrgTable from "@/components/OrgTable";
import PageTitle from "@/components/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function OrganizationsPage() {
  const orgsListPromise = getOrganizations();

  return (
    <>
      <MainHeader>
        <PageTitle>Your Organizations</PageTitle>
        <CreateOrg />
      </MainHeader>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <OrgTable orgsListPromise={orgsListPromise} />
      </Suspense>
    </>
  );
}

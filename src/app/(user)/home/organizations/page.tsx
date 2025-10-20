import { getOrganizations } from "@/actions/organization";
import CreateOrg from "@/components/organization/CreateOrg";
import MainHeader from "@/components/common/MainHeader";
import OrgTable from "@/components/organization/OrgTable";
import PageTitle from "@/components/common/PageTitle";
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

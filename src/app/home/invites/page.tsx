import MainHeader from "@/components/MainHeader";
import PageTitle from "@/components/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function InvitesPage() {
  return (
    <>
      <MainHeader>
        <PageTitle>Invites</PageTitle>
      </MainHeader>
      <Suspense fallback={<Skeleton className="h-96"/>}></Suspense>
    </>
  );
}

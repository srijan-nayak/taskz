import { getUserOrgDetails } from "@/actions/organization";
import OrgBreadcrumb from "@/components/organization/OrgBreadcrumb";
import OrgSidebar from "@/components/organization/OrgSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import OrganizationPromiseProvider from "@/providers/OrganizationPromiseProvider";
import { ReactNode, Suspense } from "react";

export default async function OrganizationsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  const promise = getUserOrgDetails(orgId);

  return (
    <OrganizationPromiseProvider promise={promise}>
      <SidebarProvider>
        <OrgSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className="cursor-pointer" />
              <Suspense fallback={<Skeleton className="w-56 h-4" />}>
                <OrgBreadcrumb />
              </Suspense>
            </div>
          </header>
          <main className="px-3">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </OrganizationPromiseProvider>
  );
}

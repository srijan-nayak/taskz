import { getUserOrgDetails } from "@/actions/organization";
import OrgSidebar from "@/components/organization/OrgSidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import OrganizationPromiseProvider from "@/providers/OrganizationPromiseProvider";
import { ReactNode } from "react";

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
              <SidebarTrigger />
              <Breadcrumb className="border-l-2 ps-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      Taskz
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="px-3">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </OrganizationPromiseProvider>
  );
}

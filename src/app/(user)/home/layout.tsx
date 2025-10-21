import HomeBreadcrumb from "@/components/home/HomeBreadcrumb";
import HomeSidebar from "@/components/home/HomeSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <HomeSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="cursor-pointer" />
            <HomeBreadcrumb />
          </div>
        </header>
        <main className="px-3">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

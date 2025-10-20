"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Archive, Building2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { UserDetails } from "@/lib/definitions/auth";
import { Result } from "@/lib/definitions/generic";

export default function HomeSidebar({
  userDataPromise,
}: {
  userDataPromise: Promise<Result<UserDetails, string>>;
}) {
  const path = usePathname();

  const items = [
    {
      title: "Organizations",
      url: "/home/organizations",
      icon: Building2,
    },
    {
      title: "Invites",
      url: "/home/invites",
      icon: Archive,
    },
  ];

  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={path.includes(item.url)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton userDataPromise={userDataPromise} />
      </SidebarFooter>
    </Sidebar>
  );
}

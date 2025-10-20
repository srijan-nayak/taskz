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
import { User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserLogoutButton from "./UserLogoutButton";
import { UserDetails } from "@/lib/definitions/auth";
import { Result } from "@/lib/definitions/generic";

export default function OrgSidebar({
  userDataPromise,
}: {
  userDataPromise: Promise<Result<UserDetails, string>>;
}) {
  const path = usePathname();

  const items = [
    {
      title: "Members",
      url: "./members",
      icon: User2,
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
                  <SidebarMenuButton
                    asChild
                    isActive={path.includes(item.url.slice(1))}
                  >
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
        <UserLogoutButton userDataPromise={userDataPromise} />
      </SidebarFooter>
    </Sidebar>
  );
}

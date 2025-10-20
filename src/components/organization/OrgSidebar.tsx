"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FolderCode, Mail, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserLogoutButton from "../auth/UserLogoutButton";
import useOrganization from "@/hooks/useOrganization";
import { Role } from "@/generated/prisma/enums";

export default function OrgSidebar() {
  const path = usePathname();
  const org = useOrganization();

  const items = [
    {
      title: "Members",
      url: "./members",
      icon: User2,
    },
    {
      title: "Projects",
      url: "./projects",
      icon: FolderCode,
    },
    {
      title: "Invites",
      url: "./invites",
      icon: Mail,
      hide: org?.userRole === Role.MEMBER,
    },
  ];

  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          {org && <SidebarGroupLabel>{org.orgName}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((i) => !i.hide)
                .map((item) => (
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
        <UserLogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}

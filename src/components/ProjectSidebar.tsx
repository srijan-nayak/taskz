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
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserLogoutButton from "./UserLogoutButton";
import useProject from "@/hooks/useProject";
import { ListTodo } from "lucide-react";

export default function OrgSidebar() {
  const path = usePathname();
  const project = useProject();

  const items = [
    {
      title: "Tasks",
      url: "./tasks",
      icon: ListTodo,
    },
  ];

  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          {project && <SidebarGroupLabel>{project.name}</SidebarGroupLabel>}
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
        <UserLogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}

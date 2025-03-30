"use client";
import { logout } from "@/lib/firebase";
import { LogOut } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
export default function LogoutMenu() { 
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={logout}>
          <LogOut />
          <span>Log Out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

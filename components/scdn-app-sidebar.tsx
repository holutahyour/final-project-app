"use client";

import * as React from "react";

import { NavMain } from "@/components/sdcn-nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sdcn-sidebar";
import { sidebarData } from "@/data/sidebar-data";
import AppLogo from "./app/app-logo";
import { useRoleSelection } from "@/app/context/roleSelection-context";
import { Box, Separator } from "@chakra-ui/react";
import { NavUser } from "./nav-user";
import { useAzureAuth } from "@/app/context/auth-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/sdcn-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/sdcn-avatar";
import { getInitials } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { LogOut, User } from "lucide-react";
import { NavProjects } from "./sdcn-nav-projects";
import { NavSecondary } from "./sdcn-nav-secondary";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAzureAuth();
  const { signOut } = useAzureAuth()
  const { availableRoles, selectedRole, selectRole } = useRoleSelection()


  const navigationItems = sidebarData(selectedRole ?? '');

  return (
    <Sidebar className="" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <AppLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>

                <SidebarMenuButton
                  size="lg"
                  className="flex items-center gap-3 mx-1 my-6 bg-sidebar-accent text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="rounded-full">
                      {getInitials(user?.name ?? "")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid text-left text-sm leading-tight overflow-hidden gap-1">
                    <span className="truncate font-semibold">{user?.name}</span>
                    {/* <span className="truncate text-xs">{user?.email}</span> */}
                    <span className="truncate text-xs">{selectedRole}</span>
                  </div>

                  <CaretSortIcon className="ml-auto size-4" />
                </SidebarMenuButton>

              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal text-center">
                  User Roles
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {availableRoles.map((role) => (
                    <DropdownMenuItem key={role} onClick={() => selectRole(role)}>
                      <User className="mr-2 h-4 w-4" />
                      {role}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={navigationItems.general} disableSubMenu />
        <Separator size="sm" />
        <NavMain items={navigationItems.userMangement} disableSubMenu />
        <Separator size="sm" />
        <NavSecondary items={navigationItems.account} />
        {/* <NavProjects projects={navigationItems.projects} /> */}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

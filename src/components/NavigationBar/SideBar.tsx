"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"; // adjust the import path to your setup

import {
  FolderKanban,
  HomeIcon,
  ListOrdered,
  LogOut,
  PandaIcon,
  Settings,
  SquareUserRound,
  User
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoImage from "@/app/favicon.ico";

const menuItems = [
  {
    icon: HomeIcon,
    url: "/dashboard",
    title: "Dashboard",
  },
  {
    icon: PandaIcon,
    url: "/livestock",
    title: "Livestock",
  },
  // {
  //   icon: FolderKanban,
  //   url: "/products",
  //   title: "Products",
  // },
  {
    icon: ListOrdered,
    url: "/orders",
    title: "Orders",
  },
];

const lowerMenu = [
  {
    icon: User,
    url: "/user-profile",
    title: "User Profile",
  },
  {
    icon: Settings,
    url: "/settings",
    title: "Settings",
  },
  {
    icon: LogOut,
    url: "/logout",
    title: "Logout",
  },
];

const SideBar = () => {
  return (
    <Sidebar className="h-screen sticky top-0 bg-white shadow-md px-4 py-2">
      <SidebarContent className="flex flex-col h-full">
        {/* Top Section */}
        {/* Logo */}
        <div className="flex gap-2 p-2 items-center">
          <Image src={LogoImage} height={24} width={24} alt="LOGO" />
          <span className="font-semibold text-lg">
            FlowStatic
          </span>
        </div>

        {/* Application Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm text-muted-foreground font-semibold">
            OVERVIEW
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 p-2 rounded hover:bg-red-100 transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {lowerMenu.map((item, idx) => (
            <SidebarMenuItem key={idx}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className="flex items-center gap-3 p-2 rounded hover:bg-red-100 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <div className="flex items-center gap-2 p-2">
            <SquareUserRound className="h-8 w-8 border rounded-full p-1 text-white bg-gray-400" />
            <span className="text-sm font-medium">Daniel Njoroge</span>
          </div>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;

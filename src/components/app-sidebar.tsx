"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar, // মোবাইল মোড হ্যান্ডেল করার জন্য
} from "@/components/ui/sidebar"

import { customerRoutes } from "@/routes/customerRoutes"
import { adminRoutes } from "@/routes/adminRoutes"
import { providerRoutes } from "@/routes/providerRoutes"
import { Route } from "@/types/index.type"
import { cn } from "@/lib/utils"

export function AppSidebar({ user, ...props }: { user: { role?: string } } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar() // মোবাইল মেনু বন্ধ করার ফাংশন

  // রোল অনুযায়ী রুট সেট করা
  let routes: Route[] = [];
  const role = user?.role?.toLowerCase();

  switch (role) {
    case "admin":
      routes = adminRoutes;
      break;
    case "customer":
      routes = customerRoutes;
      break;
    case "provider":
      routes = providerRoutes;
      break;
    default:
      routes = [];
  }

  return (
    <Sidebar 
      {...props} 
      className="border-r border-slate-800" 
      collapsible="icon"
    >
      <SidebarContent className="bg-[#04193e] text-slate-300">
        {/* Logo Section */}
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-black text-white shadow-lg shadow-blue-900/20">
              M
            </div>
            <span className="text-xl font-black tracking-tight text-white group-data-[collapsible=icon]:hidden">
              MEAL MATE
            </span>
          </Link>
        </div>

        {/* Routes Content */}
        <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
          {routes.map((group) => (
            <SidebarGroup key={group.title} className="px-2">
              <SidebarGroupLabel className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-data-[collapsible=icon]:hidden">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          className={cn(
                            "group/menu-btn h-11 w-full rounded-xl px-4 transition-all duration-200",
                            isActive 
                              ? "bg-blue-600 text-white shadow-md shadow-blue-900/40" 
                              : "hover:bg-white/10 hover:text-white"
                          )}
                        >
                          <Link 
                            href={item.url} 
                            onClick={() => setOpenMobile(false)}
                            className="flex items-center gap-3"
                          >
                            <span className="text-sm font-semibold tracking-wide">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>
      <SidebarRail className="transition-colors hover:bg-blue-900/30" />
    </Sidebar>
  )
}
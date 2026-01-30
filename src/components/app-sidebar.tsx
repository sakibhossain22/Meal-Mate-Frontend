import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { customerRoutes } from "@/routes/customerRoutes"
import { adminRoutes } from "@/routes/adminRoutes"
import { Route } from "@/types/index.type"
import { providerRoutes } from "@/routes/providerRoutes"



export function AppSidebar({ user, ...props }: { user: { role?: string } } & React.ComponentProps<typeof Sidebar>) {
  let routes: Route[] = [];
  switch (user.role) {
    case "admin":
      routes = adminRoutes;
      break;
    case "customer":
      routes = customerRoutes;
      break;
    case "provider":
      routes = providerRoutes
      break
    default:
      routes = []
  }
  return (
    <Sidebar {...props} className="border-slate-800">
      <SidebarContent className="bg-[#04193e] text-slate-300">
        {/* Sidebar Header/Logo (Optional but recommended) */}
        <div className="p-6">
          <h2 className="text-xl font-black text-white tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">M</div>
            MEAL MATE
          </h2>
        </div>

        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-slate-500 font-bold px-4 mb-2 uppercase text-[10px] tracking-widest">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2 space-y-1">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="w-full transition-all duration-200 hover:bg-white/10 hover:text-white group rounded-xl p-3 h-auto"
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <span className="text-sm font-semibold tracking-wide">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail className="hover:bg-blue-900/50" />
    </Sidebar>
  )
}

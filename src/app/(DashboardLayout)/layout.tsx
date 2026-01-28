import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { userService } from "../services/userService";

export default async function Page({ user, admin, }: { user: React.ReactNode, admin: React.ReactNode }) {

  const data = await userService.getSession()
  const userRole = {
    role: data.data.user.role.toLowerCase()
  };
  console.log(userRole.role);
  return (
    <SidebarProvider>
      <AppSidebar user={userRole} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userRole.role === "admin" ? admin : user}
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { userService } from "../services/userService";
import { redirect } from "next/navigation";

interface LayoutProps {
  customer: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
}

export default async function Page({ customer, admin, provider }: LayoutProps) {
  const session = await userService.getSession();
  
  const role = session?.data?.user?.role?.toLowerCase();

  if (!role) {
    redirect('/');
  }

  const userForSidebar = {
    name: session?.data?.user?.name || "User",
    email: session?.data?.user?.email || "",
    role: role,
    image: session?.data?.user?.image
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userForSidebar} />
      
      <SidebarInset className="bg-slate-950 border-l border-slate-900">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {role === "admin" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {admin}
                </div>
              )}
              
              {role === "customer" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {customer}
                </div>
              )}
              
              {role === "provider" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {provider}
                </div>
              )}

            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
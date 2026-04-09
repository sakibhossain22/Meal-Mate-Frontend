import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { userService } from "../services/userService";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { Bell, User } from "lucide-react";

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
    name: session?.data?.user?.name,
    email: session?.data?.user?.email,
    role: role,
    image: session?.data?.user?.image
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userForSidebar} />
      <SidebarInset className="bg-slate-950 border-l border-slate-900 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-900 bg-slate-950/80 px-4 backdrop-blur md:px-6">
          <SidebarTrigger className="text-slate-400" />
          <div className="flex-1">
            <h1 className="text-sm font-medium text-slate-400 uppercase tracking-wider md:text-base">
              Dashboard <span className="mx-2 text-slate-700">/</span>
              <span className="text-white capitalize">{role}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <User size={18} />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
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
        <Toaster richColors position="top-right" />
      </SidebarInset>
    </SidebarProvider>
  )
}
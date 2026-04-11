import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { userService } from "../services/userService";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { Bell, LayoutDashboard } from "lucide-react";
import { UserMenu } from "@/components/dashboard/user-menu";

interface LayoutProps {
  customer: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
  delivery: React.ReactNode;
  superadmin: React.ReactNode;
}

export default async function Page({ customer, admin, provider, delivery, superadmin }: LayoutProps) {
  const session = await userService.getSession();
  const rawRole = session?.data?.user?.role;
  const role = rawRole?.toLowerCase();

  if (!role) {
    redirect('/login');
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
      <SidebarInset className="bg-[#020617] flex flex-col min-h-screen">
        {/* Modern Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-slate-950/50 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-1.5 rounded-lg border border-white/10 md:hidden">
                <SidebarTrigger className="text-slate-400" />
            </div>
            <div className="hidden md:block">
                 <SidebarTrigger className="text-slate-400 hover:text-white transition-colors" />
            </div>
            
            <div className="h-6 w-[1px] bg-slate-800 mx-2 hidden sm:block" />
            
            <div className="flex items-center gap-2">
              <LayoutDashboard size={18} className="text-rose-500" />
              <h1 className="text-sm font-bold tracking-tight text-white md:text-lg">
                Meal Mate <span className="text-slate-500 font-medium">/</span>
                <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent capitalize ml-2">
                  {role}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Button */}
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-slate-950 group-hover:scale-110 transition-transform" />
            </button>

            {/* User Dropdown Menu */}
            <UserMenu user={userForSidebar} />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {/* Role Based Rendering with Smooth Animations */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
              {role === "admin" && admin}
              {role === "customer" && customer}
              {role === "provider" && provider}
              {role === "delivery" && delivery}
              {role === "superadmin" && superadmin}
            </div>
          </div>
        </main>

        <Toaster richColors position="bottom-right" />
      </SidebarInset>
    </SidebarProvider>
  )
}
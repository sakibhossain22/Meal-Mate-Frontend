"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Menu, LogOut, ChevronDown,
  ShieldCheck, HelpCircle, LifeBuoy,
  User, Settings, LayoutDashboard
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
  title: string;
  url: string;
}

const Navbar1 = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Meals", url: "/meals" },
    { title: "Providers", url: "/providers" },
    { title: "Blogs", url: "/blogs" },
  ],
  className,
}: { className?: string; menu?: MenuItem[] }) => {

  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <section className={cn(
      "sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl py-3",
      className
    )}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">

          {/* --- Logo Area --- */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#f22e3e] p-1.5 rounded-xl group-hover:rotate-12 transition-transform">
              <Image src="/logo.png" alt="Logo" width={32} height={32} priority className="brightness-200" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
              Meal<span className="text-[#f22e3e]">Mate</span>
            </span>
          </Link>

          {/* --- Desktop Center Menu --- */}
          <div className="hidden lg:flex items-center gap-2">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-[#f22e3e] dark:hover:text-[#fbb200] transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                {item.title}
              </Link>
            ))}

            {/* --- More Dropdown (Resources) --- */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 outline-none hover:text-[#f22e3e]">
                  More <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border-zinc-100 dark:border-zinc-800">
                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-zinc-400 p-2">Resources</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/faq" className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-[#fbb200]/10 focus:text-[#fbb200]">
                    <HelpCircle size={18} /> <span>FAQ</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/terms" className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-[#f22e3e]/10 focus:text-[#f22e3e]">
                    <ShieldCheck size={18} /> <span>Terms & Policy</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/support" className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-emerald-500/10 focus:text-emerald-500">
                    <LifeBuoy size={18} /> <span>Help & Support</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* --- Right Actions (Auth) --- */}
          <div className="hidden lg:flex items-center gap-3">
            <ModeToggle />

            {!session?.user ? (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" className="font-bold rounded-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-[#f22e3e] hover:bg-[#d92937] text-white font-black px-6 rounded-full shadow-lg shadow-[#f22e3e]/20">
                  <Link href="/register">Join Free</Link>
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full flex items-center gap-2 p-1 pr-4 border-2 border-[#fbb200]/30 hover:border-[#f22e3e]/50 transition-all active:scale-95"
                  >
                    {/* Profile Image ba Initials */}
                    <div className="w-8 h-8 rounded-full bg-[#fbb200] text-zinc-950 flex items-center justify-center font-black text-xs shadow-inner">
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt="avatar"
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        session.user.name?.charAt(0).toUpperCase()
                      )}
                    </div>

                    {/* User First Name Logic */}
                    <span className="text-xs font-black tracking-tight dark:text-white">
                      {session.user.name ? session.user.name.split(' ')[0] : "Account"}
                    </span>

                    <ChevronDown size={14} className="text-zinc-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-3xl">
                  <DropdownMenuLabel className="p-4">
                    <p className="font-black text-sm">{session.user.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{session.user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="p-3 flex items-center gap-3 rounded-xl cursor-pointer">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="p-3 flex items-center gap-3 rounded-xl cursor-pointer text-[#f22e3e] focus:bg-[#f22e3e] focus:text-white transition-colors">
                    <LogOut size={18} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* --- Mobile View --- */}
          <div className="lg:hidden flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-xl bg-zinc-100 dark:bg-zinc-900">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] rounded-l-[3rem] p-8">
                <SheetHeader className="text-left mb-10">
                  <SheetTitle className="text-3xl font-black italic">Meal<span className="text-[#f22e3e]">Mate</span></SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  {menu.map((item) => (
                    <Link key={item.title} href={item.url} className="text-xl font-black p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                      {item.title}
                    </Link>
                  ))}
                  <DropdownMenuSeparator className="my-4" />
                  <Link href="/faq" className="text-sm font-bold p-4 text-zinc-500 flex items-center gap-3"> <HelpCircle size={18} /> FAQ</Link>
                  <Link href="/support" className="text-sm font-bold p-4 text-zinc-500 flex items-center gap-3"> <LifeBuoy size={18} /> Support</Link>

                  <div className="mt-10 flex flex-col gap-4">
                    {!session?.user ? (
                      <>
                        <Button asChild className="w-full bg-[#f22e3e] py-7 rounded-2xl text-lg font-black">
                          <Link href="/register">Sign Up Now</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full py-7 rounded-2xl text-lg font-bold">
                          <Link href="/login">Login</Link>
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleSignOut} variant="destructive" className="w-full py-7 rounded-2xl font-black">
                        Logout of Account
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </nav>
      </div>
    </section>
  );
};

export { Navbar1 };
"use client"

import { authClient } from "@/lib/auth-client";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, CreditCard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function UserMenu({ user }: { user: any }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const firstLetter = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 p-[2px] shadow-lg hover:scale-105 transition-transform">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
            {user.image ? (
              <Image 
                src={user.image} 
                alt={user.name} 
                width={36} 
                height={36} 
                className="rounded-full object-cover" 
              />
            ) : (
              <span className="text-xs font-bold text-white">{firstLetter}</span>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-900/90 border-slate-800 text-slate-200 backdrop-blur-xl" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">{user.name}</p>
            <p className="text-xs leading-none text-slate-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-800" />

        <DropdownMenuSeparator className="bg-slate-800" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer text-rose-400 focus:bg-rose-500/10 focus:text-rose-400"
        >
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
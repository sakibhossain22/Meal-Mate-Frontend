"use client"

import Link from "next/link";
import Image from "next/image";
import { Menu, LogOut } from "lucide-react";

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
import { Accordion } from "@/components/ui/accordion";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
  title: string;
  url: string;
}

interface Navbar1Props {
  className?: string;
  menu?: MenuItem[];
}

const Navbar1 = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Meals", url: "/meals" },
    { title: "Providers", url: "/providers" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  className,
}: Navbar1Props) => {

  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <section className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
              <span className="text-xl font-bold tracking-tight">Meal Mate</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-orange-500"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />

            <>
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/register">Register</Link>
              </Button>
            </>
            {
              session?.user &&
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="rounded-full flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </Button>
            }
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
            <span className="font-bold">Meal Mate</span>
          </Link>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 mx-5 flex flex-col gap-6">
                  {menu.map((item) => (
                    <Link key={item.title} href={item.url} className="text-lg font-medium hover:text-orange-500">
                      {item.title}
                    </Link>
                  ))}
                  <hr className="border-muted" />
                  <div className="flex flex-col gap-3">
                    {session?.user ? (
                      <Button onClick={handleSignOut} variant="destructive" className="w-full">
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="w-full bg-orange-500">
                          <Link href="/register">Register</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface RoleGatewayProps {
  children: React.ReactNode;
  allowedRole: "SUPERADMIN" | "ADMIN" | "PROVIDER" | "CUSTOMER" | "DELIVERY";
}

export default function RoleGateway({ children, allowedRole }: RoleGatewayProps) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`);
        const data = await res.json();

        if (!data?.user) {
          router.push("/login");
          return;
        }

        const userRole = data.user.role;

        // যদি রোল না মিলে, তবে তাকে তার অরিজিনাল ড্যাশবোর্ডে পাঠিয়ে দাও
        if (userRole !== allowedRole) {
          router.push("/dashboard"); // এটি পরে মিডলওয়্যার বা মেইন ড্যাশবোর্ড পেজ হ্যান্ডেল করবে
        } else {
          setAuthorized(true);
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [allowedRole, router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-[#f22e3e]" size={40} />
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
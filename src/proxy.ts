import { userService } from "@/app/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const { data } = await userService.getSession();
    const user = data?.user;

    // ১. সেশন না থাকলে লগইন পেজে পাঠান
    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = user?.role; // যেমন: "ADMIN", "SUPERADMIN", "PROVIDER", "CUSTOMER", "DELIVERY"

    // ২. রুট ড্যাশবোর্ড (/dashboard) হিট করলে রোল অনুযায়ী সঠিক জায়গায় পাঠান
    if (pathName === "/dashboard" || pathName === "/dashboard/") {
        if (role === "SUPERADMIN") {
            return NextResponse.redirect(new URL("/dashboard/superadmin/system-stats", request.url));
        }
        if (role === "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/admin/admin-stats", request.url));
        }
        if (role === "PROVIDER") {
            return NextResponse.redirect(new URL("/dashboard/provider/provider-stats", request.url));
        }
        if (role === "DELIVERY") {
            return NextResponse.redirect(new URL("/dashboard/delivery/delivery-stats", request.url));
        }
        if (role === "CUSTOMER") {
            return NextResponse.redirect(new URL("/dashboard/customer/customer-stats", request.url));
        }
    }

    // ৩. রোল ভিত্তিক পাথ প্রোটেকশন (Role-Based Access Control)
    
    // Super Admin Protection
    if (pathName.startsWith("/dashboard/superadmin") && role !== "SUPERADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Admin Protection
    if (pathName.startsWith("/dashboard/admin") && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Provider Protection
    if (pathName.startsWith("/dashboard/provider") && role !== "PROVIDER") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Delivery Protection
    if (pathName.startsWith("/dashboard/delivery") && role !== "DELIVERY") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Customer Protection
    if (pathName.startsWith("/dashboard/customer") && role !== "CUSTOMER") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"]
};
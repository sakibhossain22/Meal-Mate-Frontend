import { NextRequest, NextResponse } from "next/server";
import { userService } from "./app/services/userService";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const { data } = await userService.getSession();
    const user = data?.user;

    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = user.role;

    if (pathName === "/dashboard" || pathName === "/dashboard/") {
        if (role === "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/admin/admin-stats", request.url));
        }
        if (role === "PROVIDER") {
            return NextResponse.redirect(new URL("/dashboard/provider/provider-stats", request.url));
        }
        if (role === "CUSTOMER") {
            return NextResponse.redirect(new URL("/dashboard/customer/customer-stats", request.url));
        }
    }

    if (pathName.startsWith("/dashboard/admin") && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathName.startsWith("/dashboard/provider") && role !== "PROVIDER") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathName.startsWith("/dashboard/customer") && role !== "CUSTOMER") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"]
};
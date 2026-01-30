import { NextRequest, NextResponse } from "next/server";
import { userService } from "./src/app/services/userService";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname

    let isAuthenticated = false
    let isAdmin = false
    let isProvider = false
    let isCustomer = false

    const { data } = await userService.getSession()

    if (data) {
        isAuthenticated = true
        if (data.user.role === "ADMIN") {
            isAdmin = data.user.role === "ADMIN"
        }
        if (data.user.role === "CUSTOMER") {
            isCustomer = data.user.role === "CUSTOMER"
        }
        if (data.user.role === "PROVIDER") {
            isProvider = data.user.role === "PROVIDER"
        }
    }
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    if (isAdmin && pathName.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard/admin/admin-stats", request.url))
    }
    if (isCustomer && pathName.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard/customer/customer-stats", request.url))
    }
    if (isCustomer && pathName.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard/provider/provider-stats", request.url))
    }

    if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/dashboard/admin/",
        "/dashboard/admin/:path*",
        "/dashboard/provider/",
        "/dashboard/provider/:path*",
        "/dashboard/custoner/",
        "/dashboard/customer/:path*",
    ]
}
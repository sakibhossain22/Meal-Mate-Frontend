import { NextRequest, NextResponse } from "next/server";
import { userService } from "./app/services/userService";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    let isAuthenticated = false
    let isAdmin = false

    const { data } = await userService.getSession()
    if (data) {
        isAuthenticated = true
        isAdmin = data.user.role === "ADMIN"
    }
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    if (isAdmin && pathName.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-stats",request.url))
    }
    if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard",request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/admin-dashboard",
        "/admin-dashboard/:path*"
    ]
}
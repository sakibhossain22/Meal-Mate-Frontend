"use server"

import { env } from "@/env"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const API_URL = env.API_URL
export async function updateUserStatus(userId: string, status: { status: string }) {
    const cookieStore = await cookies()
    var statusData;
    if (status.status === "ACTIVE") {
        statusData = "BANNED"
    } else if (status.status === "BANNED") {
        statusData = "ACTIVE"
    }
    // console.log(status, "userId", userId);
    console.log(statusData);

    const res = await fetch(`${API_URL}/admin/update-user/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify({ status: statusData })
    })
    const data = await res.json()
    if (data) {
        revalidatePath('/dashboard/admin/manage-user')
    }


}
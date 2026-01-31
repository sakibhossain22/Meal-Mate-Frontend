"use server"

import { env } from "@/env"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
const API_URL = env.API_URL
export async function updateUserStatus(userId: string, status: { status: string }) {
    const cookieStore = await cookies()
    var statusData;
    if (status.status === "ACTIVE") {
        statusData = "BANNED"
    } else if (status.status === "BANNED") {
        statusData = "ACTIVE"
    }
    // console.log(status, "userId",     userId);
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




export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    const cookieStore = await cookies()
    if (!name) return { error: "Name is required" };

    const res = await fetch(`${API_URL}/admin/add-category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify({ id: name, name: name })
    })
    const data = await res.json()
    if (data) {
        revalidatePath("/dashboard/admin/manage-category");
        redirect("/dashboard/admin/manage-category");
    }
    return data


} 
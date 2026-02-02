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
        body: JSON.stringify({ name: name })
    })
    const data = await res.json()
    if (data) {
        revalidatePath("/dashboard/admin/manage-category");
        redirect("/dashboard/admin/manage-category");
    }
    return data


}

export async function getAllReview() {
    const cookieStore = await cookies()
    const res = await fetch(`${API_URL}/admin/all-reviews`, {
        method: "GET",
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    const data = await res.json()
    return data


}
export async function getAllReviewHome() {
    const cookieStore = await cookies()
    const res = await fetch(`${API_URL}/admin/all-reviews`, {
        method: "GET"
    })
    const data = await res.json()
    return data


}



export async function deleteReview(id: string) {
    console.log(id);
    const cookieStore = await cookies()

    const res = await fetch(`${API_URL}/admin/delete-reviews/${id}`, {
        method: "DELETE",
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    const data = await res.json()

    if (res.ok) {
        revalidatePath('/dashboard/admin/customer-reviews')
    }
    return data

}
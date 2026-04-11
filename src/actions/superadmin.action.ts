"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

const API_URL = process.env.API_URL

async function serverFetch(endpoint: string, method: string = "GET", body?: any) {
    const cookieStore = await cookies()
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: body ? JSON.stringify(body) : undefined,
    })

    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.error || `Failed to ${method} ${endpoint}`)
    }
    return result
}

// ১. সিস্টেম স্ট্যাটাস আনা
export async function getSystemStats() {
    return await serverFetch("/superadmin/system-stats")
}

// ২. ইউজার ম্যানেজ করা (Role বা Status আপডেট)
// export async function manageUserAction(userId: string, role?: string, status?: string) {
//     const result = await serverFetch("/superadmin/manage-user", "PATCH", { userId, role, status })
//     revalidatePath("/dashboard/super-admin/users") // ডাটা আপডেট হলে পেজ রিফ্রেশ করবে
//     return result
// }
export async function manageUserAction (userId: string, role?: string, status? : string) {
    const cookieStore = await cookies()
    const res= await fetch(`${API_URL}/superadmin/manage-user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ userId, role, status }),
    })
    const result = await res.json()
    console.log(result)
    if (!res.ok) {
        throw new Error(result.error || "Failed to manage user");
    }
    revalidatePath("/dashboard/super-admin/users")
    return result
}

// ৩. প্রোভাইডার ভেরিফাই করা
export async function verifyProviderAction(providerId: string, isVerified: boolean = true) {
    const result = await serverFetch("/superadmin/verify-provider", "PATCH", { providerId, isVerified })
    revalidatePath("/dashboard/super-admin/providers")
    return result
}

// ৪. ডেলিভারি ম্যান ভেরিফাই করা
export async function verifyDeliveryManAction(deliveryManId: string, isVerified: boolean = true) {
    const result = await serverFetch("/superadmin/verify-delivery", "PATCH", { deliveryManId, isVerified })
    revalidatePath("/dashboard/super-admin/delivery")
    return result
}

// ৫. নতুন ক্যাটাগরি তৈরি করা
export async function createCategoryAction(name: string) {
    const result = await serverFetch("/superadmin/categories", "POST", { name })
    revalidatePath("/dashboard/super-admin/categories")
    return result
}

// ৬. সব অর্ডারের লিস্ট আনা
export async function getAllOrdersAction() {
    return await serverFetch("/superadmin/all-orders", "GET")
}
export async function getAllDeliveryMenProfilesAction() {
    return await serverFetch("/superadmin/delivery-men-profiles", "GET")
}
export async function getAllProvidersProfilesAction() {
    return await serverFetch("/superadmin/providers-profiles", "GET")
}
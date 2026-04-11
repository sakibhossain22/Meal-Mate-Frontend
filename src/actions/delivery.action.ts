"use server"

import { cookies } from "next/headers"

const API_URL = process.env.API_URL

export async function acceptOrder(orderId: string, deliveryManId: string) {
    const cookieStore = await cookies()
    const response = await fetch(`${API_URL}/delivery/accept-order`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ orderId, deliveryManId }),
    })
   const data = await response.json()
   return data
}

export async function updateDeliveryStatus(orderId: string, status: string) {
    const cookieStore = await cookies()
    const response = await fetch(`${API_URL}/delivery/update-status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ orderId, status }),
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update delivery status")
    }
    return response.json()
}

export async function toggleAvailability(available: boolean) {
    const cookieStore = await cookies()
    const response = await fetch(`${API_URL}/delivery/toggle-availability`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ isAvailable: available }),
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to toggle availability")
    }
    return response.json()
}

export async function getDeliveryStats() {
    const cookieStore = await cookies()
    const response = await fetch(`${API_URL}/delivery/stats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch delivery stats")
    }
    return response.json()
}

export async function getDeliveryHistory() {
    const cookieStore = await cookies()
    const response = await fetch(`${API_URL}/delivery/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch delivery history")
    }
    return response.json()
}

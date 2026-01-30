"use server"

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL || "http://localhost:5000"


export async function updateProviderProfile(formData: { name: string, phone: string }) {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${API_URL}/profile/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        return data;
    } catch (error) {
        return { success: false, message: "Server connection failed" };
    }
}
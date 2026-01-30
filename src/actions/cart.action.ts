"use server"

import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
const API_URL = env.API_URL


export async function deleteMealProvider(id: string) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/cart/${id}`, {
        method: "DELETE",
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    revalidatePath("/dashboard/customer/cart");
    const data = await res.json();
    return data;
}
"use server"

import { userService } from "@/app/services/userService";
import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
const API_URL = env.API_URL


export async function deleteCartItem(id: string) {
    const session = await userService.getSession()
    if (session.data.user.role !== "CUSTOMER") {
        return "Only Customer Can Add Product to Cart"
    }
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
// Addd Cart
export async function addToCart(mealId: string, quantity: number) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ mealId, quantity }),
    });
    const data = await res.json();
    return data;
}

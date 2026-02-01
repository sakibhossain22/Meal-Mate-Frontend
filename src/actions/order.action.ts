"use server"

import { userService } from "@/app/services/userService";
import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const API_URL = env.API_URL
// incoming order
export async function incomingOrder() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/orders/provider`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()

  return data
}
export async function providerStats() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/provider/provider/stats`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  console.log(data);
  return data
}


export async function updateOrderStatus(id: string, status: string) {
  const cookieStore = await cookies();

  const statusData = {
    status: status
  }

  if (!status) return { error: "Status is required" };
  const res = await fetch(`${API_URL}/orders/provider/update-order/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(statusData),
  });
  const result = await res.json();
  if (res.ok) {
    revalidatePath("/dashboard/provider/incoming-orders");
    return { success: true, data: result };
  }
  return { success: false, error: result.error };
}

export async function createOrderAction(cartItems: any[], totalPrice: number, formData: FormData) {
  const address = formData.get("address"); 
  console.log(address);
  const session = await userService.getSession();
  const user = session?.data?.user;
  const cookieStore = await cookies()

  if (!user) {
    return { success: false, message: "Please login to place an order." };
  }


  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      totalPrice,
      items: cartItems,
      address
    }),
  });
  const result = await res.json();

  if (res.ok) {
    revalidatePath("/dashboard/customer/cart");
    redirect("/dashboard/customer/manage-order")
    return result;
  }

}
"use server"
import { env } from "@/env"
import { mealService } from "@/app/services/meal.service"
import { userService } from "@/app/services/userService"
import { cookies } from "next/headers"
import { MealType } from "@/types/index.type"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"



export async function getCategory() {
  return await mealService.getCategory()
}
const API_URL = env.API_URL
export async function userSessionAction() {
  const session = await userService.getSession()
  return session
}
export async function getAllMeal(params?: {
  page?: number
  limit?: number
}) {
  const query = new URLSearchParams()
  if (params?.page) query.append("page", params.page.toString())
  if (params?.limit) query.append("limit", params.limit.toString())

  const res = await fetch(`${API_URL}/meal?${query.toString()}`, {
    cache: "no-store", // this forces fresh data on every request
  })

  return res.json()
}
// admin action
export async function adminStat() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/admin`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  return data
}
// alluser 
export async function adminAllUser() {
  const cookieStore = await cookies()

  const res = await fetch(`${API_URL}/admin/all-users`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  return data
}
// all category
export async function adminAllCategory() {
  const cookieStore = await cookies()

  const res = await fetch(`${API_URL}/admin/all-categories`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  return data
}
// all Orders
export async function adminAllOrders() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/admin/all-orders`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  return data
}
// cart
export async function getCart() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/cart`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  return data
}
export async function providerMeal() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/meal`)
  const data = await res.json()
  const session = await userService.getSession()
  const filteredData = data?.data?.meals.filter((data: any) => data.provider.userId === session.data.user.id)
  return filteredData
}
export async function getSingleMeal(id: string) {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/meal/${id}`)
  const data = await res.json()
  return data
}

// Addd neww Meal
export async function addMeal(formData: MealType) {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/meal/add-meal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      ...formData,
      price: parseFloat(formData.price)
    }),
  });

  const data = await res.json();
  console.log(data);
  return data;
}

// delete meal 
export async function deleteMealProvider(id: string) {
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/meal/delete-meal/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  revalidatePath("/dashboard/provider/manage-meal");
  const data = await res.json();
  return data;
}

// Update Meal
export async function updateMeal(id: string, formData: FormData) {
  const cookieStore = await cookies();
  
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const categoryId = formData.get("categoryId");
  const isAvailable = formData.get("isAvailable") === "true";
  const image = formData.get("image");

  console.log("Extracted Data:", { name, price, id });

  const payload = {
    name,
    description,
    price: parseFloat(price as string),
    categoryId,
    isAvailable,
    image
  };

  const res = await fetch(`${API_URL}/meal/update-meal/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    revalidatePath("/dashboard/provider/manage-meal");
    redirect("/dashboard/provider/manage-meal");
  }

  const result = await res.json();
  return result;
}
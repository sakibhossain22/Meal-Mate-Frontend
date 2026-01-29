"use server"
import { env } from "@/env"
import { mealService } from "@/app/services/meal.service"
import { unstable_noStore as noStore } from "next/cache"
import { userService } from "@/app/services/userService"
import { cookies } from "next/headers"



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
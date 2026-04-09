"use server"

import { env } from "@/env"
import { cookies } from "next/headers"

const API_URL = env.API_URL
// customer

// Profile Current User
export async function profile() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/profile`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  return data
}
export async function cart() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/cart`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  return data
}
export async function customerOrder() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/orders/customer`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  return data
}
export async function customerStats() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/customer/stats`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  return data
}

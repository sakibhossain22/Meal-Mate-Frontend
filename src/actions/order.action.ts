"use server"

import { env } from "@/env";
import { cookies } from "next/headers";
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
  console.log(data);
  return data
}
export async function providerStats() {
  const cookieStore = await cookies()
  const res = await fetch(`${API_URL}/provider/stats`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  console.log(data);
  return data
}
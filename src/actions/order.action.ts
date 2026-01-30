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
<<<<<<< HEAD
  const res = await fetch(`${API_URL}/provider/provider/stats`, {
=======
  const res = await fetch(`${API_URL}/provider/stats`, {
>>>>>>> 1a4a69fe07f0e65f0ecebcfb2f6b9ca1fa9ca1a9
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json()
  console.log(data);
  return data
}
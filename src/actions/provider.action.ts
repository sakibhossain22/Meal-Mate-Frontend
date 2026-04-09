"use server"

import { env } from "@/env"

const API_URL = env.API_URL

export async function allProviders() {
    const res = await fetch(`${API_URL}/provider`)
    const data = await res.json()
    return data
}

export async function singleProviderDetails(id: string) {
    const res = await fetch(`${API_URL}/provider/${id}`)
    const data = await res.json()
    return data
}
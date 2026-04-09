import { env } from "@/env"
interface GetBlogParams {
    isfeatured?: boolean;
    search?: string
}
interface GetOptions {
    cache?: RequestCache;
    revalidate?: number
}
const API_URL = env.API_URL

export const mealService = {
    getSingleMealById: async function (id: string) {
        const res = await fetch(`${API_URL}/meal/${id}`)
        const data = res.json()
        return data
    },
getAllMeal: async function (
    params?: {
        page?: number
        limit?: number
        category?: string
    }, 
) {
    const query = new URLSearchParams()
    if (params?.page) query.append("page", params.page.toString())
    if (params?.limit) query.append("limit", params.limit.toString())
    if (params?.category) query.append("category", params.category)
    console.log(query.toString())

    const res = await fetch(`${API_URL}/meal?${query.toString()}`, {
        cache: "no-store" 
    })

    return res.json()
},

    getCategory: async function () {
        const res = await fetch(` ${API_URL}/meal/categories`)
        const data = res.json()
        return data
    }

}
// ?page=1&limit=2&category=Pizza
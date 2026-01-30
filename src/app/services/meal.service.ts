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
    getblogPost: async function (params?: GetBlogParams, options?: GetOptions) {

        try {
            const url = new URL(`${API_URL}/posts`)

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== "" && value !== null && value !== undefined) {
                        url.searchParams.append(key, value)
                    }
                })
            }

            const configFile: RequestInit = {}
            if (options?.cache) {
                configFile.cache = options.cache
            }
            if (options?.revalidate) {
                configFile.next = { revalidate: options.revalidate }
            }

            const res = await fetch(url.toString(), configFile)
            const data = await res.json()
            return { data, error: null }
        } catch (err) {
            return { data: null, errorMessage: "Something Went Wrong" }
        }
    },
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
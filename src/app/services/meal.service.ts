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
    getSinglePostById: async function (id: string) {
        const res = await fetch(`${API_URL}/posts/${id}`)
        const data = res.json()
        return data
    },
    getAllMeal: async function () {
        const res = await fetch(`${API_URL}/meal`)
        const data = res.json()
        return data
    }
}
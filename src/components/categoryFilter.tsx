"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function CategoryFilter({ categories, page, limit }: { categories: any[], page: number, limit: number }) {
    const router = useRouter()
    const params = useSearchParams()

    return (
        <select
            defaultValue={params.get("category") ?? ""}
            onChange={(e) => {
                router.push(`/meals?category=${e.target.value}`)
            }}
            className="w-full sm:w-56 rounded-md border px-3 py-2 text-sm"
        >
            <option value="">All Categories</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                    {cat.name}
                </option>
            ))}
        </select>
    )
}

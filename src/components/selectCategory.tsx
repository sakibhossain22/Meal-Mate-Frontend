"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowBigRight, Loader2 } from "lucide-react";

export default function SelectCategory({ categories }: { categories: any[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [data, setData] = useState<any>(null)
    const [isLoading, setLoading] = useState(true)
    const [queryCategory, setQueryCategory] = useState(searchParams.get("category") || "all")
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)
    const [orderby, setOrderBy] = useState(searchParams.get("orderby") || "asc")
    const limit = 8
    const meals = data?.data?.meals
    const totalPages = data?.data.pagination.totalPages || 1

    useEffect(() => {
        setLoading(true)

        const params = new URLSearchParams()
        if (queryCategory && queryCategory !== "all") params.append("category", queryCategory)
        params.append("page", currentPage.toString())
        params.append("limit", limit.toString())
        params.append("orderby", orderby)

        fetch(`http://localhost:5000/meal?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [queryCategory, currentPage, orderby])

    const handleCategoryChange = (value: string) => {
        setQueryCategory(value)
        setCurrentPage(1)
        updateURL(value, 1, orderby)
    }

    const handleSortChange = (value: string) => {
        setOrderBy(value)
        setCurrentPage(1)
        updateURL(queryCategory, 1, value)
    }

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
        updateURL(queryCategory, page, orderby)
    }

    const updateURL = (category: string, page: number, sort: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (category && category !== "all") params.set("category", category)
        else params.delete("category")

        params.set("page", page.toString())
        params.set("orderby", sort)
        router.push(`/meals?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 shadow-sm mb-8">
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-[#f22e3e] animate-pulse" />
                    <p className="dark:text-slate-400 text-black font-medium">
                        Showing <span className="dark:text-slate-400 text-black font-bold">{meals?.length || 0}</span> Results
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className="text-sm font-bold dark:text-slate-300 text-black uppercase tracking-wider hidden md:inline">Category:</span>
                        <Select onValueChange={handleCategoryChange} defaultValue={queryCategory}>
                            <SelectTrigger className="w-full sm:w-44 h-11 rounded-xl border-slate-200 bg-white font-semibold text-slate-700 shadow-sm focus:ring-[#f22e3e] focus:border-[#f22e3e]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                <SelectGroup>
                                    <SelectLabel className="text-slate-400 font-bold">Meal Categories</SelectLabel>
                                    <SelectItem value="all" className="cursor-pointer font-medium">All Categories</SelectItem>
                                    {categories?.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.name} className="cursor-pointer font-medium">
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className="text-sm font-bold dark:text-slate-300 text-black uppercase tracking-wider hidden md:inline">Sort:</span>
                        <Select onValueChange={handleSortChange} defaultValue={orderby}>
                            <SelectTrigger className="w-full sm:w-44 h-11 rounded-xl border-slate-200 bg-white font-semibold text-slate-700 shadow-sm focus:ring-[#f22e3e] focus:border-[#f22e3e]">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                <SelectGroup>
                                    <SelectLabel className="text-slate-400 font-bold">Price Order</SelectLabel>
                                    <SelectItem value="asc" className="cursor-pointer font-medium">Low To High</SelectItem>
                                    <SelectItem value="desc" className="cursor-pointer font-medium">High To Low</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div>
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <Loader2 className="animate-spin text-[#f22e3e]" size={40} />
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {meals?.length > 0 ? meals.map((meal: any) => (
                            <div key={meal.id} className="group overflow-hidden rounded-2xl border transition bg-gray-200 hover:shadow-xl dark:bg-slate-900">
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image src={meal.image || "/pizza.png"} alt={meal.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:rotate-45" />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="truncate text-lg font-semibold">{meal.name}</h3>
                                        <span className="text-lg font-bold text-[#f22e3e]">${meal.price}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{meal.description?.slice(0, 35) + "..."}</p>
                                    <Link href={`/meals/${meal.id}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fbb200] px-4 py-2 font-semibold text-black transition hover:bg-[#f22e3e] hover:text-white">
                                        Details <ArrowBigRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        )) : (
                            <p className="col-span-full text-center py-20 text-gray-500">No meals found.</p>
                        )}
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer"
                                onClick={() => handlePageChange(currentPage - 1)}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i} className="cursor-pointer">
                                <PaginationLink
                                    isActive={currentPage === i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                className="cursor-pointer"
                                onClick={() => handlePageChange(currentPage + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
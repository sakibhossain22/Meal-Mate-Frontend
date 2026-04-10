"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowBigRight, Loader2, Utensils } from "lucide-react";

export default function SelectCategory({ categories }: { categories: any[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [data, setData] = useState<any>(null)
    const [isLoading, setLoading] = useState(true)

    // Sync state with URL params
    const queryCategory = searchParams.get("category") || "all"
    const currentPage = Number(searchParams.get("page")) || 1
    const orderby = searchParams.get("orderby") || "asc"

    const limit = 8
    const meals = data?.data?.meals
    const totalPages = data?.data?.pagination?.totalPages || 1

    const updateURL = useCallback((category: string, page: number, sort: string) => {
        const params = new URLSearchParams()
        if (category && category !== "all") params.set("category", category)
        params.set("page", page.toString())
        params.set("orderby", sort)
        router.push(`/meals?${params.toString()}`, { scroll: false })
    }, [router])

    useEffect(() => {
        let isMounted = true;
        setLoading(true)

        const params = new URLSearchParams()
        if (queryCategory && queryCategory !== "all") params.append("category", queryCategory)
        params.append("page", currentPage.toString())
        params.append("limit", limit.toString())
        params.append("orderby", orderby)

        const res = fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/meal?${params.toString()}`)
            .then((res) => res.json())
            .then((resData) => {
                if (isMounted) {
                    setData(resData)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.error(err)
                if (isMounted) setLoading(false)
            })
        console.log(res)
        return () => { isMounted = false };
    }, [queryCategory, currentPage, orderby])
    const handleCategoryChange = (value: string) => {
        updateURL(value, 1, orderby)
    }

    const handleSortChange = (value: string) => {
        updateURL(queryCategory, 1, value)
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            updateURL(queryCategory, page, orderby)
        }
    }

    return (
        <div className="space-y-8 min-h-[600px]">
            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm mb-8">
                <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#f22e3e] animate-pulse" />
                    <p className="dark:text-slate-300 text-slate-700 font-medium">
                        Showing <span className="text-[#f22e3e] font-bold">{meals?.length || 0}</span> Delicious Meals
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Select onValueChange={handleCategoryChange} value={queryCategory}>
                            <SelectTrigger className="w-full sm:w-44 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 font-semibold shadow-sm focus:ring-[#f22e3e]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    <SelectItem value="all">All Items</SelectItem>
                                    {categories?.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Select onValueChange={handleSortChange} value={orderby}>
                            <SelectTrigger className="w-full sm:w-44 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 font-semibold shadow-sm focus:ring-[#f22e3e]">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="asc">Price: Low to High</SelectItem>
                                <SelectItem value="desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div>
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
                        <Loader2 className="animate-spin text-[#f22e3e]" size={48} />
                        <p className="text-slate-500 font-medium animate-pulse">Cooking up your results...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {meals?.length > 0 ? meals.map((meal: any) => (
                                <div key={meal.id} className="group relative overflow-hidden rounded-[2rem] border-none bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-orange-500/20">
                                    <div className="relative h-60 w-full overflow-hidden bg-slate-50 dark:bg-slate-800/50">
                                        <Image
                                            quality={50}
                                            src={meal.image || "/pizza.png"}
                                            alt={meal.name}
                                            fill
                                            className="object-contain p-6 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="text-xl font-bold text-slate-800 dark:text-white line-clamp-1">{meal.name}</h3>
                                            <span className="text-xl font-black text-[#f22e3e]">${meal.price}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 h-10 mb-4 italic">
                                            {meal.description || "No description available for this delicious meal."}
                                        </p>
                                        <Link href={`/meals/${meal.id}`} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fbb200] px-4 py-3 font-bold text-black transition-all duration-300 hover:bg-[#f22e3e] hover:text-white hover:shadow-lg">
                                            View Details <ArrowBigRight className="h-5 w-5" />
                                        </Link>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-24 bg-slate-50 dark:bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                    <Utensils size={64} className="text-slate-300 mb-4" />
                                    <h3 className="text-2xl font-bold text-slate-400">No Meals Found</h3>
                                    <p className="text-slate-500 mt-2">Try adjusting your filters or category.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Section */}
                        {totalPages > 1 && (
                            <div className="mt-16 pb-10">
                                <Pagination>
                                    <PaginationContent className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border dark:border-slate-800">
                                        <PaginationItem>
                                            <PaginationPrevious
                                                className={`cursor-pointer transition ${currentPage <= 1 ? "opacity-30 pointer-events-none" : "hover:bg-orange-50"}`}
                                                onClick={() => handlePageChange(currentPage - 1)}
                                            />
                                        </PaginationItem>

                                        {[...Array(totalPages)].map((_, i) => {
                                            const pageNum = i + 1;
                                            return (
                                                <PaginationItem key={i} className="cursor-pointer">
                                                    <PaginationLink
                                                        isActive={currentPage === pageNum}
                                                        className={`rounded-xl transition-all ${currentPage === pageNum ? "bg-[#f22e3e] text-white hover:bg-[#f22e3e]" : "hover:bg-orange-50"}`}
                                                        onClick={() => handlePageChange(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        })}

                                        <PaginationItem>
                                            <PaginationNext
                                                className={`cursor-pointer transition ${currentPage >= totalPages ? "opacity-30 pointer-events-none" : "hover:bg-orange-50"}`}
                                                onClick={() => handlePageChange(currentPage + 1)}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}   
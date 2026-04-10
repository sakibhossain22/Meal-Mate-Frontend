"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Utensils, Star, Clock, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SelectCategorySkeleton from "./skeleton/SelectCategorySkeleton";
import { Input } from "@/components/ui/input";

export default function SelectCategory({ categories }: { categories: any[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<any>(null)
    const [isLoading, setLoading] = useState(true)

    // URL Params
    const queryCategory = searchParams.get("category") || "all"
    const currentPage = Number(searchParams.get("page")) || 1
    const orderby = searchParams.get("orderby") || "asc"
    const searchText = searchParams.get("search") || ""

    // Local State for Input (Debouncing এর জন্য)
    const [searchTerm, setSearchTerm] = useState(searchText);

    const limit = 8
    const meals = data?.data?.meals
    const totalPages = data?.data?.pagination?.totalPages || 1

    // URL Update Function
    const updateURL = useCallback((category: string, page: number, sort: string, search: string) => {
        const params = new URLSearchParams()
        if (category && category !== "all") params.set("category", category)
        if (search) params.set("search", search)
        params.set("page", page.toString())
        params.set("orderby", sort)
        router.push(`/meals?${params.toString()}`, { scroll: false })
    }, [router])

    // Debounce Logic for Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== searchText) {
                updateURL(queryCategory, 1, orderby, searchTerm);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, queryCategory, orderby, searchText, updateURL]);

    // Fetch Data
    useEffect(() => {
        let isMounted = true;
        setLoading(true)
        const params = new URLSearchParams()
        if (queryCategory && queryCategory !== "all") params.append("category", queryCategory)
        if (searchText) params.append("search", searchText)
        params.append("page", currentPage.toString())
        params.append("limit", limit.toString())
        params.append("orderby", orderby)

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/meal?${params.toString()}`)
            .then((res) => res.json())
            .then((resData) => {
                if (isMounted) {
                    setData(resData)
                    setLoading(false)
                }
            })
            .catch(err => {
                if (isMounted) setLoading(false)
            })
        return () => { isMounted = false };
    }, [queryCategory, currentPage, orderby, searchText])

    if (isLoading && !data) {
        return <SelectCategorySkeleton />;
    }

    return (
        <div className="space-y-12 min-h-[800px] py-10">
            <div className="container mx-auto px-4">
                
                {/* --- Header & Search Section --- */}
                <div className="flex flex-col xl:flex-row items-center justify-between gap-8 mb-16">
                    <div className="text-center xl:text-left">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                            Explore <span className="text-[#f22e3e]">Menu.</span>
                        </h2>
                        <p className="text-zinc-500 font-bold mt-2 text-sm uppercase tracking-widest">Find your favorite meal</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
                        {/* SEARCH BAR */}
                        <div className="relative w-full md:w-[350px] group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#f22e3e] transition-colors" size={20} />
                            <Input 
                                placeholder="Search dishes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-14 pl-14 pr-12 rounded-[1.5rem] bg-zinc-100 dark:bg-zinc-900 border-none font-bold text-zinc-900 dark:text-white focus-visible:ring-2 focus-visible:ring-[#f22e3e]/20 transition-all shadow-inner"
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                >
                                    <X size={16} className="text-zinc-500" />
                                </button>
                            )}
                        </div>

                        {/* FILTERS */}
                        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-[1.5rem] w-full md:w-auto shadow-inner">
                            <Select onValueChange={(v) => updateURL(v, 1, orderby, searchText)} value={queryCategory}>
                                <SelectTrigger className="w-full md:w-[130px] border-none bg-transparent font-black text-[11px] uppercase tracking-tighter cursor-pointer">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl">
                                    <SelectItem value="all" className="font-bold">All Items</SelectItem>
                                    {categories?.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.name} className="font-bold capitalize">{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="h-6 w-[1px] bg-zinc-300 dark:bg-zinc-700 hidden md:block" />

                            <Select onValueChange={(v) => updateURL(queryCategory, 1, v, searchText)} value={orderby}>
                                <SelectTrigger className="w-full md:w-[130px] border-none bg-transparent font-black text-[11px] uppercase tracking-tighter cursor-pointer">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl">
                                    <SelectItem value="asc" className="font-bold">Low Price</SelectItem>
                                    <SelectItem value="desc" className="font-bold">High Price</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* --- Grid Section --- */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="animate-spin text-[#f22e3e]" size={50} />
                        <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Fetching Delights...</p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AnimatePresence mode="popLayout">
                            {meals?.length > 0 ? (
                                meals.map((meal: any) => (
                                    <motion.div
                                        key={meal.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-4 border border-zinc-100 dark:border-zinc-800 transition-all duration-500 hover:shadow-2xl hover:shadow-[#f22e3e]/10"
                                    >
                                        <div className="relative h-56 w-full rounded-[2rem] overflow-hidden bg-zinc-50 dark:bg-zinc-800/50 mb-6">
                                            <Image
                                                src={meal.image || "/pizza.png"}
                                                alt={meal.name}
                                                fill
                                                className="object-contain p-4 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-[#f22e3e] px-4 py-1.5 rounded-2xl text-sm font-black shadow-sm">
                                                ${meal.price}
                                            </div>
                                        </div>

                                        <div className="px-3 pb-2">
                                            <div className="flex items-center gap-1 mb-2">
                                                <Star size={12} className="fill-[#fbb200] text-[#fbb200]" />
                                                <span className="text-[10px] text-zinc-500 font-black tracking-widest uppercase">4.8 Popular</span>
                                            </div>
                                            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 truncate">{meal.name}</h3>
                                            <p className="text-[13px] text-zinc-500 line-clamp-2 h-10 mb-6 leading-relaxed font-medium">
                                                {meal.description || "Indulge in our premium chef-crafted delights."}
                                            </p>

                                            <Link
                                                href={`/meals/${meal.id}`}
                                                className="flex items-center justify-center gap-3 w-full bg-[#f22e3e] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black shadow-lg shadow-[#f22e3e]/20 active:scale-95"
                                            >
                                                Order Dish <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-32 text-center">
                                    <div className="inline-flex p-6 bg-zinc-100 dark:bg-zinc-900 rounded-full mb-6">
                                        <Search size={40} className="text-zinc-400" />
                                    </div>
                                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">No results for "{searchText}"</h3>
                                    <p className="text-zinc-500 font-medium mt-2">Try searching for something else or check your spelling.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* --- Pagination --- */}
                {totalPages > 1 && !isLoading && (
                    <div className="mt-24 flex justify-center pb-20">
                        <Pagination>
                            <PaginationContent className="gap-4">
                                <PaginationItem>
                                    <PaginationPrevious
                                        className={`cursor-pointer h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none hover:bg-[#f22e3e] hover:text-white transition-all ${currentPage <= 1 && "opacity-20 pointer-events-none"}`}
                                        onClick={() => updateURL(queryCategory, currentPage - 1, orderby, searchText)}
                                    />
                                </PaginationItem>
                                <div className="hidden sm:flex items-center gap-3 mx-2">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                isActive={currentPage === i + 1}
                                                onClick={() => updateURL(queryCategory, i + 1, orderby, searchText)}
                                                className={`cursor-pointer h-12 w-12 rounded-2xl font-black transition-all ${currentPage === i + 1
                                                    ? "bg-[#f22e3e] text-white shadow-xl shadow-[#f22e3e]/20 scale-110"
                                                    : "bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border-none"
                                                    }`}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </div>
                                <PaginationItem>
                                    <PaginationNext
                                        className={`cursor-pointer h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none hover:bg-[#f22e3e] hover:text-white transition-all ${currentPage >= totalPages && "opacity-20 pointer-events-none"}`}
                                        onClick={() => updateURL(queryCategory, currentPage + 1, orderby, searchText)}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}
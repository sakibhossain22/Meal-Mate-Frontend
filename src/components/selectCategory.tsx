"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Utensils, Star, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SelectCategorySkeleton from "./skeleton/SelectCategorySkeleton";

export default function SelectCategory({ categories }: { categories: any[] }) {
    // ... (logic remains same as before)
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<any>(null)
    const [isLoading, setLoading] = useState(true)

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
    }, [queryCategory, currentPage, orderby])
    if (isLoading) {
        return <SelectCategorySkeleton />;
    }
    return (
        <div className="space-y-12 min-h-[800px] py-10">
            {/* Header & Filter logic stays same... */}
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Explore <span className="text-[#f22e3e]">Menu</span></h2>

                    <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-[2rem]">
                        <Select onValueChange={(v) => updateURL(v, 1, orderby)} value={queryCategory}>
                            <SelectTrigger className="w-[150px] border-none bg-transparent font-bold cursor-pointer">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                                <SelectItem value="all" className="cursor-pointer">All Items</SelectItem>
                                {categories?.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.name} className="cursor-pointer">{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="h-6 w-[1px] bg-zinc-300 dark:bg-zinc-700" />
                        <Select onValueChange={(v) => updateURL(queryCategory, 1, v)} value={orderby}>
                            <SelectTrigger className="w-[150px] border-none bg-transparent font-bold cursor-pointer">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                                <SelectItem value="asc" className="cursor-pointer">Low Price</SelectItem>
                                <SelectItem value="desc" className="cursor-pointer">High Price</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-40"><Loader2 className="animate-spin text-[#f22e3e]" size={40} /></div>
                ) : (
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AnimatePresence>
                            {meals?.map((meal: any, idx: number) => (
                                <motion.div
                                    key={meal.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-4 border border-zinc-100 dark:border-zinc-800 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(242,46,62,0.15)]"
                                >
                                    {/* Image Container with Floating Price */}
                                    <div className="relative h-56 w-full rounded-[2rem] overflow-hidden bg-zinc-50 dark:bg-zinc-800/50 mb-6">
                                        <Image
                                            src={meal.image || "/pizza.png"}
                                            alt={meal.name}
                                            fill
                                            className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#f22e3e] text-white px-4 py-1 rounded-full text-sm font-black shadow-lg">
                                            ${meal.price}
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-2 rounded-xl text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                            <Clock size={12} className="text-[#f22e3e]" /> 15-20 min
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="px-3 pb-4">
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#fbb200] text-[#fbb200]" />)}
                                            <span className="text-[10px] text-zinc-400 font-bold ml-1">(4.5)</span>
                                        </div>
                                        <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2 truncate group-hover:text-[#f22e3e] transition-colors">{meal.name}</h3>
                                        <p className="text-xs text-zinc-500 line-clamp-2 h-8 mb-6 leading-relaxed">{meal.description || "Enjoy our chef-special meal."}</p>

                                        {/* PRIMARY COLOR BUTTON */}
                                        <Link
                                            href={`/meals/${meal.id}`}
                                            className="flex items-center justify-center gap-2 w-full bg-[#f22e3e] hover:bg-[#d12331] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-[#f22e3e]/20 active:scale-95 cursor-pointer"
                                        >
                                            Order Now <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* --- PAGINATION WITH IMPROVED GAP --- */}
                {totalPages > 1 && !isLoading && (
                    <div className="mt-24 flex justify-center pb-20">
                        <Pagination>
                            <PaginationContent className="gap-4"> {/* Increased Gap here */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        className={`cursor-pointer h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none hover:bg-[#f22e3e] hover:text-white transition-all ${currentPage <= 1 && "opacity-20 pointer-events-none"}`}
                                        onClick={() => updateURL(queryCategory, currentPage - 1, orderby)}
                                    />
                                </PaginationItem>

                                <div className="flex items-center gap-3 mx-2"> {/* Extra wrapping gap for numbers */}
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                isActive={currentPage === i + 1}
                                                onClick={() => updateURL(queryCategory, i + 1, orderby)}
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
                                        onClick={() => updateURL(queryCategory, currentPage + 1, orderby)}
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

import Image from "next/image"
import Link from "next/link"
import { ArrowBigRight } from "lucide-react"
import { getAllMeal, getCategory } from "@/actions/meal.action"
import { CategoryFilter } from "@/components/categoryFilter"
import { updateTag } from "next/cache"

type MealsPageProps = {
    searchParams: {
        page?: string
        limit?: string
        // category?: string
    }
}

export default async function MealsPage({ searchParams }: MealsPageProps) {
    const page = Number(searchParams?.page) || 1
    const limit = Number(searchParams?.limit) || 9

    // This fetch will now always get fresh data
    const { data } = await getAllMeal({ page, limit })

    const { data: categories } = await getCategory()

    return (
        <div className="w-full overflow-x-hidden">
            <div className="container mx-auto px-4 my-6 mb-10">
                <div className="flex items-center gap-4">
                    <h4 className="text-2xl font-bold text-[#f22e3e]">All Meals</h4>
                    <div className="mt-2 h-[2px] w-24 bg-[#f22e3e]" />
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                    Order Your Favorite Item
                </h2>
            </div>

            <CategoryFilter
                page={1}
                limit={2}
                categories={categories}
            />

            <div className="container mx-auto px-4">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data.meals.map((meal: any) => (
                        <div
                            key={meal.id}
                            className="group overflow-hidden rounded-2xl border transition hover:shadow-xl"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={meal.image || "/pizza.png"}
                                    alt={meal.name}
                                    fill
                                    className="object-contain transition-transform duration-500 group-hover:rotate-6"
                                />
                            </div>

                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="truncate text-lg font-semibold">
                                        {meal.name}
                                    </h3>
                                    <span className="text-lg font-bold text-[#f22e3e]">
                                        ${meal.price}
                                    </span>
                                </div>

                                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                                    {meal.description}
                                </p>

                                <Link
                                    href={`/meals/${meal.id}`}
                                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fbb200] px-4 py-2 font-semibold text-black transition hover:bg-[#f22e3e] hover:text-white"
                                >
                                    Details
                                    <ArrowBigRight className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

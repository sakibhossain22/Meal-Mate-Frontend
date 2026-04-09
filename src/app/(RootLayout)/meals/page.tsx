
import Image from "next/image"
import Link from "next/link"
import { ArrowBigRight } from "lucide-react"
import { getAllMeal, getCategory } from "@/actions/meal.action"
import SelectCategory from "@/components/selectCategory"


type MealsPageProps = {
    searchParams: {
        page?: string
        category?: string
    }
}

export default async function MealsPage({ searchParams }: MealsPageProps) {


    const { data: categories } = await getCategory();

    return (
        <div className="w-full overflow-x-hidden pb-10">
            <div className="container mx-auto px-4 my-6 mb-10">
                <div className="flex items-center gap-4">
                    <h4 className="text-2xl font-bold text-[#f22e3e]">All Meals</h4>
                    <div className="mt-2 h-[2px] w-24 bg-[#f22e3e]" />
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                    Order Your Favorite Item
                </h2>
            </div>
            <div className="container mx-auto px-4">
            <SelectCategory categories={categories} />
                
            </div>
        </div>
    )
}
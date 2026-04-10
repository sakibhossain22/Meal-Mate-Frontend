
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
            <div className="container mx-auto px-4">
                <SelectCategory categories={categories} />
            </div>
        </div>
    )
}
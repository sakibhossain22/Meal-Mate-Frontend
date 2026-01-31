import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { mealService } from "@/app/services/meal.service"

export async function CarouselSpacing() {
  const { data } = await mealService.getAllMeal()
  const meals = data?.meals?.slice(0, 8) || []

  return (
    <Carousel className="relative w-full overflow-hidden">
      <CarouselContent className="-ml-4 px-4">
        {meals.map((meal: any) => (
          <CarouselItem
            key={meal.id}
            className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <Card className="group h-full overflow-hidden rounded-2xl border transition hover:shadow-xl dark:border-gray-800">
              <CardContent className="p-0">
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={meal.image || "/pizza.png"}
                    alt={meal.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:rotate-45"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {meal.name}
                    </h3>
                    <span className="text-lg font-bold text-[#f22e3e]">
                      ৳{meal.price}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {meal.description.slice(0,30) + "..."}
                  </p>

                  <Link
                    href={`/meals/${meal.id}`}
                    className="
                      mt-4 inline-flex w-full items-center justify-center gap-2
                      rounded-full bg-[#fbb200] px-4 py-2
                      font-semibold text-black
                      transition-all duration-300
                      hover:bg-[#f22e3e] hover:text-white hover:shadow-lg
                      dark:bg-[#f22e3e] dark:text-white dark:hover:bg-[#ff5a67]
                    "
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

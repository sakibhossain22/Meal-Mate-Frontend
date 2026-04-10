import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, Clock, Heart, ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { mealService } from "@/app/services/meal.service"
import { Badge } from "@/components/ui/badge"

export async function CarouselSpacing() {
  const { data } = await mealService.getAllMeal()
  const meals = data?.meals?.slice(0, 8) || []

  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        
        {/* --- Header Design --- */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <Badge className="bg-[#f22e3e]/10 text-[#f22e3e] border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-4">
              ✨ Freshly Prepared
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.85]">
              Popular <span className="text-[#f22e3e]">Dishes.</span>
            </h2>
          </div>
          <p className="max-w-xs text-zinc-500 font-medium text-sm border-l-2 border-zinc-100 dark:border-zinc-800 pl-6">
            Handpicked bestsellers from our local home chefs, delivered hot to your doorstep.
          </p>
        </div>

        {/* --- Carousel --- */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-6">
            {meals.map((meal: any) => (
              <CarouselItem key={meal.id} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                
                {/* --- কার্ড ডিজাইন যা SelectCategory এর সাথে হুবহু মিলবে --- */}
                <Card className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] p-4 border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#f22e3e]/5">
                  <CardContent className="p-0">
                    
                    {/* Image Container - Height Fixed (h-56 like category) */}
                    <div className="relative h-56 w-full rounded-[2rem] bg-zinc-100 dark:bg-zinc-800 mb-6 overflow-hidden">
                      <Image
                        src={meal.image || "/pizza.png"}
                        alt={meal.name}
                        fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                      />
                      
                      {/* Floating Price Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-[#f22e3e] border-none px-3 py-1 rounded-full font-black text-sm shadow-sm">
                          ${meal.price}
                        </Badge>
                      </div>

                      {/* Favorite Button */}
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-400 hover:text-[#f22e3e] transition-colors shadow-sm">
                        <Heart size={18} />
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="px-3 pb-4 space-y-4">
                      {/* Stars & Category */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 text-[#fbb200]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest flex items-center gap-1">
                          <Clock size={12} /> 20 MIN
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-black text-zinc-900 dark:text-white leading-tight line-clamp-1">
                        {meal.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed line-clamp-2 min-h-[40px]">
                        {meal.description || "Freshly cooked with premium local ingredients."}
                      </p>

                      {/* Action Button */}
                      <Link
                        href={`/meals/${meal._id || meal.id}`}
                        className="group/btn relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#f22e3e] py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black shadow-lg shadow-[#f22e3e]/20 active:scale-95"
                      >
                        Order Dish
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                  </CardContent>
                </Card>

              </CarouselItem>
            ))}
          </CarouselContent>

          {/* --- Bottom Navigation --- */}
          <div className="mt-16 flex items-center justify-center gap-6">
            <CarouselPrevious className="static translate-y-0 h-14 w-14 rounded-full border-2 border-zinc-100 dark:border-zinc-800 hover:bg-[#f22e3e] hover:text-white transition-all shadow-sm" />
            <div className="h-1 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-[#f22e3e] rounded-full" />
            </div>
            <CarouselNext className="static translate-y-0 h-14 w-14 rounded-full border-2 border-zinc-100 dark:border-zinc-800 hover:bg-[#f22e3e] hover:text-white transition-all shadow-sm" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
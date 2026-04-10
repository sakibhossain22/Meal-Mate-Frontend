import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, Clock, Heart } from "lucide-react"

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
                <Card className="group relative border-none bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(242,46,62,0.15)]">
                  <CardContent className="p-0">
                    
                    {/* --- Top Image Layer --- */}
                    <div className="relative h-72 w-full overflow-hidden">
                      <Image
                        src={meal.image || "/pizza.png"}
                        alt={meal.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Floating Price Tag */}
                      <div className="absolute top-5 right-5 bg-white dark:bg-zinc-950 px-4 py-2 rounded-2xl shadow-xl">
                        <span className="text-lg font-black text-[#f22e3e]">${meal.price}</span>
                      </div>

                      {/* Favorite Button */}
                      <button className="absolute top-5 left-5 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#f22e3e] transition-colors">
                        <Heart size={18} />
                      </button>

                      {/* Glassy Rating Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/60 dark:bg-black/40 backdrop-blur-xl px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-black">
                        <Star size={14} className="fill-[#fbb200] text-[#fbb200]" /> 4.9 (120+)
                      </div>
                    </div>

                    {/* --- Content Layer --- */}
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-[#fbb200] text-black border-none text-[9px] font-black px-2 py-0.5 uppercase">Bestseller</Badge>
                        <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                          <Clock size={12}/> 25 MIN
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight line-clamp-1">
                        {meal.name}
                      </h3>
                      
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                        {meal.description || "Freshly cooked with premium local ingredients."}
                      </p>

                      {/* Primary Action Button */}
                      <Link
                        href={`/meals/${meal._id || meal.id}`}
                        className="group/btn relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#f22e3e] py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black shadow-lg shadow-[#f22e3e]/20 active:scale-95"
                      >
                        <ShoppingCart size={18} className="group-hover/btn:rotate-12 transition-transform" />
                        Order Dish
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
               <div className="h-full w-1/2 bg-[#f22e3e] rounded-full animate-pulse" />
            </div>
            <CarouselNext className="static translate-y-0 h-14 w-14 rounded-full border-2 border-zinc-100 dark:border-zinc-800 hover:bg-[#f22e3e] hover:text-white transition-all shadow-sm" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
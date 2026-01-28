import { PostData } from "@/types/index.type";
import { mealService } from "../services/meal.service";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { ShoppingCart } from "lucide-react";
import HeroSection from "@/components/modules/homepage/hero";
import { CarouselSpacing } from "@/components/modules/homepage/Carosoul";
export default async function Home() {
  // const { data } = await mealService.getblogPost({
  //   search: ""
  // }, {
  //   cache: "no-store",
  // });


  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      <div className="overflow-x-hidden">
        <div className="container my-6 mb-10 mx-48">
          <div className="flex items-center gap-8">
            <h4 className="text-2xl  font-bold text-[#f22e3e]">Popular Dishes</h4>
            <div className="border-2 mt-2 border-[#f22e3e] w-24"></div>
          </div>
          <h2 className="text-4xl font-bold mt-3">Browse Our Menu</h2>
        </div>
        <CarouselSpacing />
      </div>



      {/* <div className="flex items-center justify-between gap-5 flex-wrap mt-10 mx-28">
        {
          data?.posts?.map((post: PostData) => (
            <div key={post.id} className="w-1/5 m-4">
              <Image className="w-full" src={post.thumbnail} alt={"image not Found"}></Image>
              <h2 className="text-xl">{post.title}</h2>
              <p className="text-lg">{post.content}</p>

              <Button>
                <Link href={`/blog/${post.id}`}>Read More</Link>
              </Button>
            </div>
          ))
        }
      </div> */}
    </div>
  );
}

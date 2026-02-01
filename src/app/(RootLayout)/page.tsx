import HeroSection from "@/components/modules/homepage/hero";
import { CarouselSpacing } from "@/components/modules/homepage/Carosoul";
import { mealService } from "../services/meal.service";
import OurStory from "@/components/modules/homepage/OurStory";
import Strenght from "@/components/modules/homepage/Strenght";
import ClientTestimonials from "@/components/modules/homepage/ClitenTestimonals";
import RegisterNow from "@/components/modules/homepage/RegisterNow";
export default async function Home() {
  return (
    <div className="">
      <HeroSection />
      <div className="overflow-x-hidden mx-5">
        <div className="container my-6 mb-10 lg:mx-28">
          <div className="flex items-center gap-8">
            <h4 className="text-2xl  font-bold text-[#f22e3e]">Popular Dishes</h4>
            <div className="border-2 mt-2 border-[#f22e3e] w-24"></div>
          </div>
          <h2 className="text-4xl font-bold mt-3">Browse Our Menu</h2>
        </div>
        <CarouselSpacing />
      </div>
      <OurStory />
      <Strenght />
      <RegisterNow />
      <ClientTestimonials />

    </div>
  );
}

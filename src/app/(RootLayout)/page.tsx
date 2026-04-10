import HeroSection from "@/components/modules/homepage/hero";
import { CarouselSpacing } from "@/components/modules/homepage/Carosoul";
import { mealService } from "../services/meal.service";
import OurStory from "@/components/modules/homepage/OurStory";
import Strenght from "@/components/modules/homepage/Strenght";
import ClientTestimonials from "@/components/modules/homepage/ClitenTestimonals";
import RegisterNow from "@/components/modules/homepage/RegisterNow";
import FAQSection from "@/components/homepage/FAQ";
import Newsletter from "@/components/homepage/NewsLetter";
import PromoBanner from "@/components/homepage/PromoBanner";
export default async function Home() {
  return (
    <div className="">
      <HeroSection />

      <CarouselSpacing />
      <OurStory />
      <Strenght />
      <RegisterNow />
      <ClientTestimonials />
      <PromoBanner />
      <FAQSection />
      <Newsletter />
    </div>
  );
}

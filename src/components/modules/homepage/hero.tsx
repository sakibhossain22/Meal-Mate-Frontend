import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="min-h-[600px] md:h-[800px] bg-[url('/hero.png')] bg-cover bg-center bg-no-repeat flex items-center">
        <div className="absolute inset-0 bg-white/40 md:bg-transparent" />

        <div className="container px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
          <div className="max-w-3xl text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black dark:text-white leading-[1.1]">
              Handmade, <br className="hidden sm:block" />
              With an Extra <br className="hidden sm:block" />
              Pinch of{" "}
              <span className="text-[#f22e3e] dark:text-[#ff5a67]">
                Love
              </span>
            </h1>

            <h4 className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium">
              Thoughtfully crafted meals using <br className="hidden sm:block" />
              quality ingredients.
            </h4>

            <div className="mt-10 flex justify-center md:justify-start">
              <Link
                href="/meals"
                className="
              group inline-flex items-center gap-3 rounded-full
              bg-[#fbb200] px-8 py-4 font-bold text-black
              transition-all duration-300
              hover:bg-[#d82634] hover:text-white hover:shadow-2xl hover:-translate-y-1
              dark:bg-[#f22e3e] dark:text-white
              dark:hover:bg-[#ff5a67]
            "
              >
                <ShoppingCart className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-lg md:text-xl">Order Now</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

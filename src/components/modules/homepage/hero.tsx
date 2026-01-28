import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-x-hidden">
      <div className="h-[800px] bg-[url('/hero.png')] bg-cover bg-center bg-no-repeat">
        <div className="container mx-48 flex h-[800px] flex-col items-start justify-center py-32">
          <h1 className="text-6xl font-bold text-black dark:text-white">
            Handmade, <br />
            With an Extra <br />
            Pinch of{" "}
            <span className="text-[#f22e3e] dark:text-[#ff5a67]">
              Love
            </span>
          </h1>

          <h4 className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Thoughtfully crafted meals using <br />
            quality ingredients.
          </h4>

          <div className="mt-8">
            <Link
              href="/meals"
              className="
                group inline-flex items-center gap-3 rounded-full
                bg-[#fbb200] px-8 py-4 font-semibold text-black
                transition-all duration-300
                hover:bg-[#d82634] hover:text-white hover:shadow-lg
                dark:bg-[#f22e3e] dark:text-white
                dark:hover:bg-[#ff5a67]
              "
            >
              <ShoppingCart className="h-5 font-bold w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <p className="font-bold text-xl">Order Now</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

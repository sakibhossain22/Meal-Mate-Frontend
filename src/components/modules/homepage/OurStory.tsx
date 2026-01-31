import { Montserrat } from "next/font/google";
import Image from "next/image";
const montSerrat = Montserrat({
  variable: "--monserrat"
})
export default function OurStory() {
    return (
        <div className="lg:flex items-center justify-between w-full">
            <Image alt="pizza" width={1000} height={1000} src={'/pizza2.png'} />
            <div className="flex flex-col gap-5 mx-5">
                <div className="flex items-center gap-8">
                    <h4 className="text-2xl  font-bold text-[#f22e3e]">Our Story</h4>
                    <div className="border-2 mt-2 border-[#f22e3e] w-24"></div>
                </div>
                <h1  className={`${montSerrat.variable} antialiased text-4xl dark:text-white text-black font-bold line-clamp-5 leading-snug`}>The Meal Mate Redefining <br />The Art of Exquisite Quality Foods</h1>

                <p className="text-lg dark:text-gray-400 font-semibold text-gray-700">Experience the legacy of taste that spans centuries. At Meal Mate, we combine the timeless traditions of the culinary world with modern excellence. From the freshest ingredients to our signature recipes, every bite is crafted to deliver an unforgettable dining experience that remains essentially unchanged in its greatness.</p>
            </div>
        </div>
    );
}
"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, UtensilsCrossed, Award, Users } from "lucide-react";
import Link from "next/link";

const montSerrat = Montserrat({
    subsets: ["latin"],
    weight: ["900", "700", "400"],
    variable: "--font-montserrat",
});

export default function OurStory() {
    const stats = [
        { icon: <UtensilsCrossed className="text-[#f22e3e]" />, label: "Unique Recipes", value: "250+" },
        { icon: <Users className="text-[#fbb200]" />, label: "Happy Clients", value: "10k+" },
        { icon: <Award className="text-emerald-500" />, label: "Awards Won", value: "15+" },
    ];

    return (
        <section className={`py-24 overflow-hidden ${montSerrat.variable} font-sans`}>
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* --- Left Side: Visual Assets --- */}
                    <div className="relative">
                        {/* Background Decorative Element */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#fbb200]/10 rounded-full blur-3xl" />

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <Image
                                alt="Chef Crafting Food"
                                width={800}
                                height={900}
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop"
                                className="w-full h-[500px] lg:h-[650px] object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        </motion.div>

                        {/* Floating Experience Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="absolute -bottom-10 -right-6 lg:right-10 z-20 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 hidden sm:block"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#f22e3e] rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                                    12+
                                </div>
                                <div>
                                    <h5 className="font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Years of</h5>
                                    <p className="text-[#f22e3e] font-bold text-sm">Culinary Excellence</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- Right Side: Content --- */}
                    <div className="flex flex-col gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[2px] bg-[#f22e3e]" />
                                <h4 className="text-sm font-black uppercase tracking-[0.4em] text-[#f22e3e]">Our Story</h4>
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-black text-zinc-900 dark:text-white leading-[0.95] tracking-tighter">
                                Redefining The Art <br /> Of <span className="text-[#fbb200] italic">Exquisite</span> Quality.
                            </h1>
                        </div>

                        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed italic border-l-4 border-[#fbb200] pl-6">
                            "Experience the legacy of taste that spans decades. At Meal Mate, we combine timeless culinary traditions with modern excellence."
                        </p>

                        <div className="space-y-4">
                            {[
                                "Sourcing 100% Fresh & Organic Ingredients",
                                "Handcrafted Recipes by Local Home Chefs",
                                "Strict Hygiene & Quality Standards"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-bold">
                                    <CheckCircle2 className="text-[#f22e3e]" size={20} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Stats Counter Area */}
                        <div className="grid grid-cols-3 gap-4 py-8 border-y border-zinc-100 dark:border-zinc-800">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center md:text-left">
                                    <div className="mb-2 flex justify-center md:justify-start">{stat.icon}</div>
                                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">{stat.value}</h3>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            <Link href="/blogs" className="flex items-center gap-3 cursor-pointer">
                                <button className="px-10 py-5 cursor-pointer bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#f22e3e] dark:hover:bg-[#f22e3e] dark:hover:text-white transition-all transform active:scale-95 shadow-xl shadow-zinc-200 dark:shadow-none">
                                    Read Full Story
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
"use client";
import React from "react";
import { Utensils, Leaf, Star, Truck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Strength() {
  const features = [
    {
      title: "All Kinds of Foods",
      description: "From cheesy pizzas to sizzling burgers, we bring you global favorites.",
      icon: <Utensils className="w-7 h-7 text-[#f22e3e]" />,
      accent: "group-hover:bg-[#f22e3e]",
      border: "hover:border-[#f22e3e]/30",
    },
    {
      title: "Fresh Foods",
      description: "We source only the finest, hand-picked seasonal produce and meats.",
      icon: <Leaf className="w-7 h-7 text-[#05a660]" />,
      accent: "group-hover:bg-[#05a660]",
      border: "hover:border-[#05a660]/30",
    },
    {
      title: "Best Taste",
      description: "Our secret lies in heritage recipes and master home chefs.",
      icon: <Star className="w-7 h-7 text-[#fbb200]" />,
      accent: "group-hover:bg-[#fbb200]",
      border: "hover:border-[#fbb200]/30",
    },
    {
      title: "Fast Delivery",
      description: "Our dedicated fleet ensures your food arrives piping hot.",
      icon: <Truck className="w-7 h-7 text-[#f22e3e]" />,
      accent: "group-hover:bg-[#f22e3e]",
      border: "hover:border-[#f22e3e]/30",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h4 className="text-[#f22e3e] font-black uppercase tracking-[0.3em] text-xs mb-3">Our Core Strength</h4>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter dark:text-white text-zinc-900">
            Why People <span className="text-[#f22e3e]">Choose Us?</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className={`group relative p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 transition-all duration-500 cursor-pointer ${feature.border} hover:shadow-2xl dark:hover:shadow-zinc-950`}
            >
              {/* Decorative Number */}
              <span className="absolute top-6 right-8 text-5xl font-black text-zinc-200 dark:text-zinc-800/50 group-hover:text-[#f22e3e]/10 transition-colors">
                0{index + 1}
              </span>

              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center mb-8 transition-all duration-500 ${feature.accent} group-hover:rotate-[10deg]`}>
                <div className="group-hover:text-white transition-colors duration-500">
                  {feature.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-black dark:text-white text-zinc-900 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm font-medium mb-6">
                {feature.description}
              </p>

              {/* Learn More link with cursor-pointer */}
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#f22e3e] cursor-pointer opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Explore <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
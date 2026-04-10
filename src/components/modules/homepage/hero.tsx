"use client";
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

const carouselData = [
  { 
    title: "Handmade, With <br/> A Pinch Of <span class='text-[#f22e3e]'>Love.</span>", 
    desc: "Quality ingredients from our home kitchen to yours.", 
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    title: "Authentic <span class='text-[#fbb200]'>Taste</span> <br/> Delivered Fresh.", 
    desc: "Experience the real spice of traditional Bengali meals.", 
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    title: "Healthy Body, <br/> <span class='text-emerald-500'>Happy</span> Mind.", 
    desc: "Balanced nutrition curated by expert home chefs.", 
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop" 
  },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative group overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* --- Carousel Body (60% Height) --- */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex h-[70vh] md:h-[65vh] min-h-[450px]">
          {carouselData.map((slide, i) => (
            <div key={i} className="embla__slide flex-none w-full relative">
              {/* Image with subtle zoom effect */}
              <img 
                src={slide.image} 
                className="absolute inset-0 w-full h-full object-cover" 
                alt="Food" 
              />
              
              {/* Glassy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent" />

              <div className="container mx-auto px-6 h-full flex items-center relative z-10">
                <div className="max-w-2xl">
                  <AnimatePresence mode="wait">
                    {selectedIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="h-[2px] w-8 bg-[#f22e3e]" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f22e3e] dark:text-[#fbb200] flex items-center gap-1">
                            <Sparkles size={12} /> Premium Quality
                          </span>
                        </div>
                        
                        <h1 
                          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.95] mb-6"
                          dangerouslySetInnerHTML={{ __html: slide.title }}
                        />
                        
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-lg font-medium mb-8 max-w-md">
                          {slide.desc}
                        </p>

                        <div className="flex items-center gap-4">
                          <Link href="/meals" className="bg-[#f22e3e] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-all shadow-xl shadow-[#f22e3e]/20 flex items-center gap-2 group/btn">
                            Order Now <ShoppingCart size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Responsive Controls --- */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        {/* Navigation Arrows */}
        <div className="flex gap-2 mr-4">
          <button 
            onClick={() => emblaApi?.scrollPrev()} 
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#fbb200] hover:text-black transition-all text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => emblaApi?.scrollNext()} 
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#f22e3e] hover:text-white transition-all text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-1.5">
          {carouselData.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${selectedIndex === i ? 'w-8 bg-[#f22e3e]' : 'w-2 bg-white/30'}`} 
            />
          ))}
        </div>
      </div>

      {/* Static "Scroll Down" Indicator (Only Desktop) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
         <motion.div 
           animate={{ y: [0, 10, 0] }} 
           transition={{ repeat: Infinity, duration: 2 }}
           className="w-6 h-10 border-2 border-zinc-400/30 rounded-full flex justify-center p-1"
         >
            <div className="w-1 h-2 bg-zinc-400 rounded-full" />
         </motion.div>
      </div>
    </section>
  );
}
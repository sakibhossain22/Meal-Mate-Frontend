"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PartyPopper } from "lucide-react";

export default function RegisterNow() {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto relative overflow-hidden bg-zinc-900 dark:bg-white rounded-[3.5rem] p-8 md:p-16 lg:p-24 shadow-2xl">
                
                {/* --- Decorative Background Elements --- */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#f22e3e]/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fbb200]/20 blur-[100px] rounded-full" />

                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                    
                    {/* --- Content Area --- */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 bg-[#f22e3e] text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8"
                        >
                            <PartyPopper size={14} /> Join the family
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white dark:text-zinc-900 leading-[0.9] tracking-tighter mb-8">
                            Hungry? <br />
                            <span className="text-[#fbb200]">Claim Your</span> <br />
                            First Meal.
                        </h2>

                        <p className="text-zinc-400 dark:text-zinc-500 text-lg font-medium max-w-lg mb-10 leading-relaxed">
                            Sign up today and get an instant <span className="text-white dark:text-zinc-900 font-bold underline decoration-[#f22e3e]">20% discount</span> on your first order. Freshness is just one click away!
                        </p>

                        {/* Feature List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                            {['20% Welcome Discount', 'Real-time Tracking', 'Zero Delivery Fee', 'Premium Support'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-zinc-300 dark:text-zinc-700 font-bold text-sm">
                                    <CheckCircle2 className="text-[#fbb200]" size={18} />
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link href="/register" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#f22e3e] hover:bg-[#fbb200] text-white hover:text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-xl shadow-[#f22e3e]/20 active:scale-95 cursor-pointer group">
                                    Create Account <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Link>
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">No credit card required</p>
                        </div>
                    </div>

                    {/* --- Image Area --- */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="flex-1 relative"
                    >
                        {/* Pizza Image with shadow logic */}
                        <div className="relative z-10">
                            <Image
                                alt="fresh hot pizza"
                                width={700}
                                height={700}
                                src="/pizza3.png"
                                className="drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_50px_50px_rgba(242,46,62,0.3)] object-contain"
                                priority
                            />
                        </div>
                        
                        {/* Floating Price Badge */}
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute top-10 right-0 md:right-10 bg-[#fbb200] text-black p-6 rounded-full shadow-2xl z-20 flex flex-col items-center justify-center rotate-12"
                        >
                            <span className="text-3xl font-black leading-none">20%</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">OFF</span>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
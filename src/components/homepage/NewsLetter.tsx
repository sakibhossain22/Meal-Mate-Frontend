"use client";
import React, { useState } from 'react';
import { Send, Star, Loader2 } from 'lucide-react';
import { toast } from 'sonner'; // Tumi shadcn use korle sonner ba react-hot-toast bebohar korte paro

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please provide a valid email!");
      return;
    }

    setLoading(true);

    // Mimic API Call
    setTimeout(() => {
      setLoading(false);
      toast.success("Email sent! Welcome to the Meal Mate Team 🍲", {
        description: "You've successfully joined our meal revolution.",
        duration: 5000,
      });
      setEmail(""); // Form clear korar jonno
    }, 1500);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-zinc-950 dark:bg-white rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
        
        {/* --- Decorative Elements --- */}
        <div className="absolute top-10 left-10 text-[#fbb200] animate-pulse hidden md:block">
          <Star fill="currentColor" size={30}/>
        </div>
        <div className="absolute bottom-10 right-10 text-[#f22e3e] animate-bounce hidden md:block">
          <Star fill="currentColor" size={40}/>
        </div>
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#f22e3e]/5 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-black text-white dark:text-zinc-900 mb-8 leading-[0.9] tracking-tighter">
            Join the <span className="text-[#fbb200]">Meal</span> <br /> Revolution.
          </h2>
          <p className="text-zinc-400 dark:text-zinc-500 text-lg mb-12 font-medium">
            Be the first to know about new providers, flash sales, and food tech updates in your area.
          </p>
          
          <form onSubmit={handleSubscribe} className="relative group w-full max-w-lg mx-auto">
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Drop your email here..." 
              className="w-full bg-white/5 dark:bg-zinc-100 border border-white/10 dark:border-zinc-200 px-8 py-6 rounded-full outline-none text-white dark:text-black text-lg focus:ring-4 ring-[#f22e3e]/20 transition-all placeholder:text-zinc-600"
            />
            <button 
              disabled={loading}
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-[#f22e3e] hover:bg-[#fbb200] text-white hover:text-black px-8 rounded-full flex items-center gap-2 font-black transition-all active:scale-95 shadow-xl shadow-[#f22e3e]/20 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Subscribe <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-zinc-500 dark:text-zinc-400 text-xs font-black uppercase tracking-[0.2em]">
            Join 10k+ food lovers. No spam, only taste. 🍲
          </p>
        </div>
      </div>
    </section>
  );
}
import { Send, Star } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-zinc-950 dark:bg-white rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-[#fbb200] animate-pulse"><Star fill="currentColor" size={30}/></div>
        <div className="absolute bottom-10 right-10 text-[#f22e3e]"><Star fill="currentColor" size={40}/></div>

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-black text-white dark:text-zinc-900 mb-8 leading-tight tracking-tighter">
            Join the <span className="text-[#fbb200]">Meal</span> Revolution.
          </h2>
          <p className="text-zinc-400 dark:text-zinc-500 text-lg mb-12">Be the first to know about new providers, flash sales, and food tech updates in your area.</p>
          
          <form className="relative group w-full">
            <input 
              type="email" 
              placeholder="Drop your email here..." 
              className="w-full bg-white/5 dark:bg-zinc-100 border border-white/10 dark:border-zinc-200 px-10 py-6 rounded-full outline-none text-white dark:text-black text-lg focus:ring-2 ring-[#f22e3e] transition-all"
            />
            <button className="absolute right-3 top-3 bottom-3 bg-[#f22e3e] hover:bg-[#ff3b4b] text-white px-10 rounded-full flex items-center gap-2 font-black transition-all active:scale-95 shadow-xl shadow-[#f22e3e]/20">
              Subscribe <Send size={20}/>
            </button>
          </form>
          <p className="mt-8 text-zinc-600 dark:text-zinc-400 text-sm font-medium">Join 10k+ food lovers. No spam, only taste. 🍲</p>
        </div>
      </div>
    </section>
  );
}
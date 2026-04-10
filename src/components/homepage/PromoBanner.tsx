import { Zap, Gift, Flame, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function OffersSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-16">
        <span className="text-[#f22e3e] font-black uppercase tracking-[0.3em] text-xs mb-4">Limited Time</span>
        <h2 className="text-6xl font-black text-zinc-950 dark:text-white tracking-tighter">
          Exclusive <br /> <span className="bg-gradient-to-r from-[#f22e3e] to-[#fbb200] bg-clip-text text-transparent">Privileges.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
        {/* Main Big Card */}
        <div className="md:col-span-8 group relative bg-zinc-900 rounded-[2.5rem] p-10 overflow-hidden text-white flex flex-col justify-end min-h-[400px]">
          <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md p-4 rounded-full group-hover:bg-[#f22e3e] transition-all duration-500">
            <Flame size={32} />
          </div>
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-2">Weekend Mega Feast</h3>
            <p className="text-zinc-400 max-w-sm mb-6">Order more than 1000 BDT and get a surprise dessert box for free!</p>
            <Link href="/meals" className="w-fit">
              <button className="bg-white cursor-pointer text-black font-bold px-8 py-3 rounded-full flex items-center gap-2 w-fit active:scale-95 transition-all">
                Claim Now <ArrowUpRight size={18} />
              </button>
            </Link>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#f22e3e]/20 blur-[100px] group-hover:bg-[#f22e3e]/40 transition-all duration-700" />
        </div>

        {/* Small Side Cards */}
        <div className="md:col-span-4 grid grid-rows-2 gap-6">
          <div className="bg-[#fbb200] rounded-[2.5rem] p-8 flex flex-col justify-between group cursor-pointer shadow-xl shadow-[#fbb200]/20">
            <Zap size={40} className="text-black group-hover:scale-125 transition-transform" />
            <div>
              <h4 className="text-2xl font-black text-black">Flash 50%</h4>
              <p className="text-black/70 font-bold">Only for first 100 users</p>
            </div>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-[2.5rem] p-8 flex flex-col justify-between group border border-zinc-200 dark:border-zinc-700">
            <Gift size={40} className="text-[#f22e3e] group-hover:rotate-12 transition-transform" />
            <div>
              <h4 className="text-2xl font-black dark:text-white">Refer & Earn</h4>
              <p className="text-zinc-500 font-bold">Get 100 BDT per friend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
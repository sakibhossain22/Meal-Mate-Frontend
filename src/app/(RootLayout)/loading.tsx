import { Skeleton } from "@/components/ui/skeleton";

export default function AdvanceHomeLoading() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen overflow-hidden">
      
      {/* --- 1. ADVANCE NAVBAR SKELETON --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-xl bg-[#f22e3e]/20" />
            <Skeleton className="h-6 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          </div>
          
          {/* Nav Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            <Skeleton className="h-11 w-28 rounded-2xl bg-[#f22e3e]/30" />
          </div>
        </div>
      </nav>

      {/* --- 2. PREMIUM HERO SKELETON --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute top-40 -left-20 w-72 h-72 bg-[#f22e3e]/5 blur-[120px] rounded-full" />
        <div className="absolute top-20 -right-20 w-72 h-72 bg-[#fbb200]/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-3/5 space-y-8 relative z-10">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40 rounded-full bg-orange-100 dark:bg-orange-500/10" />
              <div className="space-y-3">
                <Skeleton className="h-16 md:h-20 w-full bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
                <Skeleton className="h-16 md:h-20 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
              </div>
            </div>
            <Skeleton className="h-6 w-full md:w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
            
            <div className="flex flex-wrap gap-5 pt-4">
              <Skeleton className="h-16 w-44 rounded-2xl bg-[#f22e3e] opacity-40" />
              <Skeleton className="h-16 w-44 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-transparent" />
            </div>

            {/* Stats/Social Proof Skeleton */}
            <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-3">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10 w-10 rounded-full border-4 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800" />)}
                </div>
                <Skeleton className="h-4 w-32 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>

          {/* Large Floating Image Skeleton */}
          <div className="w-full lg:w-2/5 flex justify-center relative">
            <div className="relative p-10">
                <Skeleton className="h-[350px] w-[350px] md:h-[500px] md:w-[500px] rounded-[4rem] bg-zinc-100 dark:bg-zinc-900 animate-pulse rotate-6" />
                <div className="absolute -bottom-5 -left-5 p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 space-y-2">
                    <Skeleton className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800" />
                    <Skeleton className="h-8 w-32 bg-[#fbb200]/20 rounded-lg" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. 4-CARD BENTO GRID SKELETON --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
                <Skeleton className="h-4 w-28 bg-[#f22e3e]/20 rounded-full" />
                <Skeleton className="h-12 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
            </div>
            <Skeleton className="h-12 w-36 rounded-full bg-zinc-100 dark:bg-zinc-800" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, idx) => (
            <div 
              key={idx}
              className="group bg-white dark:bg-zinc-900/50 rounded-[3rem] p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden"
            >
              {/* Shimmer Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/50 dark:via-zinc-800/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

              {/* Card Image area */}
              <div className="relative h-48 w-full rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-800 mb-6 overflow-hidden">
                 <Skeleton className="h-full w-full" />
              </div>

              {/* Card Content */}
              <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                    <Skeleton className="h-6 w-12 bg-[#f22e3e]/10 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full bg-zinc-100 dark:bg-zinc-900 rounded-md" />
                  <Skeleton className="h-3 w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-md" />
                </div>
                <Skeleton className="h-14 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
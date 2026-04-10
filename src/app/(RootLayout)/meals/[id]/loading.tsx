import { Skeleton } from "@/components/ui/skeleton";

export default function MealDetailsLoading() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto pt-10 px-4 md:px-10">
        {/* --- Main Hero Card Skeleton --- */}
        <div className="bg-white dark:bg-zinc-900 rounded-[3.5rem] p-8 md:p-16 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col lg:flex-row gap-16 items-center overflow-hidden">
          
          {/* Left: Image Skeleton */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <Skeleton className="h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          </div>

          {/* Right: Info Skeleton */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Skeleton className="h-6 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <Skeleton className="h-6 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <Skeleton className="h-16 w-full md:w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
              <Skeleton className="h-10 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            </div>

            {/* Price & Rating Box Skeleton */}
            <div className="flex items-center gap-8 bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-[2rem]">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800" />
                <Skeleton className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <div className="h-12 w-[1px] bg-zinc-200 dark:bg-zinc-700" />
              <div className="space-y-2">
                <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <Skeleton key={i} className="h-4 w-4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                   ))}
                </div>
                <Skeleton className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>

            {/* Badges Skeleton */}
            <div className="flex gap-8">
              <Skeleton className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Button Skeleton */}
            <Skeleton className="h-16 w-full md:w-[250px] rounded-2xl bg-zinc-200 dark:bg-zinc-800 mt-6" />
          </div>
        </div>
      </div>

      {/* --- Tabs Skeleton --- */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-20">
        <div className="flex gap-10 border-b border-zinc-200 dark:border-zinc-800 mb-10">
          <Skeleton className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800" />
        </div>
        
        {/* Review Cards Skeleton */}
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
               <Skeleton className="w-16 h-16 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />
               <div className="flex-grow space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800" />
                    <Skeleton className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                  <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800" />
                  <Skeleton className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
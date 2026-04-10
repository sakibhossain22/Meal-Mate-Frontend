import { Skeleton } from "@/components/ui/skeleton";

export default function SelectCategorySkeleton() {
  return (
    <div className="space-y-12 py-10">
      <div className="container mx-auto px-4">
        
        {/* --- Header & Filters Skeleton --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          {/* Title Skeleton */}
          <Skeleton className="h-12 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          
          {/* Filter Bar Skeleton */}
          <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-[2rem] border border-zinc-200 dark:border-zinc-800">
            <Skeleton className="h-10 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-6 w-[1px] bg-zinc-300 dark:bg-zinc-700" />
            <Skeleton className="h-10 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>

        {/* --- Meals Grid Skeleton --- */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-4 border border-zinc-100 dark:border-zinc-800 shadow-sm"
            >
              {/* Image Container Skeleton */}
              <div className="relative h-56 w-full rounded-[2rem] bg-zinc-100 dark:bg-zinc-800 mb-6 overflow-hidden">
                <Skeleton className="h-full w-full" />
                {/* Floating Price Badge Skeleton */}
                <div className="absolute top-4 left-4">
                  <Skeleton className="h-7 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="px-3 pb-4 space-y-4">
                {/* Stars Skeleton */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-3 w-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  ))}
                </div>
                
                {/* Title Skeleton */}
                <Skeleton className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                
                {/* Description Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-md" />
                  <Skeleton className="h-3 w-5/6 bg-zinc-100 dark:bg-zinc-800 rounded-md" />
                </div>

                {/* Button Skeleton */}
                <Skeleton className="h-14 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800 mt-2" />
              </div>
            </div>
          ))}
        </div>

        {/* --- Pagination Skeleton --- */}
        <div className="mt-24 flex justify-center pb-20">
          <div className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-12 w-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-12 w-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <Skeleton className="h-12 w-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>

      </div>
    </div>
  );
}
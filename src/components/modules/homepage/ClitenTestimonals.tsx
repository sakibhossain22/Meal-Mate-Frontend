import { getAllReviewHome } from "@/actions/admin.action";
import { Star, Quote, MessageSquare } from "lucide-react";
import Image from "next/image";

export default async function ClientTestimonials() {
    const res = await getAllReviewHome();
    const reviews = res?.data?.slice(0, 6) || [];

    return (
        <section className="py-24 bg-zinc-50/50 dark:bg-zinc-950/50 relative overflow-hidden">
            {/* Decorative Background Blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f22e3e]/5 blur-[120px] rounded-full -z-10" />
            
            <div className="container mx-auto px-6">
                {/* --- Header Section --- */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-800 mb-6">
                        <MessageSquare size={16} className="text-[#f22e3e]" />
                        <span className="text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-[0.2em] text-[10px]">
                            Testimonials
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.95]">
                        What Our <span className="text-[#f22e3e]">Clients Say</span>
                    </h2>
                    <p className="mt-6 text-zinc-500 dark:text-zinc-400 font-medium">
                        Real stories from real foodies who have experienced the Meal Mate magic.
                    </p>
                </div>

                {/* --- Testimonials Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review: any) => (
                        <div
                            key={review.id}
                            className="group relative bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:hover:shadow-black"
                        >
                            {/* Quote Icon Overlay */}
                            <div className="absolute top-8 right-10 text-zinc-100 dark:text-zinc-800 group-hover:text-[#f22e3e]/20 transition-colors">
                                <Quote size={48} fill="currentColor" />
                            </div>

                            {/* Ratings */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < review.rating ? "fill-[#fbb200] text-[#fbb200]" : "text-zinc-200 dark:text-zinc-800"}
                                    />
                                ))}
                            </div>

                            {/* Review Content */}
                            <p className="text-zinc-600 dark:text-zinc-300 mb-10 text-lg font-medium leading-relaxed relative z-10">
                                "{review.comment}"
                            </p>

                            {/* User Profile Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-zinc-50 dark:border-zinc-800/50">
                                <div className="relative h-14 w-14 flex-shrink-0">
                                    {review.customer?.image ? (
                                        <div className="h-full w-full rounded-2xl overflow-hidden ring-2 ring-white dark:ring-zinc-800">
                                            <Image
                                                src={review.customer?.image}
                                                alt={review.customer?.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-full w-full rounded-2xl bg-gradient-to-br from-[#f22e3e] to-[#fbb200] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#f22e3e]/20">
                                            {review.customer.name.charAt(0)}
                                        </div>
                                    )}
                                    {/* Small Checkmark Badge */}
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-white dark:ring-zinc-900">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M6.66663 2L2.99996 5.66667L1.33329 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>

                                <div className="overflow-hidden">
                                    <h4 className="font-black text-zinc-900 dark:text-white truncate">
                                        {review.customer?.name}
                                    </h4>
                                    <p className="text-[10px] font-bold text-[#f22e3e] uppercase tracking-widest truncate">
                                        Ordered: {review.meal?.name || "Premium Dish"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {reviews.length === 0 && (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs italic">
                            No food stories to share yet.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
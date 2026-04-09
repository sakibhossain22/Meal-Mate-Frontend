import { deleteReview, getAllReview } from "@/actions/admin.action"; // Tumar path onujayi koro
import {Star,MessageSquare,User, Calendar,Quote,Trash2} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default async function CustomerReviews() {
    const response = await getAllReview();
    const reviews = response?.data || [];

    return (
        <div className="bg-slate-950 min-h-screen p-6 md:p-12 text-slate-200">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="text-orange-500" size={24} />
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">Testimonials</span>
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tight md:text-5xl">
                            Customer <span className="text-slate-500">Reviews</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 font-medium max-w-md text-sm md:text-right">
                        Discover what our food lovers are saying about their dining experience and our service.
                    </p>
                </header>
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review: any) => (
                            <div
                                key={review.id}
                                className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl relative group hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2"
                            >
                                <Quote className="absolute top-6 right-8 text-slate-800 group-hover:text-orange-500/10 transition-colors" size={48} />
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={`${i < review.rating ? "fill-orange-500 text-orange-500" : "text-slate-700"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-300 leading-relaxed font-medium mb-8 relative z-10">
                                    "{review.comment}"
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 pt-6 border-t border-slate-800/50">
                                        <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 ring-1 ring-slate-700 shadow-inner">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm tracking-tight">{review.customer?.name || "Anonymous User"}</h4>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">
                                                <Calendar size={10} />
                                                {format(new Date(review.createdAt), "MMM dd, yyyy")}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <form action={deleteReview.bind(null, review.id)}>
                                            <Button type="submit">
                                                <Trash2 />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[3rem]">
                        <div className="h-20 w-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-700">
                            <MessageSquare size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-white">No reviews yet</h3>
                        <p className="text-slate-500 mt-2">Be the first to share your experience!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
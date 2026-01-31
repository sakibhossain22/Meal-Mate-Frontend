import { getAllReviewHome } from "@/actions/admin.action";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default async function ClientTestimonials() {
    const res = await getAllReviewHome();
    const reviews = res?.data || [];
    
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-16">
                    <span className="text-[#f22e3e] font-bold uppercase tracking-widest text-sm">Customer Reviews</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-4">
                        What Our <span className="text-[#f22e3e]">Clients Say</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {reviews.map((review: any) => (
                        <div
                            key={review.id}
                            className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100 relative group hover:shadow-xl transition-all duration-300"
                        >
                            <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Quote size={40} className="text-[#f22e3e]" />
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={i < review.rating ? "fill-[#fbb200] text-[#fbb200]" : "text-slate-200"}
                                    />
                                ))}
                            </div>

              
                            <p className="text-slate-600 mb-8 italic leading-relaxed">
                                "{review.comment}"
                            </p>

                            <div className="flex items-center gap-4 border-t pt-6">

                                {
                                    review.customer?.image ? <div className="relative h-12 w-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm">
                                        <Image
                                            src={review.customer?.image}
                                            alt={review.customer?.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div> : <p className="font-bold text-2xl text-white rounded-full w-10 text-center items-center h-10 mx-2 bg-[#f22e3e]">{review.customer.name.charAt(0)}</p>
                                }

                                <div>
                                    <h4 className="font-bold text-slate-900 leading-none mb-1">
                                        {review.customer?.name}
                                    </h4>
                                    <span className="text-xs text-slate-400 font-medium">
                                        Ordered: {review.meal?.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {reviews.length === 0 && (
                    <p className="text-slate-400">No testimonials available yet.</p>
                )}
            </div>
        </section>
    );
}
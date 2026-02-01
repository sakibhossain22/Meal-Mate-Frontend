import { addToCart } from "@/actions/cart.action";
import { mealService } from "@/app/services/meal.service";
import { userService } from "@/app/services/userService";
import ReviewForm from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewType } from "@/types/index.type";
import { ShoppingCart, Star, MessageSquareQuote, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MealDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const response = await mealService.getSingleMealById(id);
    const data = response?.data;
    const session = await userService.getSession();
    console.log(session.data.user.role);

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6">
                <AlertCircle className="text-orange-500 mb-4" size={64} />
                <h2 className="text-3xl font-black">Meal Not Found!</h2>
                <p className="text-slate-500 mt-2 text-center max-w-md">
                    Sorry, the dish you are looking for might have been removed or the link is incorrect.
                </p>
                <Link href="/meals" className="mt-8 px-8 py-3 bg-orange-600 rounded-full font-bold hover:bg-orange-500 transition-all">
                    Back to Menu
                </Link>
            </div>
        );
    }

    const handleAddToCart = addToCart.bind(null, data.id, 1)
    return (
        <div className="dark:bg-slate-950 text-slate-200 min-h-screen p-4 md:p-10">
            =            <div className="max-w-6xl mx-auto my-12 p-6 md:p-10 dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-800 flex flex-col md:flex-row gap-12 items-center">

                <div className="relative group w-full md:w-1/2 flex justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-rose-500/20 rounded-full blur-3xl opacity-60 scale-90 group-hover:scale-105 transition-transform duration-500"></div>
                    <Image alt={data.name} width={500} height={500} src={data.image || "/pizza.png"} className="relative z-10 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] group-hover:rotate-6 transition-transform duration-500" />
                </div>

                <div className="w-full md:w-1/2 space-y-6">
                    <div>
                        <span className="px-4 py-1.5 bg-orange-500/10 text-orange-500 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-500/20">
                            Hot & Fresh
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black dark:text-white text-black mt-4 leading-tight">
                            {data.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <h4 className="text-3xl font-extrabold text-orange-400">
                            ${data.price}
                        </h4>
                        <div className="h-8 w-px bg-slate-700"></div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} className={i >= 4 ? "opacity-20" : ""} />
                                ))}
                            </div>
                            <p className="text-sm font-medium text-slate-500">
                                ({data?.reviews?.length || 0} Reviews)
                            </p>
                        </div>
                    </div>

                    <p className="text-slate-400 text-lg leading-relaxed border-l-4 border-orange-500/50 pl-4 italic">
                        {data?.description}
                    </p>

                    <div className="pt-4">
                        <form action={handleAddToCart}>
                            <Button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fbb200] px-4 py-6 font-semibold text-black transition-all duration-300 hover:bg-[#f22e3e] hover:text-white hover:shadow-lg dark:bg-[#f22e3e] dark:text-white dark:hover:bg-[#ff5a67]">
                                <ShoppingCart size={22} />
                                ADD TO CART
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-5xl mx-auto px-4">
                <Tabs defaultValue="review" className="w-full my-16">
                    <div className="flex justify-center mb-8">
                        <TabsList className="dark:bg-slate-900 p-1 rounded-xl h-auto border border-slate-800 shadow-inner">
                            <TabsTrigger className="w-40 md:w-60 py-3 text-lg font-semibold rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-orange-400 data-[state=active]:shadow-lg transition-all text-slate-400"
                                value="description">
                                Description
                            </TabsTrigger>
                            <TabsTrigger className="w-40 md:w-60 py-3 text-lg font-semibold rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-orange-400 data-[state=active]:shadow-lg transition-all text-slate-400"
                                value="review" >Reviews ({data?.reviews?.length || 0})
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="description" className="focus-visible:outline-none">
                        <div className="dark:bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl min-h-[200px] leading-relaxed text-slate-400">
                            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Product Details</h3>
                            <p className="text-black dark:text-slate-200">{data?.description}</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="review" className="focus-visible:outline-none">
                        <ReviewForm mealId={data.id} userId={session.data.user.id} key={data.id} />
                        <div className="grid gap-4">
                            {data?.reviews?.length > 0 ? (
                                data.reviews.map((review: ReviewType) => (
                                    <div
                                        key={review.id}
                                        className="flex flex-col md:flex-row md:items-start gap-5 dark:bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all shadow-sm">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                            {review.customer.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-center mb-2">
                                                <h1 className="text-lg font-bold text-black dark:text-slate-200">{review.customer.name}</h1>
                                                <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                                                    <span className="text-amber-400 font-bold text-sm">{review.rating}</span>
                                                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                                                </div>
                                            </div>
                                            <p className="text-black font-semibold dark:text-slate-400 leading-relaxed italic">
                                                "{review.comment}"
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-600 italic">No reviews yet. Be the first to share your thoughts!</div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
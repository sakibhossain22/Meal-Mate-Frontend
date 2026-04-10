import { addToCart } from "@/actions/cart.action";
import { getMealByCategory } from "@/actions/meal.action";
import { mealService } from "@/app/services/meal.service";
import { userService } from "@/app/services/userService";
import ReviewForm from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewType } from "@/types/index.type";
import { 
    ShoppingCart, Star, AlertCircle, Clock, 
    Utensils, ShieldCheck, ArrowRight, TrendingUp 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MealDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await mealService?.getSingleMealById(id);
    const data = response?.data;
    
    // Suggestion logic: fetching category meals and filtering current one
    const categoryMealsRaw = await getMealByCategory(data?.category?.name || "Pizza");
    const suggestedMeals = categoryMealsRaw
        ?.filter((m: any) => m.id !== id)
        .slice(0, 5);

    const session = await userService?.getSession();

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 p-6">
                <div className="relative">
                    <AlertCircle className="text-[#f22e3e] mb-4 animate-bounce" size={80} />
                    <div className="absolute inset-0 bg-[#f22e3e]/20 blur-2xl rounded-full" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white">Meal Not Found!</h2>
                <Link href="/meals" className="mt-10 px-10 py-4 bg-[#f22e3e] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-2xl transition-all active:scale-95">
                    Explore Menu
                </Link>
            </div>
        );
    }

    const handleAddToCart = addToCart.bind(null, data.id, 1);

    return (
        <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen pb-20">
            <div className="max-w-8xl mx-auto pt-10 px-4 md:px-10">
                
                {/* --- Main Layout Wrapper --- */}
                <div className="flex flex-col xl:flex-row gap-12 items-start">
                    
                    {/* --- Left Column: Content (70%) --- */}
                    <div className="w-full xl:w-[70%] space-y-12">
                        
                        {/* Hero Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-[3.5rem] p-8 md:p-16 border border-zinc-100 dark:border-zinc-800 shadow-2xl flex flex-col lg:flex-row gap-16 items-center overflow-hidden relative">
                            <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#f22e3e]/5 blur-[100px] rounded-full" />
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#fbb200]/5 blur-[100px] rounded-full" />

                            {/* Image Column */}
                            <div className="relative group w-full lg:w-1/2 flex justify-center">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#f22e3e]/10 to-[#fbb200]/10 rounded-full blur-[80px] scale-90 group-hover:scale-110 transition-all duration-700" />
                                <Image
                                    alt={data?.name}
                                    width={550}
                                    height={550}
                                    src={data?.image || "/pizza.png"}
                                    className="relative z-10 object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:rotate-2 transition-all duration-700"
                                />
                            </div>

                            {/* Info Column */}
                            <div className="w-full lg:w-1/2 space-y-8 relative z-10">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-4 py-1 bg-[#f22e3e]/10 text-[#f22e3e] text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-[#f22e3e]/20">Chef's Choice</span>
                                        <span className="px-4 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20 flex items-center gap-1"><ShieldCheck size={12} /> Verified</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-black dark:text-white text-zinc-900 leading-[0.9] tracking-tighter">{data?.name}</h1>
                                </div>

                                <div className="flex items-center gap-8 bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-[2rem]">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Price</p>
                                        <h4 className="text-4xl font-black text-[#f22e3e]">${data?.price}</h4>
                                    </div>
                                    <div className="h-12 w-[1px] bg-zinc-200 dark:bg-zinc-700" />
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1 text-[#fbb200]">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} className={i >= 4 ? "opacity-20 text-zinc-400" : ""} />)}
                                        </div>
                                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{data?.reviews?.length || 0} Reviews</p>
                                    </div>
                                </div>

                                <div className="flex gap-8 text-zinc-500 dark:text-zinc-400">
                                    <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-tighter"><Clock size={18} className="text-[#f22e3e]" /> 15-25 MINS</div>
                                    <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-tighter"><Utensils size={18} className="text-[#fbb200]" /> FRESH</div>
                                </div>

                                <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium italic">"{data?.description}"</p>

                                <form action={handleAddToCart}>
                                    <Button type="submit" className="group w-full md:w-auto inline-flex items-center justify-center gap-4 rounded-2xl bg-[#f22e3e] px-12 py-8 font-black text-white hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-all duration-500 shadow-2xl shadow-[#f22e3e]/30 active:scale-95 cursor-pointer uppercase tracking-widest text-xs">
                                        <ShoppingCart size={20} className="group-hover:-translate-y-1 transition-transform" />
                                        Add To Your Plate
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* --- Tabs Section --- */}
                        <div className="w-full">
                            <Tabs defaultValue="review" className="w-full">
                                <div className="flex justify-start mb-10 border-b border-zinc-200 dark:border-zinc-800">
                                    <TabsList className="bg-transparent p-0 h-auto gap-10">
                                        <TabsTrigger className="pb-4 px-0 text-sm font-black uppercase tracking-[0.2em] data-[state=active]:text-[#f22e3e] data-[state=active]:border-b-4 border-[#f22e3e] transition-all text-zinc-400 border-b-4 border-transparent" value="description">Details</TabsTrigger>
                                        <TabsTrigger className="pb-4 px-0 text-sm font-black uppercase tracking-[0.2em] data-[state=active]:text-[#f22e3e] data-[state=active]:border-b-4 border-[#f22e3e] transition-all text-zinc-400 border-b-4 border-transparent" value="review" >Reviews ({data?.reviews?.length || 0})</TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="description" className="focus-visible:outline-none">
                                    <div className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">Full Product Story</h3>
                                        <p className="text-zinc-600 dark:text-zinc-300 text-lg font-medium leading-relaxed">{data?.description}</p>
                                        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {['100% Organic', 'Gluten Free', 'Handmade', 'Eco Packaging'].map((feat) => (
                                                <div key={feat} className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">{feat}</div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="review" className="focus-visible:outline-none space-y-8">
                                    {session?.data?.user ? (
                                        <ReviewForm mealId={data?.id} userId={session?.data?.user?.id} key={data?.id} />
                                    ) : (
                                        <div className="text-center p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                                            <p className="text-zinc-500 font-bold tracking-tight">Hungry to share your thoughts? <Link href="/login" className="text-[#f22e3e] underline decoration-2 underline-offset-4">Login</Link> to post a review.</p>
                                        </div>
                                    )}
                                    <div className="grid gap-6">
                                        {data?.reviews && data.reviews.length > 0 ? (
                                            data.reviews.map((review: ReviewType) => (
                                                <div key={review.id} className="flex flex-col md:flex-row md:items-start gap-8 bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-50 dark:border-zinc-800 hover:shadow-xl transition-all">
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f22e3e] to-[#fbb200] flex items-center justify-center text-white text-2xl font-black shadow-lg flex-shrink-0">
                                                        {review?.customer?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-grow space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <h4 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">{review?.customer?.name}</h4>
                                                            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 rounded-full">
                                                                <Star size={14} className="fill-[#fbb200] text-[#fbb200]" />
                                                                <span className="text-zinc-900 dark:text-zinc-100 font-black text-xs">{review.rating}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium italic leading-relaxed">"{review.comment}"</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem]">
                                                <p className="text-zinc-400 font-black uppercase tracking-[0.2em] text-xs italic">No reviews yet. Be the first foodie to judge!</p>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>

                    {/* --- Right Column: Suggestions (30%) --- */}
                    <aside className="w-full xl:w-[30%] sticky top-24 space-y-8">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2">
                                <TrendingUp size={20} className="text-[#f22e3e]" /> More For You
                            </h3>
                            <div className="h-1 flex-grow mx-4 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                        </div>

                        <div className="grid gap-5">
                            {suggestedMeals && suggestedMeals.length > 0 ? (
                                suggestedMeals.map((meal: any) => (
                                    <Link 
                                        href={`/meals/${meal.id}`} 
                                        key={meal.id}
                                        className="group bg-white dark:bg-zinc-900 p-4 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 flex items-center gap-5 hover:border-[#f22e3e]/30 hover:shadow-2xl hover:shadow-[#f22e3e]/5 transition-all duration-500"
                                    >
                                        <div className="relative w-24 h-24 bg-zinc-50 dark:bg-zinc-800/50 rounded-[2rem] overflow-hidden flex-shrink-0">
                                            <Image 
                                                src={meal.image || "/pizza.png"} 
                                                alt={meal.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-grow space-y-1">
                                            <h4 className="font-black text-zinc-900 dark:text-white leading-tight group-hover:text-[#f22e3e] transition-colors line-clamp-1">
                                                {meal.name}
                                            </h4>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-black text-[#f22e3e]">${meal.price}</span>
                                                <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-full group-hover:bg-[#f22e3e] group-hover:text-white transition-all">
                                                    <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-zinc-400 text-sm italic px-2 font-medium">No other dishes in this category yet.</p>
                            )}
                        </div>

                        {/* Promo Banner */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#f22e3e] to-[#fbb200] p-8 rounded-[3rem] text-white shadow-xl shadow-[#f22e3e]/20 group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700" />
                            <h5 className="text-2xl font-black leading-tight italic relative z-10">Hungry for Savings?</h5>
                            <p className="mt-2 text-[10px] font-black uppercase tracking-widest opacity-90 relative z-10">Use code: MEALMATE20</p>
                            <button className="mt-6 w-full py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-zinc-900 hover:text-white transition-colors relative z-10">
                                Claim Discount
                            </button>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
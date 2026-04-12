"use client"

import { ShoppingCart, Sparkles, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { addToCart } from "@/actions/cart.action"
import { aiMealRecommend } from "@/actions/meal.action" // তোমার সার্ভার অ্যাকশন
import { toast } from "sonner"
import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

function AddToCart({ mealId, user }: { mealId: string, user: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [aiText, setAiText] = useState("")
    const [displayedText, setDisplayedText] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // টাইপরাইটার ইফেক্ট লজিক
    useEffect(() => {
        if (aiText) {
            let i = 0;
            setDisplayedText("");
            const interval = setInterval(() => {
                setDisplayedText((prev) => prev + aiText.charAt(i));
                i++;
                if (i >= aiText.length) clearInterval(interval);
            }, 20); // লেখার গতি নিয়ন্ত্রন
            return () => clearInterval(interval);
        }
    }, [aiText]);

    const handleAiInsight = async () => {
        setIsOpen(true);
        setIsLoading(true);
        setAiText("");
        try {
            const res = await aiMealRecommend(mealId);
            setAiText(res);
        } catch (error) {
            setAiText("Could not get AI recommendation at this moment.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddToCart = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!user) return toast.error("Please Login First To Add Meal Into Cart");
            if (user?.role !== "CUSTOMER") return toast.error("Only Customer Can Add Meal To The Cart");
            if (user?.status !== "ACTIVE") return toast.error("Only Active User Can Add Meal To The Cart");

            const res = await addToCart(mealId, 1);
            if (res?.success) toast.success("Added to your plate!");
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center gap-4">
            <form onSubmit={handleAddToCart} className="w-full md:w-auto">
                <Button
                    type="submit"
                    className="group w-full md:w-auto inline-flex items-center justify-center gap-4 rounded-2xl bg-[#f22e3e] px-12 py-8 font-black text-white hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-all duration-500 shadow-2xl shadow-[#f22e3e]/30 active:scale-95 cursor-pointer uppercase tracking-widest text-xs"
                >
                    <ShoppingCart size={20} className="group-hover:-translate-y-1 transition-transform" />
                    Add To Your Plate
                </Button>
            </form>

            {/* AI Insight Button */}
            <Button
                type="button"
                onClick={handleAiInsight}
                className="group w-full md:w-auto inline-flex items-center justify-center gap-4 rounded-2xl bg-zinc-800 px-8 py-8 font-black text-white  hover:bg-orange-600 transition-all duration-500 shadow-xl active:scale-95 cursor-pointer uppercase tracking-widest text-xs border border-zinc-800"
            >
                <Sparkles size={18} className="text-orange-400  group-hover:rotate-12 transition-transform" />
                Why This?
            </Button>

            {/* AI Response Popup */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-white">
                            <Sparkles size={20} className="text-orange-500" />
                            MealMate AI Insight
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center gap-4 py-8">
                                <Loader2 className="animate-spin text-orange-500" size={30} />
                                <p className="text-zinc-500 text-sm animate-pulse">Thinking about your taste...</p>
                            </div>
                        ) : (
                            <p className="text-zinc-300 leading-relaxed font-medium">
                                {displayedText}
                                <span className="inline-block w-1 h-4 ml-1 bg-orange-500 animate-bounce" />
                            </p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddToCart;
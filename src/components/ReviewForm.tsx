"use client";

import { useState } from "react";
import { Star, MessageSquareQuote, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addReview } from "@/actions/meal.action";

export default function ReviewForm({ mealId, userId }: { mealId: string, userId?: string }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isPending, setIsPending] = useState(false);
    const handlePostReview = async () => {
        if(!userId)  return toast.error("Please login as Customer First !!");
        if (!comment.trim()) return toast.error("Please write a comment!");
        setIsPending(true);
        try {
            const res = await addReview(rating, comment, mealId, userId);

            if (res.success || res.id) {
                toast.success("Review posted successfully!");
                setComment("");
                setRating(5);
            } else {
                toast.error(res.message || "Failed to post review");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="dark:bg-slate-900 p-5 md:p-8 rounded-[2rem] border border-slate-800 mb-10 shadow-xl">
            <h3 className="text-xl font-bold text-black dark:text-white mb-6 flex items-center gap-2">
                <MessageSquareQuote className=" text-black dark:text-orange-500" /> Share Your Feedback
            </h3>
            <div className="space-y-5">
                <div className="flex items-center gap-4 dark:bg-slate-950/50 w-fit px-4 py-2 rounded-xl border border-slate-800">
                    <span className="text-sm font-medium text-black dark:text-slate-500">Rating:</span>
                    <div className="flex items-center gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                onClick={() => setRating(num)}
                                className="hover:scale-110 transition-transform"
                            >
                                <Star size={20} fill={num <= rating ? "currentColor" : "none"} />
                            </button>
                        ))}
                    </div>
                </div>
                <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What's on your mind about this meal?"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all resize-none shadow-inner"
                />
                <div className="flex justify-end">
                    <Button
                        onClick={handlePostReview}
                        disabled={isPending}
                        className="w-full md:w-auto h-12 md:h-14 px-10 text-base font-black bg-orange-600 hover:bg-orange-500 text-white rounded-xl shadow-lg transition-all active:scale-95"
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : "POST REVIEW"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
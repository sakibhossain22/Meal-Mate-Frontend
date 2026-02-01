"use client"

import { UtensilsCrossed } from "lucide-react"

export default function LoadingState() {
    return (
        <div className="flex h-[60vh] w-full flex-col items-center justify-center space-y-4">
            <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-slate-800 border-t-orange-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <UtensilsCrossed className="h-8 w-8 text-orange-500 animate-pulse" />
                </div>
            </div>

            <div className="flex flex-col items-center gap-1">
                <h2 className="text-xl font-bold tracking-tight text-white">
                    Preparing Your <span className="text-orange-500">Meal...</span>
                </h2>
                <p className="text-sm text-slate-500 animate-pulse">
                    Please wait a moment
                </p>
            </div>
            <div className="flex gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-[bounce_1s_infinite_0ms]" />
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-[bounce_1s_infinite_200ms]" />
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-[bounce_1s_infinite_400ms]" />
            </div>
        </div>
    )
}
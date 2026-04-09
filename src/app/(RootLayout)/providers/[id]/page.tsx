import Image from 'next/image';
import Link from 'next/link';
import { singleProviderDetails } from "@/actions/provider.action";
import {
    Phone,
    MapPin,
    Info,
    ShoppingCart,
    UtensilsCrossed,
    Star,
    Clock
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ProviderDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: provider } = await singleProviderDetails(id);

    if (!provider) {
        return (
            <div className="flex min-h-screen items-center justify-center dark:bg-slate-950">
                <p className="text-xl font-semibold dark:text-white">Provider not found!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 dark:bg-slate-950">
            <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b dark:border-slate-800 shadow-sm">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl" />

                <div className="relative max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative">
                        <div className="w-36 h-36 bg-gradient-to-tr from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl rotate-3 transform">
                            <UtensilsCrossed size={60} className="text-white -rotate-3" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900" title="Active" />
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="space-y-1">
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white capitalize tracking-tight">
                                {provider.businessName}
                            </h1>

                        </div>

                        <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg flex items-center justify-center md:justify-start gap-2">
                            <Info size={18} className="shrink-0 text-orange-400" />
                            {provider.description}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                            <Badge variant="outline" className="px-4 py-2 flex gap-2 border-slate-200 dark:border-slate-700 dark:text-slate-300">
                                <Phone size={14} className="text-orange-500" /> {provider.contactNumber}
                            </Badge>
                            <Badge variant="outline" className="px-4 py-2 flex gap-2 border-slate-200 dark:border-slate-700 dark:text-slate-300">
                                <MapPin size={14} className="text-orange-500" /> {provider.address}
                            </Badge>
                            <Badge variant="outline" className="px-4 py-2 flex gap-2 border-slate-200 dark:border-slate-700 dark:text-slate-300">
                                <Clock size={14} className="text-orange-500" /> 20-30 min
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-16">
                <div className="flex items-end justify-between mb-10 border-l-4 border-orange-500 pl-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Our Popular Menu</h2>
                        <p className="text-slate-500 dark:text-slate-400">Fresh and delicious meals from our kitchen</p>
                    </div>
                    <Badge className="bg-orange-500 hover:bg-orange-600 hidden sm:flex">
                        {provider.meals?.length || 0} Items Available
                    </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {provider.meals?.map((meal: any) => (
                        <Card
                            key={meal.id}
                            className="group relative h-full overflow-hidden rounded-[2.5rem] border-none bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900 dark:shadow-none dark:border dark:border-slate-800"
                        >
                            <CardContent className="p-0">
                                <div className="flex flex-col h-full">

                                    {/* Image Section */}
                                    <div className="relative h-64 w-full overflow-hidden bg-slate-50 dark:bg-slate-800/50">
                                        <Image
                                            src={meal.image || "/pizza.png"}
                                            alt={meal.name}
                                            fill
                                            className="object-contain p-8 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <Badge className="bg-white/90 text-[#f22e3e] hover:bg-white border-none shadow-md backdrop-blur-md dark:bg-slate-900/90 font-bold uppercase tracking-widest text-[10px]">
                                                {meal.categoryId}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex flex-col flex-grow p-8">
                                        <div className="mb-3 flex items-center justify-between">
                                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-orange-500 transition-colors">
                                                {meal.name}
                                            </h3>
                                            <span className="text-2xl font-black text-[#f22e3e]">
                                                ${meal.price}
                                            </span>
                                        </div>

                                        <p className="mb-8 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                            {meal.description.slice(0, 45) + "..."}
                                        </p>

                                        {/* Link Button */}
                                        <div className="mt-auto">
                                            <Link
                                                href={`/meals/${meal.id}`}
                                                className="
                                                inline-flex w-full items-center justify-center gap-2
                                                rounded-full bg-[#fbb200] px-4 py-2
                                                font-semibold text-black
                                                transition-all duration-300
                                                hover:bg-[#f22e3e] hover:text-white hover:shadow-lg
                                                dark:bg-[#f22e3e] dark:text-white dark:hover:bg-[#ff5a67]
                    "
                                            >
                                                <ShoppingCart className="h-5 w-5" />
                                                <span>View Details</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {(!provider.meals || provider.meals.length === 0) && (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <UtensilsCrossed size={48} className="mx-auto mb-4 text-slate-300" />
                        <p className="text-slate-400">This provider hasn't uploaded any meals yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
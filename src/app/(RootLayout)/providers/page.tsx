import Image from 'next/image';
import Link from 'next/link';
import { allProviders } from "@/actions/provider.action";
import {
    Phone,
    MapPin,
    ArrowRight,
    Store,
    Utensils
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Providers() {
    const { data: providers } = await allProviders();

    if (!providers || providers.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center dark:bg-slate-950">
                <p className="text-xl font-semibold dark:text-white text-slate-600">No providers found!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                        Our Kitchen <span className="text-orange-500">Partners</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Explore delicious meals from our trusted food providers. Every kitchen has a unique story and taste.
                    </p>
                </div>

                {/* Providers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {providers.map((provider: any) => (
                        <Card
                            key={provider.id}
                            className="group relative overflow-hidden rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/60 dark:shadow-none dark:border dark:border-slate-800 transition-all duration-500 hover:-translate-y-2"
                        >
                            <CardContent className="p-0">
                                {/* Top Pattern/Bg */}
                                <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500 relative">
                                    <div className="absolute -bottom-10 left-8">
                                        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center border-4 border-white dark:border-slate-800">
                                            <Store className="text-orange-500 w-10 h-10" />
                                        </div>
                                    </div>
                                    <Badge className="absolute top-4 right-6 bg-white/20 backdrop-blur-md text-white border-none">
                                        {provider.meals?.length || 0} Meals
                                    </Badge>
                                </div>

                                {/* Content */}
                                <div className="pt-14 p-8 space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white capitalize group-hover:text-orange-500 transition-colors">
                                            {provider.businessName}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-2">
                                            {provider.description}
                                        </p>
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <MapPin size={16} className="text-orange-500" />
                                            <span>{provider.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <Phone size={16} className="text-orange-500" />
                                            <span>{provider.contactNumber}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-4">
                                        <Link
                                            href={`/providers/${provider.id}`}
                                            className="
                                            inline-flex w-full items-center justify-center gap-2
                                            rounded-full bg-[#fbb200] px-4 py-3
                                            font-semibold text-black
                                            transition-all duration-300
                                            hover:bg-[#f22e3e] hover:text-white hover:shadow-lg
                                            dark:bg-[#f22e3e] dark:text-white dark:hover:bg-[#ff5a67]
                    "
                                        >
                                            <Utensils size={18} />
                                            Show Meals
                                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
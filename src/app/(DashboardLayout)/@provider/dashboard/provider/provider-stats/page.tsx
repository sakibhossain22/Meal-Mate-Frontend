import { providerStats } from "@/actions/order.action";
import {
    TrendingUp,
    ShoppingBag,
    Users,
    Star,
    Utensils,
    DollarSign,
    PackageCheck,
    PackageX
} from "lucide-react";

export default async function ProviderStats() {
    const response = await providerStats();
    const stats = response?.data;

    if (!stats) return <div className="p-10 text-slate-500">No stats found.</div>;

    const statCards = [
        {
            title: "Total Revenue",
            value: `$${stats.orders.revenue}`,
            description: "Lifetime earnings",
            icon: <DollarSign className="text-emerald-500" />,
            bgColor: "bg-emerald-500/10",
        },
        {
            title: "Total Orders",
            value: stats.orders.totalOrders,
            description: `${stats.orders.totalOrderItems} items sold`,
            icon: <ShoppingBag className="text-blue-500" />,
            bgColor: "bg-blue-500/10",
        },
        {
            title: "Total Meals",
            value: stats.meals.total,
            description: `${stats.meals.available} active on menu`,
            icon: <Utensils className="text-orange-500" />,
            bgColor: "bg-orange-500/10",
        },
        {
            title: "Average Rating",
            value: stats.reviews.averageRating.toFixed(1),
            description: `From ${stats.reviews.total} reviews`,
            icon: <Star className="text-amber-500" fill="currentColor" />,
            bgColor: "bg-amber-500/10",
        }
    ];

    return (
        <div className="bg-slate-950 min-h-screen p-6 md:p-10 text-slate-200">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-white flex items-center gap-3">
                        <TrendingUp className="text-blue-500" size={32} />
                        Business Overview
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Monitoring your kitchen's performance and growth.</p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {statCards.map((card, index) => (
                        <div key={index} className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-sm hover:border-slate-700 transition-all">
                            <div className={`w-12 h-12 ${card.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                                {card.icon}
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{card.title}</p>
                            <h2 className="text-3xl font-black text-white mt-1">{card.value}</h2>
                            <p className="text-xs text-slate-500 mt-2 font-medium">{card.description}</p>
                        </div>
                    ))}
                </div>

                {/* Detailed Breakdown Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Meal Availability Card */}
                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem]">
                        <h3 className="text-lg font-bold text-white mb-6">Inventory Status</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <PackageCheck className="text-emerald-500" />
                                    <span className="text-sm font-bold">Available Meals</span>
                                </div>
                                <span className="text-xl font-black text-white">{stats.meals.available}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <PackageX className="text-rose-500" />
                                    <span className="text-sm font-bold">Out of Stock</span>
                                </div>
                                <span className="text-xl font-black text-white">{stats.meals.unavailable}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Insights Card */}
                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
                            <Users size={40} className="text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white">{stats.customers.unique}</h3>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Unique Customers</p>
                        <p className="text-xs text-slate-600 mt-4 max-w-[200px]">
                            You have reached {stats.customers.unique} customer(s) this month. Keep up the good work!
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
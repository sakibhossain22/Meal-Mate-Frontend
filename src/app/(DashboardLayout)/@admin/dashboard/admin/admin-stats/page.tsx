
import { Users, Utensils, ShoppingBag, DollarSign, Activity, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { userService } from "@/app/services/userService";
import { adminStat } from "@/actions/meal.action";



export default async function AdminStats() {
    const response = await adminStat();
    // Error UI
    if (!response || response.error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] bg-slate-950">
                <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-rose-500/20 text-center backdrop-blur-xl">
                    <AlertCircle className="mx-auto text-rose-500 mb-4" size={48} />
                    <h2 className="text-xl font-bold text-white">Access Denied</h2>
                    <p className="text-slate-500 mt-2 max-w-xs">
                        {response?.status === 401
                            ? "Please login as an admin to view this dashboard."
                            : "Could not connect to the server. Please try again later."}
                    </p>
                </div>
            </div>
        );
    }

    const stats = response.data;

    // UI Cards Configuration
    const cards = [
        { title: "Total Revenue", value: `$${stats.orders.totalRevenue.toFixed(2)}`, icon: <DollarSign className="text-emerald-400" />, color: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/20" },
        { title: "Total Users", value: stats.users.total, icon: <Users className="text-blue-400" />, color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/20" },
        { title: "Total Meals", value: stats.meals.total, icon: <Utensils className="text-orange-400" />, color: "from-orange-500/20 to-amber-500/20", border: "border-orange-500/20" },
        { title: "Active Orders", value: stats.orders.total, icon: <ShoppingBag className="text-rose-400" />, color: "from-rose-500/20 to-pink-500/20", border: "border-rose-500/20" }
    ];

    return (
        <div className="bg-slate-950 min-h-screen p-4 md:p-10 text-slate-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-10">
                    <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800 mb-4">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Live</span>
                    </div>
                    <h1 className="text-4xl font-black text-white">Admin Insights</h1>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {cards.map((card, i) => (
                        <div key={i} className={`relative bg-slate-900 border ${card.border} p-6 rounded-[2.5rem] overflow-hidden group hover:bg-slate-800/50 transition-all`}>
                            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${card.color} blur-2xl rounded-full opacity-50`}></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-3 bg-slate-950 w-fit rounded-2xl mb-4 group-hover:scale-110 transition-transform">{card.icon}</div>
                                <span className="text-slate-500 text-sm font-semibold">{card.title}</span>
                                <span className="text-3xl font-black text-white mt-1">{card.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Breakdown */}
                    <section className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2.5rem] backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold flex items-center gap-2 italic"><Activity className="text-blue-400" /> User Traffic</h2>
                            <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-1 rounded-md border border-blue-500/20">LIVE DATA</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/50">
                                <p className="text-slate-500 text-xs mb-1">Customers</p>
                                <p className="text-2xl font-black text-white">{stats.users.customers}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/50">
                                <p className="text-slate-500 text-xs mb-1">Providers</p>
                                <p className="text-2xl font-black text-white">{stats.users.providers}</p>
                            </div>
                        </div>
                    </section>

                    {/* Inventory Status */}
                    <section className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2.5rem] backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold flex items-center gap-2 italic"><CheckCircle className="text-orange-400" /> Meal Stock</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex-1">
                                <p className="text-slate-500 text-sm mb-2">Available for Orders</p>
                                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(stats.meals.available / stats.meals.total) * 100}%` }}></div>
                                </div>
                                <p className="mt-3 text-lg font-bold text-white">{stats.meals.available} / {stats.meals.total}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
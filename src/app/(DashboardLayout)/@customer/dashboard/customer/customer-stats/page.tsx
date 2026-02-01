import { customerStats } from "@/actions/customer.action";
import { ShoppingBag, Wallet, Utensils, Star, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CustomerStats() {
    const response = await customerStats();
    const stats = response?.data;

    if (!stats) return <div className="text-slate-500 p-10">No statistics available.</div>;

    const summaryCards = [
        {
            title: "Total Spent",
            value: `$${stats.totalSpent.toFixed(2)}`,
            icon: <Wallet className="text-emerald-400" />,
            bg: "from-emerald-500/10 to-transparent",
            border: "border-emerald-500/20"
        },
        {
            title: "Orders Placed",
            value: stats.totalOrders,
            icon: <ShoppingBag className="text-blue-400" />,
            bg: "from-blue-500/10 to-transparent",
            border: "border-blue-500/20"
        },
        {
            title: "Meals Eaten",
            value: stats.totalMealsOrdered,
            icon: <Utensils className="text-orange-400" />,
            bg: "from-orange-500/10 to-transparent",
            border: "border-orange-500/20"
        }
    ];

    return (
        <div className="bg-slate-950 min-h-screen p-4 md:p-8 text-slate-200">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {summaryCards.map((card, i) => (
                        <div key={i} className={`relative overflow-hidden bg-slate-900/50 border ${card.border} p-8 rounded-[2.5rem] backdrop-blur-md group hover:bg-slate-900 transition-all`}>
                            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${card.bg} blur-2xl rounded-full opacity-50`}></div>
                            <div className="relative z-10">
                                <div className="p-3 bg-slate-950 w-fit rounded-2xl mb-4 shadow-inner">{card.icon}</div>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{card.title}</p>
                                <h2 className="text-4xl font-black text-white mt-1">{card.value}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-black text-white flex items-center gap-2 italic">
                                <Clock className="text-blue-500" /> Recent Orders
                            </h3>
                            <Link href={'/dashboard/customer/manage-order'}>
                                <Button variant="link" className="text-blue-400">View All</Button></Link>
                        </div>

                        <div className="space-y-4">
                            {stats.orders.map((order: any) => (
                                <div key={order.id} className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] hover:border-slate-700 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Order ID</span>
                                            <p className="text-xs font-mono text-slate-400">#{order.id.slice(0, 8)}...</p>
                                        </div>
                                        <span className="bg-amber-500/10 text-amber-500 text-[10px] px-3 py-1 rounded-full border border-amber-500/20 font-black">
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {order.items.map((item: any) => (
                                            <div key={item.id} className="flex items-center justify-between text-sm">
                                                <span className="text-slate-300">{item.meal.name} <span className="text-slate-600 text-xs">x{item.quantity}</span></span>
                                                <span className="text-slate-500">${item.price}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                                        <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p className="text-lg font-black text-white">${order.totalPrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-black text-white flex items-center gap-2 italic">
                                <MessageSquare className="text-purple-500" /> Your Feedback
                            </h3>
                        </div>

                        <div className="bg-slate-900/20 border border-slate-800 rounded-[2.5rem] p-6 divide-y divide-slate-800">
                            {stats.reviews.map((review: any) => (
                                <div key={review.id} className="py-6 first:pt-0 last:pb-0 group">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className={i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-700"} />
                                        ))}
                                    </div>
                                    <p className="text-slate-300 text-sm italic leading-relaxed">"{review.comment}"</p>
                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="h-6 w-6 bg-slate-800 rounded-lg flex items-center justify-center">
                                            <Utensils size={12} className="text-slate-500" />
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{review.meal.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
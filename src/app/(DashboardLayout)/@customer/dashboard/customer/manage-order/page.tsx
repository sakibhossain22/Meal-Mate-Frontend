import { customerOrder } from "@/actions/customer.action";
import { Package, Receipt, Utensils, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function ManageOrders() {
    const response = await customerOrder();
    const orders = response?.data || [];

    return (
        <div className="bg-slate-950 min-h-screen p-4 md:p-10 text-slate-200">
            <div className="max-w-5xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-white flex items-center gap-3">
                            <Package className="text-blue-500" size={36} />
                            Order History
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Track and manage your recent meal subscriptions and orders.</p>
                    </div>
                    <Badge variant="outline" className="border-slate-800 text-slate-400 px-4 py-1 rounded-full">
                        Total {orders.length} Orders
                    </Badge>
                </div>
                <div className="grid gap-8">
                    {orders.length > 0 ?
                        orders.map((order: any) => (
                            <div key={order.id} className="group relative bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden transition-all hover:border-slate-700 hover:bg-slate-900/60">
                                <div className="p-6 md:p-8 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 text-blue-400 group-hover:scale-110 transition-transform">
                                            <Receipt size={22} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-white">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${order.status === 'PENDING'
                                                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                                    : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Total Paid</p>
                                        <p className="text-2xl font-black text-white">${order.totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Meal Details</p>
                                        {order.items.map((item: any) => (
                                            <div key={item.id} className="flex items-center gap-4 bg-slate-950/50 p-3 rounded-2xl border border-slate-800/50">
                                                <div className="w-14 h-14 bg-slate-800 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-700">
                                                    {item.meal.image ? <img src={item.meal.image} alt={item.meal.name} className="w-full h-full object-cover" /> : <Utensils size={20} className="text-slate-600" />
                                                    }
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-slate-200">{item.meal.name}</h4>
                                                    <p className="text-xs text-slate-500">Qty: {item.quantity} × ${item.price}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-black text-slate-400">${(item.quantity * item.price).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col justify-between p-6 bg-slate-950/30 rounded-3xl border border-slate-800/50">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                                <p className="text-slate-300">Order Placed Successfully</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm opacity-50">
                                                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                                <p className="text-slate-500 italic">Pending Provider Confirmation</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )) : <div className="text-center py-32 bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800">
                                <Package size={40} className="text-slate-700" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-400">No Orders Yet</h2>
                            <p className="text-slate-600 mt-1 max-w-xs mx-auto text-sm">Once you start ordering delicious meals, they will appear here.</p>
                            <Link href={'/meals'}>
                                <Button className="bg-blue-600 hover:bg-blue-500 px-8 py-6 rounded-2xl font-bold">
                                    Explore Menu
                                </Button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
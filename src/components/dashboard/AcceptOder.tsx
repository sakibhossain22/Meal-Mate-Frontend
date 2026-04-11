"use client"

import React, { useTransition } from 'react'
import {
    Package,
    MapPin,
    User,
    Clock,
    CheckCircle2,
    Navigation,
    DollarSign,
    ExternalLink
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { acceptOrder } from "@/actions/delivery.action";
import { authClient } from '@/lib/auth-client'

export default function GetOrderss({ ordersData }: { ordersData: any }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const deliveryManId = session?.user?.id as string;
    // console.log(deliveryManId)
    const { order, orderItem } = ordersData;

    const handleAccept = async (orderId: string) => {
        startTransition(async () => {
            try {
                const res = await acceptOrder(orderId, deliveryManId);
                if (res.success) {
                    toast.success("Order accepted! Get ready for delivery.");
                    router.refresh();
                } else {
                    toast.error(res.message || "Failed to accept order");
                }
            } catch (err) {
                toast.error("Something went wrong!");
            }
        });
    };

    // অর্ডার আইডি দিয়ে আইটেম খুঁজে বের করার ফাংশন
    const getItemsForOrder = (orderId: string) => {
        return orderItem.filter((item: any) => item.orderId === orderId);
    };

    return (
        <div className="p-6 md:p-10 min-h-screen bg-[#0a0a0a] text-white">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3 italic">
                    <Navigation className="text-primary" size={40} /> AVAILABLE MISSIONS
                </h1>
                <p className="text-slate-500 mt-1 font-medium tracking-wide uppercase text-xs">
                    Accept orders and start earning rewards in Sherpur.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {order.map((ord: any) => {
                    const items = getItemsForOrder(ord.id);
                    const isAvailable = !ord.deliveryManId && ord.status !== 'DELIVERED';

                    return (
                        <div
                            key={ord.id}
                            className={`group relative bg-white/[0.02] backdrop-blur-3xl border ${isAvailable ? 'border-primary/20' : 'border-white/5'} rounded-[3rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5`}
                        >
                            {/* Header: Status & Price */}
                            <div className="p-8 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${isAvailable ? 'bg-primary text-black' : 'bg-white/5 text-slate-500'}`}>
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Order ID</div>
                                        <div className="font-bold text-lg">#{ord.id.slice(-6).toUpperCase()}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">Payout</div>
                                    <div className="text-3xl font-black text-white tracking-tighter">${ord.totalPrice}</div>
                                </div>
                            </div>

                            {/* Body: Items & Details */}
                            <div className="p-8 space-y-6">
                                {/* Product Info */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Items Detail</p>
                                    {items.map((item: any) => (
                                        <div key={item.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <img src={item.meal.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm">{item.meal.name}</h4>
                                                <p className="text-[10px] text-slate-500 font-bold italic">Qty: {item.quantity} • {item.meal.provider.businessName}</p>
                                            </div>
                                            <div className="text-xs font-black text-primary">FIXED</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Locations */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-2 text-primary">
                                            <Clock size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pickup From</span>
                                        </div>
                                        <p className="text-sm font-bold truncate">{items[0]?.meal?.provider?.address || "Sherpur Shadar"}</p>
                                    </div>
                                    <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-2 text-secondary">
                                            <MapPin size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Deliver To</span>
                                        </div>
                                        <p className="text-sm font-bold truncate">{items[0]?.address || "Customer Location"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer: Action Button */}
                            <div className="p-8 pt-0">
                                {isAvailable ? (
                                    <button
                                        disabled={isPending}
                                        onClick={() => handleAccept(ord.id)}
                                        className="w-full bg-primary hover:bg-orange-600 text-black font-black py-5 rounded-[2rem] transition-all active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 cursor-pointer uppercase tracking-widest text-xs"
                                    >
                                        {isPending ? "Connecting to Cloud..." : (
                                            <>
                                                Take This Order <ExternalLink size={18} />
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="w-full bg-white/5 border border-white/10 text-slate-500 font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 text-xs uppercase tracking-widest grayscale opacity-50">
                                        <CheckCircle2 size={18} /> {ord.status === 'DELIVERED' ? 'Already Delivered' : 'Accepted by Someone'}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Syncing State Overlay */}
            {isPending && (
                <div className="fixed top-10 right-10 z-50">
                    <div className="bg-primary text-black px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl animate-pulse">
                        Syncing Mission...
                    </div>
                </div>
            )}
        </div>
    )
}
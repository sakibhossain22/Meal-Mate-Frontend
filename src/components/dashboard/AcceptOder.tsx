"use client"

import React, { useState, useTransition } from 'react'
import {
    Package,
    MapPin,
    Clock,
    CheckCircle2,
    Navigation,
    ExternalLink,
    Power,
    Wifi,
    WifiOff
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { acceptOrder, toggleAvailability } from "@/actions/delivery.action";
import { authClient } from '@/lib/auth-client'

export default function GetOrderss({ ordersData, profile }: { ordersData: any; profile: any }) {
    const [isPending, startTransition] = useTransition();
    const [isToggling, startToggleTransition] = useTransition();
    const router = useRouter();
    const { data: session } = authClient.useSession();
    
    const [isOnline, setIsOnline] = useState(profile?.data?.isAvailable ?? true);

    const deliveryManId = session?.user?.id as string;
    const { order, orderItem } = ordersData;

    const handleToggleStatus = () => {
        const nextStatus = !isOnline;
        startToggleTransition(async () => {
            try {
                const res = await toggleAvailability(nextStatus);
                if (res.success) {
                    setIsOnline(nextStatus);
                    toast.success(nextStatus ? "ONLINE" : "OFFLINE");
                    router.refresh();
                }
            } catch (err) {
                toast.error("Failed to update status");
            }
        });
    };

    const handleAccept = async (orderId: string) => {
        if (!isOnline) {
            toast.error("Go online first!");
            return;
        }
        startTransition(async () => {
            try {
                const res = await acceptOrder(orderId, deliveryManId);
                if (res.success) {
                    toast.success("Mission Accepted!");
                    router.refresh();
                }
            } catch (err) {
                toast.error("Something went wrong!");
            }
        });
    };

    const getItemsForOrder = (orderId: string) => {
        return orderItem.filter((item: any) => item.orderId === orderId);
    };

    return (
        <div className="p-6 md:p-10 min-h-screen bg-[#050505] text-slate-100 font-sans">
            {/* Header Section */}
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3 italic uppercase">
                        <Navigation className="animate-pulse" size={36} /> 
                        Available <span >Missions</span>
                    </h1>
                    <p className="text-slate-500 mt-1 font-bold tracking-[0.2em] uppercase text-[10px]">
                        Sherpur Delivery Network • Active Operations
                    </p>
                </div>

                {/* Status Toggle */}
                <button
                    onClick={handleToggleStatus}
                    disabled={isToggling}
                    className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-500 active:scale-95 ${
                        isOnline
                            ? 'bg-secondary/5 border-secondary/20 text-secondary shadow-[0_0_30px_rgba(34,197,94,0.05)]'
                            : 'bg-rose-500/5 border-rose-500/20 text-rose-500'
                    }`}
                >
                    <div className="flex text-white flex-col items-start">
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Your Status</span>
                        <span className="font-black text-xs uppercase flex items-center gap-2">
                            {isOnline ? <><Wifi size={14} /> Systems Online</> : <><WifiOff size={14} /> Disconnected</>}
                        </span>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${isOnline ? 'bg-secondary' : 'bg-slate-800'}`}>
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-300 ${isOnline ? 'left-6' : 'left-1'}`} />
                    </div>
                </button>
            </div>

            {/* Offline Shield */}
            {!isOnline && (
                <div className="mb-8 p-6 bg-rose-500/5 border border-rose-500/10 rounded-[2rem] flex items-center gap-4 backdrop-blur-md">
                    <Power className="text-rose-500 animate-pulse" size={20} />
                    <p className="text-xs font-black uppercase tracking-widest text-rose-500/80">
                        Signal Lost: Reconnect to view available missions
                    </p>
                </div>
            )}

            <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 transition-all duration-700 ${!isOnline ? 'opacity-20 blur-sm grayscale pointer-events-none' : 'opacity-100'}`}>
                {order.map((ord: any) => {
                    const items = getItemsForOrder(ord.id);
                    const isAvailable = !ord.deliveryManId && ord.status !== 'DELIVERED';

                    return (
                        <div
                            key={ord.id}
                            className={`group relative bg-[#0a0a0a] border ${
                                isAvailable ? 'border-primary/20 hover:border-primary/40' : 'border-white/5'
                            } rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-2xl`}
                        >
                            {/* Card Header */}
                            <div className="p-8 flex items-center justify-between border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isAvailable ? 'bg-primary/10 border border-primary/20' : 'bg-white/5 text-slate-600'}`}>
                                        <Package size={28} />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Callsign</div>
                                        <div className="font-black text-xl tracking-tight">#{ord.id.slice(-6).toUpperCase()}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em]">Net Profit</div>
                                    <div className="text-3xl font-black tracking-tighter text-white">${ord.totalPrice}</div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Payload Details</p>
                                    {items.map((item: any) => (
                                        <div key={item.id} className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5 group-hover:bg-white/[0.05] transition-colors">
                                            <img src={item.meal.image} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-slate-200 uppercase tracking-tight">{item.meal.name}</h4>
                                                <p className="text-[10px] text-slate-500 font-black italic">UNIT: {item.quantity} • {item.meal.provider.businessName}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white/[0.02] p-5 rounded-3xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-2 text-primary/60">
                                            <Clock size={14} />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Pick</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-300 truncate uppercase tracking-tighter">{items[0]?.meal?.provider?.address || "BASE POINT"}</p>
                                    </div>
                                    <div className="bg-white/[0.02] p-5 rounded-3xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-2 text-secondary/60">
                                            <MapPin size={14} />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Drop</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-300 truncate uppercase tracking-tighter">{items[0]?.address || "TARGET ZONE"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Action */}
                            <div className="p-8 pt-0">
                                {isAvailable ? (
                                    <button
                                        disabled={isPending}
                                        onClick={() => handleAccept(ord.id)}
                                        className="w-full bg-primary hover:bg-orange-500 text-black font-black py-5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px] shadow-[0_10px_30px_rgba(249,115,22,0.15)]"
                                    >
                                        {isPending ? "Syncing..." : <>Initiate Delivery <ExternalLink size={16} /></>}
                                    </button>
                                ) : (
                                    <div className="w-full bg-white/5 border border-white/10 text-slate-600 font-black py-5 rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest opacity-40">
                                        <CheckCircle2 size={16} /> Mission Complete / Occupied
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Global Loader */}
            {(isPending || isToggling) && (
                <div className="fixed bottom-10 right-10 z-50">
                    <div className="bg-primary text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl animate-pulse">
                        Updating Grid...
                    </div>
                </div>
            )}
        </div>
    )
}
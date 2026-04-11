"use client"

import React, { useTransition } from 'react'
import {
    Truck,
    Phone,
    MapPin,
    CheckCircle2,
    ChefHat,
    PackageCheck,
    MessageSquare,
    Navigation2
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateDeliveryStatus } from '@/actions/delivery.action'

export default function MyOrder({ orders }: { orders: any[] }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        startTransition(async () => {
            try {
                const res = await updateDeliveryStatus(orderId, newStatus);
                if (res.success) {
                    toast.success(`Protocol Updated: ${newStatus}`);
                    router.refresh();
                }
            } catch (err) {
                toast.error("Transmission failed");
            }
        });
    };

    // কালারগুলো সরাসরি সলিড হোয়াইট এবং স্লেট ভেরিয়েন্টে রাখা হয়েছে
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DELIVERED': return 'text-white bg-white/10 border-white/20';
            case 'ON_THE_WAY': return 'text-white bg-white/10 border-white/20';
            default: return 'text-white/40 bg-white/5 border-white/10';
        }
    };

    return (
        <div className="p-6 md:p-10 min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            
            {/* Header Section */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Navigation2 size={16} className="animate-pulse text-white" />
                        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/60">Active Transmissions</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3 italic uppercase text-white">
                        <Truck className="text-white" size={40} /> My <span className="opacity-50">Shipments</span>
                    </h1>
                    <p className="text-white/30 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Operational overview of current deliveries</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-[2rem] flex flex-col items-center shadow-2xl">
                    <span className="text-2xl font-black tracking-tighter text-white">{orders.length}</span>
                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-black text-center leading-tight">Active Tasks</span>
                </div>
            </div>

            {/* Shipments List */}
            <div className="flex flex-col gap-8">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="group relative bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-500"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-stretch">

                            {/* Section 1: Identity */}
                            <div className="p-10 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="w-16 h-16 rounded-[1.5rem] border border-white/20 bg-white/5 flex items-center justify-center shadow-2xl group-hover:bg-white group-hover:text-black transition-all duration-500">
                                        <span className="text-2xl font-black uppercase">
                                            {order?.customer?.name?.charAt(0) || "U"}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl tracking-tight text-white group-hover:opacity-70 transition-colors">
                                            {order?.customer?.name}
                                        </h3>
                                        <p className="text-[11px] text-white/40 font-bold uppercase tracking-tighter">{order?.customer?.email}</p>
                                    </div>
                                </div>

                                <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] ${getStatusColor(order.status)}`}>
                                    {order.status === 'DELIVERED' ? (
                                        <CheckCircle2 size={14} className="text-white" />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                                    )}
                                    {order.status.replace('_', ' ')}
                                </div>
                            </div>

                            {/* Section 2: Logistics Details */}
                            <div className="p-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] block mb-4">Payload Configuration</span>
                                    <div className="space-y-3">
                                        {order.items.map((item: any) => (
                                            <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                                                <div className="text-[10px] font-black px-2 py-1 bg-white text-black rounded-lg">
                                                    {item.quantity}x
                                                </div>
                                                <span className="text-xs font-bold text-white/70 uppercase tracking-tighter">{item.meal.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/[0.03] p-6 rounded-[2rem] border border-white/5">
                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] block mb-3 text-left">Target Coordinates</span>
                                    <div className="flex items-start gap-3 text-xs font-bold text-white/60 leading-relaxed italic">
                                        <MapPin size={18} className="shrink-0 text-white/40" />
                                        {order.items[0]?.address || "Sherpur Shadar Zone"}
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Action Interface */}
                            <div className="p-10 lg:w-1/4 bg-white/[0.01] border-t lg:border-t-0 border-white/5 flex flex-col gap-4 justify-center">
                                <div className="grid grid-cols-2 gap-3 mb-2">
                                    <a href={`tel:${order.customer?.phone}`} className="flex items-center justify-center bg-white/5 text-white hover:bg-white hover:text-black py-4 rounded-2xl border border-white/10 transition-all shadow-lg">
                                        <Phone size={18} />
                                    </a>
                                    <button className="flex items-center justify-center bg-white/5 text-white hover:bg-white hover:text-black py-4 rounded-2xl border border-white/10 transition-all shadow-lg">
                                        <MessageSquare size={18} />
                                    </button>
                                </div>

                                <div className="relative">
                                    <select
                                        disabled={isPending || order.status === 'DELIVERED'}
                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                        value={order.status}
                                        className="w-full bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] appearance-none text-center cursor-pointer hover:bg-white/90 transition-all disabled:opacity-20 shadow-xl"
                                    >
                                        <option value="ON_THE_WAY">Deploy: On Route</option>
                                        <option value="DELIVERED">Protocol: Delivered</option>
                                    </select>
                                    {order.status !== 'DELIVERED' && (
                                        <ChefHat size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {orders.length === 0 && (
                <div className="mt-32 text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5 shadow-2xl">
                        <PackageCheck size={40} className="text-white/10" />
                    </div>
                    <h2 className="text-2xl font-black text-white/20 italic uppercase tracking-tighter">No Active Protocols</h2>
                    <p className="text-[9px] text-white/10 mt-4 uppercase tracking-[0.5em] font-black">Scan for missions in available terminal</p>
                </div>
            )}

            {/* System Status Overlay */}
            {isPending && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-white text-black px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl flex items-center gap-4 border border-white/10">
                        <div className="w-2 h-2 bg-black rounded-full animate-ping" /> Synchronizing Data Grid
                    </div>
                </div>
            )}
        </div>
    )
}
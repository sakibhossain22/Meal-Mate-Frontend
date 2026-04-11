"use client"

import React from 'react'
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  User, 
  MapPin, 
  Calendar,
  ChevronRight,
  MoreVertical
} from 'lucide-react'

export default function ManageOrder({ orders }: { orders: any[] }) {
  
  // স্ট্যাটাস অনুযায়ী কালার কোড
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-secondary/10 text-white/50 border-secondary/20';
      case 'PENDING': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'ON_THE_WAY': return 'bg-sky-500/10 text-sky-500 border-sky-500/20';
      case 'CANCELLED': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#0a0a0a] text-white">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3 italic">
          <ShoppingBag className="text-white" size={36} /> LIVE ORDERS
        </h1>
        <p className="text-slate-500 mt-1 font-medium tracking-wide">Monitor and manage all system transactions in real-time.</p>
      </div>

      {/* Orders Table/List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/20 transition-all duration-500"
          >
            {/* Top Bar: Order Info & Status */}
            <div className="p-6 md:p-8 flex flex-wrap items-center justify-between gap-6 border-b border-white/5">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Order ID</div>
                  <div className="text-lg font-bold tracking-tight">#{order.id.slice(-8).toUpperCase()}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 items-center">
                {/* Customer */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-full text-slate-400"><User size={16}/></div>
                  <div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Customer</div>
                    <div className="text-sm font-bold">{order.customer.name}</div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-full text-slate-400"><Calendar size={16}/></div>
                  <div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Placed At</div>
                    <div className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`px-4 py-2 rounded-xl border text-[10px] font-black tracking-widest uppercase shadow-lg ${getStatusStyle(order.status)}`}>
                  {order.status}
                </div>

                <button className="p-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                  <MoreVertical size={20} className="text-slate-500" />
                </button>
              </div>
            </div>

            {/* Middle Bar: Items Summary */}
            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4">Ordered Items</div>
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold">
                        {item.quantity}x
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{item.meal.name}</div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold mt-1 uppercase">
                          <MapPin size={10} /> {item.address}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-black text-slate-300">${item.price}</div>
                  </div>
                ))}
              </div>

              {/* Price Summary Card */}
              <div className="bg-primary/[0.03] border border-primary/10 rounded-3xl p-6 text-center">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Grand Total</div>
                <div className="text-4xl font-black tracking-tighter">${order.totalPrice}</div>
                <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/5">
                  View Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
          <ShoppingBag size={64} className="mx-auto text-slate-700 mb-4" />
          <h3 className="text-xl font-bold text-slate-400">No orders found in the system</h3>
        </div>
      )}
    </div>
  )
}
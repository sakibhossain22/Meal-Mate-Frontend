"use client"

import React from 'react'
import { 
  History, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Archive,
  Terminal
} from 'lucide-react'
import { format } from 'date-fns'

export default function OrderHistory({ history }: { history: any[] }) {
  
  return (
    // সম্পূর্ণ ব্যাকগ্রাউন্ড ব্ল্যাক এবং টেক্সট হোয়াইট ফিক্সড
    <div className="p-6 md:p-10 min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3 text-white/60">
             <Terminal size={16} className="animate-pulse" />
             <span className="text-[9px] font-black tracking-[0.4em] uppercase">Archive Database</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3 italic text-white uppercase">
            <History size={40} className="text-white" /> Delivery <span>History</span>
          </h1>
          <p className="text-white/40 mt-2 font-bold uppercase text-[9px] tracking-[0.4em]">
            Immutable record of completed tactical operations
          </p>
        </div>
        
        <div className="bg-white/5 border border-white/20 px-8 py-4 rounded-[2rem] shadow-xl flex flex-col items-center">
           <span className="text-white font-black text-2xl tracking-tighter">{history.length}</span>
           <span className="text-white/40 text-[8px] font-black uppercase tracking-[0.3em] leading-tight text-center">Total<br/>Logs</span>
        </div>
      </div>

      {/* History Grid */}
      <div className="space-y-6">
        {history.length > 0 ? (
          history.map((order) => (
            <div 
              key={order.id}
              className="group bg-white/[0.03] border border-white/5 hover:border-white/20 rounded-[3rem] p-10 transition-all duration-500"
            >
              <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10">
                
                {/* ID & Date Section */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-lg">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Transmission ID</div>
                    <div className="font-black text-xl tracking-tighter text-white group-hover:text-white/80 transition-colors italic">
                      #{order.id.slice(-8).toUpperCase()}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-white/50 mt-2 font-bold uppercase tracking-widest">
                      <Calendar size={12} className="text-white/30" /> {format(new Date(order.updatedAt), 'PPP')}
                    </div>
                  </div>
                </div>

                {/* Cargo Details */}
                <div className="flex-1 w-full xl:w-auto">
                   <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Payload Content</div>
                   <div className="flex flex-wrap gap-2">
                      {order.items.map((item: any, idx: number) => (
                        <span key={idx} className="bg-white/5 border border-white/10 px-5 py-2 rounded-2xl text-[11px] font-black text-white italic group-hover:border-white/30 transition-colors">
                          {item.quantity}X {item.meal.name}
                        </span>
                      ))}
                   </div>
                </div>

                {/* Logistics Info */}
                <div className="flex flex-col md:flex-row items-center gap-8 w-full xl:w-auto border-t xl:border-t-0 border-white/5 pt-8 xl:pt-0">
                   <div className="text-left md:text-right w-full md:w-auto">
                      <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Recipient</div>
                      <div className="text-sm font-black text-white/80 tracking-tight uppercase italic">{order.customer?.name}</div>
                      <div className="flex items-center md:justify-end gap-1 text-[10px] text-white/40 font-bold mt-1 uppercase tracking-tighter">
                        <MapPin size={12} className="text-white/20" /> {order.items[0]?.address || "Sherpur Sector"}
                      </div>
                   </div>
                   
                   <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] min-w-[160px] text-center group-hover:border-white/20 transition-all duration-500 shadow-2xl">
                      <div className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em] mb-2">Settlement</div>
                      <div className="text-3xl font-black flex items-center justify-center gap-1 tracking-tighter text-white italic">
                        <span className="text-white/50 text-lg font-bold">৳</span>{order.totalPrice}
                      </div>
                   </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="py-32 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-[4rem]">
            <Archive size={64} className="mx-auto text-white/10 mb-8" />
            <h3 className="text-2xl font-black text-white/20 uppercase tracking-tighter italic">No History Logs Found</h3>
          </div>
        )}
      </div>

      {/* Footer Info */}
      {history.length > 0 && (
        <div className="mt-20 flex flex-col items-center gap-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-center text-white/20 text-[10px] font-black uppercase tracking-[0.6em] italic pb-10">
              End of Transmission — All Records Secured
            </p>
        </div>
      )}
    </div>
  )
}
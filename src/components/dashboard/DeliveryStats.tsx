"use client"

import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  Activity, 
  ArrowUpRight, 
  CalendarDays,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

export default function DeliveryStatsDashboard({ stats }: { stats: any }) {
  const data = stats?.data;

  // স্ট্যাটস কার্ড ডেটা
  const statCards = [
    {
      title: "Total Revenue",
      value: `$${data?.overview?.totalEarnings?.toFixed(2)}`,
      icon: <DollarSign size={24} />,
      color: "text-primary",
      bg: "bg-primary/10",
      desc: "Overall earnings till date"
    },
    {
      title: "Delivered",
      value: data?.overview?.totalOrders,
      icon: <Package size={24} />,
      color: "text-secondary",
      bg: "bg-secondary/10",
      desc: "Successfully completed"
    },
    {
      title: "Avg. Value",
      value: `$${data?.overview?.averageOrderValue}`,
      icon: <Target size={24} />,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      desc: "Per order average"
    },
    {
      title: "Monthly",
      value: `$${data?.monthlyPerformance?.earningsThisMonth}`,
      icon: <TrendingUp size={24} />,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      desc: "Current month growth"
    }
  ];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <Activity className="text-primary" size={36} /> PERFORMANCE ANALYTICS
          </h1>
          <p className="text-slate-500 mt-1 font-medium italic">Track your professional delivery growth in real-time.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-6 py-3 rounded-2xl">
          <CalendarDays className="text-primary" size={20} />
          <span className="text-sm font-bold tracking-widest uppercase">April 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, i) => (
          <div key={i} className="group bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${card.bg} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{card.title}</p>
            <h2 className="text-3xl font-black mt-1 tracking-tighter">{card.value}</h2>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-slate-400">
              <ArrowUpRight size={12} className={card.color} /> {card.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Flow Chart */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold italic tracking-tight">Revenue Stream</h3>
            <div className="flex gap-2">
               <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-black text-primary uppercase">Revenue ($)</span>
               </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="date" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Volume Chart */}
        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
          <h3 className="text-xl font-bold italic tracking-tight mb-8">Order Density</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="date" stroke="#475569" fontSize={10} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                />
                <Bar dataKey="orders" fill="#10b981" radius={[10, 10, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
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

  // সরাসরি সলিড কালার এবং ওপাসিটি ব্যবহার করা হয়েছে
  const statCards = [
    {
      title: "Total Revenue",
      value: `$${data?.overview?.totalEarnings?.toFixed(2)}`,
      icon: <DollarSign size={22} />,
      color: "text-white",
      bg: "bg-white/10",
      border: "border-white/20",
      desc: "Gross income"
    },
    {
      title: "Delivered",
      value: data?.overview?.totalOrders,
      icon: <Package size={22} />,
      color: "text-white",
      bg: "bg-white/10",
      border: "border-white/20",
      desc: "Completed ops"
    },
    {
      title: "Avg. Value",
      value: `$${data?.overview?.averageOrderValue}`,
      icon: <Target size={22} />,
      color: "text-white/80",
      bg: "bg-white/5",
      border: "border-white/10",
      desc: "Per mission"
    },
    {
      title: "Monthly",
      value: `$${data?.monthlyPerformance?.earningsThisMonth}`,
      icon: <TrendingUp size={22} />,
      color: "text-white/80",
      bg: "bg-white/5",
      border: "border-white/10",
      desc: "Current Cycle"
    }
  ];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <div className="w-2 h-2 rounded-full bg-white animate-ping" />
             <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/60">Live Telemetry Data</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3 italic uppercase text-white">
            <Activity className="text-white" size={32} /> Analytics <span className="opacity-50">Core</span>
          </h1>
          <p className="text-white/30 mt-1 font-bold text-[10px] uppercase tracking-[0.2em]">BhojonBari Delivery Network Metrics</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl shadow-xl">
          <CalendarDays className="text-white/60" size={18} />
          <span className="text-xs font-black tracking-widest uppercase italic text-white/80">April 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, i) => (
          <div key={i} className={`group bg-white/[0.03] border ${card.border} p-8 rounded-[2.5rem] hover:bg-white/[0.05] transition-all duration-500 relative overflow-hidden`}>
            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-lg`}>
              {card.icon}
            </div>
            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-1">{card.title}</p>
            <h2 className="text-4xl font-black tracking-tighter text-white">{card.value}</h2>
            <div className="mt-6 flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
              <ArrowUpRight size={14} /> {card.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Flow Chart */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-black italic tracking-tighter uppercase text-white">Revenue Stream</h3>
              <p className="text-[9px] font-black text-white/30 tracking-widest uppercase">Monetary inflow log</p>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Global Currency ($)</span>
            </div>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff33" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{fontWeight: '900', letterSpacing: '1px', fill: '#ffffff44'}}
                />
                <YAxis 
                  stroke="#ffffff33" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{fontWeight: '900', fill: '#ffffff44'}}
                />
                <Tooltip 
                  cursor={{stroke: '#ffffff44', strokeWidth: 1}}
                  contentStyle={{ backgroundColor: '#000000', border: '1px solid #ffffff11', borderRadius: '16px', fontSize: '12px', fontWeight: '900', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ffffff" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Volume Chart */}
        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] shadow-2xl">
          <div className="mb-10">
            <h3 className="text-lg font-black italic tracking-tighter uppercase text-white">Order Density</h3>
            <p className="text-[9px] font-black text-white/30 tracking-widest uppercase">Mission frequency</p>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.chartData}>
                <CartesianGrid strokeDasharray="0" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff33" 
                  fontSize={10} 
                  axisLine={false} 
                  tick={{fontWeight: '900', fill: '#ffffff44'}}
                />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#000000', border: '1px solid #ffffff11', borderRadius: '16px' }}
                />
                <Bar 
                  dataKey="orders" 
                  fill="#ffffff" 
                  fillOpacity={0.6}
                  radius={[8, 8, 0, 0]} 
                  barSize={24} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}